const index = require("./index");

test("getProductInfos should return an object", () => {
  expect.assertions(1);

  return index.getProductInfos("efe288cb-fb63-4b23-b8df-529f04b8b02b")
    .then(result => {
      expect(result).toBeTruthy();
    });
});

test("getBrandFromProduct should return a text", () => {
  expect.assertions(1);

  return index.getBrandFromProduct("efe288cb-fb63-4b23-b8df-529f04b8b02b")
    .then(result => {
      expect(result).toBeTruthy();
    });
});
