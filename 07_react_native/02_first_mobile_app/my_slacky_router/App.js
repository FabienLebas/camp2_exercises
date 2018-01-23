import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { DrawerNavigator, NavigationActions } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from './src/Login';
import Channels from './src/Channels';
import RootDrawer from './src/RootDrawer';
import App from './src/Home';

class HomeScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      userName: ""
    }
  }

  authenticate = (userName) => {
    console.log("authenticate");
    this.setState({
      userName: userName
    });
    console.log("authenticate " + this.state.userName);
  }

  render(){
    if(this.state.userName===""){
      return(
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{width:200, fontSize:18, margin:10}}>Welcome to SlackyFab!</Text>
            <Image
              style={{width: 100, height: 100}}
              source={{uri: 'https://seafoammedia.com/wp-content/uploads/2015/01/slack-chat.png'}}
            />
            <Login authenticate={this.authenticate}/>
          </View>
      )
    } else {
      return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <App username={this.state.userName}/>
        </View>
      )
    }
  }
}

export default HomeScreen;
