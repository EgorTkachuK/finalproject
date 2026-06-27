import { createClient } from '@supabase/supabase-js'

const VISIBLE_SUPABASE_URL = 'https://ejvryldebxwmoilyiqzw.supabase.co'
const VISIBLE_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqdnJ5bGRlYnh3bW9pbHlpcXp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxODk3OTAsImV4cCI6MjA5NTc2NTc5MH0.-leIA20_1e3w1ERWkmIp2k3mXIAPEZjCq-unselmtLU'


const SUPABASE_URL = VISIBLE_SUPABASE_URL || (import.meta.env.VITE_SUPABASE_URL as string)
const SUPABASE_ANON_KEY = VISIBLE_SUPABASE_ANON_KEY || (import.meta.env.VITE_SUPABASE_ANON_KEY as string)

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('Supabase keys are empty. Replace values in src/lib/supabase.ts or set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
}

export const supabase = createClient(SUPABASE_URL || '', SUPABASE_ANON_KEY || '')

export default supabase
