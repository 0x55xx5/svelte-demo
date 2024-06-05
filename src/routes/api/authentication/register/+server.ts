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
  const email = formdata.get('email');
  const { data:user } = await supabaseAdminClient.from<User>('users').select().eq('username', username);
  console.log(user);
  if (user.length > 0) {
    const o = ({ "status": "user", "description": "Register error!" });
    return json(o);
  }

  const { data:newUsers, error } = await supabaseAdminClient.from<User>('users').insert([{ username, password, email, isadmin: false }]).select();
  if (error) {
    throw new Error(`register error - ${JSON.stringify(error, null, 2)}`);
  }

console.log(newUsers[0]);
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
  const currentTimestamp = Date.now();
  const nextDayTimestamp = currentTimestamp + oneDay;
  const base64Timestamp = Buffer.from(nextDayTimestamp.toString()).toString('base64');
 
 
  const token = base64Timestamp.replaceAll('=','*') + "|" + newUsers[0].id;

  console.log("get user data",token);

  //增加session to db
  const { data: newtokens } = await supabaseAdminClient.from<Session>('sessions').insert([{ user_id: newUsers[0].id, session_id: token, exp: nextDayTimestamp }]).select();
  if (error) {
    throw new Error(`register error - ${JSON.stringify(error, null, 2)}`);
  }
  const result = ({ "status": "success", "sessionToken": token });
 
  return json(result);

}