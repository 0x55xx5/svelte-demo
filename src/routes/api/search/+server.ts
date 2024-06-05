
import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { supabaseAdminClient } from '$lib/services/supabaseAdmin';

/** @type {import('./$types').RequestHandler} */

export async function GET({ url }) {
  //http://localhost:5173/api/search?q=${query}&filter=${filter}&sort=${sort}&page=${page}`
  const kw = (url.searchParams.get('q') ?? '');
  let genre = (url.searchParams.get('filter') ?? '');
  const sort = (url.searchParams.get('filter') ?? 'desc');
  const page = Number(url.searchParams.get('filter') ?? '');
  console.log("genre", genre);
  console.log("kw", kw);
  console.log(genre.length);


  if (kw == null) {

    const { data, error } = await supabaseAdminClient
      .from('song')
      .select()
      .eq('genre', genre)

    if (error) {
      throw new Error(`login error - ${JSON.stringify(error, null, 2)}`);
    }
    console.log("data2__genre", data);
    return json(data);

  }
  if (genre === 'genre') {

    const { data, error } = await supabaseAdminClient
      .from('song')
      .select()
      .or(
        'judul.like.%' + kw + '%, penyanyi.like.%' + kw + '%'
      )

    if (error) {
      throw new Error(`login error - ${JSON.stringify(error, null, 2)}`);
    }
    console.log("data2__genre", data);
    return json(data);

  }
  else {
    const { data, error } = await supabaseAdminClient
      .from('song')
      .select()
      .eq('genre', genre)
      .or(
        'judul.like.%' + kw + '%, penyanyi.like.%' + kw + '%'
      )

    if (error) {
      throw new Error(`login error - ${JSON.stringify(error, null, 2)}`);
    }
    console.log("data__genre", data);
    return json(data);
  }

}