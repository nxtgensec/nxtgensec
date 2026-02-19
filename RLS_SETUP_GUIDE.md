# How to Apply RLS Policies - Step by Step

**Status:** ✅ Fixed and Ready to Apply  
**Date:** February 19, 2026

---

## What is RLS?

**Row Level Security (RLS)** prevents unauthorized database access by:
- 🔒 Blocking anonymous users from reading visitor data
- ✅ Allowing backend (service_role key) to read/write data
- 🛡️ Protecting IP addresses and visitor information
- 📋 Making it **GDPR/CCPA compliant**

**Current Status:** ❌ NOT ENABLED (data is currently public)

---

## How to Enable RLS in Supabase

### Step 1: Open Supabase Dashboard
1. Go to https://app.supabase.com
2. Select your project (nxtgensec)

### Step 2: Navigate to SQL Editor
1. In the left sidebar, click **SQL Editor**
2. Click **New Query** (or the **+** button)

### Step 3: Copy the RLS Script
1. Go to your project folder: `/workspaces/nxtgensec/database/rls-policies.sql`
2. Copy the **entire contents**

### Step 4: Paste & Run in Supabase
1. Paste the SQL into the Supabase SQL Editor
2. Click the **Run** button (or press `Ctrl+Enter`)

### Step 5: Verify Success
You should see:
```
✅ Query executed successfully

ALTER TABLE ENABLE ROW LEVEL SECURITY
DROP POLICY
CREATE POLICY
... (multiple policy creations)
```

---

## Verification - Check RLS is Enabled

After running the SQL, verify RLS is active:

### In Supabase Dashboard:
1. Go to **Table Editor** (left sidebar)
2. Click on **visitor_logs** table
3. Look for a **🔒 lock icon** next to the table name - this means RLS is enabled

### Via SQL Query:
Run this in SQL Editor to confirm:
```sql
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('visitor_logs', 'visitor_ips', 'visitor_stats')
ORDER BY tablename;
```

Expected result:
```
| schemaname | tablename      | rowsecurity |
|------------|----------------|-------------|
| public     | visitor_ips    | true        |
| public     | visitor_logs   | true        |
| public     | visitor_stats  | true        |
```

All three should show `rowsecurity = true` ✅

---

## Testing RLS Works

### Test 1: Anonymous Access Should FAIL

In SQL Editor, try to query as an anonymous user:
```sql
SELECT * FROM public.visitor_logs LIMIT 1;
```

Expected: **ERROR** - Access denied ✅

### Test 2: Service Role Can Still Access

The backend API uses the service role key, so it will work fine.

Test from your application: Visit http://localhost:3003 and the visitor counter should still work ✅

---

## What Each Policy Does

| Policy | Effect | Who It Affects |
|--------|--------|---|
| `visitor_logs_deny_all` | Blocks anonymous access | Anon key users |
| `visitor_logs_insert_service_role` | Allows backend to save logs | API servers |
| `visitor_ips_deny_anonymous` | Blocks IP viewing | Anon key users |
| `visitor_ips_*_service_role` | Allows backend CRUD | API servers |
| `visitor_stats_deny_anonymous` | Blocks stat viewing | Anon key users |
| `visitor_stats_*_service_role` | Allows backend CRUD | API servers |

**Result:** Only the backend can access data. Anonymous users are completely blocked. ✅

---

## FAQ

### Q: Will this break my API?
**A:** No! The API uses `SUPABASE_SERVICE_ROLE_KEY` which bypasses RLS. Everything works normally. ✅

### Q: Can I undo this?
**A:** Yes, disable RLS by running:
```sql
ALTER TABLE public.visitor_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitor_ips DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitor_stats DISABLE ROW LEVEL SECURITY;
```

### Q: What if I get an error?
**A:** Common errors and fixes:

**Error: "viewer is not allowed to create policies"**
- Make sure you're logged in as the **project owner**, not a team member
- Use the admin account

**Error: "42809: ALTER action DISABLE ROW SECURITY..."** 
- This was a bug in the old SQL file - fixed now ✅
- Use the updated `rls-policies.sql`

**Error: "relation does not exist"**
- Make sure the tables exist first
- Run the schema creation: `database/schema.sql`

### Q: How do I check the policies?
**A:** In Supabase, go to **Authentication** → **Policies** to see all active RLS policies. 🔒

---

## Production Checklist

- [ ] RLS enabled on all 3 tables (visitor_logs, visitor_ips, visitor_stats)
- [ ] Verified with 🔒 lock icon in table editor
- [ ] Query filter shows only `rowsecurity = true`
- [ ] Tested: Anonymous users get "access denied"
- [ ] Tested: API still works (visitor counter increments)
- [ ] Documented policies in code comments

---

## What Gets Protected?

After RLS is enabled:

| Data | Before RLS | After RLS |
|------|-----------|-----------|
| Visitor IPs | ❌ Public | ✅ Private |
| User Agents | ❌ Public | ✅ Private |
| Timestamps | ❌ Public | ✅ Private |
| Visit Counts | ✅ Shown | ✅ Shown (via backend) |

---

## Next Steps

1. ✅ Apply RLS using the SQL file
2. ✅ Verify it's enabled (look for 🔒 icon)
3. 🔄 Deploy to production
4. 📋 Update Privacy Policy: "We protect visitor data with RLS"

---

## Support

**File Location:** `/workspaces/nxtgensec/database/rls-policies.sql`

**If something goes wrong:**
1. Check the error message in Supabase SQL Editor
2. Verify you're using the correct database/user
3. Check the table names match exactly (case-sensitive)
4. Try disabling and re-enabling RLS

---

**Status:** Ready to deploy 🚀

Last updated: February 19, 2026
