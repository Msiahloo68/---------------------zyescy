import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Database } from './types';
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://rrjnyarzfdoxcjpltips.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyam55YXJ6ZmRveGNqcGx0aXBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3NDU2NDAsImV4cCI6MjA3NjMyMTY0MH0.Y31O0HUTpg3oSW8H3hTadhV7qJPXi2ecODbLOssXJFQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
