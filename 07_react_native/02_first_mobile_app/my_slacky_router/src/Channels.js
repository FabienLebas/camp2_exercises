import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native';
import { StackNavigator } from 'react-navigation';

class Channels extends Component {
  static navigationOptions = {
    title: 'Chat with Lucy',
  };
  render(){
    return(
    <View>
      <Text>Channel</Text>
      <Text>Logged in as {this.props.userName}</Text>
      <Link
        to="/">
        <Text style={{color:"tomato"}}>Log out</Text>
      </Link>
      <Text>Please select a channel</Text>
      <Link
        to="./general">
        <Text>General</Text>
      </Link>
    </View>
    )
  }
}

export default Channels;
