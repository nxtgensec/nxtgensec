-- Create visitor_stats table
CREATE TABLE IF NOT EXISTS visitor_stats (
  id BIGSERIAL PRIMARY KEY,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  total_visits_all_time BIGINT NOT NULL DEFAULT 0,
  unique_visits_today INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  UNIQUE(date)
);

-- Create visitor_ips table to track unique IPs per day
CREATE TABLE IF NOT EXISTS visitor_ips (
  id BIGSERIAL PRIMARY KEY,
  ip_address VARCHAR(45) NOT NULL,
  visit_date DATE NOT NULL DEFAULT CURRENT_DATE,
  first_visit_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  last_visit_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  visit_count INT NOT NULL DEFAULT 1,
  UNIQUE(ip_address, visit_date)
);

-- Create visitor_logs table for detailed logging
CREATE TABLE IF NOT EXISTS visitor_logs (
  id BIGSERIAL PRIMARY KEY,
  ip_address VARCHAR(45) NOT NULL,
  visit_time TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  user_agent TEXT,
  referer TEXT,
  page_path VARCHAR(500)
);

-- Create indexes for better query performance
CREATE INDEX idx_visitor_ips_date ON visitor_ips(visit_date);
CREATE INDEX idx_visitor_ips_ip ON visitor_ips(ip_address);
CREATE INDEX idx_visitor_logs_ip ON visitor_logs(ip_address);
CREATE INDEX idx_visitor_logs_time ON visitor_logs(visit_time);
CREATE INDEX idx_visitor_stats_date ON visitor_stats(date);

-- Create a view for the daily summary
CREATE OR REPLACE VIEW visitor_summary AS
SELECT 
  vs.date,
  vs.total_visits_all_time,
  vs.unique_visits_today,
  (SELECT COUNT(DISTINCT ip_address) FROM visitor_ips WHERE visit_date = vs.date) as calculated_unique_ips
FROM visitor_stats vs
ORDER BY vs.date DESC
LIMIT 1;
