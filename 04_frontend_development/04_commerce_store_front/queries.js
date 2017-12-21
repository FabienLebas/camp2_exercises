const fetch = require("node-fetch");

function getCategories(){
  return fetch("http://decath-product-api.herokuapp.com/categories")
    .then(response => response.json())
    .then(result => result.map(category => { //est-ce vraiment utile de retirer l'id de la catégorie ?
      return {
        label: category.label,
        id: category.id
      };
    }))
    ;
}

function getProducts(category){
  return fetch(`http://decath-product-api.herokuapp.com/categories/${category}/products`)
    .then(response => response.json())
    ;
}

function getProductInfos(product){
  return fetch(`http://decath-product-api.herokuapp.com/products/${product}`)
    .then(response => response.json())
    ;
}

module.exports = {
  getCategories: getCategories,
  getProducts: getProducts,
  getProductInfos: getProductInfos
};
