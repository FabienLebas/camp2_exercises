// This function will clear the terminal when called
const clear = require("cli-clear");
const readline = require("readline");
const emojis = require("./emoji_database.js");

function getRandomArbitrary(min, max) { //entre min inclus et max exclus
  return Math.random() * (max - min) + min;
}

function initialize(number, nbLines){
  let myEmojis = [];
  for (let i = 1; i <= number; i++){
    myEmojis.push(emojis[i]);
    myEmojis.push(emojis[i]);
  }
  let cards = [];
  for (let j = 0; j < nbLines; j++){
    let myLine = [];
    for (let i = 0; i < number; i++){
      let random = Math.round(getRandomArbitrary(0, myEmojis.length - 1));
      myLine.push(myEmojis[random]);
      myEmojis.splice(random, 1);
    }
    cards.push(myLine);
  }
  return cards;
}

function initializeDisplay(number, nbLines){
  let cards = [];
  for (let j = 0; j < nbLines; j++){
    let myLine = [];
    for (let i = 0; i < number; i++){
      myLine.push("🀆");
    }
    cards.push(myLine);
  }
  return cards;
}

function testVictoire(array){
  let result = true;
  for( let i = 0; i< array.length; i++){
    if (array[i] === "🀆"){
      result = false;
      return "Try again";
    }
  }
  if (result){
    return "You win";
  }
}

function askCard(cards, cardsToDisplay, points, howManyCards){
  reader.question("Which 1st card? (A3 for line 1, card 3) > ", (card1) => {
    let myColumn1 = card1.slice(1,card1.length);
    let firstCard, secondCard;
    if(card1[0] === "A"){
      firstCard = cards[0][myColumn1-1];
    } else {//gérer si plus de 2 lignes
      firstCard = cards[1][myColumn1-1];
    }
    console.log(firstCard);
    reader.question("Which 2nd card? > ", (card2) => {
      let myColumn2 = card2.slice(1,card2.length);
      if(card2[0] === "A"){
        secondCard = cards[0][myColumn2-1];
      } else {//gérer si plus de 2 lignes
        secondCard = cards[1][myColumn2-1];
      }
      console.log(secondCard);
      if(firstCard === secondCard){
        let newPoints = points + 1;
        if(card1[0] === "A"){
          cardsToDisplay[0][myColumn1 - 1] = firstCard;
        } else {
          cardsToDisplay[1][myColumn1 -1] = firstCard;
        }
        if(card2[0] === "A"){
          cardsToDisplay[0][myColumn2 -1] = secondCard;
        } else {
          cardsToDisplay[1][myColumn2 - 1] = secondCard;
        }
        console.log(cardsToDisplay[0].join("   "));
        console.log(cardsToDisplay[1].join("   "));
        console.log(testVictoire(cardsToDisplay));
        if(newPoints === howManyCards){
          console.log("YOUHOU well done!");
          reader.close();
        } else {
          askCard(cards, cardsToDisplay, newPoints, howManyCards);
        }
      } else {
        askCard(cards, cardsToDisplay, points, howManyCards);
      }
    });
  });
}

function start(){
  reader.question("We are going to play Memory. How many pairs of symbols do you want? (between 2 and 11) ", (number) => {
    let howManyCards = parseInt(number, 10);
    console.log(`OK let's start with ${number} pairs, so ${number * 2} cards.`);
    let cards = initialize(howManyCards, 2);//rendre dynamique le nombre de lignes
    let cardsToDisplay = initializeDisplay(howManyCards, 2);
    console.log(cards[0].join("   "));//tricheur !
    console.log(cards[1].join("   "));//tricheur !
    console.log(cardsToDisplay[0].join("   "));
    console.log(cardsToDisplay[1].join("   "));
    let myCard;
    let points = 0;
    askCard(cards, cardsToDisplay, points, howManyCards);
  });
}

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

start();
