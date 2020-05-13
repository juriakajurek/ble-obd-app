import React from 'react';
import 'react-native-gesture-handler';

import {StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import MainScreen from './src/screens/MainScreen';
import ParamsScreen from './src/screens/ParamsScreen';
import BlackBoxMainScreen from './src/screens/BlackBoxMainScreen';
import SettingsScreen from './src/screens/SettingsScren';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.screen}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={MainScreen} />
        <Stack.Screen name="Params" component={ParamsScreen} />
        <Stack.Screen name="Errors" component={ParamsScreen} />
        <Stack.Screen name="BlackBox" component={BlackBoxMainScreen} />
        <Stack.Screen name="Extras" component={ParamsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
