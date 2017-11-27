// Create a function `isColorful(number)` that will return `true` if the given number is colorful
// or `false` if the given number is not colorful
//
// Example:
//
// isColorful(3245) # => true
// isColorful(10) # => false
//
// Note: Read Sparta exercises to have more details about what defines a colorful number

// Insert your code here ⇩
function findSubsequences(number, order){
  let result = [];
  if (number.toString().length === 1){
    result.push(number);
    return result;
  } else {
    for (let i=0; i + order <= number.toString().length; i++){
      result.push(number.toString().slice(i,i+order));
    }
    return result;
  }
}

function multiplyNumber(number){
  let result = 1;
  for (let i=0;i<number.toString().length; i++){
    result = result * number.toString()[i];
  }
  return result;
}

function multiplyArray(array){
  return array.map(multiplyNumber);
}

function doesArrayContainOnlyOne(array, number){
  let numberOfOccurences = 0;
  for (let i=0; i<array.length; i++){
    if(array[i] === number){
      numberOfOccurences++;
    }
  }
  return numberOfOccurences === 1;
}

function isColorful(number){
  let mySubsequences = [];
  for (let i = 1; i <= number.toString().length; i++){
    mySubsequences = mySubsequences.concat(findSubsequences(number,i));
  }
  const myTableResults = multiplyArray(mySubsequences);
  for (let i = 0; i < myTableResults.length; i++){
    if (!doesArrayContainOnlyOne(myTableResults, myTableResults[i])){
      console.log(myTableResults);
      return false;
    }
  }
  console.log(myTableResults);
  return true;
}


// Do not remove last lines, it is for tests
// eslint-disable-next-line
module.exports = isColorful;
