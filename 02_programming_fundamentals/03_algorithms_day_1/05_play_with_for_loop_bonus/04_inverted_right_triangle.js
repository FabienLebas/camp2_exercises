// ## Inverted Right triangle of size 5
//
// ```
// *****
//  ****
//   ***
//    **
//     *
// ```
for (let j = 5; j>0; j--){
  let myLine = "";
  for (let i = 0; i<j;i++){
    myLine += "*";
  }
  console.log(myLine);
}
