import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// Helper to get today's date in IST
function getTodayDateIST(): string {
  const now = new Date();
  const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  return istTime.toISOString().split('T')[0];
}

// Helper to get yesterday's date in IST
function getYesterdayDateIST(): string {
  const now = new Date();
  const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  istTime.setDate(istTime.getDate() - 1);
  return istTime.toISOString().split('T')[0];
}

/**
 * Daily cron job to reset visitor counts
 * This should be called at 12:00 AM IST every day
 * 
 * You can set this up with:
 * - Vercel Cron (if using Vercel)
 * - External cron service like Supabase Functions, EasyCron, etc.
 */
export async function POST(request: NextRequest) {
  try {
    // Verify the request is coming from a trusted source
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET || 'your-secret-key';

    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const today = getTodayDateIST();
    const yesterday = getYesterdayDateIST();

    // Step 1: Count unique IPs for yesterday
    const { count: yesterdayUniqueCount, error: countError } = await supabaseAdmin
      .from('visitor_ips')
      .select('id', { count: 'exact' })
      .eq('visit_date', yesterday);

    if (countError) {
      console.error('Error counting yesterday unique IPs:', countError);
    }

    // Step 2: Update yesterday's stats
    if (yesterdayUniqueCount !== null && yesterdayUniqueCount > 0) {
      const { error: updateError } = await supabaseAdmin
        .from('visitor_stats')
        .update({
          unique_visits_today: yesterdayUniqueCount,
          updated_at: new Date().toISOString()
        })
        .eq('date', yesterday);

      if (updateError) {
        console.error('Error updating yesterday stats:', updateError);
      }
    }

    // Step 3: Get total visits till date (from all logs)
    const { count: totalVisits, error: totalError } = await supabaseAdmin
      .from('visitor_logs')
      .select('id', { count: 'exact' });

    if (totalError) {
      console.error('Error counting total visits:', totalError);
    }

    // Step 4: Create or update today's stats
    const { error: upsertError } = await supabaseAdmin
      .from('visitor_stats')
      .upsert(
        [{
          date: today,
          total_visits_all_time: totalVisits || 0,
          unique_visits_today: 0,
          updated_at: new Date().toISOString()
        }],
        { onConflict: 'date' }
      );

    if (upsertError) {
      console.error('Error upserting today stats:', upsertError);
      // SECURITY: Don't expose error details
      return NextResponse.json(
        {
          success: false,
          error: 'Database operation failed'
        },
        { status: 500 }
      );
    }

    // Step 5: Delete old visitor IPs (optional - keep only last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const cutoffDate = thirtyDaysAgo.toISOString().split('T')[0];

    const { error: deleteError } = await supabaseAdmin
      .from('visitor_ips')
      .delete()
      .lt('visit_date', cutoffDate);

    if (deleteError) {
      console.error('Error deleting old visitor IPs:', deleteError);
    }

    return NextResponse.json({
      success: true,
      message: 'Daily reset completed successfully',
      data: {
        date: today,
        yesterdayUniqueCount: yesterdayUniqueCount || 0,
        totalVisitsAllTime: totalVisits || 0
      }
    });

  } catch (error) {
    console.error('Error in daily cron job:', error);
    // SECURITY: Don't expose error details
    return NextResponse.json(
      {
        success: false,
        error: 'Cron job execution failed'
      },
      { status: 500 }
    );
  }
}

// GET endpoint for manual testing
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET || 'your-secret-key';

  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // Call POST to run the cron job
  const response = await POST(request);
  return response;
}
