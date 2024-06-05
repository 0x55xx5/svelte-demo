import { json } from '@sveltejs/kit';
import { supabaseAdminClient } from '$lib/services/supabaseAdmin';


/** @type {import('./$types').RequestHandler} */


export async function GET({url})  {

  const sid = Number(url.searchParams.get('id') ?? '0');
  
  //to do 分頁

  //join table ALBUM AND SONG TABLE
  const {data, error} = await supabaseAdminClient.from('song').select('*, album(*)').eq('id',sid);
  if( error ) {
      throw new Error(`loadProjects error - ${JSON.stringify(error,null,2)}`);
  }
  const result = ({ "status": "success", "descrption": "song info", "data": data[0]});

  return json(result);
}