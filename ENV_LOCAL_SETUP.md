# Create Your Local .env.local File

**This file contains your Supabase credentials and admin password.**  
**NEVER commit this to GitHub - it's already in `.gitignore`**

---

## Quick Setup

1. **Copy this entire code block**
2. **Create a new file:** `.env.local` in your project root (same level as `package.json`)
3. **Paste the code**
4. **Fill in YOUR values** from Supabase
5. **Save the file**
6. **Restart dev server:** `npm run dev`

---

## Template (Copy Everything Below)

```bash
################################################################
# SUPABASE CONFIGURATION
# Get these from: https://supabase.com/dashboard
# Settings → API
################################################################

NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...


################################################################
# ADMIN AUTHENTICATION
# Choose your own password (used to login at /admin)
################################################################

ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-very-secure-password-here


################################################################
# OPTIONAL: Service Role (Server-side only)
# Only if you want advanced Supabase operations
# NEVER expose this to the browser!
################################################################

# SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## How to Get Your Keys

### 1. Go to Supabase Dashboard
https://supabase.com/dashboard

### 2. Select Your Project
(create one if you don't have one)

### 3. Navigate to Settings → API

### 4. Copy "Project URL"
- This is your `NEXT_PUBLIC_SUPABASE_URL`
- Example: `https://abc123def456.supabase.co`

### 5. Copy "Anon/Public Key" 
- This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Starts with `eyJ` (it's a JWT token)
- Long string (200+ characters)

### 6. Fill Your `.env.local`

```bash
NEXT_PUBLIC_SUPABASE_URL=https://abc123def456.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
ADMIN_USERNAME=admin
ADMIN_PASSWORD=MySecurePassword123!
```

---

## Verify It Works

### 1. Restart Dev Server

```bash
# Stop the server: Hold Ctrl+C
# Then restart:
npm run dev
```

### 2. Test Login

1. Open http://localhost:3000/admin
2. Login with:
   - Username: `admin`
   - Password: whatever you set in `.env.local`
3. Should show admin dashboard (not login error)

✅ If you see the dashboard, your `.env.local` is correct!
❌ If you see "Invalid username or password", check your spelling

---

## File Location

Your file should be here:

```
AutoSharm/
├── .env.local          ← Create this file HERE
├── .gitignore          ← Already has .env.local
├── package.json
├── app/
├── lib/
└── components/
```

**NOT** in any subdirectories.

---

## What Each Variable Does

| Variable | Meaning | Example |
|----------|---------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your database URL | `https://abc123.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public API key | `eyJhbGc...` (long JWT) |
| `ADMIN_USERNAME` | Login username | `admin` |
| `ADMIN_PASSWORD` | Login password | `MySecurePassword123!` |

---

## Security Notes

✅ **SAFE** - These will be in `.env.local`:
- SUPABASE_URL (it's just a URL)
- SUPABASE_ANON_KEY (it's public - limited permissions)
- ADMIN_USERNAME (just a username)
- ADMIN_PASSWORD (private, but local only)

✅ **PROTECTED** - `.env.local` is:
- In `.gitignore` (not committed to GitHub)
- On your machine only
- Will be added to Netlify separately

❌ **NEVER** commit `.env.local` or any `.env*` files

---

## Troubleshooting

### Problem: "Cannot find module 'next/navigation'"
**Solution:** Restart dev server after creating `.env.local`

### Problem: ".env.local is not working"
**Solution:**
1. Verify file is named exactly `.env.local` (not `.env` or `.envlocal`)
2. Verify file is in project root (same level as `package.json`)
3. Verify content is plain text (not Word document)
4. Restart dev server

### Problem: Login doesn't work with these credentials
**Solution:**
1. Double-check `ADMIN_PASSWORD` spelling in `.env.local`
2. Make sure you typed the same password when logging in
3. Try incognito/private browser mode (clears cookies)

### Problem: "Missing Supabase environment variables"
**Solution:**
1. Verify `.env.local` exists
2. Verify `NEXT_PUBLIC_SUPABASE_URL` is not empty
3. Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is not empty
4. Restart dev server

---

## Next Steps

Once `.env.local` is created and dev server is running:

1. ✅ Test login at http://localhost:3000/admin
2. ✅ Add a vehicle in admin panel
3. ✅ View it in catalog at http://localhost:3000/catalog
4. ✅ Edit and delete to test all functions

Then read `QUICK_START.md` for deployment steps.

---

## Pro Tips

### 1. Use Strong Admin Password
Don't use `password` or `admin123`. Use something like:
```
MyAutoSharm2024!Secure#Admin
```

### 2. Change Password Later
You can always edit `.env.local` and restart the server.

### 3. Multiple Devices
If testing on another computer, create `.env.local` on that device too.

### 4. Netlify Deployment
You'll add these same variables to Netlify dashboard later (Settings → Environment).

---

## Questions?

- **Can I share `.env.local`?** ❌ No - keep it secret!
- **What if my keys leak?** 🔴 Rotate immediately (see SECURITY_GUIDE.md)
- **Is my password stored in code?** ❌ No - only in `.env.local` (not versioned)
- **Can I use the same password everywhere?** ❌ Bad practice - use unique password

---

**You're ready to go!** Create that `.env.local` and start building! 🚀
