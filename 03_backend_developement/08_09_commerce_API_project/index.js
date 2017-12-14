const PG = require("pg");
const express = require("express");
const app = express();

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server listening on port:" + port);
});

app.get("/", function (request, result) {
  result.send("Hello World!");
});

function getAllDataFromTable(table, result){
  const client = new PG.Client();
  client.connect();
  client.query(
    `SELECT * FROM ${table}`,
    function(error, resultQuery){
      if (error){
        console.warn("Query error:" + error);
      } else {
        result.send(resultQuery.rows);
        client.end();
      }
    }
  );
}

app.get(
  "/categories",
  function(request, result) {
    const table = request.originalUrl.slice(1);
    getAllDataFromTable(table, result);
  }
);

app.get(
  "/brands",
  function(request, result) {
    const table = request.originalUrl.slice(1);
    getAllDataFromTable(table, result);
  }
);

app.get(
  "/products",
  function(request, result) {
    const table = request.originalUrl.slice(1);
    getAllDataFromTable(table, result);
  }
);

function getDataOneElementBrands(id, table, result){
  const client = new PG.Client();
  client.connect();
  client.query(
    "SELECT * FROM brands WHERE id = $1::text",
    [id],
    function(error, resultQuery){
      if(error){
        console.warn("Query error: " + error);
      } else {
        result.send(resultQuery.rows);
        client.end();
      }
    }
  );
}

app.get(
  "/brands/:id",
  function(request, result){
    const table = request.originalUrl.slice(1);
    const id = request.params.id;
    getDataOneElementBrands(id, table, result);
  }
);

function getDataOneElementProducts(id, table, result){
  const client = new PG.Client();
  client.connect();
  client.query(
    "SELECT * FROM products WHERE id = $1::text",
    [id],
    function(error, resultQuery){
      if(error){
        console.warn("Query error: " + error);
      } else {
        result.send(resultQuery.rows);
        client.end();
      }
    }
  );
}

app.get(
  "/products/:id",
  function(request, result){
    const table = request.originalUrl.slice(1);
    const id = request.params.id;
    getDataOneElementProducts(id, table, result);
  }
);

app.get(
  "/categories/:id/products",
  function(request, result){
    const table = request.originalUrl.slice(1);
    const id = request.params.id;
    getProductsFromACategory(id, table, result);
  }
);

function getProductsFromACategory(category, table, result){
  const client = new PG.Client();
  client.connect();
  client.query(
    "SELECT products.id, products.decathlon_id, products.title, products.description, products.brand_id, products.min_price, products.max_price, products.crossed_price, products.percent_reduction, products.image_path, products.rating FROM products INNER JOIN categories_products ON (categories_products.product_id = products.id) INNER JOIN categories ON (categories.id = categories_products.category_id) WHERE categories.id = $1::text",
    [category],
    function(error, resultQuery){
      if(error){
        console.warn("Query error: " + error);
      } else {
        result.send(resultQuery.rows);
        client.end();
      }
    }
  );
}

function getDataOneElementCategories(id, table, result){
  const client = new PG.Client();
  client.connect();
  client.query(
    "SELECT * FROM categories WHERE id = $1::text",
    [id],
    function(error, resultQuery){
      if(error){
        console.warn("Query error: " + error);
      } else {
        result.send(resultQuery.rows);
        client.end();
      }
    }
  );
}

app.get(
  "/categories/:id",
  function(request, result){
    const table = request.originalUrl.slice(1);
    const id = request.params.id;
    getDataOneElementCategories(id, table, result);
  }
);




/*
function searchMoviesByTitle(title, callback) {
  const client = new PG.Client();
  client.connect();
  client.query(
    "SELECT * FROM movies WHERE title = $1::text",
    [title],
    function(error, resultQuery) {
      callback(resultQuery.rows);
      client.end();
    }
  );
}

app.get(
  "/movies/:title",
  function(request, result) {
    searchMoviesByTitle(
      request.params.title,
      function(movies) {
        result.json(movies);
      }
    );
  }
);
*/
