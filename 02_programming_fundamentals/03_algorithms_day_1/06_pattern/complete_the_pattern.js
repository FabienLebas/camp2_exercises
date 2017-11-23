// Modify this value to test with other values
const numberOfLine = 5;
// Your code here ⬇
let myResult = "";
let substract = 0;
for (let i=1; i<=numberOfLine; i++){
  let myLine = "";
  for (let j=0;j<numberOfLine - substract; j++){
    myLine += numberOfLine - j;
  }
  myLine += "\n";
  myResult += myLine;
  substract++;
}
console.log(myResult);
