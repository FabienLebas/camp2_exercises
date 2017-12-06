const greet = require("./greeting");

test("Greet shoud reply Hello name", () => {
  expect(greet("Fabien")).toBe("Hello FABIEN!");
  expect(greet(null).toBe("World"));
});
