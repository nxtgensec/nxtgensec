import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { checkRateLimit } from '@/lib/rate-limit';

// Helper to get client IP
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : request.headers.get('x-real-ip') || 'unknown';
  return ip;
}

// Helper to get today's date in IST
function getTodayDateIST(): string {
  const now = new Date();
  const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  return istTime.toISOString().split('T')[0];
}

// GET - Retrieve current visitor stats and track visit
export async function GET(request: NextRequest) {
  try {
    const ip = getClientIP(request);
    const today = getTodayDateIST();

    if (ip === 'unknown') {
      return NextResponse.json({
        error: 'Could not determine IP address',
        totalVisits: 0,
        uniqueVisitsToday: 0
      }, { status: 400 });
    }

    // SECURITY: Check rate limit (30 requests per 60 seconds per IP)
    const { allowed, remaining } = checkRateLimit(ip, '/api/visitors');
    if (!allowed) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          totalVisits: 0,
          uniqueVisitsToday: 0
        },
        { 
          status: 429,
          headers: { 'Retry-After': '60' }
        }
      );
    }

    // Track visitor IP for today
    const { data: existingIP, error: fetchError } = await supabaseAdmin
      .from('visitor_ips')
      .select('id')
      .eq('ip_address', ip)
      .eq('visit_date', today)
      .maybeSingle();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching visitor IP:', fetchError);
    }

    let isNewVisitorToday = !existingIP;

    // Insert or update visitor IP
    if (isNewVisitorToday) {
      const { error: insertError } = await supabaseAdmin
        .from('visitor_ips')
        .insert([{
          ip_address: ip,
          visit_date: today,
          first_visit_at: new Date().toISOString(),
          last_visit_at: new Date().toISOString(),
          visit_count: 1
        }]);

      if (insertError) {
        console.error('Error inserting visitor IP:', insertError);
      }
    } else {
      const { error: updateError } = await supabaseAdmin
        .from('visitor_ips')
        .update({
          last_visit_at: new Date().toISOString(),
          visit_count: existingIP ? 1 : 1
        })
        .eq('ip_address', ip)
        .eq('visit_date', today);

      if (updateError) {
        console.error('Error updating visitor IP:', updateError);
      }
    }

    // Log this visit
    const userAgent = request.headers.get('user-agent') || '';
    const referer = request.headers.get('referer') || '';
    
    const { error: logError } = await supabaseAdmin
      .from('visitor_logs')
      .insert([{
        ip_address: ip,
        user_agent: userAgent,
        referer: referer,
        page_path: new URL(request.url).pathname
      }]);

    if (logError) {
      console.error('Error logging visit:', logError);
    }

    // Get current stats
    const { data: statsData, error: statsError } = await supabaseAdmin
      .from('visitor_stats')
      .select('total_visits_all_time, unique_visits_today')
      .eq('date', today)
      .maybeSingle();

    if (statsError && statsError.code !== 'PGRST116') {
      console.error('Error fetching stats:', statsError);
    }

    // If no stats for today, create one
    let totalVisits = statsData?.total_visits_all_time || 0;
    let uniqueVisitsToday = statsData?.unique_visits_today || 0;

    if (!statsData) {
      // Get total visits from visitor_logs table
      const { count: totalCount, error: countError } = await supabaseAdmin
        .from('visitor_logs')
        .select('id', { count: 'exact' });

      totalVisits = totalCount || 0;

      // Count unique IPs for today
      const { count: uniqueCount, error: uniqueError } = await supabaseAdmin
        .from('visitor_ips')
        .select('id', { count: 'exact' })
        .eq('visit_date', today);

      uniqueVisitsToday = uniqueCount || 0;

      // Create today's stats
      const { error: createError } = await supabaseAdmin
        .from('visitor_stats')
        .insert([{
          date: today,
          total_visits_all_time: totalVisits,
          unique_visits_today: uniqueVisitsToday
        }]);

      if (createError && createError.code !== '23505') { // Ignore unique constraint violation
        console.error('Error creating stats:', createError);
      }
    }

    return NextResponse.json({
      totalVisits: totalVisits + (isNewVisitorToday ? 1 : 0),
      uniqueVisitsToday: uniqueVisitsToday + (isNewVisitorToday ? 1 : 0),
      isNewVisitorToday,
      date: today
    });

  } catch (error) {
    console.error('Error in GET /api/visitors:', error);
    // SECURITY: Don't expose error details to client
    return NextResponse.json({
      error: 'Failed to process visitor request',
      totalVisits: 0,
      uniqueVisitsToday: 0
    }, { status: 500 });
  }
}

// POST - Admin operations with authentication
export async function POST(request: NextRequest) {
  try {
    // SECURITY: Check for authorization header
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    // Only allow reset-daily action from authenticated cron
    const body = await request.json();
    const { action } = body;

    if (action === 'reset-daily') {
      if (authHeader !== `Bearer ${cronSecret}`) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized' },
          { status: 401 }
        );
      }

      const today = getTodayDateIST();
      
      // Reset today's unique count
      const { error } = await supabaseAdmin
        .from('visitor_stats')
        .update({
          unique_visits_today: 0,
          updated_at: new Date().toISOString()
        })
        .eq('date', today);

      if (error) {
        console.error('Error resetting daily count:', error);
        // SECURITY: Don't expose database error details to client
        return NextResponse.json(
          { success: false, error: 'Database operation failed' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Daily count reset successfully'
      });
    }

    if (action === 'get-stats') {
      const today = getTodayDateIST();
      
      const { data: statsData, error: statsError } = await supabaseAdmin
        .from('visitor_stats')
        .select('total_visits_all_time, unique_visits_today, date')
        .eq('date', today)
        .maybeSingle();

      if (statsError && statsError.code !== 'PGRST116') {
        // SECURITY: Don't expose database error details
        console.error('Error fetching stats:', statsError);
        return NextResponse.json(
          { success: false, error: 'Failed to retrieve stats' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        data: statsData || {
          total_visits_all_time: 0,
          unique_visits_today: 0,
          date: today
        }
      });
    }

    // SECURITY: Only allow whitelisted actions
    return NextResponse.json({
      success: false,
      error: 'Invalid request'
    }, { status: 400 });

  } catch (error) {
    console.error('Error in POST /api/visitors:', error);
    // SECURITY: Don't expose error details
    return NextResponse.json({
      success: false,
      error: 'Request processing failed'
    }, { status: 500 });
  }
}
