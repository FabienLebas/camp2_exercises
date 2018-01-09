import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import _ from "underscore";

function displayTableTitle(){
  return (
    <tr>
      <th scope="col" onClick={() => App.sortByModel()}>Modèle</th>
      <th scope="col">Libellé</th>
      <th scope="col">Prix</th>
    </tr>
)  ;
}

class App extends Component {
  constructor(props){
    super(props);
    this.orderNextSort = "asc";
    this.state = {products: props.products};
  }

  sort = (param) => {
    const sortedProducts = _.sortBy(this.state.products, param);
    if(this.orderNextSort === "asc"){
      this.setState({products: sortedProducts});
      this.orderNextSort = "desc";
    } else {
      this.setState({products: sortedProducts.reverse()});
      this.orderNextSort = "asc";
    }
  }

  displayTableRows(myArray){
    return myArray.map(product => (
          <tr>
            <td>{product.decathlon_id}</td>
            <td>{product.title}</td>
            <td>{product.price}</td>
          </tr>
        )
      );
  }

  render() {
    return (
      <div className="App jumbotron">
        <h1 class="text-center">Hello World!</h1>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col" onClick = {() => this.sort("decathlon_id")}>Modèle</th>
              <th scope="col" onClick = {() => this.sort("title")} >Libellé</th>
              <th scope="col" onClick = {() => this.sort("price")}>Prix</th>
            </tr>
          </thead>
          <tbody>
            {this.displayTableRows(this.state.products)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
