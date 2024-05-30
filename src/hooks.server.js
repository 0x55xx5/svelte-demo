import  { Handle } from '@sveltejs/kit';
/*
export const  handle :Handle = async ({ resolve, event }) => {
//跨域問題
//https://www.reddit.com/r/sveltejs/comments/196h2bs/comment/khybcc6/
  // Apply CORS header for API routes
  if (event.url.pathname.startsWith('/api')) {
    // Required for CORS to work
    if(event.request.method === 'POST') {
     //nothing
    }
    return new Response(null, {
        headers: {
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        }
      });
  }

  const response = await resolve(event);
  if (event.url.pathname.startsWith('/api')) {
        response.headers.append('Access-Control-Allow-Origin', `*`);
  }
  return response;
};
*/

//跨域問題
//https://allandeutsch.com/notes/sveltekit-cors
export const allowCORS = (async ({ event, resolve }) => {
    const corsHeaders = {
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,PATCH,DELETE',
        'Access-Control-Allow-Headers':
            'authorization, x-client-info, apikey, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    };
    // 1. If the request isn't for a public API, don't add CORS headers
    const url = new URL(event.request.url);
    if (!url.pathname.startsWith('/api'))
        return await resolve(event);

    // 2. for options requests, just return the cors headers immediately.
    // Calling `resolve(event)` without an OPTIONS handler will throw an error.
    // If that error isn't handled, the CORS headers won't be added.
    if (event.request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    // 3. For other request methods, let the sveltekit router resolve it, then add the CORS headers
    const response = await resolve(event);
    for (const [key, value] of Object.entries(corsHeaders)) {
        response.headers.set(key, value);
    }
    return response;
});