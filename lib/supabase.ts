import { createClient } from '@supabase/supabase-js';
import { createClient as createServiceClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

// Create the public client only if public env vars are present. This file is
// imported by both server and client bundles — avoid throwing during client
// build/runtime when server-only secrets are missing.
export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Server-only admin client factory. Do NOT call this from client code.
export function getSupabaseAdmin() {
  if (typeof window !== 'undefined') {
    throw new Error('getSupabaseAdmin must only be called on the server');
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL must be set on the server');
  }

  return createServiceClient(supabaseUrl, serviceKey);
}
