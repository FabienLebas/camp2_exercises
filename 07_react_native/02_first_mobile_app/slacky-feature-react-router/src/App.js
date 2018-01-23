import React, { Component } from "react";
import "./App.css";
import Login from "./Login";
import Chat from "./Chat";
import { Redirect, Route, Switch } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
      channels: ["general", "random"],
      messages: [],
    };
    // Attaching the websocket to our App so we can reuse it
    this.websocket = new WebSocket(`ws://${window.location.hostname}:8080`);
  }
  componentDidMount() {
    // Listen for messages
    this.websocket.addEventListener("message", event => {
      const message = JSON.parse(event.data);
      console.log("Message from server ", message);
      switch (message.type) {
        case "CONNECTION_START":
        default:
          break;
        case "MESSAGES":
          this.setState({ messages: message.data });
          break;
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

  sendMessage = (message, channel) => {
    this.websocket.send(
      JSON.stringify({
        type: "NEW_MESSAGE",
        userName: this.state.userName,
        message: message,
        channel: channel
      })
    );
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Slacky</h1>
        </header>

        <Switch>
          <Route path="/chat" render={(routerProps) =>
            this.state.userName
              ? <Chat
                  {...routerProps}
                  sendMessage={this.sendMessage}
                  messages={this.state.messages}
                  channels={this.state.channels}
                />
              : <Redirect to="/"/>
          } />
          <Route render={() =>
            this.state.userName
              ? <Redirect to="/chat"/>
              : <Login handleUserName={this.handleUserName} />
          } />
        </Switch>
      </div>
    );
  }
}

export default App;
