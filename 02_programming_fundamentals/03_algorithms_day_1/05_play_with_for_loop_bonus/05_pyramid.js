// ## A Pyramid of base 7
//
// ```
//    *
//   ***
//  *****
// *******
// ```
let myLine = [" "," "," ","*"];
console.log(myLine.join(""));
for (let i=1; i<=3; i++){
  myLine[3-i]="*";
  myLine[3+i]="*";
  console.log(myLine.join(""));
}
