import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */

export async function POST({ request }) {
    const t = await request.json();
    console.log(t);
    const { num1, num2, operator } = t;

    let result = '';

    switch (operator) {
        case '+':
            result = String(Number(num1) + Number(num2));
            break;
        case '-':
            result = String(Number(num1) - Number(num2));
            break;
        case '*':
            result = String(Number(num1) * Number(num2));
            break;
        case '/':
            result = String(Number(num1) / Number(num2));
            break;
        default:
            break;
    }

    // Update the display value
    let d = `${num1} ${operator} ${num2} = ${result}`;

    // Send a response indicating success
    var o = ({ success: true, result });
    return json(o);

}
/*
export async function POST({ request }) {
    const t= await request.json();
    console.log(t);
    const { num1, num2, operator } = t;

    let result = '';
  
    switch (operator) {
      case '+':
        result = String(Number(num1) + Number(num2));
        break;
      case '-':
        result = String(Number(num1) - Number(num2));
        break;
      case '*':
        result = String(Number(num1) * Number(num2));
        break;
      case '/':
        result = String(Number(num1) / Number(num2));
        break;
      default:
        break;
    }
  
    // Update the display value
    let d = `${num1} ${operator} ${num2} = ${result}`;
  
    // Send a response indicating success
   var o=({ success: true, result });
   return json(o);
   
}*/