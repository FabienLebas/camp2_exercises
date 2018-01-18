import React, { Component } from 'react';
import '../App.css';
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import Header from './Header'



class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <AddTodo />
        <VisibleTodoList />
        <Footer />
      </div>
    );
  }
}

export default App;
