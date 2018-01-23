import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { NativeRouter, Route, Link, Redirect } from 'react-router-native';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{width:200}}>Please choose a login name</Text>
        <TextInput
          style={{height: 40, width: 200}}
          autoCorrect={false}
          onChangeText={(text) => this.setState({value: text})}
          onSubmitEditing={(text) => this.props.authenticate(this.state.value)}
          placeholder="Login"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    width: 200,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Login;
