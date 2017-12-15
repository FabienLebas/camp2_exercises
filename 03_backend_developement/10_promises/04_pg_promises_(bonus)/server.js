const queries = require("./queries");

const express = require("express");
const app = express();

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server listening on port:" + port);
});

app.get("/", function (request, result) {
  result.send("Hello World!");
});

app.get(
  "/categories",
  function(request, result) {
    const table = request.originalUrl.slice(1);
    queries.getAllDataFromTable(table, result);
  }
);

app.get(
  "/brands",
  function(request, result) {
    const table = request.originalUrl.slice(1);
    queries.getAllDataFromTable(table, result);
  }
);

app.get(
  "/products",
  function(request, result) {
    const table = request.originalUrl.slice(1);
    queries.getAllDataFromTable(table, result);
  }
);

app.get(
  "/brands/:id",
  function(request, result){
    const table = request.originalUrl.slice(1);
    const id = request.params.id;
    queries.getDataOneElementBrands(id, table, result);
  }
);

app.get(
  "/products/:id",
  function(request, result){
    const table = request.originalUrl.slice(1);
    const id = request.params.id;
    queries.getDataOneElementProducts(id, table, result);
  }
);

app.get(
  "/categories/:id/products",
  function(request, result){
    const table = request.originalUrl.slice(1);
    const id = request.params.id;
    queries.getProductsFromACategory(id, table, result);
  }
);

app.get(
  "/categories/:id",
  function(request, result){
    const table = request.originalUrl.slice(1);
    const id = request.params.id;
    queries.getDataOneElementCategories(id, table, result);
  }
);
