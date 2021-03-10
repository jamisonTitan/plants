import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { AppRegistry } from 'react-native';
import { StyleSheet, Button, Text, View } from 'react-native';
import { ApolloProvider, ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';
import Login from './components/LoginOrSignUp';
import * as firebase from 'firebase';
import * as AppAuth from 'expo-app-auth';
import AuthScreen from './components/AuthScreen';
const URLSchemes = AppAuth;

// Optionally import the services that ou want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
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

function Navigator() {
  const { loading, error, data } = useQuery(GET_HELLO);
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(loading, data)
    console.log('ERR', error);
    setTimeout(() => console.log(URLSchemes.length + 'urlSchemes'), 2000);
  }, [count]);

  return (
    <View style={styles.container}>
      {loading ?
        <Text>Loading...</Text>
        :
        <View>
          {/* <Text>{data.hello ? data.hello : "err"}poop</Text>
          <Button title="FUK" onPress={() => setCount(count + 1)} /> */}
          {/* <Login /> */}
          <AuthScreen />
        </View>
      }
    </View>
  )

}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Navigator />
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