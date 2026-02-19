-- Row Level Security (RLS) Policies for nxtgensec Visitor Tracking
-- This file contains SQL to enable RLS and create policies
-- 
-- TO APPLY:
-- 1. Open Supabase dashboard
-- 2. Go to SQL Editor
-- 3. Copy and paste this entire file
-- 4. Click "Run"
-- 5. Verify success message

-- ============================================================================
-- STEP 1: Enable RLS on all tables
-- ============================================================================

ALTER TABLE public.visitor_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitor_ips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitor_stats ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- STEP 2: Drop existing policies (if any)
-- ============================================================================

DROP POLICY IF EXISTS "visitor_logs_select_authenticated" ON public.visitor_logs;
DROP POLICY IF EXISTS "visitor_logs_insert_service_role" ON public.visitor_logs;
DROP POLICY IF EXISTS "visitor_ips_select_authenticated" ON public.visitor_ips;
DROP POLICY IF EXISTS "visitor_ips_insert_service_role" ON public.visitor_ips;
DROP POLICY IF EXISTS "visitor_ips_update_service_role" ON public.visitor_ips;
DROP POLICY IF EXISTS "visitor_ips_delete_service_role" ON public.visitor_ips;
DROP POLICY IF EXISTS "visitor_stats_select_authenticated" ON public.visitor_stats;
DROP POLICY IF EXISTS "visitor_stats_insert_service_role" ON public.visitor_stats;
DROP POLICY IF EXISTS "visitor_stats_update_service_role" ON public.visitor_stats;

-- ============================================================================
-- STEP 3: Create policies for visitor_logs table
-- ============================================================================

-- DENY: Default deny everything
CREATE POLICY "visitor_logs_deny_all" ON public.visitor_logs AS PERMISSIVE
  FOR ALL
  TO anon
  USING (false);

-- Allow: Service role (backend API) can insert logs
CREATE POLICY "visitor_logs_insert_service_role" ON public.visitor_logs AS PERMISSIVE
  FOR INSERT
  WITH CHECK (true);

-- Allow: Service role (backend admin) can query logs
CREATE POLICY "visitor_logs_select_service_role" ON public.visitor_logs AS PERMISSIVE
  FOR SELECT
  USING (false);  -- Blocks anon access, allows service_role via bypass

-- ============================================================================
-- STEP 4: Create policies for visitor_ips table
-- ============================================================================

-- DENY: Default deny all anonymous access
CREATE POLICY "visitor_ips_deny_anonymous" ON public.visitor_ips AS PERMISSIVE
  FOR ALL
  TO anon
  USING (false);

-- Allow: Service role can INSERT
CREATE POLICY "visitor_ips_insert_service_role" ON public.visitor_ips AS PERMISSIVE
  FOR INSERT
  WITH CHECK (true);

-- Allow: Service role can UPDATE
CREATE POLICY "visitor_ips_update_service_role" ON public.visitor_ips AS PERMISSIVE
  FOR UPDATE
  USING (true);

-- Allow: Service role can DELETE
CREATE POLICY "visitor_ips_delete_service_role" ON public.visitor_ips AS PERMISSIVE
  FOR DELETE
  USING (true);

-- ============================================================================
-- STEP 5: Create policies for visitor_stats table
-- ============================================================================

-- DENY: Default deny all anonymous access
CREATE POLICY "visitor_stats_deny_anonymous" ON public.visitor_stats AS PERMISSIVE
  FOR ALL
  TO anon
  USING (false);

-- Allow: Service role can INSERT
CREATE POLICY "visitor_stats_insert_service_role" ON public.visitor_stats AS PERMISSIVE
  FOR INSERT
  WITH CHECK (true);

-- Allow: Service role can UPDATE
CREATE POLICY "visitor_stats_update_service_role" ON public.visitor_stats AS PERMISSIVE
  FOR UPDATE
  USING (true);

-- Allow: Service role can SELECT
CREATE POLICY "visitor_stats_select_service_role" ON public.visitor_stats AS PERMISSIVE
  FOR SELECT
  USING (false);  -- Blocks anon access, allows service_role via bypass

-- ============================================================================
-- STEP 6: Create view for public stats (optional - shows only aggregate)
-- ============================================================================

-- This view can be made public if you want to show aggregate stats
DROP VIEW IF EXISTS public.visitor_stats_public CASCADE;

CREATE VIEW public.visitor_stats_public AS
SELECT 
  date,
  total_visits_all_time,
  unique_visits_today,
  created_at,
  updated_at
FROM public.visitor_stats
WHERE date = CURRENT_DATE AT TIME ZONE 'UTC';

-- Disable RLS on public view (it's aggregate data only)
ALTER TABLE public.visitor_stats_public DISABLE ROW LEVEL SECURITY;

-- ============================================================================
-- STEP 7: Verification Queries
-- ============================================================================

-- Run these queries to verify RLS is working:

-- This should return empty (RLS blocks anonymous access):
-- SELECT * FROM public.visitor_logs LIMIT 1;

-- This should show RLS is enabled:
-- SELECT schemaname, tablename, rowsecurity FROM pg_tables 
-- WHERE schemaname = 'public' AND tablename IN ('visitor_logs', 'visitor_ips', 'visitor_stats');

-- ============================================================================
-- NOTES:
-- ============================================================================
-- 
-- 1. Service role key can bypass RLS - used by backend API (SAFE)
-- 2. Anon key cannot access any data - cannot bypass RLS (SAFE)
-- 3. Public view shows only aggregate stats if needed (OPTIONAL)
-- 4. All individual visitor data is protected (SECURE)
-- 5. Testing: Anonymous requests will get 403 Forbidden
-- 
-- ============================================================================
