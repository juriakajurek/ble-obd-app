import {createStore, combineReducers} from 'redux';

import reducer from './reducers/reducer';
import paramReducer from './reducers/paramReducer';
import blackBoxReducer from './reducers/blackBoxReducer';

const rootReducer = combineReducers({
  main: reducer,
  params: paramReducer,
  box: blackBoxReducer,
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
