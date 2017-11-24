// Create a function `double` which take an array of integer as parameter and return a new array with all values doubled.
// WARNING: You're not allowed to use `Array.map`!

// Your code here...
const range = require("../01_range_function/01_range.js");
const test = range(1,5);

function double(array){
  let result = [];
  for (let i=0;i<array.length; i++){
    result.push(array[i]*2);
  }
  return result;
}

console.log(double(test));
// Do not remove last lines, it is for tests
// eslint-disable-next-line
module.exports = double;
