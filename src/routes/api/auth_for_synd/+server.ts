import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import CryptoJS from 'crypto-js'

/** @type {import('./$types').RequestHandler} */

export async function POST({ request }) {
  const formdata = await request.json();
  console.log(formdata);
  const {  cipher } = formdata;
  
  //af7427db9b2025b3688c3d11c0890fbb ,setting 4eace912c53d8f4095ab2a184230e2d4 免转的
  console.log("cipher", cipher);
  const data = ({"Md5Key": "af7427db9b2025b3688c3d11c0890fbb",
    "SettingKey": "4eace912c53d8f4095ab2a184230e2d4"
  });

  let  content_md5 = CryptoJS.MD5(cipher+"af7427db9b2025b3688c3d11c0890fbb"+"4eace912c53d8f4095ab2a184230e2d4").toString(CryptoJS.enc.Hex).toLowerCase()
  var o = ({ "StatusCode": 200, "Data": {"sign":content_md5} });
  return json(o);
/*
{
    "StatusCode":200,
    "Data" : {
        "Md5Key" : "b744f9e8-a67d-432b-a0f5-865483daac0c","SettingKey" : "e19a7453-2c9d-4eac-bdca-01a5340b3494"
    }
}  */
}