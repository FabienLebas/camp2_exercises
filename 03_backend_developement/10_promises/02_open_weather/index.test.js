const index = require("./index");

test("getCurrentWeatherByCityName should return a number > -273°C", () => {
  expect.assertions(1);

  return index.getCurrentWeatherByCityName("Paris", "fr")
    .then(temp => {
      expect(temp > -273).toBe(true);
    });
});

test("getCurrentWeatherByCoordinates should return a number > -273°C", () => {
  expect.assertions(1);

  return index.getCurrentWeatherByCoordinates(32.661343, 51.680374)
    .then(temp => {
      expect(temp > -273).toBe(true);
    });
});
