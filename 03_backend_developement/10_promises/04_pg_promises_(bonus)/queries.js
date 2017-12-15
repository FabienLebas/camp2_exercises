const PG = require("pg");

function getAllDataFromTable(table, result){
  const client = new PG.Client();
  client.connect();
  return client.query(`SELECT * FROM ${table}`)
    .then(resultQuery => {
      result.send(resultQuery.rows);
      client.end();
      return resultQuery.rows;
    })
    .catch(error => {
      console.warn(error);
      client.end();
    })
  ;
}

function getDataOneElementBrands(id, table, result){
  const client = new PG.Client();
  client.connect();
  return client.query("SELECT * FROM brands WHERE id = $1::text",[id])
    .then(resultQuery => {
      result.send(resultQuery.rows);
      client.end();
      return resultQuery.rows;
    })
    .catch(error => {
      console.warn(error);
      client.end();
    })
  ;
}

function getDataOneElementProducts(id, table, result){
  const client = new PG.Client();
  client.connect();
  return client.query("SELECT * FROM products WHERE id = $1::text",[id])
    .then(resultQuery => {
      result.send(resultQuery.rows);
      client.end();
      return resultQuery.rows;
    })
    .catch(error => {
      console.warn(error);
      client.end();
    })
  ;
}

function getProductsFromACategory(category, table, result){
  const client = new PG.Client();
  client.connect();
  client.query(
    "SELECT products.id, products.decathlon_id, products.title, products.description, products.brand_id, products.min_price, products.max_price, products.crossed_price, products.percent_reduction, products.image_path, products.rating FROM products INNER JOIN categories_products ON (categories_products.product_id = products.id) INNER JOIN categories ON (categories.id = categories_products.category_id) WHERE categories.id = $1::text",[category])
    .then(resultQuery => {
      result.send(resultQuery.rows);
      client.end();
      return resultQuery.rows;
    })
    .catch(error => {
      console.warn(error);
      client.end();
    })
  ;
}

function getDataOneElementCategories(id, table, result){
  const client = new PG.Client();
  client.connect();
  return client.query("SELECT * FROM categories WHERE id = $1::text",[id])
    .then(resultQuery => {
      result.send(resultQuery.rows);
      client.end();
      return resultQuery.rows;
    })
    .catch(error => {
      console.warn(error);
      client.end();
    })
  ;
}

module.exports = {
  getAllDataFromTable: getAllDataFromTable,
  getDataOneElementBrands: getDataOneElementBrands,
  getDataOneElementProducts: getDataOneElementProducts,
  getProductsFromACategory: getProductsFromACategory,
  getDataOneElementCategories: getDataOneElementCategories
};
