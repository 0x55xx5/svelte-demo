import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';


/** @type {import('./$types').RequestHandler} */

export async function POST({ request }) {
  const formdata = await request.json();
  console.log(formdata);
  const {  Token } = formdata;
  
  console.log("Token", Token);
  const data = ({"Md5Key": "af7427db9b2025b3688c3d11c0890fbb",
    "SettingKey": "4eace912c53d8f4095ab2a184230e2d4"
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