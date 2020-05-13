import {ADD_DEVICE, ADD_DEVICE_TO_LIST} from '../actions/types';
import {} from '../actions/actions';

const initialState = {
  devices: [],
  foundDevicesList: [],
  selectedDevice: {},
  bluetoothState: '',
  info: '',
  rpm: '',
  uuid: '',
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
    case 'SET_INFO':
      return action.data;
    case 'SET_SELECTED_DEVICE':
      return action.data;
    case 'SET_BLUETOOTH_STATUS':
      return action.data;
    case 'SET_UUID':
      return action.data;
    case 'SET_RPM':
      return action.data;
    default:
      return state;
  }
};

export default reducer;
