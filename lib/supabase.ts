import { createClient } from '@supabase/supabase-js';

// =====================================================
// Supabase Client Configuration for Next.js
// =====================================================
// IMPORTANT: Only NEXT_PUBLIC_* variables are accessible in browser
// These environment variables must be set in:
// - Local: .env.local file
// - Netlify: Site settings → Build & deploy → Environment

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate required environment variables
if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
}

if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
}

// Create Supabase client for client-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// =====================================================
// Server-side Admin Client (Optional)
// =====================================================
// For advanced server operations with unrestricted access
// Requires SUPABASE_SERVICE_ROLE_KEY (private, server-only)
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseAdmin = serviceRoleKey
  ? createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;
