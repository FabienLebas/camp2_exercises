const fetch = require("node-fetch");
const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log("Server listening on port:" + port);
});

function displayObject(object){
  app.get("/", function (request, result) {
    result.json(object);
  });
}

function displayText(text){
  app.get("/", function (request, result) {
    result.send(text);
  });
}

function getProductInfos(product_id){
  return fetch("https://decath-product-api.herokuapp.com/products/" + product_id)
    .then((response) => response.json())
    .then((result) => {
      displayObject(result);
      return result;
    })
    .catch((error) => {
      console.warn(error);
    });
}

getProductInfos("efe288cb-fb63-4b23-b8df-529f04b8b02b");

function getBrandFromProduct(product_id){
  return fetch("https://decath-product-api.herokuapp.com/products/" + product_id)
    .then(response => response.json())
    .then(object => object.brand_id)
    .then(brand_id => fetch("https://decath-product-api.herokuapp.com/brands/" + brand_id))
    .then(response => response.json())
    .then(object => object.title)
    .then(title => {
      displayText(title);
      return title;
    })
    .catch((error) => {
      console.warn(error);
    }); 
}

//getBrandFromProduct("efe288cb-fb63-4b23-b8df-529f04b8b02b");

module.exports = {
  getProductInfos: getProductInfos,
  getBrandFromProduct: getBrandFromProduct
};
