// Write a function that takes two input parameters, and returns a new array with defaults values between the start
// number and the end number.
//
// This function should work in both ascending or descending order.

// Complete this function.
function range(start, end) {
  let result = [];
  if (start <= end){
    for(let i=0; i <= end-start; i++){
      result.push(start+i);
    }
  } else {
    for (let i=0; i<= start-end; i++){
      result.push(start-i);
    }
  }
  return result;
}

// Do not remove last lines, it is for tests
// eslint-disable-next-line
module.exports = range;
