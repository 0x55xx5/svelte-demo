import { json } from '@sveltejs/kit';
import { supabaseAdminClient } from '$lib/services/supabaseAdmin';
import { Company } from '$lib/models/Company';

/** @type {import('./$types').RequestHandler} */


export async function GET()  {
  const {data, error} = await supabaseAdminClient.from<Company>('company').select();
  if( error ) {
      throw new Error(`loadProjects error - ${JSON.stringify(error,null,2)}`);
  }
  data[0].name = 'test';
  console.log(data);
  return json(data);
}