import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase credentials are missing in environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// For server-side operations with service role key
import { createClient as createServiceClient } from '@supabase/supabase-js';

export const supabaseAdmin = createServiceClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);
