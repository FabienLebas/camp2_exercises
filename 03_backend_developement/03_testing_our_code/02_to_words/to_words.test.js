const toWords = require("./to_words");

test("toWords should work", () => {
  expect(toWords("Bonjour Fabien, à table! Vite !")).toEqual(["Bonjour","Fabien","à","table","Vite"]);
  expect(toWords("Bonjour Fabien; à table! Vite !")).toEqual(["Bonjour","Fabien","à","table","Vite"]);
});
