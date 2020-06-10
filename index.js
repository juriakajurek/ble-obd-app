/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import App from './App';
import {Provider} from 'react-redux';

import configureStore from './src/store';

import {Database} from '@nozbe/watermelondb';
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import {mySchema} from './database/schema';
import Route from './database/Route';

const adapter = new SQLiteAdapter({
  dbName: 'BlackBox',
  //adapter watermelon-sqlite
  schema: mySchema,
});

const database = new Database({
  // inicjalizacja bazy danych
  adapter,
  modelClasses: [Route],
  actionsEnabled: true,
});

const store = configureStore();

const app = () => (
  <DatabaseProvider database={database}>
    <Provider store={store}>
      <App />
    </Provider>
  </DatabaseProvider>
);

AppRegistry.registerComponent(appName, () => app);
