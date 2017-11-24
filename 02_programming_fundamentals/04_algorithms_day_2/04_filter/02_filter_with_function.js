// filter takes an array of integer and a function of filtering
// such as filter([1, 2, 3, 4, 5], pickEvenNumbers) returns [2, 4]
const range = require("../01_range_function/01_range.js");
const test = range(1,5);

function filter(array, fn) {
  let result = [];
  for (let i=0; i<array.length; i++){
    if (fn(array[i])){
      result.push(array[i]);
    }
  }
  return result;
}

function pickEvenNumbers(number){
  return Number.isInteger(number/2);
}

console.log(filter(test, pickEvenNumbers));

// do not remove this line, it is for tests
module.exports = filter;
