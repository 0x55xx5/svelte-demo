import { json } from '@sveltejs/kit';
import { supabaseAdminClient } from '$lib/services/supabaseAdmin';

export async  function GET({url}) {
  const album_id = Number(url.searchParams.get('id') ?? '0');
  //to do 分頁
  const { data, error } = await supabaseAdminClient.from('album').select().match({ id: album_id });
  if( error ) {
      throw new Error(`loadProjects error - ${JSON.stringify(error,null,2)}`);
  }

  const result = ({ "status": "success", "descrption": "album info", "data": data});
 console.log(result);
  return json(result);
}