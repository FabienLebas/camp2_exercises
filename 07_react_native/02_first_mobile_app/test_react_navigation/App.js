import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value:""
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Image
          style={{width: 100, height: 100}}
          source={{uri: 'https://seafoammedia.com/wp-content/uploads/2015/01/slack-chat.png'}}
        />
        <TextInput
          style={{height: 40, width: 200}}
          autoCorrect={false}
          onChangeText={(text) => this.setState({value: text})}
          onSubmitEditing={(text) => navigate('Chat', { user: this.state.value })}
          placeholder="Login"
        />
        <Button
          onPress={() => navigate('Chat', { user: this.state.value })}
          title="Log in"
        />
      </View>
    );
  }
}



export default class App extends React.Component {
  render() {
    return <SimpleApp />;
  }
}

class ChatScreen extends React.Component {
  // Nav options can be defined as a function of the screen's props:
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.user}`,
  });
  render() {
    // The screen's current route is passed in to `props.navigation.state`:
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>Please select a channel
          <li>
            <ul>General</ul>
          </li>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Chat: { screen: ChatScreen },
});
