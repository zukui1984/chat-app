import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Start from './components/Start';
import Chat from './components/Chat';

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

export default class App extends Component {
  constructor(props) {
  super(props);
  this.state = { text: ""};
}

render() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start" component={Start}
        />
        <Stack.Screen
          name="Chat" component={Chat}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
 }
}

