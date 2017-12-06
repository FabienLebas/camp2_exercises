const orangeTree = require("./03_orange_tree");

beforeEach(() => {
  orangeTree.seed();
});

test("Check tree starting state", () => {
  expect(orangeTree.alive).toBe(true);
  expect(orangeTree.height).toBe(0);
  expect(orangeTree.age).toBe(0);
  expect(orangeTree.oranges).toBe(0);
});

test("I should not be able to pick oranges before growing",() => {
  expect(orangeTree.pickAnOrange()).toBe(false);
});

test("I should be able to pick an orange when there are some", () => {
  orangeTree.oranges = 1;
  expect(orangeTree.pickAnOrange()).toBe(true);
});

test("I should not be able to pick 2 oranges when there is 1", () => {
  orangeTree.oranges = 1;
  expect(orangeTree.pickAnOrange()).toBe(true);
  expect(orangeTree.pickAnOrange()).toBe(false);
});

test("Seed should reset values", () => {
  orangeTree.alive = false;
  orangeTree.height = 1;
  orangeTree.age = 12;
  orangeTree.oranges = 10;
  orangeTree.seed();
  expect(orangeTree.alive === true &&
      orangeTree.height === 0 &&
      orangeTree.age === 0 &&
      orangeTree.oranges === 0).toBe(true);
});

test("ageOneYear just after birth", () => {
  orangeTree.ageOneYear();
  expect(orangeTree.age).toBe(1);
  expect(orangeTree.height).toBe(25);
  expect(orangeTree.oranges).toBe(0);
  expect(orangeTree.alive).toBe(true);
});

test("Test 4 years old", () =>{
  for(let i = 1; i <= 4; i++){
    orangeTree.ageOneYear();
  }
  expect(orangeTree.height).toBe(25 * 4);
  expect(orangeTree.oranges).toBe(0);
  expect(orangeTree.alive).toBe(true);
});

test("Test 5 years old", () =>{
  for(let i = 1; i <= 5; i++){
    orangeTree.ageOneYear();
  }
  expect(orangeTree.height).toBe(25 * 5);
  expect(orangeTree.oranges).toBe(10);
  expect(orangeTree.alive).toBe(true);
});

test("Test 8 years old", () =>{
  for(let i = 1; i <= 8; i++){
    orangeTree.ageOneYear();
  }
  expect(orangeTree.height).toBe(25 * 8);
  expect(orangeTree.oranges).toBe(10);
  expect(orangeTree.alive).toBe(true);
});

test("Test 10 years old", () =>{
  for(let i = 1; i <= 10; i++){
    orangeTree.ageOneYear();
  }
  expect(orangeTree.height).toBe(25 * 9 + 10);
  expect(orangeTree.oranges).toBe(20);
  expect(orangeTree.alive).toBe(true);
});

test("Test 20 years old", () =>{
  for(let i = 1; i <= 20; i++){
    orangeTree.ageOneYear();
  }
  expect(orangeTree.height).toBe(25 * 9 + 10 * 10);
  expect(orangeTree.oranges).toBe(5);
  expect(orangeTree.alive).toBe(true);
});

test("Test 40 years old", () =>{
  for(let i = 1; i <= 40; i++){
    orangeTree.ageOneYear();
  }
  expect(orangeTree.height).toBe(25 * 9 + 10 * 10);
  expect(orangeTree.oranges).toBe(0);
  expect(orangeTree.alive).toBe(true);
});

test("You should not die before 50, but you should before 100", () =>{
  for(let i = 1; i <= 50; i++){
    orangeTree.ageOneYear();
  }
  expect(orangeTree.alive).toBe(true);

  for(let i = 50; i <= 100; i++){
    orangeTree.ageOneYear();
  }
  expect(orangeTree.alive).toBe(false);
});
