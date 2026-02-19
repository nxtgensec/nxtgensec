-- ⚠️ DATABASE RESET SCRIPT - Clears all visitor data
-- Run this in Supabase SQL Editor to start from zero

-- Step 1: Delete all records from visitor tables
DELETE FROM visitor_logs;
DELETE FROM visitor_ips;
DELETE FROM visitor_stats;

-- Step 2: Reset sequences (IDs) to start from 1
ALTER SEQUENCE visitor_logs_id_seq RESTART WITH 1;
ALTER SEQUENCE visitor_ips_id_seq RESTART WITH 1;
ALTER SEQUENCE visitor_stats_id_seq RESTART WITH 1;

-- Step 3: Verify tables are empty
SELECT COUNT(*) as visitor_logs_count FROM visitor_logs;
SELECT COUNT(*) as visitor_ips_count FROM visitor_ips;
SELECT COUNT(*) as visitor_stats_count FROM visitor_stats;

-- Result: 0, 0, 0 (all empty - starting from zero!)
