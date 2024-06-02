import { json } from '@sveltejs/kit';
import { supabaseAdminClient } from '$lib/services/supabaseAdmin';


/** @type {import('./$types').RequestHandler} */


export async function GET({url})  {
 
  const {data, error} = await supabaseAdminClient.from('song').select('genre');
  if( error ) {
      throw new Error(`load genre error - ${JSON.stringify(error,null,2)}`);
  }

 const uni=new Set(data.map(v=>v.genre));
  const result = ({ "status": "success", "descrption": "album info", "data": Array.from(uni)});

  return json(result);
}