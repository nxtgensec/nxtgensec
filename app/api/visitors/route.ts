import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { checkRateLimit } from '@/lib/rate-limit';
import { getClientIP, isValidIP } from '@/lib/ip-utils';
import { sanitizeUserAgent, sanitizeReferer, sanitizePagePath, validateAction } from '@/lib/sanitize';
import { addCORSHeaders, addSecurityHeaders, handleCORSPreflight } from '@/lib/cors';

// Helper to get today's date in IST
function getTodayDateIST(): string {
  const now = new Date();
  const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  return istTime.toISOString().split('T')[0];
}

// GET - Retrieve current visitor stats and track visit
export async function GET(request: NextRequest) {
  // Handle CORS preflight
  const corsPreflightResponse = handleCORSPreflight(request);
  if (corsPreflightResponse) {
    return corsPreflightResponse;
  }

  try {
    const ip = getClientIP(request);
    const today = getTodayDateIST();

    // Validate IP format
    if (!isValidIP(ip)) {
      const response = NextResponse.json({
        error: 'Could not determine IP address',
        totalVisits: 0,
        uniqueVisitsToday: 0
      }, { status: 400 });
      
      return addSecurityHeaders(addCORSHeaders(response, request.headers.get('origin')));
    }

    // SECURITY: Check rate limit (30 requests per 60 seconds per IP)
    const { allowed, remaining } = checkRateLimit(ip, '/api/visitors');
    if (!allowed) {
      const response = NextResponse.json(
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
      
      return addSecurityHeaders(addCORSHeaders(response, request.headers.get('origin')));
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

    // Log this visit with sanitized data
    const rawUserAgent = request.headers.get('user-agent') || '';
    const rawReferer = request.headers.get('referer') || '';
    const rawPagePath = new URL(request.url).pathname;
    
    const userAgent = sanitizeUserAgent(rawUserAgent);
    const referer = sanitizeReferer(rawReferer);
    const pagePath = sanitizePagePath(rawPagePath);
    
    const { error: logError } = await supabaseAdmin
      .from('visitor_logs')
      .insert([{
        ip_address: ip,
        user_agent: userAgent,
        referer: referer,
        page_path: pagePath
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

    const response = NextResponse.json({
      totalVisits: totalVisits + (isNewVisitorToday ? 1 : 0),
      uniqueVisitsToday: uniqueVisitsToday + (isNewVisitorToday ? 1 : 0),
      isNewVisitorToday,
      date: today
    });

    return addSecurityHeaders(addCORSHeaders(response, request.headers.get('origin')));

  } catch (error) {
    console.error('Error in GET /api/visitors:', error);
    // SECURITY: Don't expose error details to client
    const response = NextResponse.json({
      error: 'Failed to process visitor request',
      totalVisits: 0,
      uniqueVisitsToday: 0
    }, { status: 500 });
    
    return addSecurityHeaders(addCORSHeaders(response, request.headers.get('origin')));
  }
}

// POST - Admin operations with authentication
export async function POST(request: NextRequest) {
  // Handle CORS preflight
  const corsPreflightResponse = handleCORSPreflight(request);
  if (corsPreflightResponse) {
    return corsPreflightResponse;
  }

  try {
    // SECURITY: Check for authorization header
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    // Validate request body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      const response = NextResponse.json(
        { success: false, error: 'Invalid JSON' },
        { status: 400 }
      );
      return addSecurityHeaders(addCORSHeaders(response, request.headers.get('origin')));
    }

    // SECURITY: Validate action parameter
    if (typeof body !== 'object' || body === null) {
      const response = NextResponse.json(
        { success: false, error: 'Invalid request' },
        { status: 400 }
      );
      return addSecurityHeaders(addCORSHeaders(response, request.headers.get('origin')));
    }

    const bodyObj = body as Record<string, unknown>;
    const { action } = bodyObj;

    if (!validateAction(action)) {
      const response = NextResponse.json(
        { success: false, error: 'Invalid action' },
        { status: 400 }
      );
      return addSecurityHeaders(addCORSHeaders(response, request.headers.get('origin')));
    }

    if (action === 'reset-daily') {
      if (authHeader !== `Bearer ${cronSecret}`) {
        const response = NextResponse.json(
          { success: false, error: 'Unauthorized' },
          { status: 401 }
        );
        return addSecurityHeaders(addCORSHeaders(response, request.headers.get('origin')));
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
        const response = NextResponse.json(
          { success: false, error: 'Database operation failed' },
          { status: 500 }
        );
        return addSecurityHeaders(addCORSHeaders(response, request.headers.get('origin')));
      }

      const response = NextResponse.json({
        success: true,
        message: 'Daily count reset successfully'
      });
      return addSecurityHeaders(addCORSHeaders(response, request.headers.get('origin')));
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
        const response = NextResponse.json(
          { success: false, error: 'Failed to retrieve stats' },
          { status: 500 }
        );
        return addSecurityHeaders(addCORSHeaders(response, request.headers.get('origin')));
      }

      const response = NextResponse.json({
        success: true,
        data: statsData || {
          total_visits_all_time: 0,
          unique_visits_today: 0,
          date: today
        }
      });
      return addSecurityHeaders(addCORSHeaders(response, request.headers.get('origin')));
    }

    // SECURITY: Only allow whitelisted actions
    const response = NextResponse.json({
      success: false,
      error: 'Invalid request'
    }, { status: 400 });
    return addSecurityHeaders(addCORSHeaders(response, request.headers.get('origin')));

  } catch (error) {
    console.error('Error in POST /api/visitors:', error);
    // SECURITY: Don't expose error details
    const response = NextResponse.json({
      success: false,
      error: 'Request processing failed'
    }, { status: 500 });
    return addSecurityHeaders(addCORSHeaders(response, request.headers.get('origin')));
  }
}
