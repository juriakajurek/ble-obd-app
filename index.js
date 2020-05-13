/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import App from './App';
import {Provider} from 'react-redux';

import configureStore from './src/store';

const store = configureStore();

const app = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => app);
