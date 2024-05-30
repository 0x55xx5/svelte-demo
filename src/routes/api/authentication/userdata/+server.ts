import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { supabaseAdminClient } from '$lib/services/supabaseAdmin';
import { User } from '$lib/models/User';
import { Session } from '$lib/models/Sessions';
import pkg from '@supabase/supabase-js';
const {QueryResult, QueryData, QueryError} = pkg;
import { UserData } from '$lib/models/UserData';

export async function POST({ request }) {
  const t = await request.json();
  console.log(t);
  const {  session_id } = t;
  const token = session_id;
  if (token == null) {
    const result = ({ "status": "error", "description": "session expired ,relogin please~~" });
    return json(result);
  }
 
  const { data: nowSession, error: nowSessionError } = await supabaseAdminClient.from<Session>('sessions').select().match({ session_id: token.toString() }).select().order('exp', { ascending: false });
  if (nowSessionError) {
    throw new Error(`get session error - ${JSON.stringify(nowSessionError, null, 2)}`);
  }
 
  const encodeTimestemp = token.toString().split("|")[0];
  const decodedTimestamp = Buffer.from(encodeTimestemp, 'base64').toString('utf-8');
  if (nowSession.length > 0) {
    
    if (decodedTimestamp != nowSession[0].exp) {
      //會話階段跟自資料庫過期時間不一致
      const result = ({ "status": "error", "description": "session expired ,relogin please~~1" });
      return json(result);
    }
    if (nowSession[0].exp < Date.now()) {
      //會話階段過期
      const result = ({ "status": "error", "description": "session expired ,relogin please~~2" });
      return json(result);
    }
  }
  else {
    const result = ({ "status": "error", "description": "session error ,relogin please~~3" });
    return json(result);
  }
  const uid = token.toString().split("|")[1];
  const sessionWithUsersQuery = await supabaseAdminClient.from<UserData>('sessions').select(`
  user_id,
  session_id,
  users (
    id,
    username,
    isadmin 
  )
`).match({ user_id: uid }).select().order('exp', { ascending: false }).limit(1);
  type UserData = QueryData<typeof sessionWithUsersQuery>
  
  const { data: sessionForUser, error: userDataError } = await sessionWithUsersQuery
  console.log(sessionForUser);
  if (userDataError) throw userDataError

  const userData: UserData = sessionForUser
 


  const result = ({ "status": "success", "dataUser": userData });

  return json(result);

}