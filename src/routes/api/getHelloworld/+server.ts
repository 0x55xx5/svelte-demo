import { json } from '@sveltejs/kit';
import { secret } from '$lib/services/secrets';
/** @type {import('./$types').RequestHandler} */

export  function GET() {
  console.log(process.env.NODE_ENV.trim() === 'dev');
  return  json(process.env.NODE_ENV.trim() );
}