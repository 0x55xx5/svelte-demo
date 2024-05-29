import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */

export  function GET() {
   

  return new Response("hellow world");
}