# Supabase Environment Variables Setup

## Overview
**NEVER commit your actual keys to GitHub!** This guide shows you how to securely use Supabase credentials.

## Why We Use `NEXT_PUBLIC_` for Frontend

In Next.js, there are two types of environment variables:

1. **`NEXT_PUBLIC_*`** - Exposed to the browser (public)
   - Visible in bundled code and browser console
   - **Use for:** API URLs, anon/public keys
   - Example: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

2. **Secret variables** - Server-side only (private)
   - Never exposed to browser
   - **Use for:** Service role keys, API secrets
   - Example: `SUPABASE_SERVICE_ROLE_KEY` (never use in frontend!)

## Environment Variables You Need

Create a `.env.local` file in your project root:

```bash
# Supabase Project URL (public - safe to expose)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co

# Supabase Anon Key (public - used for frontend queries)
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Admin Username and Password (server-side only)
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-admin-password

# Optional: Service Role Key (server-side only - DO NOT use in frontend)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## How to Get Your Keys

1. Go to [Supabase](https://supabase.com)
2. Create a new project or select an existing one
3. Navigate to **Settings → API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Security Best Practices

### ✅ DO:
- Store secrets in `.env.local` (which is in `.gitignore`)
- Use `NEXT_PUBLIC_` ONLY for public data
- Keep `.env.local` in `.gitignore`
- Rotate keys regularly
- Use Row Level Security (RLS) policies in Supabase

### ❌ DON'T:
- Commit `.env.local` or any `.env` files
- Use private keys (service role) in frontend code
- Share your keys or credentials
- Make the service role key public
- Use admin keys for client-side operations

## How It Works in the Code

### Frontend (Safe - Using Anon Key):
```typescript
// This is SAFE because the key is public
import { supabase } from '@/lib/supabase';

const { data } = await supabase
  .from('vehicles')
  .select('*');
```

### Server-Side Actions (Protected):
```typescript
// This is SAFE because it runs on the server
'use server';

import { supabase } from '@/lib/supabase';

// Verify session first
const isAuthed = await verifyAdminSession();
if (!isAuthed) throw new Error('Unauthorized');

// Perform admin operation
const { data } = await supabase
  .from('vehicles')
  .insert([...]);
```

## Row Level Security (RLS)

The SQL schema includes RLS policies:

```sql
-- Public can read vehicles and news
CREATE POLICY "Enable read access for all users" ON vehicles FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON news FOR SELECT USING (true);
```

This means:
- Anyone can READ vehicles (good for displaying catalog)
- Only authenticated admins can CREATE/UPDATE/DELETE (protected by session check in server actions)

## Testing Your Setup

Run this in your browser console to verify:

```javascript
// Should work (public URL and key are correct):
fetch('https://your-project-id.supabase.co/rest/v1/vehicles', {
  headers: {
    'apikey': 'your-anon-key',
    'Authorization': 'Bearer your-anon-key'
  }
})
```

## Netlify Deployment

1. Go to your Netlify site settings
2. Navigate to **Environment**
3. Add your variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`

**Important:** Only Netlify and you can see non-public variables!

## Troubleshooting

**Error: "Missing Supabase environment variables"**
- Check that `.env.local` exists in your project root
- Verify variable names are exactly correct
- Restart dev server after adding/changing env vars

**Error: "row level security" or "permission denied"**
- Check your RLS policies in Supabase
- Verify you're using the correct key (anon vs service role)
- Ensure admin session verification is working
