import {
  SET_BT_MODULE,
  SET_BLUETOOTH_STATUS,
  SET_BT_SEARCHING,
  ADD_DEVICE,
  ADD_DEVICE_TO_LIST,
  ADD_TO_RESPONSE,
} from '../actions/types';
import {} from '../actions/actions';

const initialState = {
  btModule: {},
  devices: [],
  foundDevicesList: [],
  selectedDevice: {},
  bluetoothStatus: '',
  response: '',
  info: '',
  uuid: '',
  isBtSearching: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DEVICE:
      return {...state, devices: state.devices.concat(action.data)};
    case ADD_DEVICE_TO_LIST:
      return {
        ...state,
        foundDevicesList: state.foundDevicesList.concat(action.data),
      };
    case ADD_TO_RESPONSE:
      return {
        ...state,
        response: state.response.concat(action.data),
      };
    case 'SET_INFO':
      return {
        ...state,
        info: action.data,
      };

    case SET_BT_MODULE:
      return {
        ...state,
        btModule: action.data,
      };

    case SET_BT_SEARCHING:
      return {
        ...state,
        isBtSearching: action.data,
      };

    case 'SET_SELECTED_DEVICE':
      return {
        ...state,
        selectedDevice: action.data,
      };
    case SET_BLUETOOTH_STATUS:
      return {
        ...state,
        bluetoothStatus: action.data,
      };
    case 'SET_UUID':
      return action.data;
    default:
      return state;
  }
};

export default reducer;
