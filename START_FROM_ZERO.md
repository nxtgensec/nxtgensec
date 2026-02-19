# 🔄 Start From Zero - Reset Guide

## ✅ How to Reset Count to Zero and Start Fresh

### Step 1: Run Reset SQL in Supabase Dashboard

1. Go to: https://app.supabase.com
2. Select your project: `orfljyjepseycerizeeu`
3. Click: **SQL Editor** → **New Query**
4. Copy & paste from: `/database/reset-to-zero.sql`
5. Click: **Run**

**SQL Commands:**
```sql
DELETE FROM visitor_logs;
DELETE FROM visitor_ips;
DELETE FROM visitor_stats;

ALTER SEQUENCE visitor_logs_id_seq RESTART WITH 1;
ALTER SEQUENCE visitor_ips_id_seq RESTART WITH 1;
ALTER SEQUENCE visitor_stats_id_seq RESTART WITH 1;
```

### Step 2: Start Your App

```bash
cd /workspaces/nxtgensec
pnpm dev
```

### Step 3: Visit Website

Open: http://localhost:3002 (or whatever port)

**You'll see:**
```
👁️ 0 visitors
```

Then as you visit the page, it will increment:
```
👁️ 1
👁️ 2
👁️ 3
...
```

---

## 🔄 How Continuous Updates Work

The system **continuously fetches from database** every 5 seconds:

```
Every 5 seconds:
├─ Browser calls: fetch('/api/visitors')
├─ Backend counts from visitor_logs table
├─ Returns current total
└─ Display updates: 👁️ X
```

**Code Flow:**

```typescript
// lib/hooks/useVisitorStats.ts
export function useVisitorStats(refreshInterval: number = 5000) {
  useEffect(() => {
    const fetchVisitorStats = async () => {
      const response = await fetch('/api/visitors');
      const data = await response.json();
      setStats(data);  // ← Updates display
    };

    fetchVisitorStats();  // Initial fetch

    // Polling every 5 seconds
    const interval = setInterval(fetchVisitorStats, 5000);
    return () => clearInterval(interval);
  }, []);
}
```

---

## 📊 Real-Time Count Update Process

```
0s    → Page loads → API counts visits → Display: 👁️ 0

5s    → User refreshes page → New visit recorded
        → API counts: SELECT COUNT(*) FROM visitor_logs
        → Returns: 1
        → Display updates: 👁️ 1

10s   → Another visitor/refresh
        → API counts: SELECT COUNT(*) FROM visitor_logs
        → Returns: 2
        → Display updates: 👁️ 2

15s   → Continues polling...
```

---

## 🗄️ Database State (Fresh Start)

**Before Reset:**
```
visitor_logs:   150 records
visitor_ips:    45 records
visitor_stats:  25 records

Display: 👁️ 150
```

**After Reset (execute SQL):**
```
visitor_logs:   0 records
visitor_ips:    0 records
visitor_stats:  0 records

Display: 👁️ 0
```

**After 3 visits:**
```
visitor_logs:   3 records
visitor_ips:    3 records (assuming different IPs)
visitor_stats:  1 record (today's data)

Display: 👁️ 3
```

---

## 🎯 Database Queries Behind Updates

Every fetch does this query:

```sql
-- Count total visits (always fresh from DB)
SELECT COUNT(*) FROM visitor_logs;
```

No caching, no local state - **always from database**.

---

## ✅ Verification

After reset, check in Supabase:

1. **SQL Editor** → **New Query**
   ```sql
   SELECT COUNT(*) as total FROM visitor_logs;
   SELECT COUNT(*) as total FROM visitor_ips;
   SELECT COUNT(*) as total FROM visitor_stats;
   ```
   Should all return: `0`

2. **Table Editor** → Navigate to each table
   - Should be completely empty

3. **Website Display**
   ```
   👁️ 0 visitors
   ```

---

## 🚀 Start Fresh Workflow

```
1. Run reset SQL in Supabase ✅
2. Start dev server: pnpm dev ✅
3. Open website ✅
4. Display shows: 👁️ 0 ✅
5. Visit page → 👁️ 1 ✅
6. Refresh → 👁️ 2 ✅
7. Wait 5 seconds → auto-updates ✅
```

---

## 📝 Key Points

✅ **Continuous Updates:** Every 5 seconds
✅ **From Database:** Always fetches fresh count
✅ **Real-Time:** No caching, always accurate
✅ **Increment:** Each visitor/page load adds +1
✅ **Zero Reset:** SQL clears everything

---

## 🔧 If You Want Different Poll Interval

Edit `components/visitor-counter.tsx`:

```typescript
// Change from 5000ms (5 seconds) to something else
const { stats } = useVisitorStats(2000);  // Update every 2 seconds
const { stats } = useVisitorStats(10000); // Update every 10 seconds
```

---

**Ready to reset? Execute the SQL and start fresh! 🎉**
