"use strict";
import * as colors from './colors.js';

const validTokensArr = new Array('+', '-', '*', '/');

function tokenize(rawInput){
  const stringInput = String(rawInput);
  const length = stringInput.length;
  let tokens = new Array(length);

  for(let i = 0; i < length; i++){
    let char = stringInput[i];
    if(char == ' ')
      continue;

    if(!validTokensArr.includes(char) && isNaN(char) && char != '.'){
      console.log(`${colors.FgRed} Invalid Expression! ${colors.Reset}`);
      return null;
    }

    if(i !== length-1){
      let dotCount = 0;
      while((!isNaN(stringInput[i+1]) || stringInput[i+1] == '.') && !validTokensArr.includes(char)){
        char = char.concat(stringInput[i+1]);
        
        if(stringInput[i+1] == '.')
          dotCount++

        if(dotCount >= 2){
          console.log(`${colors.FgRed} Invalid Expression! ${colors.Reset}`);
          return null;
        }

        i++;
      }
    }

    tokens.push(char);
  }

  const start = tokens.findIndex(v => v !== "");
  const end = tokens.length - tokens.slice().reverse().findIndex(v => v !== "");
  let trimmedTokens = tokens.slice(start, end);
  trimmedTokens = Array.from(trimmedTokens); 
  trimmedTokens = trimmedTokens.filter(x => x !== undefined); 
  console.log(trimmedTokens);
  return trimmedTokens;
}

function multiplyAndDivide(tokens){
  let newArr = new Array(tokens.length);

  for(let i = 0; i < tokens.length; i++){
    let done = 0;
          if(tokens[i] == '*'){
            newArr.push((Number(tokens[i-1]) * Number(tokens[i+1])));
            newArr = Array.from(newArr); 
            newArr = newArr.filter(x => x !== undefined); 
            done++;
          }else if(tokens[i] == '/'){
            newArr.push((Number(tokens[i+1]) / Number(tokens[i+1])));
            newArr = Array.from(newArr); 
            newArr = newArr.filter(x => x !== undefined);   
            done++;
          }
            
          

    if(done > 0){
      for(let j = i-2; j >= 0; j--){
        newArr.unshift(tokens[j]);
      }

      while((i+2) < tokens.length){
        newArr.push(tokens[i+2]);
        i++;
      }
      break;
    }

  }

  console.log(newArr);
  return newArr;
}

function plusAndMinus(tokens){
  let newArr = new Array(tokens.length);

  for(let i = 0; i < tokens.length; i++){
    let done = 0;
          if(tokens[i] == '+'){
            newArr.push((Number(tokens[i-1]) + Number(tokens[i+1])));
            newArr = Array.from(newArr); 
            newArr = newArr.filter(x => x !== undefined); 
            done++;
          }else if(tokens[i] == '-'){
            newArr.push((Number(tokens[i-1]) - Number(tokens[i+1])));
            newArr = Array.from(newArr); 
            newArr = newArr.filter(x => x !== undefined);   
            done++;
          }

    if(done > 0){
      while((i+2) < tokens.length){
        newArr.push(tokens[i+2]);
        i++;
      }
      break;
    }

  }

  return newArr;
}

function giveAnswer(tokens){
  if(!Array.isArray(tokens)) tokens = [tokens];
  
  while(tokens.includes('*') || tokens.includes('/')){
    tokens = multiplyAndDivide(tokens);
  }

  console.log(`First Stage: ${tokens}`);

  while(tokens.includes('+') || tokens.includes('-')){
    tokens = plusAndMinus(tokens);
  }

  console.log(`Second Stage: ${tokens}`);


  return Number(tokens);
}

export function getEvaulatedResult(rawInput){
  const tokens = tokenize(rawInput);

  return giveAnswer(tokens);
}