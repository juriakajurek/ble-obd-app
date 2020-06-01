import {createStore, combineReducers} from 'redux';

import reducer from './reducers/reducer';
import paramReducer from './reducers/paramReducer';

const rootReducer = combineReducers({
  main: reducer,
  params: paramReducer,
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
