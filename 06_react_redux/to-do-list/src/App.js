import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import _ from "underscore";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      tasks: props.tasks,
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  displayTasks(tasks){
    return tasks.map(task => (
      <tr>
        <td>{task.id}</td>
        <td>{task.title}</td>
        <td><input type="checkbox" onClick = {() => this.remove(task.id)}></input></td>
      </tr>
    ))
  }

  remove(id){
    const removedArray = this.state.tasks.filter(task => task.id !== id);
    this.setState({tasks : removedArray})
  }

  handleChange(event) {
    this.setState({
      tasks: this.state.tasks,
      value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!_.isEmpty(this.state.value)){
      const objectToAdd = {
        title: this.state.value,
        id: this.state.tasks.length + 1
      };
      const copy = this.state.tasks;
      copy.push(objectToAdd);
      this.setState({tasks : copy, value: ''});
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to ToDoList</h1>
        </header>
        <div class="jumbotron">
          <form onSubmit={this.handleSubmit}>
            <input type="text" class="form-control" placeholder="Libellé de la tâche" value={this.state.value} onChange={this.handleChange}></input>
            <input type="submit" value="Ajouter une tâche" class="btn btn-success"></input>
          </form>
        </div>
        <table class="table table-hover">
          <thead>
            <tr>
              <td>Numéro</td>
              <td>Titre</td>
              <td>Terminer</td>
            </tr>
          </thead>
          <tbody>
              {this.displayTasks(this.state.tasks)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
