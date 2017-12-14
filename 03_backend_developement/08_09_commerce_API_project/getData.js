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
//getDataCategories();

function insertIntoJoinTable(values){
  pool.query(
    "INSERT INTO categories_products (category_id, product_id) VALUES ($1::text, $2::text)",
    values,
    function(error, result) {
      if (error) {
        console.warn(error);
      }
    }
  );
}

function getProductsFromACategory(category_id, index){
  request(
    {
      url: "https://decath-product-api.herokuapp.com/categories/" + category_id + "/products",
      method: "GET",
    },
    function(error, response, result) {
      if (error){
        console.warn("Error while importing " + category_id + error);
      } else {
        const json = JSON.parse(result);
        json.forEach((object) => {
          insertIntoJoinTable([category_id, object.id]);
        });
        getCategoriesArray(getProductsFromACategory, index + 1);

      }
    }
  );
}

function getCategoriesArray(callback, index){
  pool.query(
    "SELECT id FROM categories",
    function(error, result){
      if (error){
        console.warn(error);
      } else {
        const resultTable = result.rows.map((object) => object.id);
        console.log(`There are ${resultTable.length} categories`);
        if(index < resultTable.length){
          console.log(`I am launching index ${index}`);
          callback(resultTable[index], index);
        }
      }
    }
  );
}

getCategoriesArray(getProductsFromACategory, 0);

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

//getLengthAwaited("products");
