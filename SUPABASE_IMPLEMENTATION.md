# Supabase Integration - Complete Implementation Guide

## What's Been Set Up

Your AutoSharm rental website now has full Supabase integration with admin panel at `/admin`.

### File Structure

```
app/
├── admin/                          # Admin panel at /admin
│   ├── page.tsx                  # Admin Dashboard (Supabase-powered)
│   └── layout.tsx
├── admin/
│   ├── page.tsx                  # Admin panel with Supabase integration
│   ├── login.tsx
│   ├── actions.ts                # Authentication
│   └── db-actions.ts             # NEW: Supabase CRUD operations
└── catalog/
    └── page.tsx                  # Updated to use Supabase

lib/
├── supabase.ts                   # NEW: Supabase client setup
├── data.ts
├── store.tsx
└── utils.ts

SQL_SCHEMA.sql                     # NEW: Database schema
SUPABASE_ENV_SETUP.md             # NEW: Environment setup guide
.env.example                       # NEW: Environment template
```

---

## 1️⃣ Database Schema

### What's Included

Two tables with full support for your requirements:

#### **vehicles** table
- `id` (UUID) - Primary key
- `name` (VARCHAR) - Vehicle name
- `category` (VARCHAR) - car/motorcycle/scooter
- `listing_type` (VARCHAR) - rent/sale
- `price` (DECIMAL) - Numeric price
- `currency` (VARCHAR) - USD/EGP
- `price_period` (VARCHAR) - day/month (for rentals)
- `status` (VARCHAR) - available/rented/sold
- `characteristics` (JSONB) - Flexible spec storage
- `images` (TEXT[]) - Array of image URLs
- `reviews` (JSONB[]) - Array of review objects
- Plus: description, specs, featured status, view count, discounts, timestamps

#### **news** table
- `id` (UUID) - Primary key
- `title` (VARCHAR) - News title
- `content` (TEXT) - Full content
- `image` (VARCHAR) - News image URL
- `read_more_url` (VARCHAR) - External link
- `date` (TIMESTAMP) - Publication date
- `created_at`, `updated_at` - Automatic timestamps

### Deploy the Schema

1. Copy entire content from `SQL_SCHEMA.sql`
2. Go to [Supabase Dashboard](https://supabase.com)
3. Select your project → SQL Editor
4. Paste and run the SQL

---

## 2️⃣ Environment Variables

### Create `.env.local`

```bash
# From Supabase Dashboard → Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Admin panel credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
```

### Why These Names?

- `NEXT_PUBLIC_*` = Browser-safe (exposed in your frontend code)
- `ADMIN_*` = Server-only (never exposed)
- See `SUPABASE_ENV_SETUP.md` for detailed explanation

---

## 3️⃣ Supabase Client Setup

File: `lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

This client is used throughout your app for:
- Reading vehicles and news
- Frontend queries
- Real-time subscriptions (optional)

---

## 4️⃣ Admin Panel Functions

File: `app/admin/db-actions.ts`

All operations verify admin session **before** executing:

### Vehicle Operations

```typescript
// Create
await createVehicle({
  name: "Toyota Camry",
  category: "car",
  listingType: "rent",
  price: 50,
  currency: "USD",
  // ...
});

// Read
const result = await getVehicles();
if (result.success) console.log(result.data);

// Update
await updateVehicle(vehicleId, { status: "rented" });

// Delete
await deleteVehicle(vehicleId);
```

### News Operations

```typescript
// Create
await createNews({
  title: "New Vehicles Added",
  content: "We're excited to announce...",
  date: new Date().toISOString()
});

// Read, Update, Delete (same pattern as vehicles)
```

All functions:
- ✅ Check admin authentication
- ✅ Return `{ success, data/error }`
- ✅ Transform database format ↔ app format
- ✅ Handle errors gracefully

---

## 5️⃣ Admin Panel

URL: `https://yoursite.com/admin`

Features:
- 🔐 Secure login (session-based)
- 🚗 Vehicle management (CRUD)
- 📰 News management (CRUD)
- 📊 Real-time Supabase sync
- ✨ Gold theme matching your design

### Login

Default credentials:
```
Username: admin
Password: (whatever you set in .env)
```

Session expires after 8 hours.

---

## 6️⃣ Catalog Page (Updated)

File: `app/catalog/page.tsx`

**Before:** Used local React state
**After:** Fetches from Supabase on load

```typescript
// Loads vehicles from Supabase
const { data, error } = await supabase
  .from('vehicles')
  .select('*')
  .order('created_at', { ascending: false });
```

Features:
- 🔄 Real-time data from database
- 💰 Displays prices with currency (EGP/USD)
- ⏱️ Shows rental period (day/month)
- 🔍 Full filtering and search
- 📱 Responsive on all devices

### Price Display

```typescript
// Automatically formats based on database values
${vehicle.currency === "EGP" ? "EGP " : "$"}${vehicle.price}
${vehicle.listingType === "rent" ? `/${vehicle.rentalPeriod}` : ""}
// Output: "EGP 500/day" or "$50/day" or "$30000"
```

---

## 📋 Quick Start Checklist

- [ ] **1. Install dependencies**
  ```bash
  npm install @supabase/supabase-js
  ```

- [ ] **2. Create Supabase project**
  - Visit https://supabase.com
  - Create a new project or use existing one
  - Wait for it to initialize

- [ ] **3. Deploy database schema**
  - Copy content from `SQL_SCHEMA.sql`
  - Paste in Supabase SQL Editor
  - Run and verify

- [ ] **4. Get your keys**
  - Supabase Dashboard → Settings → API
  - Copy Project URL and Anon Key

- [ ] **5. Create `.env.local`**
  - Copy from `.env.example`
  - Paste your Supabase keys
  - Add admin username/password
  - **Make sure .env.local is in .gitignore!**

- [ ] **6. Restart dev server**
  ```bash
  npm run dev
  ```

- [ ] **7. Test it!**
  - Catalog: http://localhost:3000/catalog
  - Admin: http://localhost:3000/admin

---

## 🔒 Security Rules

Your database has Row Level Security (RLS) enabled:

```sql
-- Public can READ vehicles and news (for your catalog)
CREATE POLICY "Enable read access for all users" ON vehicles FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON news FOR SELECT USING (true);
```

This means:
- ✅ Anyone can view your catalog
- ✅ Only admins can add/edit/delete (enforced by session check)
- ✅ Keys can't leak and cause damage

---

## 🚀 Deploying to Netlify

### 1. Push to GitHub (if not already done)

```bash
git add .
git commit -m "Add Supabase integration"
git push origin main
```

### 2. Add Environment Variables to Netlify

1. Go to your site on [Netlify](https://netlify.com)
2. Site Settings → Build & Deploy → Environment
3. Add these variables:

| Key | Value | Sensitive |
|-----|-------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase URL | ❌ No |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your anon key | ❌ No |
| `ADMIN_USERNAME` | admin | ✅ Yes |
| `ADMIN_PASSWORD` | Your password | ✅ Yes |

### 3. Redeploy

- Netlify will automatically deploy when you next push to GitHub, OR
- Manually trigger a deploy from Netlify dashboard

---

## 📝 Data Format Reference

### Vehicle Object

```typescript
interface Vehicle {
  id: string;
  name: string;
  category: "car" | "motorcycle" | "scooter";
  listingType: "rent" | "sale";
  price: number;
  currency: "USD" | "EGP";
  rentalPeriod?: "day" | "month"; // Only for rentals
  status: "available" | "rented" | "sold";
  description: string;
  image: string;
  images?: string[];
  specs: {
    engine: string;
    transmission: string;
    fuel: string;
    year: number;
    // ... other specs
  };
  reviews?: VehicleReview[];
  // ... other fields
}
```

### NewsItem Object

```typescript
interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string; // ISO string
  image?: string;
  readMoreUrl?: string;
}
```

---

## 🐛 Troubleshooting

### "Missing Supabase environment variables"

**Solution:**
1. Verify `.env.local` exists in project root
2. Check spelling: `NEXT_PUBLIC_SUPABASE_URL` (not `SUPABASE_URL`)
3. Restart dev server: `npm run dev`

### Admin panel shows login loop

**Solution:**
1. Check browser cookies aren't being blocked
2. Verify `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `.env.local`
3. Try incognito/private mode

### Catalog page shows "No vehicles"

**Solution:**
1. Verify tables exist in Supabase: Settings → Databases
2. Check you ran the full SQL schema
3. Verify anon key has read permissions
4. Check browser console for errors: F12 → Console

### Prices display incorrectly

**Solution:**
1. Verify currency field is "USD" or "EGP" (exact spelling)
2. Verify price_period is "day" or "month" for rentals

---

## ✨ Next Steps

### Optional Enhancements

1. **Add Image Upload**
   - Use Supabase Storage
   - Replace image URLs with uploads

2. **Real-time Updates**
   - Subscribe to Supabase changes
   - Auto-refresh catalog when data changes

3. **Customer Inquiries**
   - Add inquiries table
   - Email notifications

4. **Analytics**
   - Track vehicle views
   - Customer interest metrics

5. **Payment Integration**
   - Add Stripe/PayPal
   - Booking system

---

## 📞 Support

- **Supabase Docs:** https://supabase.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **This Project:** Check SUPABASE_ENV_SETUP.md

## 🎉 You're All Set!

Your admin panel is now at `/admin` with full Supabase integration. Start adding vehicles and news!
