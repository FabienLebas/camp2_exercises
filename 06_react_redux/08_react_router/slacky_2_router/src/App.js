import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import "./App.css";
import Login from "./Login";
import Chat from "./Chat";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
      messages: [],
    };
    // Attaching the websocket to our App so we can reuse it
    this.websocket = new WebSocket("ws://localhost:8080");
  }
  componentDidMount() {
    // Listen for messages
    this.websocket.addEventListener("message", event => {
      const message = JSON.parse(event.data);
      console.log("Message from server ", message);
      switch (message.type) {
        case "CONNECTION_START":
        default:
          return;
        case "MESSAGES":
          this.setState({ messages: message.data });
          return;
      }
    });
  }

  handleUserName = userName => {
    this.setState({ userName: userName });
    this.websocket.send(
      JSON.stringify({
        type: "LOGIN",
        userName: userName
      })
    );
  };

  sendMessage = message => {
    this.websocket.send(
      JSON.stringify({
        type: "NEW_MESSAGE",
        userName: this.state.userName,
        message: message
      })
    );
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" render={() => <Login handleUserName={this.handleUserName} userName={this.state.userName}/>}/>
          <Route path="/chat" render={() => <Chat sendMessage={this.sendMessage} messages={this.state.messages} userName={this.state.userName}/>}/>
        </div>
      </Router>
    );
  }
}

export default App;
