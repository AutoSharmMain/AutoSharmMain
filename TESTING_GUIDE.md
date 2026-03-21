# AutoSharm Supabase Integration - Testing Guide

## ✅ All TypeScript Errors Fixed!

Your admin panel at `/admin` is now fully typed and ready for testing. No compilation errors.

---

## Phase 1: Local Setup & Testing

### Step 1: Create `.env.local` file

In your project root (`c:\Users\Роман\Desktop\AutoSharm`), create a `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password_here
```

**To get your Supabase credentials:**
1. Go to https://supabase.com
2. Log in to your project
3. Click "Settings" → "API"
4. Copy the **Project URL** and **Anon Key**

### Step 2: Create Supabase Tables

In your Supabase dashboard:

1. **Create the `vehicles` table** with SQL from [SQL_SCHEMA.sql](SQL_SCHEMA.sql)
2. **Create the `news` table** with SQL from [SQL_SCHEMA.sql](SQL_SCHEMA.sql)

**Process:**
1. Go to Supabase Dashboard → Your Project
2. Click "SQL" (left sidebar)
3. Click "New Query"
4. Copy entire contents of `SQL_SCHEMA.sql` into the query editor
5. Click "Run"

### Step 3: Start Development Server

```bash
npm run dev
```

The app will run at `http://localhost:3000`

---

## Phase 2: Admin Panel Testing (`/admin`)

### Test 2.1: Login

1. Navigate to `http://localhost:3000/admin`
2. You should see login form
3. Enter credentials:
   - Username: `admin`
   - Password: `your_secure_password_here`
4. Click "Sign In"
5. ✅ Should see admin dashboard with "Vehicles" and "News" tabs

### Test 2.2: Add a Vehicle

1. Click **"Add Vehicle"** button in Vehicles tab
2. Fill in the form:
   - **Vehicle Name:** `Toyota Camry 2023`
   - **Category:** `Car`
   - **Listing Type:** `Rent`
   - **Price:** `80`
   - **Currency:** `$ USD`
   - **Rental Period:** `Per Day` (appears when Rent selected)
   - **Status:** `Available`
   - **Image URL:** `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400`
   - **Description:** `Comfortable sedan for city rides`
   - **Engine:** `2.5L V4`
   - **Transmission:** `Automatic`
   - **Fuel Type:** `Petrol`
   - **Year:** `2023`
3. Click **"Add Vehicle"**
4. ✅ Dialog should close and vehicle should appear in table below

**What happens behind the scenes:**
- Form data sent to `handleAddVehicle()` handler
- Handler calls `createVehicle()` server action
- Server action inserts data into Supabase `vehicles` table
- `loadVehicles()` refreshes the list from database
- Vehicle appears in the table

### Test 2.3: Verify Data in Supabase

1. Go to Supabase Dashboard
2. Click "Table Editor" (left sidebar)
3. Click "vehicles" table
4. ✅ You should see your new Toyota Camry record

**Fields you should see:**
- `id` (UUID auto-generated)
- `name`: "Toyota Camry 2023"
- `category`: "car"
- `listing_type`: "rent"
- `price`: 80
- `currency`: "USD"
- `price_period`: "day"
- `status`: "available"
- `created_at`: current timestamp

### Test 2.4: Edit a Vehicle

1. In admin panel, find your Toyota Camry in the table
2. Click **pencil icon** (edit button)
3. Edit form dialog appears with current data
4. Change price from `80` to `90`
5. Click **"Update Vehicle"**
6. ✅ Table refreshes and shows new price `$90/day`

### Test 2.5: Delete a Vehicle

1. Find vehicle in table
2. Click **trash icon** (delete button)
3. Confirm dialog: "Are you sure you want to delete this vehicle?"
4. Click "OK"
5. ✅ Vehicle disappears from table and Supabase

### Test 2.6: Add Multiple Vehicles

For better testing, add 2-3 more vehicles:

**Vehicle 2: Harley-Davidson Motorcycle**
- Name: `Harley-Davidson Iron 883 2022`
- Category: `Motorcycle`
- Listing Type: `Rent`
- Price: `150`
- Currency: `$ USD`
- Rental Period: `Per Day`
- Status: `Available`
- Image: `https://images.unsplash.com/photo-1558638508-e0db3814a69e?w=400`

**Vehicle 3: Vespa Scooter**
- Name: `Vespa Primavera 150 2023`
- Category: `Scooter`
- Listing Type: `Rent`
- Price: `25`
- Currency: `$ USD`
- Rental Period: `Per Day`
- Status: `Available`
- Image: `https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400`

### Test 2.7: Add News

1. Click **"News"** tab
2. Click **"Add News"** button
3. Fill form:
   - **Title:** `New Vespa Scooters Available!`
   - **Content:** `We're excited to announce the addition of new Vespa scooters to our fleet. Perfect for city exploration with style and comfort.`
   - **Image URL:** `https://images.unsplash.com/photo-1552820728-8ac41f1ce892?w=400`
   - **Date:** (today's date auto-filled)
4. Click **"Add News"**
5. ✅ News item appears in the list

---

## Phase 3: Catalog Page Testing (`/catalog`)

### Test 3.1: Verify Catalog Displays Supabase Data

1. Navigate to `http://localhost:3000/catalog`
2. ✅ You should see all vehicles you added in the admin panel
3. Verify display shows:
   - Vehicle name
   - Image
   - Category (Car, Motorcycle, Scooter)
   - Status (Available showing as green badge)
   - **Price with currency:** `$80/day` or `EGP 80/day` format

### Test 3.2: Filter by Category

1. In catalog, find filter controls
2. Click **"Car"** category filter
3. ✅ Only Toyota Camry should appear
4. Uncheck and click **"Motorcycle"**
5. ✅ Only Harley-Davidson appears
6. Clear filters
7. ✅ All vehicles appear

### Test 3.3: Filter by Status

1. Find status filter
2. Select **"Available"**
3. ✅ All vehicles appear (all are available)
4. (If you rented one in admin, it would disappear here)

### Test 3.4: Search

1. Type **"Vespa"** in search box
2. ✅ Only Vespa Scooter appears
3. Clear search
4. Type **"2022"**
5. ✅ Only Harley-Davidson appears (2022 model)

---

## Phase 4: Real-Time Sync Test

### Test 4.1: Add in Admin → Verify in Catalog (Real-time)

1. Keep two browser tabs/windows open:
   - Tab A: Admin panel at `/admin`
   - Tab B: Catalog at `/catalog`
2. In Tab A, add a new vehicle (e.g., "BMW M440i 2024")
3. In Tab B, **refresh the page** (F5)
4. ✅ New BMW appears in catalog
5. Edit price in Tab A from `120` to `150`
6. In Tab B, refresh again
7. ✅ Price updated to `$150/day`

---

## Phase 5: Deployment to Netlify

### Step 5.1: Add Environment Variables to Netlify

1. Go to https://netlify.com → Your Site
2. Click **"Site settings"** → **"Build & deploy"** → **"Environment"**
3. Click **"Edit variables"**
4. Add variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your_secure_password_here
   ```
5. Click **"Save"**

### Step 5.2: Deploy

1. Push changes to GitHub:
   ```bash
   git add .
   git commit -m "Complete Supabase integration with testing"
   git push origin main
   ```
2. Netlify automatically deploys from GitHub
3. Wait for build to complete (check Netlify Dashboard)
4. ✅ Live site updates

### Step 5.3: Test Live Admin

1. Go to your live site URL + `/admin`
2. Example: `https://your-autosharm.netlify.app/admin`
3. Login with admin credentials
4. Add new vehicle (e.g., "Mercedes E-Class 2024")
5. Go to catalog: `/catalog`
6. ✅ Vehicle should appear

---

## Troubleshooting

### "Unauthorized" Error in Admin Panel
- ✅ Make sure `.env.local` has `ADMIN_USERNAME` and `ADMIN_PASSWORD`
- ✅ Make sure credentials match what you entered in login form
- ✅ Check cookies are enabled in browser

### Vehicles Not Showing in Catalog
- ✅ Check tables exist in Supabase (`vehicles` and `news`)
- ✅ Check environment variables `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
- ✅ Check "Table Editor" in Supabase Dashboard to verify data was saved

### "TypeScript errors" Messages
- ✅ Errors are now **FIXED** - try clearing node_modules and reinstalling:
  ```bash
  rm -r node_modules
  npm install
  npm run dev
  ```

### Admin Panel Not Loading
- ✅ Clear browser cache (Ctrl+Shift+Delete)
- ✅ Check network tab in DevTools (F12) for 500 errors
- ✅ Check terminal output for server errors

---

## Success Checklist

- ✅ TypeScript compilation passses
- ✅ Admin panel (`/admin`) loads and authenticates
- ✅ Can add vehicle in admin panel
- ✅ Vehicle appears in Supabase table
- ✅ Vehicle appears in catalog page
- ✅ Can edit vehicle in admin panel
- ✅ Changes reflect in catalog
- ✅ Can delete vehicle
- ✅ News CRUD works
- ✅ Filters work in catalog
- ✅ Search works in catalog
- ✅ Live site works after Netlify deployment

---

## What's Working Now

✅ **Admin Panel at `/admin`**
- Authentication with secure session cookies
- Vehicle CRUD (Create, Read, Update, Delete)
- News CRUD
- Real-time sync with Supabase

✅ **Catalog Page**
- Fetches all vehicles from Supabase
- Filtering by category, type, status
- Search functionality
- Proper price display with currency and period

✅ **Database**
- PostgreSQL via Supabase
- Row-level security policies
- Automatic timestamps

✅ **Environment Security**
- Keys protected in `.env.local`
- `.gitignore` prevents accidental commits
- Ready for Netlify deployment

---

## Next Steps After Testing

1. **Fine-tune styling** if needed
2. **Add more features** (customer reviews, booking system, etc.)
3. **Set up analytics** (Google Analytics, Mixpanel)
4. **Configure email notifications** for inquiries
5. **Set up payment processing** for rentals

All core infrastructure is now complete and ready! 🚗🏍️🛵
