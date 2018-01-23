import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native';
import { DrawerNavigator } from 'react-navigation';
import Login from './src/Login';
import Chat from './src/Chat';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
      channels: ["general", "random"],
      messages: [],
    };
    // Attaching the websocket to our App so we can reuse it
    this.websocket = new WebSocket(`ws://localhost:8080`);
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
    // this.websocket.send(
    //   JSON.stringify({
    //     type: "LOGIN",
    //     userName: userName
    //   })
    // );
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
    <NativeRouter>
      <View style={styles.container}>
        <Link
          to="/chat">
          <Image
            style={{width: 200, height: 200}}
            source={{uri: 'https://seafoammedia.com/wp-content/uploads/2015/01/slack-chat.png'}}
          />
        </Link>
        <Route exact path="/" render={() => <Login handleUserName={this.handleUserName}/>}/>
        <Route path="/chat" render={() => <Chat userName={this.state.userName}/>}/>
        <Route path="/chat/:channel" render={(routerProps) => <Channel {...routerProps}/>}/>
      </View>
    </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding:100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
