import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import CryptoJS from 'crypto-js'


/** @type {import('./$types').RequestHandler} */

export async function POST({ request }) {
  const jsondata = await request.json();
  console.log(jsondata);
  const {  token,cipher } = jsondata;
  
  
  console.log("Token", token);
  console.log("Cipher", cipher);
  const data = ({"Md5Key": "c555644584079d9b88946c1c9d867cd6",
    "SettingKey": "30c535eee29f932ef0e700d72078cb77"
  });
//650293972d38dc9c23704fbcaa40a5ed ,setting 9b358f663a33c6e8d9cbf029553c13fa 转账的

  let  content_md5 = CryptoJS.MD5(cipher+"650293972d38dc9c23704fbcaa40a5ed"+"9b358f663a33c6e8d9cbf029553c13fa").toString(CryptoJS.enc.Hex).toLowerCase()
/*  const data = ({"Md5Key": "5a19a34b3cdf06eae12eef34c6ca77ba",
    "SettingKey": "74edd0eebc9507bddc63e6a3ec821aa8"
  });//轉帳*/
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