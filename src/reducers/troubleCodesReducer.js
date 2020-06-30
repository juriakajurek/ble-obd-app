import {
  SET_CODES_SHOWN,
  SET_TROUBLE_CODES_QUANTITY,
  SET_TROUBLE_CODES,
} from '../actions/types';

const initialState = {
  troubleCodesQuantity: null,
  troubleCodes: [],
  areCodesShown: false,
};

const troubleCodesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TROUBLE_CODES_QUANTITY:
      return {
        ...state,
        troubleCodesQuantity: action.data,
      };
    case SET_TROUBLE_CODES:
      return {
        ...state,
        troubleCodes: action.data,
      };
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
