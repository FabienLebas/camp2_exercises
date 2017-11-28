const readline = require("readline");

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const targetNumber = Math.round(Math.random() * 100);
console.log("I have my number. Try to find it. I will help you. My number is between 0 and 100.");

function askANumber(){
  reader.question("What is your number? ", (number) => {
    if(parseInt(number,10) === targetNumber){
      console.log(`Youhou! Well done! The number I chose was ${targetNumber}. YOU WIN!`);
      reader.close();
    } else if(parseInt(number,10) <0 || parseInt(number,10) >100){
      console.log("Hum, hum... I said between 0 and 100");
      askANumber();
    } else if(parseInt(number,10) > targetNumber){
      console.log("Sorry, too high");
      askANumber();
    } else if(parseInt(number,10) < targetNumber){
      console.log("Sorry, too low");
      askANumber();
    }
  });
}

askANumber();
