import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { supabaseAdminClient } from '$lib/services/supabaseAdmin';
import { User } from '$lib/models/User';
import { Session } from '$lib/models/Sessions';
import pkg from '@supabase/supabase-js';
const {QueryResult, QueryData, QueryError} = pkg;
import { UserData } from '$lib/models/UserDatas';

export async function POST({ request }) {
  const t = await request.json();
  console.log(t);
  const {  session_id } = t;
  const token = session_id;
  if (token === null) {
    const result = ({ "status": "error", "description": "session expired ,relogin please~~" });
    return json(result);
  }
 const origToken=token.toString().replaceAll('*','=');
  const { data: nowSession, error: nowSessionError } = await supabaseAdminClient.from<Session>('sessions').select().match({ session_id: origToken.toString() }).select().order('exp', { ascending: false });
  if (nowSessionError) {
    throw new Error(`get session error - ${JSON.stringify(nowSessionError, null, 2)}`);
  }
 
  const encodeTimestemp = origToken.toString().split("|")[0];
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
  
  const uid = origToken.toString().split("|")[1];
 
  const sessionWithUsersQuery = await supabaseAdminClient
    .from('users')
    .select(`
    id,
    username,
    isadmin,
      sessions(session_id, exp)
    `)
    .match({ id: uid })
    .order('exp', {referencedTable:'sessions', ascending: false })
    .limit(1)
    .single();

   
  const { data: sessionForUser, error: userDataError } = await sessionWithUsersQuery as { data: UserData[], error: QueryError };
 
  if (userDataError) throw userDataError

  const userDataRe: UserData = sessionForUser
  

  const result = ({ "status": "success", "dataUser": userDataRe });
  return json(result);

}