import React from 'react';
import { AppRegistry } from 'react-native';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import * as AppAuth from 'expo-app-auth';
import LoginScreen from './components/LoginScreen';
import ProfileScreen from './components/ProfileScreen';
import ChooseDistributionScreen from './components/ChooseDistributionScreen';
import HomeScreen from './components/HomeScreen';
import PlantScreen from './components/PlantScreen';
import FoundPlantsScreen from './components/FoundPlantsScreen';
import FoundPlantScreen from './components/FoundPlantScreen';

const Stack = createStackNavigator();
Stack.Navigator.defaultProps = {
  headerMode: 'none',
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Choose Distribution" component={ChooseDistributionScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="View Plant" component={PlantScreen} />
        <Stack.Screen name="Found Plants" component={FoundPlantsScreen} />
        <Stack.Screen name="View Found Plant" component={FoundPlantScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent('MyApplication', () => App);