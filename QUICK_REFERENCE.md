# ⚡ Visitor Tracking System - Quick Reference

## 🎯 What Was Built

A **complete, production-ready visitor tracking system** with:
- ✅ Real-time visitor counting
- ✅ Unique visitor tracking per day  
- ✅ Total cumulative visitor count
- ✅ Automatic daily reset at 12:00 AM IST
- ✅ Beautiful UI components (badge + counter)
- ✅ Supabase database integration
- ✅ Secure API endpoints

## 📁 Files Created/Modified

### New Files Created:
```
✅ .env.local                          # Environment variables
✅ lib/supabase.ts                    # Supabase client
✅ lib/hooks/useVisitorStats.ts       # React hook for stats
✅ app/api/visitors/route.ts          # Main visitor API
✅ app/api/cron/reset-daily/route.ts  # Daily reset endpoint
✅ database/schema.sql                # Database schema
✅ SUPABASE_QUICK_START.md            # Quick setup guide
✅ VISITOR_SETUP.md                   # Detailed guide
✅ IMPLEMENTATION_SUMMARY.md          # Complete summary
```

### Components Updated:
```
✅ components/visitor-counter.tsx     # Header counter
✅ components/visitor-badge.tsx       # Floating badge
```

## 🚀 3-Step Quick Start

### Step 1: Create Supabase Tables (5 minutes)
1. Go to https://app.supabase.com
2. Select your project
3. SQL Editor → New Query
4. Paste contents from `/database/schema.sql`
5. Click Run ✓

### Step 2: Update Security (2 minutes)
In `.env.local`, update:
```bash
CRON_SECRET=<generate-random-secret>
```

Generate with:
```bash
openssl rand -base64 32
```

### Step 3: Test (2 minutes)
```bash
pnpm dev
# Visit http://localhost:3001
# See floating badge show visitor counts!
```

## 📊 What Gets Tracked

| Data | Where | When |
|------|-------|------|
| **Visitor IP** | visitor_logs | Every visit |
| **Total Visits** | visitor_stats | Every visit |
| **Unique Today** | visitor_ips | Every visit |
| **Daily Reset** | visitor_stats | 12:00 AM IST |

## 🎨 UI Components

### Visitor Counter (Header)
```
👁️ 150 total | 👥 25 today
```
Real-time updates every 5 seconds

### Visitor Badge (Float Bottom-Right)
```
┌─────────────────────┐
│ 👁️ Total visits    │
│    150              │
│─────────────────────│
│ 👥 Today's unique   │
│    25               │
│ New visitor! 👋     │
└─────────────────────┘
```

## 🔗 API Endpoints

### Track Visitor
```
GET /api/visitors

Returns:
{
  "totalVisits": 150,
  "uniqueVisitsToday": 25,
  "isNewVisitorToday": true,
  "date": "2026-02-18"
}
```

### Daily Reset (Cron)
```
POST /api/cron/reset-daily
Header: Authorization: Bearer <CRON_SECRET>

Returns:
{
  "success": true,
  "data": {
    "date": "2026-02-18",
    "yesterdayUniqueCount": 25,
    "totalVisitsAllTime": 150
  }
}
```

## 🗄️ Database Tables

### visitor_stats
Daily aggregated data
```
date | total_visits_all_time | unique_visits_today
```

### visitor_ips
Unique IPs per day
```
ip_address | visit_date | first_visit_at | last_visit_at
```

### visitor_logs
Detailed visit logs
```
ip_address | visit_time | user_agent | referer | page_path
```

## ⚙️ Configuration

### Change Update Frequency
In `useVisitorStats(5000)` - 5000ms = 5 seconds
```tsx
// Update every 10 seconds
useVisitorStats(10000)
```

### Change Timezone
In both API route files, replace:
```typescript
'Asia/Kolkata'  // IST
```

With your timezone:
- UTC: 'UTC'
- EST: 'America/New_York'
- PST: 'America/Los_Angeles'
- GST: 'Asia/Dubai'

## 📋 Deployment Checklist

- [ ] Create Supabase tables (SQL script)
- [ ] Enable RLS in Supabase dashboard
- [ ] Update `CRON_SECRET` in `.env.local`
- [ ] Deploy to Vercel/hosting
- [ ] Set environment variables at hosting
- [ ] Configure cron scheduling
- [ ] Test visitor tracking live
- [ ] Verify data in Supabase dashboard

## 🛠️ Cron Job Setup (Production)

### Option A: Vercel
Add to `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/cron/reset-daily",
    "schedule": "30 18 * * *"
  }]
}
```

### Option B: External Service
Use EasyCron.com or Cron-job.org:
- **URL**: https://your-domain.com/api/cron/reset-daily
- **Schedule**: 30 18 * * * (12 AM IST)
- **Header**: Authorization: Bearer <CRON_SECRET>

## 📚 Documentation

| File | Purpose |
|------|---------|
| `SUPABASE_QUICK_START.md` | Quick setup (5 min read) |
| `VISITOR_SETUP.md` | Detailed setup (15 min read) |
| `IMPLEMENTATION_SUMMARY.md` | Complete overview |

## 🎓 How It Works

```
User visits site
    ↓
GET /api/visitors called
    ↓
Extract IP address
    ↓
Check if new IP today
    ↓
Log visit to database
Update unique count
    ↓
Return stats to component
    ↓
Component displays real-time counters
    ↓
Every 5 seconds: Refresh stats from DB
    ↓
Every 24hrs at 12 AM IST: 
Reset unique count & create new daily record
```

## 🔐 Security Notes

✅ IP-based tracking (not cookies)
✅ Cron endpoint protected with secret key
✅ Environment variables used for secrets
✅ Service role key for backend operations only
✅ Public key with limited access
✅ RLS ready for Supabase dashboard

## ❓ Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Stats not updating | Check browser console, verify .env.local |
| Cron not running | Test with correct CRON_SECRET header |
| Tables not found | Run SQL script in Supabase dashboard |
| IP not tracking | Check if x-forwarded-for header present |

## 💰 Cost (Free Tier)

✅ **Supabase Free Tier Includes:**
- 500MB database storage
- Unlimited reads/writes
- 50,000 monthly API calls
- Sufficient for small to medium websites

## 📈 Example Analytics

```sql
-- Total unique visitors this month
SELECT COUNT(DISTINCT ip_address) FROM visitor_ips 
WHERE visit_date >= DATE_TRUNC('month', CURRENT_DATE);

-- Traffic trend (last 7 days)
SELECT date, unique_visits_today 
FROM visitor_stats 
WHERE date >= CURRENT_DATE - 7
ORDER BY date;

-- Top referrers
SELECT referer, COUNT(*) as count 
FROM visitor_logs 
WHERE referer IS NOT NULL
GROUP BY referer
ORDER BY count DESC;
```

## 🎉 You're All Set!

Everything is ready to go. Just:
1. Create the tables in Supabase (copy/paste SQL)
2. Update CRON_SECRET
3. Done! 

The system will start tracking visitors automatically! 🚀

---

**Questions?** See the detailed docs in the project directory.
