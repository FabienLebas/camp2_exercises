const fetch = require("node-fetch");
const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log("Server listening on port:" + port);
});

function display(object){
  app.get("/", function (request, result) {
    result.json(object);
  });
}

function getProductInfos(callback){
  return fetch("https://decath-product-api.herokuapp.com/products/efe288cb-fb63-4b23-b8df-529f04b8b02b")
    .then((response) => response.json())
    .then((result) => callback(result));
}

getProductInfos(display);

module.exports = {
  getProductInfos: getProductInfos
};
