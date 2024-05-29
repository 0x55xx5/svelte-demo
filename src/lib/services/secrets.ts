export const secret = {
    demoappApiKey: <string>process.env['PRIVATE_DEMOAPP_API_KEY'],
    supabasePrivateKey: <string>process.env['PUBLIC_SUPABASE_ANON_KEY'],
    supabaseJWTSecret: <string>process.env['PRIVATE_SUPABASE_JWT_SECRET'],
    supabaseUrl: <string>process.env['PUBLIC_SUPABASE_URL']
}