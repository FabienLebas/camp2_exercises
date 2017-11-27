// Your task is to implement a function decodeMorse(morseCode), that would take the morse code as input and return a decoded human-readable string.
//
// For example:
//
// decodeMorse(".... . -.--   .--- ..- -.. .") === "HEY JUDE";

// Here is the array of each letter in morse code
const MORSE_CODE = {
  ".-": "A",
  "-...": "B",
  "-.-.": "C",
  "-..": "D",
  ".": "E",
  "..-.": "F",
  "--.": "G",
  "....": "H",
  "..": "I",
  ".---": "J",
  "-.-": "K",
  ".-..": "L",
  "--": "M",
  "-.": "N",
  "---": "O",
  ".--.": "P",
  "--.-": "Q",
  ".-.": "R",
  "...": "S",
  "-": "T",
  "..-": "U",
  "...-": "V",
  ".--": "W",
  "-..-": "X",
  "-.--": "Y",
  "--..": "Z",
  "-----": "0",
  ".----": "1",
  "..---": "2",
  "...--": "3",
  "....-": "4",
  ".....": "5",
  "-....": "6",
  "--...": "7",
  "---..": "8",
  "----.": "9"
};

function decodeMorse(morse) {
  // Your code here
  let myHumanSentence ="";
  let myMorseWord ="";
  for (let i=0; i<morse.length; i++){
    if(morse[i] === " "){
      if(morse[i-1] === " " && morse[i-2] === " "){
        myHumanSentence += " ";
      } else if(morse[i-1] !== " "){
        myHumanSentence += MORSE_CODE[myMorseWord];
        myMorseWord = "";
      }
    } else {
      myMorseWord += morse[i];
    }
  }
  myHumanSentence += MORSE_CODE[myMorseWord];
  return myHumanSentence;
}

console.log(decodeMorse(".   ----."));
// Do not remove last lines, it is for tests
// eslint-disable-next-line
module.exports = decodeMorse;
