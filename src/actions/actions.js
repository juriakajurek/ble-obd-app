import {
  ADD_DEVICE,
  ADD_DEVICE_TO_LIST,
  SET_INFO,
  SET_SELECTED_DEVICE,
  SET_BLUETOOTH_STATUS,
  SET_UUID,
  SET_RPM,
  SELECT_RPM,
  SET_TRAVELING,
  SET_BUTTON_TEXT,
  SET_BUTTON_ICON,
} from './types';

export const addDevice = device => ({
  type: ADD_DEVICE,
  data: device,
});

export const addDeviceToList = component => ({
  type: ADD_DEVICE_TO_LIST,
  data: component,
});

export const setInfo = info => ({
  type: SET_INFO,
  data: info,
});

export const setSelectedDevice = device => ({
  type: SET_SELECTED_DEVICE,
  data: device,
});

export const setBluetoothStatus = status => ({
  type: SET_BLUETOOTH_STATUS,
  data: status,
});

export const setUUID = uuid => ({
  type: SET_UUID,
  data: uuid,
});

export const setRpm = val => ({
  type: SET_RPM,
  data: val,
});

export const selectRpm = bool => ({
  type: SELECT_RPM,
  data: bool,
});

export const setTraveling = bool => ({
  type: SET_TRAVELING,
  data: bool,
});

export const setButtonText = txt => ({
  type: SET_BUTTON_TEXT,
  data: txt,
});

export const setButtonIcon = iconName => ({
  type: SET_BUTTON_ICON,
  data: iconName,
});
