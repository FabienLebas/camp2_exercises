const express = require("express");
const app = express();
const nunjucks = require("nunjucks");
const queries = require ("./queries.js");

nunjucks.configure("views", {
  autoescape: true,
  express: app
});

app.set("views", __dirname + "/views");
app.set("view engine", "njk");

app.use(express.static('./'));

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log("Server listening on port:" + port);
});

app.get("/", function(request, result) {
  queries.getCategories()
    .then(data => result.render("home", {categories: data}))
    ;
});

app.get("/categories/:param", function(request, result) {
  queries.getProducts(request.params.param)
    .then(data => result.render("categories", {
      products: data
    }))
    ;
});

app.get("/products/:param", function(request, result) {
  queries.getProductInfos(request.params.param)
    .then(data => result.render("products", {
      productInfos: data
    }))
    ;
});
