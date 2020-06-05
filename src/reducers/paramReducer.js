import {SET_RPM, SET_RPM_SELECTED} from '../actions/types';
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
    case SET_RPM_SELECTED:
      return {
        ...state,
        isRpmSelected: action.data,
      };
    default:
      return state;
  }
};

export default paramReducer;
