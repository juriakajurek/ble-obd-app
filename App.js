import React from 'react';
import 'react-native-gesture-handler';

import {StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as constants from './assets/constants';

import MainScreen from './src/screens/MainScreen';
import ParamsScreen from './src/screens/ParamsScreen';
import BlackBoxMainScreen from './src/screens/BlackBoxMainScreen';
import ExtrasScreen from './src/screens/ExtrasScreen';
import SettingsScreen from './src/screens/SettingsScren';
import TroubleCodesScreen from './src/screens/TroubleCodesScreen';

const Stack = createStackNavigator();

const options = {
  headerStyle: {
    backgroundColor: '#fefefe',
  },
  headerTitleStyle: {
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
};

export default function App() {
  return (
    <NavigationContainer style={styles.screen}>
      <Stack.Navigator headerMode="float">
        <Stack.Screen
          name="Home"
          component={MainScreen}
          options={{...options, title: 'Diagnostic Boa'}}
        />
        <Stack.Screen
          name="Params"
          component={ParamsScreen}
          options={{...options, title: 'Parametry pojazdu'}}
        />
        <Stack.Screen
          name="Errors"
          component={TroubleCodesScreen}
          options={{
            ...options,
            title: 'Błędy silnika',
          }}
        />
        <Stack.Screen
          name="BlackBox"
          component={BlackBoxMainScreen}
          options={{...options, title: 'Czarna skrzynka'}}
        />
        <Stack.Screen
          name="Extras"
          component={ExtrasScreen}
          options={{...options, title: 'Extras'}}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            ...options,
            title: 'Ustawienia',
          }}
        />
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
