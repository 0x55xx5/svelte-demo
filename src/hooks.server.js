import  { Handle } from '@sveltejs/kit';

export const Handle = async ({ resolve, event }) => {
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
