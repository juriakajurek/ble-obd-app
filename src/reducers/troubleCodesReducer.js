import {SET_CODES_SHOWN} from '../actions/types';

const initialState = {
  areCodesShown: false,
};

const troubleCodesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CODES_SHOWN:
      return {
        ...state,
        areCodesShown: action.data,
      };

    default:
      return state;
  }
};

export default troubleCodesReducer;
