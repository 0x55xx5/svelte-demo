import { createClient } from '@supabase/supabase-js';
import { secret } from '$lib/services/secrets';


export const supabaseAdminClient = createClient(secret.supabaseUrl, secret.supabasePrivateKey);