import React, { Component } from 'react';
import './App.css';
import Login from './Login.js';
import Chat from './Chat.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      username:"",
      messages:[]
    };
  }

  componentDidMount(){
    const pop = document.getElementById("pop");
    // We open a connection from the client, related to the server
    const ws = new WebSocket("ws://localhost:4000");
    // What to do when we receive a message?
    ws.onmessage = (event) => {
      console.log("Message: " + event.data);
      const parsedData = JSON.parse(event.data)
      if(parsedData.type === "connection"){
        pop.innerHTML = parsedData.message;
      } else {
        const newMessages = this.state.messages;
        newMessages.push(JSON.parse(event.data));
        this.setState({
          username: this.state.username,
          messages:newMessages
        });
      }
    };
    // Alert the server that the client is gone
    window.addEventListener("beforeunload", () => ws.send("CLOSE"));
  }

  handleLogin = (login) => {
    this.setState({
      username: login,
      messages: this.state.messages
    });
    const ws = new WebSocket("ws://localhost:4000");
    const content = {
      type: "connection",
      message:`${login} is now connected`
    };
    ws.onopen = (event) => {ws.send(JSON.stringify(content));};
  }

  handleLogOut = (login) => {
    this.setState({
      username: "",
      messages:[]
    });
    const ws = new WebSocket("ws://localhost:4000");
    const content = {
      type: "connection",
      message:`${login} disconnected`
    };
    ws.onopen = (event) => {ws.send(JSON.stringify(content));};
  }

  handleMyMessage = (newMessage) => {
    const ws = new WebSocket("ws://localhost:4000");
    ws.onopen = (event) => {ws.send(JSON.stringify(newMessage));};
  }

  render() {
    return (
      <div className="App">
        <div className="jumbotron">
          <Login username={this.state.username} handleLogin={this.handleLogin} handleLogOut={this.handleLogOut}/>
          <p id="pop"></p>
          <Chat username={this.state.username} messages={this.state.messages} handleMyMessage={this.handleMyMessage}/>
        </div>
      </div>
    );
  }
}

export default App;
