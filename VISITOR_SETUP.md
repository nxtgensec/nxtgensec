# Visitor Tracking System Setup Guide

This guide will help you complete the setup of the Supabase visitor tracking system.

## ✅ Completed Setup Steps

1. ✅ Installed `@supabase/supabase-js` package
2. ✅ Created environment variables in `.env.local`
3. ✅ Created Supabase client utility in `lib/supabase.ts`
4. ✅ Created visitor API endpoints in `app/api/visitors/route.ts`
5. ✅ Created visitor stats hook in `lib/hooks/useVisitorStats.ts`
6. ✅ Updated visitor components (badge & counter)
7. ✅ Created cron job endpoint in `app/api/cron/reset-daily/route.ts`

## 📋 Remaining Setup Steps

### Step 1: Create Database Schema in Supabase

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your project: `orfljyjepseycerizeeu`
3. Navigate to **SQL Editor** → **New Query**
4. Copy and paste the contents from `/database/schema.sql`
5. Click **Run** to create the tables

**Tables created:**
- `visitor_stats` - Daily statistics
- `visitor_ips` - Unique IP tracking per day
- `visitor_logs` - Detailed visit logs

### Step 2: Set Up Row Level Security (RLS) Policies

In the Supabase Dashboard:

1. Go to **Authentication** → **Policies**
2. For `visitor_logs` table:
   - Enable RLS
   - Add policy: "Allow public insert for visitor tracking"
   - Template: "Insert" with "For all users" → Save

3. For `visitor_ips` table:
   - Enable RLS
   - Add policy: "Allow public select for stats" → Save
   - Add policy: "Allow public insert for visitor tracking" → Save

4. For `visitor_stats` table:
   - Enable RLS
   - Add policy: "Allow public select for stats" → Save

### Step 3: Change Environment Variables (IMPORTANT!)

Update the `CRON_SECRET` in `.env.local` to a secure random string:

```bash
CRON_SECRET=your-super-secret-cron-key-change-this
```

Generate a secure key using:
```bash
openssl rand -base64 32
```

Or use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### Step 4: Set Up Daily Cron Job (Choose One)

#### Option A: Using Vercel Cron (Recommended if deployed on Vercel)

Add to `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/reset-daily",
      "schedule": "0 0 * * * UTC"
    }
  ]
}
```

Then convert to IST (UTC+5:30). For 12:00 AM IST = 6:30 PM previous day UTC:

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

#### Option B: Using External Cron Service (EasyCron, Cron-job.org, etc.)

1. Go to [easycron.com](https://easycron.com) or [cron-job.org](https://cron-job.org)
2. Create a new cron job with:
   - **URL:** `https://your-domain.com/api/cron/reset-daily`
   - **Schedule:** Daily at 12:00 AM IST (18:30 UTC previous day)
   - **Headers:** Add custom header:
     ```
     Authorization: Bearer <your-CRON_SECRET>
     ```

#### Option C: Manual Testing

Test the cron endpoint manually:

```bash
curl -X POST http://localhost:3001/api/cron/reset-daily \
  -H "Authorization: Bearer your-super-secret-cron-key-change-this"
```

## 📊 Database Schema Overview

### visitor_stats
- `id` - Primary key
- `date` - ISO date (unique per day)
- `total_visits_all_time` - Cumulative total
- `unique_visits_today` - Updated daily at 12:00 AM IST
- `created_at`, `updated_at` - Timestamps

### visitor_ips
- `ip_address` - Client IP
- `visit_date` - ISO date
- `first_visit_at` - First visit timestamp
- `last_visit_at` - Last visit timestamp
- `visit_count` - Number of visits that day

### visitor_logs
- `ip_address` - Client IP
- `visit_time` - Timestamp
- `user_agent` - Browser info
- `referer` - Referrer page
- `page_path` - Visited page path

## 🔧 API Endpoints

### Track Visitor (GET)
```
GET /api/visitors

Response:
{
  "totalVisits": 150,
  "uniqueVisitsToday": 25,
  "isNewVisitorToday": true,
  "date": "2026-02-18"
}
```

### Get Stats (POST)
```
POST /api/visitors
{
  "action": "get-stats"
}

Response:
{
  "success": true,
  "data": {
    "total_visits_all_time": 150,
    "unique_visits_today": 25,
    "date": "2026-02-18"
  }
}
```

### Daily Reset Cron (POST)
```
POST /api/cron/reset-daily
Headers: Authorization: Bearer <CRON_SECRET>

Response:
{
  "success": true,
  "message": "Daily reset completed successfully",
  "data": {
    "date": "2026-02-18",
    "yesterdayUniqueCount": 25,
    "totalVisitsAllTime": 150
  }
}
```

## 📱 Component Usage

### Visitor Counter (Header)
```tsx
import VisitorCounter from '@/components/visitor-counter'

// Shows: "150 total | 25 today"
<VisitorCounter />
```

### Visitor Badge (Fixed Bottom Right)
```tsx
import VisitorBadge from '@/components/visitor-badge'

// Shows detailed stats in floating badge
<VisitorBadge />
```

## 🔐 Security Notes

1. **API Keys:** Both public and service role keys are in `.env.local` - never commit this file to git
2. **RLS Policies:** Ensure proper row-level security is set up in Supabase
3. **Cron Secret:** Keep `CRON_SECRET` secure - use strong random value
4. **IP Privacy:** Consider anonymizing IPs for privacy compliance (GDPR)

## 🚀 Real-Time Updates

The visitor stats update in real-time with:
- **Polling interval:** 5 seconds (configurable)
- **Automatic tracking:** On every page visit
- **Live badge:** Shows real-time visitor counts

## ❓ Troubleshooting

### Stats not updating?
1. Check browser console for errors
2. Verify `.env.local` variables are correct
3. Ensure Supabase tables exist and have proper permissions

### Cron job not running?
1. Test endpoint manually with correct Authorization header
2. Verify `CRON_SECRET` in .env.local matches what you're sending
3. Check Supabase logs for database errors

### IP not being tracked?
1. Ensure `x-forwarded-for` header is properly forwarded by your hosting
2. Test localhost by manually inserting IP in database
3. Check if RLS policies allow insert operations

## 📈 Future Enhancements

- [ ] Add visitor analytics dashboard
- [ ] Track page-wise visitor data
- [ ] Add geographic information using IP geolocation
- [ ] Create detailed visitor behavior reports
- [ ] Add email notifications for daily stats
- [ ] Anonymize IP addresses for privacy

## 📞 Support

For issues with Supabase: https://supabase.com/docs
For Next.js API routes: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
