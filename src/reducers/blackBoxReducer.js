import {
  SET_TRAVELING,
  SET_BUTTON_TEXT,
  SET_BUTTON_ICON,
  SET_DY,
  SET_DX,
  SET_CUBE_INTERVAL_ID,
  SET_DB_TIMEOUT_ID,
  SET_TIME_INTERVAL,
  SET_ROUTE_NUMBER,
} from '../actions/types';

const initialState = {
  dx: 100,
  dy: 100,
  isTraveling: false,
  buttonText: 'Rozpocznij podróż',
  buttonIcon: 'play-circle',
  cubeIntervalId: null,
  dbTimeoutId: null,
  timeInterval: 6000,
  routeNumber: null,
};

const blackBoxReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DY:
      return {
        ...state,
        dy: action.data,
      };
    case SET_DX:
      return {
        ...state,
        dx: action.data,
      };
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

    case SET_CUBE_INTERVAL_ID:
      return {
        ...state,
        cubeIntervalId: action.data,
      };
    case SET_DB_TIMEOUT_ID:
      return {
        ...state,
        dbTimeoutId: action.data,
      };
    case SET_TIME_INTERVAL:
      return {
        ...state,
        timeInterval: action.data,
      };
    case SET_ROUTE_NUMBER:
      return {
        ...state,
        routeNumber: action.data,
      };
    default:
      return state;
  }
};

export default blackBoxReducer;
