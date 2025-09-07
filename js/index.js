import * as colors from './colors.js';
import * as evaluate from './evaluator.js';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


const askQuestion = (question => {
  return new Promise(resolve =>{
    rl.question(question, answer =>{
      resolve(answer);
    })
  })
})


async function main(){
  let exp = await askQuestion("Type out your calculation: ");

  const evaluatedExpression = evaluate.getEvaulatedResult(exp);
  console.log(`Initial Expression: ${colors.FgMagenta} '${exp}'  ${colors.Reset}`);
  console.log(`Correct Answer: ${colors.FgGreen} ${evaluatedExpression} ${colors.Reset}`);
  main();
}


main();