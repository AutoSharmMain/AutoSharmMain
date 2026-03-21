# Security Guide: Protecting Your Supabase Keys

## Critical: Never Leak Your Keys on GitHub

Your `.env.local` file is already in `.gitignore`, but here's why this matters and what to do:

---

## 🔐 What Gets Exposed and What Doesn't

### ❌ LEAKED (if committed to GitHub)

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
ADMIN_PASSWORD=my-super-secure-password
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

**Impact:**
- Anyone can access your database using these keys
- Service role key = full database access
- Admin password = they can access your private admin panel
- Attackers can delete all data or steal information

### ✅ SAFE (in source code)

```typescript
// This is fine in your code:
import { supabase } from "@/lib/supabase";

// This is fine in your code:
const { data } = await supabase
  .from("vehicles")
  .select("*");

// This is fine in your code:
const isAuthed = await verifyAdminSession();
```

Why? Because the actual key values are loaded at runtime from `.env.local` (which isn't in Git).

---

## 🚨 The Anon Key Is MEANT To Be Public

Yes, your `NEXT_PUBLIC_SUPABASE_ANON_KEY` is visible in the browser. This is by design:

### How GitHub Protects You

1. **`.env.local` is in `.gitignore`** - Never uploaded
2. **Your anon key has limited permissions** - Can only read, not write/delete
3. **Row Level Security (RLS)** - Extra layer of protection
4. **Session verification** - Admin operations require login

### Bad Setup (Vulnerable)

```typescript
// ❌ WRONG: Production secrets in code
const ADMIN_PASSWORD = "super-secret-123";

// ❌ WRONG: Service role key in frontend
const serviceRoleKey = "eyJhbGc...";
```

### Good Setup (Secure) - What We Have

```typescript
// ✅ RIGHT: Load from environment
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; // Server-side only
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Public, limited perms
```

---

## ✅ Verification Checklist

Run these commands to verify your setup is secure:

### 1. Check `.env.local` is ignored

```bash
git status | grep "\.env"
```

**Expected output:** (empty - no .env files listed)

### 2. Verify files aren't already committed

```bash
git log --all --full-history -- ".env*"
```

**Expected output:** (empty - no previous commits)

### 3. Check your code doesn't hardcode secrets

```bash
grep -r "SUPABASE_KEY\|SERVICE_ROLE\|ADMIN_PASSWORD" src/ --exclude-dir=node_modules
```

**Expected output:** (only `.env.example` shows these as placeholders)

---

## 🔄 If You Accidentally Committed Secrets

1. **Rotate ALL keys immediately:**
   ```bash
   # Supabase Dashboard → Settings → API → Regenerate Keys
   ```

2. **Remove from history:**
   ```bash
   # Hard reset (only if nothing pushed)
   git reset --hard HEAD~1

   # Or use BFG if already pushed
   bfg --replace-text passwords.txt
   ```

3. **Force push:**
   ```bash
   git push origin main --force
   ```

4. **Alert team and re-generate tokens**

---

## 🌐 How Different Environments Work

### Local Development (Your Computer)

```bash
# You have .env.local with real keys
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
ADMIN_PASSWORD=my-password
```

**Protection:** File is not versioned (in `.gitignore`)

### Staging/Testing (GitHub)

```bash
# GitHub sees no secrets because .env* is ignored
# You commit only your code
```

**Protection:** No secrets in repository

### Netlify Deployment

```bash
# You set env vars in Netlify dashboard for the app to use
```

**Protection:** Netlify is secure, keys not in repo

---

## 🛡️ What Our Row Level Security Does

Your database has these policies:

```sql
-- Vehicles table
CREATE POLICY "users can read" ON vehicles 
  FOR SELECT USING (true);
-- ✅ Anyone can read (good for catalog)

-- News table  
CREATE POLICY "users can read" ON news 
  FOR SELECT USING (true);
-- ✅ Anyone can read (good for news section)
```

**Missing policies for:**
- INSERT (create) - Requires admin!
- UPDATE (edit) - Requires admin!
- DELETE (remove) - Requires admin!

So even if someone gets your anon key, they can only read, not modify data.

---

## 🔑 Key Rotation Schedule

### Best Practice

- **Every 90 days:** Rotate anon key
- **Every time:** Developer leaves team
- **Immediately:** If exposed
- **Immediately:** After testing with production data

### How to Rotate

1. Generate new key in Supabase → Settings → API → Regenerate
2. Update `.env.local` locally
3. Update Netlify environment variables
4. Test everything works
5. Delete old key in Supabase

---

## 🚨 Common Mistakes to Avoid

### ❌ Mistake 1: Committing .env.local

```bash
# WRONG - this commits your secrets!
git add .
git commit -m "update env"
```

**Better:**
```bash
# Copy .env.example, fill with your secrets, but don't commit
cp .env.example .env.local
# Leave .env.local untouched (it's in .gitignore)
```

### ❌ Mistake 2: Using Service Role Key in Frontend

```typescript
// ❌ NEVER DO THIS
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  url,
  "eyJhbGc..." // ← This is a Service Role Key!
);
```

**Why it's bad:** Service role = full database access, bypasses RLS

**Better:**
```typescript
// ✅ USE ONLY ANON KEY
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
```

### ❌ Mistake 3: Logging Sensitive Data

```typescript
// ❌ NEVER DO THIS
console.log("API Key:", process.env.SUPABASE_ANON_KEY);
```

**Why it's bad:** Logs appear in production error tracking

**Better:**
```typescript
// ✅ Only log during development
if (process.env.NODE_ENV === "development") {
  console.log("Key loaded successfully");
}
```

### ❌ Mistake 4: Sharing Screenshots with Keys Visible

```bash
# ❌ NEVER screenshot an open .env.local
# ❌ NEVER paste credentials in Slack/Discord
# ❌ NEVER email deploy commands with keys
```

---

## 🔍 Monitoring and Alerts

### GitHub Secret Scanning

GitHub automatically scans for exposed secrets:

1. Go to your repo → Security → Secret scanning
2. If a secret is found, GitHub will:
   - Alert you immediately
   - Show you the commit
   - Recommend rotation

### Enable Push Protection

1. Go to repo Settings → Code security
2. Enable "Require secret scanning alerts to be resolved"
3. Prevents accidental commits of secrets

---

## 📋 Pre-Deployment Security Checklist

Before pushing or deploying:

- [ ] `.env.local` exists and is NOT staged for commit
- [ ] `.env*.local` is in `.gitignore`
- [ ] No secrets in source code (grep check)
- [ ] `NEXT_PUBLIC_*` variables are safe to expose
- [ ] Server secrets are backend-only
- [ ] Netlify env vars are set correctly
- [ ] Database has RLS policies enabled
- [ ] Admin authentication works
- [ ] Test commit without `.env.local`

---

## 🎓 Key Concepts Summary

| Term | What | Exposure | Risk |
|------|------|----------|------|
| `NEXT_PUBLIC_*` | Browser-safe | ✅ Visible in code | ⚠️ Limited by RLS |
| Anon Key | Read-only | ✅ Visible in browser | ✅ Safe (read-only) |
| Service Role | Full access | ❌ Server-only | 🔴 CRITICAL - never expose |
| Admin Password | Login cred | ❌ Server-only | 🔴 CRITICAL - never expose |
| `.env.local` | All secrets | ❌ Never versioned | ✅ Safe (in .gitignore) |

---

## Resources

- **Supabase Security:** https://supabase.com/docs/guides/platform/security/overview
- **Best Practices:** https://owasp.org/www-community/Sensitive_Data_Exposure
- **GitHub Secret Scanning:** https://docs.github.com/en/code-security/secret-scanning
- **Environment Variables:** https://12factor.net/config

## Questions?

If you're unsure about security, ask yourself:

1. **Does this go in `.env.local`?** → Don't commit it
2. **Is this `NEXT_PUBLIC_*`?** → It will be exposed
3. **Does this authenticate?** → Never expose it
4. **Is there RLS protection?** → Might be safer
5. **When in doubt?** → Treat it as secret

Stay secure! 🔒
