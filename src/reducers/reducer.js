import {
  SET_INFO,
  SET_BT_MODULE,
  SET_BLUETOOTH_STATUS,
  SET_BT_SEARCHING,
  SET_SELECTED_DEVICE,
  ADD_DEVICE,
  ADD_DEVICE_TO_LIST,
  SET_VIN_NUMBER,
} from '../actions/types';

const initialState = {
  btModule: {},
  devices: [],
  foundDevicesList: [],
  selectedDevice: {},
  bluetoothStatus: '',
  info: '',
  isBtSearching: false,
  vinNumber: '',
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
    case SET_INFO:
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
    case SET_BLUETOOTH_STATUS:
      return {
        ...state,
        bluetoothStatus: action.data,
      };
    case SET_SELECTED_DEVICE:
      return {
        ...state,
        selectedDevice: action.data,
      };
    case SET_VIN_NUMBER:
      return {
        ...state,
        vinNumber: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
