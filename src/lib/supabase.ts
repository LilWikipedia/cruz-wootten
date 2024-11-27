import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl); // This will help us debug
console.log('Supabase Key exists:', !!supabaseKey); // Log if key exists without exposing it

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing environment variables: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set. Create a .env file in the root directory with these variables.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);