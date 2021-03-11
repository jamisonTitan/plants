import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { AppRegistry } from 'react-native';
import { StyleSheet, Button, Text, View } from 'react-native';
import { ApolloProvider, ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import * as firebase from 'firebase';
import * as AppAuth from 'expo-app-auth';
import LoginScreen from './components/LoginScreen';
import ProfileScreen from './components/ProfileScreen';
import "firebase/functions";

const URLSchemes = AppAuth;

const Stack = createStackNavigator();

// Optionally import the services that ou want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/storage";

const client = new ApolloClient({
  uri: 'http://10.0.0.197:4000',
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  }
});

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRn68IcS4b5F_jdyTGXIIYZWhK62T4S9g",
  authDomain: "botanistquest.firebaseapp.com",
  databaseURL: 'https://botanistquest-default-rtdb.firebaseio.com/', //TODO
  projectId: "botanistquest",
  storageBucket: "botanistquest.appspot.com",
  messagingSenderId: "171136312997",
  appId: "1:171136312997:web:d704b610a1af197ce94f4c",
  measurementId: "G-F4BRHG5G51"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const GET_HELLO = gql`
  query GetHello{
    hello
  }
`

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent('MyApplication', () => App);