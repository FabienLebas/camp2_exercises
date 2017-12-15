require("sepia");
const getWeatherFromText = require("./index");

test("Test with VCR", () => {
  expect.assertions(1);

  return getWeatherFromText("Decathlon Campus")
    .then(temperature => {
      expect(temperature).toBe(4);
    });
});
