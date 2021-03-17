import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { AppRegistry } from 'react-native';
import { StyleSheet, Button, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import * as AppAuth from 'expo-app-auth';
import LoginScreen from './components/LoginScreen';
import ProfileScreen from './components/ProfileScreen';
import ChooseDistributionScreen from './components/ChooseDistributionScreen';
import HomeScreen from './components/HomeScreen';

const URLSchemes = AppAuth;

const Stack = createStackNavigator();

// Optionally import the services that ou want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/storage";


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="ChooseDistribution" component={ChooseDistributionScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4b8b3b',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent('MyApplication', () => App);