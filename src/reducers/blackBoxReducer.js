import {
  SET_TRAVELING,
  SET_BUTTON_TEXT,
  SET_BUTTON_ICON,
} from '../actions/types';

const initialState = {
  isTraveling: false,
  buttonText: 'Rozpocznij podróż',
  buttonIcon: 'play-circle',
};

const blackBoxReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRAVELING:
      return {
        ...state,
        isTraveling: action.data,
      };
    case SET_BUTTON_TEXT:
      return {
        ...state,
        buttonText: action.data,
      };
    case SET_BUTTON_ICON:
      return {
        ...state,
        buttonIcon: action.data,
      };
    default:
      return state;
  }
};

export default blackBoxReducer;
