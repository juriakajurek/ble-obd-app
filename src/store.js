import {createStore, combineReducers} from 'redux';

import reducer from './reducers/reducer';

const rootReducer = combineReducers({
  main: reducer,
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
