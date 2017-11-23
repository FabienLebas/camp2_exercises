// # The sea with some whirlpools (30 by 9)
// And to spice things up, add an X at the positions 25:2 and 7:9 and a 0 at the positions 6:4 and 18:7
//
// ```
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~X~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~0~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~0~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~X~~~~~~~~~~~~~~~~~~~~~~~
// ```
let firstLine = "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~";
let myLine = [];
for (let i=0; i<firstLine.length; i++){
  myLine.push(firstLine[i]);
}
for (let i=1; i<=9; i++){
  if(i===2){
    myLine[25-1]="X";
    console.log(myLine.join(""));
    myLine[25-1]="~";
  }else if (i===4){
    myLine[6-1]="0";
    console.log(myLine.join(""));
    myLine[6-1]="~";
  } else if(i===7){
    myLine[18-1]="0";
    console.log(myLine.join(""));
    myLine[18-1]="~";
  } else if (i===9){
    myLine[7-1]="X";
    console.log(myLine.join(""));
    myLine[7-1]="~";
  }else{
    console.log(myLine.join(""));
  }
}
