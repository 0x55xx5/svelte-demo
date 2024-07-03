import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';


/** @type {import('./$types').RequestHandler} */

export async function POST({ request }) {
  const formdata = await request.json();
  console.log(formdata);
  const {  Token } = formdata;
  
  console.log("Token", Token);
  const data = ({"Md5Key": "650293972d38dc9c23704fbcaa40a5ed",
    "SettingKey": "9b358f663a33c6e8d9cbf029553c13fa"
  });
  /*const data = ({"Md5Key": "b8815bb80912972ee6a5cf132408472a",
    "SettingKey": "35a10c201a632a1b2e9d99dba47eee0b"
  });*/
  var o = ({ "StatusCode": 200, "Data": data });
  return json(o);
/*
{
    "StatusCode":200,
    "Data" : {
        "Md5Key" : "b744f9e8-a67d-432b-a0f5-865483daac0c","SettingKey" : "e19a7453-2c9d-4eac-bdca-01a5340b3494"
    }
}  */
}