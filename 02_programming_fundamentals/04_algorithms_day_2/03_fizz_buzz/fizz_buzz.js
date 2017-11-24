/* Implement a fizzBuzz function as such: `fizzBuzz(list)`, where `list` is an array
   of positive integers, for example : `[1, 2, 3, 4, 5, 6]`.
   This function will return a new array where some values will have been modified:

   - if the number is divisible by 3: `Fizz`;
   - if the number is divisible by 5: `Buzz`;
   - if the number is divisible by 3 and 5 : `FizzBuzz`
   - otherwise, the value is preserved.
*/
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
const test = range(1,15);

function fizzBuzz(list) {
  let result = [];
  for (let i=0; i<list.length; i++){
    if (Number.isInteger(list[i]/3) && Number.isInteger(list[i]/5)){
      result.push("FizzBuzz");
    }  else if (Number.isInteger(list[i]/3)){
      result.push("Fizz");
    } else if (Number.isInteger(list[i]/5)){
      result.push("Buzz");
    } else {
      result.push(list[i]);}
  }
  return result;
}

console.log(fizzBuzz(test));

module.exports = fizzBuzz;
