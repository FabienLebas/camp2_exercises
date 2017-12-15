const index = require("./index");

test("getProductInfos should return an object", () => {
  expect.assertions(1);

  return index.getProductInfos((object) => object)
    .then(result => {
      expect(result).toBeTruthy();
    });
});
