import {SET_RPM, SELECT_RPM} from '../actions/types';
import {} from '../actions/actions';

const initialState = {
  rpm: '',
  isRpmSelected: false,
};

const paramReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RPM:
      return {
        ...state,
        rpm: action.data,
      };
    case SELECT_RPM:
      return {
        ...state,
        isRpmSelected: action.data,
      };
    default:
      return state;
  }
};

export default paramReducer;
