import React from 'react';
import { connect } from "react-redux";
import './App.css';

const App = (props) => {
  return (
    <div className="App">
      <p className="App-intro">My counter</p>
      <div>{props.counter}</div>
      <button onClick = {props.increment}>+</button>
      <button onClick = {props.decrement}>-</button>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    counter: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    increment: () => dispatch({type: "INCREMENT"}),
    decrement: () => dispatch({type: "DECREMENT"})
  }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp
