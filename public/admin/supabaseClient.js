/**
 * IMPORTANT instructions for setup:
 * 
 * Paste your Supabase Project URL and Anon Public Key below.
 * 
 * SUPABASE_URL: Found in your Supabase Dashboard under Settings > API > Project URL
 * SUPABASE_ANON_KEY: Found under Settings > API > Project API Keys (anon public)
 * 
 * Do NOT put your service_role key here because this runs entirely on the client side.
 * Ensure RLS (Row Level Security) is enabled on your `service_requests` table 
 * and a policy allows authenticated users to SELECT.
 */

const SUPABASE_URL = 'https://qpycdmlqfszpiatjnirz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFweWNkbWxxZnN6cGlhdGpuaXJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1OTUzOTIsImV4cCI6MjA4NzE3MTM5Mn0.twh76--fWrY0ajKeP98yFTOMT2SzxLKPdjbjN6eASmU';
// Initialize the Supabase client using CDN global
export const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
