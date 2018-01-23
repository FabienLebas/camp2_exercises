import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import HomeScreen from '../App';

const ProfileScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Profile Screen</Text>
  </View>
);

const Channels = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Chat/>
  </View>
);

const Home = () => {
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <HomeScreen/>
  </View>
}

const RootDrawer = DrawerNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-home' : 'ios-home-outline'}
          size={20}
          style={{ color: tintColor }}
        />
      ),
    },
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      drawerLabel: 'Profile',
      drawerIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-person' : 'ios-person-outline'}
          size={20}
          style={{ color: tintColor }}
        />
      ),
    },
  },
  Channels: {
    screen: Channels,
    navigationOptions: {
      drawerLabel: 'Channels',
      drawerIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-list' : 'ios-list-outline'}
          size={20}
          style={{ color: tintColor }}
        />
      ),
    },
  }
});

export default RootDrawer;
