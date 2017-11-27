// Your task is to create a function that will sort every number contained in a given array.
//
// For example:
//
// sort([24, 7, 9, 72, -8]) === [-8, 7, 9, 24, 72]
//
// Note: You should not use Array.sort()

function sort(unsortedArray) {
  // Your code here
  let result = [];
  for (let i=0; i<unsortedArray.length; i++){
    if (result.length === 0){
      result.push(unsortedArray[i]);
    } else if (unsortedArray[i] >= result[result.length -1]){
      result.push(unsortedArray[i]);
    }
    else {
      let j=0;
      while(unsortedArray[i] > result[j]){
        j++;
      }
      result.splice(j,0,unsortedArray[i]);
    }
  }
  return result;
}



// Do not remove last lines, it is for tests
// eslint-disable-next-line
module.exports = sort;
