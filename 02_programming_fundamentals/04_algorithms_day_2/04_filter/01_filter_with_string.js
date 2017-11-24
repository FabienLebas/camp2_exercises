// filter takes an array of integer and a string with either odd or even
// such as filter([1, 2, 3, 4, 5], 'even') returns [2, 4]
const range = require("../01_range_function/01_range.js");

const test = range(1,5);

function filter(array, str) {
  let result = [];
  if (array.length === 0){
    return result;
  } else if (str !== "even" && str !== "odd"){
    return array;
  } else{
    for (let i=0; i<array.length; i++){
      if (str === "even"){
        if (Number.isInteger(array[i]/2)){
          result.push(array[i]);
        }
      } else if (str === "odd"){
        if (!Number.isInteger(array[i]/2)){
          result.push(array[i]);
        }
      }
    }
    return result;
  }
}

console.log(filter(test));
// do not remove this line, it is for tests
module.exports = filter;
