//calculated expression in string
export function toCalculate(strInput) {
  //regex to find brackets
  const regexBrackets = /\((.+?)\)/g;

  //array of substring in brackets
  let substr = strInput.match(regexBrackets);
  let bracketsResult = [];
  if (!!substr) {
    for (let i = 0; i < substr.length; i++) {
      let brackets = substr[i];
      let bracketsSubstring = brackets.substring(1, brackets.length - 1);
      bracketsResult.push(toCalculateString(bracketsSubstring));
    }
  }
  let newStrInput = {
    str: strInput,
  };
  if (!!bracketsResult) {
    for (let i = 0; i < bracketsResult.length; i++) {
      newStrInput.str = newStrInput.str.replace(substr[i], bracketsResult[i]);
    }
  }
  //taking into account the negative values of the variables (2+-3 => 2-3)
  let correctInput = newStrInput.str.replace('+-', '-');
  return toCalculateString(correctInput);
}

//calculated simple string with  taking into account the priority of operations
function toCalculateString(expression) {
  // const regexDigit = /(\d+)|[(\D*)]/g;
  // const regexMulDiv = /(\*)|[(\/)]/g;
  const regexPlusMinus = /(\+)|[(\-)]/g;

  //array with digit
  // let arrFromStr = expression.match(regexDigit);

  //for plus/minus signs
  let arrPlusMinus = expression.match(regexPlusMinus);

  //for calculated expression in brackets and other number
  let calculatedExp = [];

  //to higlight expression with mul and div and other number
  let strWithoutMinusPlus = expression
    .replaceAll("-", " ")
    .replaceAll("+", " ");

  //  array of all  numbers and expression
  let arrExp = strWithoutMinusPlus.split(" ");
  arrExp = arrExp.filter(item => item.length > 0);

  // to calculate mul/div expression
  for (let i = 0; i < arrExp.length; i++) {
    if (arrExp[i].includes('/') || arrExp[i].includes('*')) {
      calculatedExp.push(toCalculateMulDiv(arrExp[i]));
    } else {
      calculatedExp[i] = arrExp[i];
    }
  }

  //variable for result
  let resultNumber = null;

  //array with calculated numbers
  if (arrExp.length !== 1) {
    resultNumber = +calculatedExp[0];

    //alternate number operations
    for (let i = 0, j = 1; i < calculatedExp.length; i++) {
      if (arrPlusMinus[i] === "+") {
        if (String(calculatedExp[j]).includes('%')) {
          let percent = calculatedExp[j].substring(0, calculatedExp[j].length - 1);
          resultNumber = resultNumber + ((resultNumber * +percent) / 100);
        } else {
          resultNumber += +calculatedExp[j];
        }
        j++;
      } else if (arrPlusMinus[i] === "-") {
        if (String(calculatedExp[j]).includes('%')) {
          let percent = calculatedExp[j].substring(0, calculatedExp[j].length - 1);
          resultNumber = resultNumber - ((resultNumber * +percent) / 100);
        } else {
          resultNumber -= +calculatedExp[j];
        }
        j++;
      }
    }
  } else {
    resultNumber = toCalculateMulDiv(arrExp[0]);
  }
  return resultNumber;
}

//calculate only division and multiply
function toCalculateMulDiv(littlestr) {
  const regexDigit = /(\d+)|[(\D*)]/g;
  let arrFromStr = littlestr.match(regexDigit);

  //variable for result
  let rez = arrFromStr[0];

  //alternate number operations
  for (let i = 1; i < arrFromStr.length; i++) {
    if (arrFromStr[i] === "/") {
      i += 1;
      rez = rez / +arrFromStr[i];
    } else if (arrFromStr[i] === "*") {
      i += 1;
      rez = rez * +arrFromStr[i];
    }
  }
  return rez;
}
