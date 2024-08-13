import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import CryptoJS from 'crypto-js'
import { setTimeout } from "timers/promises";


/** @type {import('./$types').RequestHandler} */

export async function POST({ request }) {
  await setTimeout(3*1000);
  const jsondata = await request.json();
  console.log(jsondata);
  const {  token,cipher } = jsondata;
  
  
  console.log("Token", token);
  console.log("Cipher", cipher);


//"f474eb661208f7718e34355c9368344b"+"46252cdfd48b760ccf547ce534f8acbe"
//dab14be8b36ac230f9b505f0fe6f8636  / d032ad4c1e2931b246f46556dfecd1c9 轉帳
  let  content_md5 = CryptoJS.MD5(cipher+"0f4a1eff1b41122b01e1383597d7f0b6"+"c7b47b04e6f3500ac5302c799d33ceeb").toString(CryptoJS.enc.Hex).toLowerCase()

  console.log("Return MD5", content_md5);
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