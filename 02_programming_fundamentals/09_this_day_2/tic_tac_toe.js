const readline = require("readline");

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const state = {
  a: Array(3).fill(null),
  b: Array(3).fill(null),
  c: Array(3).fill(null)
}

const players = {
  1: {
    name: "",
    token: "X"
    },
  2: {
    name: "",
    token: "O"
    }
}

let currentPlayer;

function renderCell(cell){
  if (cell === null){
    return " ";
  }
  return cell;
}

function renderRow(letter) {
  const cells = state[letter];
  const row = cells.map(renderCell).join(" | ");
  return ` ${letter} | ${row} |`;
}

function renderBoard(){
  const header = "\n     1   2   3 ";
  const lineBreak = "   |---|---|---|\n"
  const letters = Object.keys(state);
  const rows = letters.map(renderRow).join(`\n${lineBreak}`);
  return `${header}\n${lineBreak}${rows}\n${lineBreak}`;
}

function randomizeStarter(){
  //playTurn(players[Math.round(Math.random())]);
  if (Math.random() < 0.5){
    currentPlayer = players[1];
    playTurn ();
  } else {
    currentPlayer = players[2];
    playTurn();
  }
}

function askPlayerName(number){
  reader.question(`Who will be player ${number} > `, (nameInput) => {
    players[number].name = nameInput;
    console.log(`Hello ${players[number].name}, good luck!`);
    if(players[2].name === ""){
      askPlayerName(2);
    } else {
      console.log("OK, let's start");
      randomizeStarter();
    }

  });
}

function getCoordinate(input) {
  const letter = input[0];
  const digit = input[1] - 1;

  if (state[letter] && state[letter][digit] === null) {
    return { letter: letter, digit: digit };
  } else {
    return null;
  }
}

function updateState(coordinate) {
  const line = state[coordinate.letter];

  line[coordinate.digit] = currentPlayer.token;
}

function nextPlayer(){
  if (currentPlayer.token === "X"){
    currentPlayer = players[2];
  } else {
    currentPlayer = players[1];
  }
}

function testVictoryLine(line){
  if (line.filter(entry => entry === currentPlayer.token).length === 3){
    return true;
  }
  return false;
}

function testVictoryColumn(number){
  if(state.a[number] === state.b[number] && state.a[number] === state.c[number] && state.a[number] !== null){
    return true;
  }
  return false;
}

function testVictoryDiagonale(){
  if ((state.a[0] === state.b[1] && state.a[0] === state.c[2] && state.a[0] !== null) ||
      state.c[0] === state.b[1] && state.c[0] === state.a[2] && state.c[0] !== null){
        return true;
      }
  return false;
}

function testEnd(){
  if (testVictoryLine(state.a) || testVictoryLine(state.b) || testVictoryLine(state.c)){
    console.log(`Congratulations ${currentPlayer.name}: YOU WIN`);
    console.log(renderBoard());
    reader.close();
    return true;
  } else if (testVictoryColumn(0) || testVictoryColumn(1) || testVictoryColumn(2)){
    console.log(`Congratulations ${currentPlayer.name}: YOU WIN`);
    console.log(renderBoard());
    reader.close();
    return true;
  } else if (testVictoryDiagonale()){
    console.log(`Congratulations ${currentPlayer.name}: YOU WIN`);
    console.log(renderBoard());
    reader.close();
    return true;
  } else if (!state.a.concat(state.b).concat(state.c).includes(null)) {
    console.log(renderBoard());
    console.log("Draw. Game Over");
    reader.close();
    return true;
  }
  return false;
}

function handleInput(input) {
  const coordinate = getCoordinate(input);
  if (coordinate) {
    updateState(coordinate);
    if (!testEnd()){
      nextPlayer();
      playTurn();
    }
  } else {
    console.log("This is not a valid move");
  }
}

function playTurn(){
    console.log(renderBoard());
    reader.question(`What is your move ${currentPlayer.token}? e.g.: a1 > `, (input) => {
      handleInput(input)
    });
}

function start() {
  console.log("We are going to play a Tic Tac Toe game.");
  askPlayerName(1);
}

start();
