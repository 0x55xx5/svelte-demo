import { error } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { supabaseAdminClient } from '$lib/services/supabaseAdmin';

/** @type {import('./$types').RequestHandler} */

export async function GET({ url }) {
    //http://localhost:5173/api/search?q=${query}&filter=${filter}&sort=${sort}&page=${page}`
    const kw = (url.searchParams.get('q') ?? '');
    const genre = (url.searchParams.get('filter') ?? '');
    const sort = (url.searchParams.get('filter') ?? 'desc');
    const page = Number(url.searchParams.get('filter') ?? '');
    console.log("genre", genre);
    const { data, error } = await supabaseAdminClient.from('song').select().match({ genre: genre });//.or(`judul.ilike.${kw}`,`penyanyi.ilike.${kw}`);
 
    if (error) {
      throw new Error(`login error - ${JSON.stringify(error, null, 2)}`);
    }
   console.log("data__genre",data);
    return json(data);
}