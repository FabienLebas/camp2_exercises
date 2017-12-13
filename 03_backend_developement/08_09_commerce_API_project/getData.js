const request = require("request");
const { Pool } = require('pg');
const pool = new Pool();

function insertIntoCategories(values){
  pool.query(
    "INSERT INTO categories (id, decathlon_id, label) VALUES ($1::text, $2::integer, $3::text)",
    values,
    function(error, result) {
      if (error) {
        console.warn(error);
      }
    }
  );
}

function insertIntoBrands(values){
  pool.query(
    "INSERT INTO brands (id, title) VALUES ($1::text, $2::text)",
    values,
    function(error, result) {
      if (error) {
        console.warn(error);
      }
    }
  );
}

function insertIntoProducts(values){
  pool.query(
    "INSERT INTO products (id, decathlon_id, title, description, brand_id, min_price, max_price, crossed_price, percent_reduction, image_path, rating) VALUES ($1::text, $2::integer, $3::text, $4::text, $5::text, $6::float, $7::float, $8::float, $9::float, $10::text, $11::float)",
    values,
    function(error, result) {
      if (error) {
        console.warn(error);
      }
    }
  );
}

function getDataCategories(){
  request(
    {
      url: "https://decath-product-api.herokuapp.com/categories",
      method: "GET",
    },
    function(error, response, result) {
      if (error){
        console.warn(error);
      } else {
        const json = JSON.parse(result);
        json.forEach((object) => {
          insertIntoCategories([object.id, parseInt(object.decathlon_id, 10), object.label]);
        });
      }
    }
  );
}

function getDataBrands(){
  request(
    {
      url: "https://decath-product-api.herokuapp.com/brands",
      method: "GET",
    },
    function(error, response, result) {
      if (error){
        console.warn(error);
      } else {
        const json = JSON.parse(result);
        json.forEach((object) => {
          insertIntoBrands([object.id, object.title]);
        });
      }
    }
  );
}

function getDataProducts(){
  request(
    {
      url: "https://decath-product-api.herokuapp.com/products",
      method: "GET",
    },
    function(error, response, result) {
      if (error){
        console.warn(error);
      } else {
        const json = JSON.parse(result);
        json.forEach((object) => {
          insertIntoProducts([object.id, parseInt(object.decathlon_id, 10), object.title, object.description, object.brand_id, parseFloat(object.min_price), parseFloat(object.max_price), parseFloat(object.crossed_price), parseFloat(object.percent_reduction), object.image_path, parseFloat(object.rating)]);
        });
      }
    }
  );
}
//getDataProducts();


function getLengthAwaited(table){
  request(
    {
      url: "https://decath-product-api.herokuapp.com/" + table,
      method: "GET",
    },
    function(error, response, result) {
      if (error){
        console.warn(error);
      } else {
        const json = JSON.parse(result);
        console.log(json.length);
      }
    }
  );
}

getLengthAwaited("products");
