# Quick Start - Supabase Setup Instructions

Follow these steps to complete the Supabase setup for visitor tracking.

## 1️⃣ Create Database Tables

Go to your Supabase Dashboard → SQL Editor → New Query and run this SQL:

```sql
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
```

## 2️⃣ Enable Row Level Security (RLS)

### For `visitor_logs` table:
1. Go to **Authentication** → **Policies**
2. Select `visitor_logs` table
3. Enable RLS (toggle on)
4. Click **New Policy** → **For insert with user context**
   - Policy editor mode: Recommended
   - Click **Create policy**

### For `visitor_ips` table:
1. Click **New Policy** → **For select with user context**
2. Click **Create policy**
3. Click **New Policy** → **For insert with user context**
4. Click **Create policy**

### For `visitor_stats` table:
1. Click **New Policy** → **For select with user context**
2. Click **Create policy**

## 3️⃣ Update Security Settings

In `.env.local`, replace the cron secret:

```bash
CRON_SECRET=<generate-random-secret>
```

Generate using:
```bash
# On Mac/Linux
openssl rand -base64 32

# Or with Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 4️⃣ Test the Setup

1. **Start the dev server:**
   ```bash
   pnpm dev
   ```

2. **Visit the app:**
   Open `http://localhost:3001` in your browser

3. **Check visitor badge:**
   - Look for floating badge in bottom-right corner
   - Should show total visits and today's unique visits

4. **Test cron endpoint:**
   ```bash
   curl -X POST http://localhost:3001/api/cron/reset-daily \
     -H "Authorization: Bearer your-cron-secret"
   ```

## 5️⃣ Set Up Daily Cron (Optional)

Once deployed to production, set up automated daily reset at 12:00 AM IST.

### For Vercel Deployment:

Create or update `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/reset-daily",
      "schedule": "30 18 * * *"
    }
  ]
}
```

Add to `functions` in `vercel.json`:
```json
{
  "CRON_SECRET": "your-cron-secret-value"
}
```

### For Other Hosting:

Use external cron service like:
- **EasyCron**: https://easycron.com
- **Cron-Job.org**: https://cron-job.org
- **AWS EventBridge**
- **Google Cloud Scheduler**

Set up with:
- **URL:** `https://your-domain.com/api/cron/reset-daily`
- **Method:** POST
- **Headers:** `Authorization: Bearer your-cron-secret`
- **Schedule:** `30 18 * * *` (12:00 AM IST = 18:30 UTC previous day)

## ✅ What Now Works

✅ Real-time visitor tracking by IP  
✅ Total visits counter (stored in database)  
✅ Unique visitors per day counter  
✅ Automatic daily reset at 12:00 AM IST  
✅ Floating visitor badge  
✅ Visitor counter in header  
✅ Complete visitor analytics database  

## 📊 View Your Data

In Supabase Dashboard → Table Editor:
- Check `visitor_logs` for all visits
- Check `visitor_ips` for unique daily visitors
- Check `visitor_stats` for daily summaries

## 🔄 Real-Time Updates

The app polls visitor data every 5 seconds automatically.
The counter updates in real-time as new visitors come!

---

**Need help?** Check `VISITOR_SETUP.md` for detailed setup guide.
