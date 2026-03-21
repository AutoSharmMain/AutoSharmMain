# Quick Start: Supabase Setup (Step-by-Step)

## 📋 What You'll Do

1. Create Supabase project
2. Deploy database schema
3. Get your API keys
4. Configure environment variables
5. Test everything

**Estimated time:** 15 minutes

---

## Step 1: Create Supabase Project

### Option A: New Project

1. Go to https://supabase.com/dashboard
2. Sign up (free tier available)
3. Click "New Project"
4. Fill in:
   - **Name:** AutoSharm
   - **Region:** Choose closest to your users
   - **Password:** Create strong password
5. Click "Create new project" and wait (takes 1-2 minutes)

### Option B: Use Existing Project

If you already have a Supabase project, just note your Project URL and proceed to Step 2.

---

## Step 2: Deploy Database Schema

1. In Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Paste entire content from `SQL_SCHEMA.sql` (in your project root)
4. Click **"Run"** button
5. Wait for success message
6. Verify tables exist:
   - Go to **Databases** → **Tables**
   - You should see `vehicles` and `news` tables

✅ **Database is ready!**

---

## Step 3: Get Your API Keys

1. In Supabase dashboard, go to **Settings** (bottom left)
2. Click **"API"**
3. Copy these two values:

| Variable | Where | Example |
|----------|-------|---------|
| **Project URL** | Under "API" → "Project URL" | `https://xxxxx.supabase.co` |
| **Anon Key** | Under "Project API keys" → "anon public" | `eyJhbGc...` |

Keep these safe (don't share!).

---

## Step 4: Create `.env.local`

### In Your Project Root

Create a new file called `.env.local`:

```bash
# From Supabase Dashboard → Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...

# Choose your admin password (this is LOCAL only)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password-here
```

### Verify .gitignore

Check that `.env.local` is ignored:

```bash
# In VS Code terminal:
cat .gitignore | grep "\.env"
```

You should see: `.env*.local`

✅ **Your keys are protected!**

---

## Step 5: Restart Dev Server

```bash
# Stop current server (Ctrl+C)
# Then restart:
npm run dev
```

---

## Step 6: Test Locally

### Test 1: Catalog Page

1. Open http://localhost:3000/catalog
2. Page should load without errors
3. Should show "Loading vehicles..." briefly, then "No vehicles" (because we haven't added any yet)

✅ **Frontend works!**

### Test 2: Add-to-Cart Via Admin

1. Open URL: http://localhost:3000/admin
2. Login with:
   - Username: `admin`
   - Password: whatever you set in `.env.local`
3. Click **"Add Vehicle"**
4. Fill form (minimum required: name, category, price, status)
5. Click **"Add Vehicle"**
6. Vehicle should appear in the table
7. Go back to http://localhost:3000/catalog
8. Vehicle should show up in the catalog!

✅ **Database works!**

### Test 3: Edit and Delete

1. In admin (`/admin`), click edit ✏️ on a vehicle
2. Change something (e.g., name)
3. Click "Update Vehicle"
4. Change should reflect immediately
5. Click delete 🗑️ on a vehicle
6. Should ask for confirmation
7. After delete, should disappear from catalog

✅ **Admin panel works!**

---

## Step 7: Deploy to Netlify

### Add Environment Variables

1. Go to your Netlify site dashboard
2. Navigate to **Site Settings** → **Build & Deploy** → **Environment**
3. Click **"Edit variables"**
4. Add these 4 variables:

| Key | Value | Secret |
|-----|-------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase URL | ❌ No |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your anon key | ❌ No |
| `ADMIN_USERNAME` | admin | ✅ Yes |
| `ADMIN_PASSWORD` | Your password | ✅ Yes |

5. Click **Save**

### Trigger Deploy

```bash
# In your terminal:
git add .
git commit -m "Add Supabase integration"
git push origin main
```

Netlify will automatically deploy. Check the deploy log for errors.

✅ **Live site works!**

---

## 🎯 Quick Reference URLs

After deployment, bookmark these:

| Page | URL |
|------|-----|
| **Live Catalog** | https://yourdomain.com/catalog |
| **Admin Panel** | https://yourdomain.com/admin |
| **Supabase Dashboard** | https://supabase.com/dashboard |
| **This Guide** | `SUPABASE_IMPLEMENTATION.md` (in root) |

---

## 🐛 Troubleshooting

### Problem: "NEXT_PUBLIC_SUPABASE_URL is not defined"

**Solution:**
1. Verify `.env.local` exists in project root
2. Restart dev server: Stop (Ctrl+C) → `npm run dev`
3. Check spelling exactly: `NEXT_PUBLIC_SUPABASE_URL` (not `SUPABASE_URL`)

### Problem: Admin login doesn't work

**Solution:**
1. Check `.env.local` has `ADMIN_USERNAME` and `ADMIN_PASSWORD`
2. Make sure you're using exactly those credentials
3. Try incognito/private mode (clears cookies)

### Problem: Catalog shows "No vehicles" but you added some

**Solution:**
1. Verify database has rows: Supabase → Table Editor → `vehicles`
2. Check browser console (F12) for errors
3. Refresh the page (Ctrl+Shift+R for hard refresh)

### Problem: Getting CORS errors

**Solution:**
1. Go to Supabase → Settings → API → CORS
2. Add `https://yourdomain.com` and `http://localhost:3000`
3. Try again

---

## 📝 Common Fields Explained

When adding vehicles, here's what each field means:

| Field | Example | Notes |
|-------|---------|-------|
| **Name** | Toyota Camry | Vehicle model/name |
| **Category** | car | car / motorcycle / scooter |
| **Listing Type** | rent | rent or sale |
| **Price** | 50 | Numeric value only |
| **Currency** | USD | USD or EGP |
| **Rental Period** | day | Only for rentals (day/month) |
| **Status** | available | available / rented / sold |
| **Image URL** | https://... | Full URL to image |
| **Description** | 5 comfortable seats... | Marketing text |
| **Engine** | 2.0L 4-cyl | Engine specs |
| **Transmission** | Automatic | Vehicle transmission |
| **Fuel** | Petrol | Fuel type |
| **Year** | 2023 | Production year |

---

## ✅ Success Indicators

Once everything works, you should see:

- ✅ Local catalog loads vehicles from Supabase
- ✅ Admin can add vehicles via `/admin`
- ✅ New vehicles appear in catalog immediately
- ✅ Admin can edit and delete vehicles
- ✅ Prices show with correct currency (EGP or $)
- ✅ Rental period shows (day/month) for rentals
- ✅ Prices for sales don't show period

---

## 🚀 Next Features (Optional)

Once you're comfortable with the basics:

1. **Add image uploads** - Use Supabase Storage
2. **Real-time updates** - Auto-refresh catalog when data changes
3. **Customer inquiries** - Create inquiries table and form
4. **Analytics** - Track views and interest
5. **Booking system** - Add full rental management

---

## 📞 Need Help?

| Problem | Resource |
|---------|----------|
| SQL errors | `SUPABASE_ENV_SETUP.md` |
| Security questions | `SECURITY_GUIDE.md` |
| Full details | `SUPABASE_IMPLEMENTATION.md` |
| Supabase issues | https://supabase.com/docs |
| Next.js issues | https://nextjs.org/docs |

---

## ✨ Congratulations!

Your site now has:
- ✅ Real database (Supabase)
- ✅ Working admin panel (`/admin`)
- ✅ Live catalog with database sync
- ✅ Secure deployments
- ✅ Ready for production!

**What to do next:**
1. Add your first batch of vehicles
2. Test the booking flow
3. Set up customer inquiries
4. Go live to your users!

Happy renting! 🚗✨
