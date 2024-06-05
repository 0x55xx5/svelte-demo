import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { supabaseAdminClient } from '$lib/services/supabaseAdmin';
import { User } from '$lib/models/User';
import { Session } from '$lib/models/Sessions';

/** @type {import('./$types').RequestHandler} */

export async function POST({ request }) {
  const formdata = await request.formData();
  const username = formdata.get('username');
  const password = formdata.get('password');
console.log("username", username);
  const { data, error } = await supabaseAdminClient.from<User>('users').select().match({ username: username, password: password });
  console.log(data[0]);
  if (error) {
    throw new Error(`login error - ${JSON.stringify(error, null, 2)}`);
  }
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
  const currentTimestamp = Date.now();
  const nextDayTimestamp = currentTimestamp + oneDay;
  const base64Timestamp = Buffer.from(nextDayTimestamp.toString()).toString('base64');

  const token = base64Timestamp.replaceAll('=','*') + "|" + data[0].id;
  

  //增加session to db
  const { data: newtokens } = await supabaseAdminClient.from<Session>('sessions').insert([{ user_id: data[0].id, session_id: token, exp: nextDayTimestamp }]).select();
  if (error) {
    throw new Error(`register error - ${JSON.stringify(error, null, 2)}`);
  }
  
  var o = ({ "status": "success", "sessionToken": token });
  return json(o);

}