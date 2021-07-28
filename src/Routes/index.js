/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import MainScreen from '../Screens/MainScreen';
import DailyForecast from '../Screens/DailyForecast';

const ACTIVE_TAB_COLOR = 'teal';
const Stack = createStackNavigator();

const Route = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{headerShown: false}} name={'MainScreen'}>
            {props => <MainScreen {...props} />}
          </Stack.Screen>
          <Stack.Screen
            options={{
              headerBackTitleVisible: false,
              headerTitle: 'Weekly Forecast',
              headerTintColor: ACTIVE_TAB_COLOR,
            }}
            name={'DailyForecast'}>
            {props => <DailyForecast {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Route;
