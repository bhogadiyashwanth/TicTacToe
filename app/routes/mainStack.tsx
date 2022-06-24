import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Game from '../screens/game';
import HomePage from '../screens/homePage';
import {MainStackParamList} from './types';

const mainStack = createNativeStackNavigator<MainStackParamList>();

const MainStackScreen = () => {
  return (
    <mainStack.Navigator>
      <mainStack.Screen name="Home Page" component={HomePage} />
      <mainStack.Screen name="Game" component={Game} />
    </mainStack.Navigator>
  );
};

export default MainStackScreen;
