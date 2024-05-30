import { json } from '@sveltejs/kit';
import { supabaseAdminClient } from '$lib/services/supabaseAdmin';


/** @type {import('./$types').RequestHandler} */


export async function GET({url})  {
  const pageNumber = Number(url.searchParams.get('page') ?? '0');
  //to do 分頁
  const {data, error} = await supabaseAdminClient.from('song').select();
  if( error ) {
      throw new Error(`loadProjects error - ${JSON.stringify(error,null,2)}`);
  }

  return json(data);
}