import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey)

// Only create the client if keys exist, otherwise export a dummy object
// This prevents the app from crashing entirely if env vars aren't set yet.
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!) 
  : { 
      from: () => ({ 
        select: () => ({ 
           eq: () => ({ 
             order: () => Promise.resolve({ data: null, error: null }),
             single: () => Promise.resolve({ data: null, error: null })
           }) 
        }) 
      }),
      supabaseUrl: null // Explicitly null to trigger fallback logic in components
    } as unknown as SupabaseClient
