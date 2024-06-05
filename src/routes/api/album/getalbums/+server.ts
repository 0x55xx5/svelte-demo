import { json } from '@sveltejs/kit';
import { supabaseAdminClient } from '$lib/services/supabaseAdmin';
import { Album } from '$lib/models/Album';

export async  function GET({url}) {
  
  //to do 分頁
  const {data, error} = await supabaseAdminClient.from<Album>('album').select();
  if( error ) {
      throw new Error(`loadProjects error - ${JSON.stringify(error,null,2)}`);
  }
  return json(data);
}