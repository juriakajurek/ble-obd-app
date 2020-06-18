import {
  SET_BT_MODULE,
  SET_BT_SEARCHING,
  ADD_DEVICE,
  ADD_DEVICE_TO_LIST,
  SET_INFO,
  SET_SELECTED_DEVICE,
  SET_BLUETOOTH_STATUS,
  SET_TRAVELING,
  SET_BUTTON_TEXT,
  SET_BUTTON_ICON,
  SET_ENGINE_LOAD,
  SET_ENGINE_LOAD_SELECTED,
  SET_COOLANT_TEMPERATURE,
  SET_COOLANT_TEMPERATURE_SELECTED,
  SET_FUEL_PRESSURE,
  SET_FUEL_PRESSURE_SELECTED,
  SET_INTAKE_MANIFOLD_PRESSURE,
  SET_INTAKE_MANIFOLD_PRESSURE_SELECTED,
  SET_RPM,
  SET_RPM_SELECTED,
  SET_SPEED,
  SET_SPEED_SELECTED,
  SET_TIMING_ADVANCE,
  SET_TIMING_ADVANCE_SELECTED,
  SET_INTAKE_AIR_TEMPERATURE,
  SET_INTAKE_AIR_TEMPERATURE_SELECTED,
  SET_AIR_FLOW_RATE,
  SET_AIR_FLOW_RATE_SELECTED,
  SET_CODES_SHOWN,
} from './types';

export const setBtModule = mod => ({
  type: SET_BT_MODULE,
  data: mod,
});
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

export const setBtSearching = bool => ({
  type: SET_BT_SEARCHING,
  data: bool,
});
/// parameters
export const setEngineLoad = val => ({
  type: SET_ENGINE_LOAD,
  data: val,
});

export const setEngineLoadSelected = bool => ({
  type: SET_ENGINE_LOAD_SELECTED,
  data: bool,
});

export const setCoolantTemperature = val => ({
  type: SET_COOLANT_TEMPERATURE,
  data: val,
});

export const setCoolantTemperatureSelected = bool => ({
  type: SET_COOLANT_TEMPERATURE_SELECTED,
  data: bool,
});

export const setFuelPressure = val => ({
  type: SET_FUEL_PRESSURE,
  data: val,
});

export const setFuelPressureSelected = bool => ({
  type: SET_FUEL_PRESSURE_SELECTED,
  data: bool,
});

export const setIntakeManifoldPressure = val => ({
  type: SET_INTAKE_MANIFOLD_PRESSURE,
  data: val,
});

export const setIntakeManifoldPressureSelected = bool => ({
  type: SET_INTAKE_MANIFOLD_PRESSURE_SELECTED,
  data: bool,
});

export const setRpm = val => ({
  type: SET_RPM,
  data: val,
});

export const setRpmSelected = bool => ({
  type: SET_RPM_SELECTED,
  data: bool,
});

export const setSpeed = val => ({
  type: SET_SPEED,
  data: val,
});

export const setSpeedSelected = bool => ({
  type: SET_SPEED_SELECTED,
  data: bool,
});

export const setTimingAdvance = val => ({
  type: SET_TIMING_ADVANCE,
  data: val,
});

export const setTimingAdvanceSelected = bool => ({
  type: SET_TIMING_ADVANCE_SELECTED,
  data: bool,
});

export const setIntakeAirTemperature = val => ({
  type: SET_INTAKE_AIR_TEMPERATURE,
  data: val,
});

export const setIntakeAirTemperatureSelected = bool => ({
  type: SET_INTAKE_AIR_TEMPERATURE_SELECTED,
  data: bool,
});

export const setAirFlowRate = val => ({
  type: SET_AIR_FLOW_RATE,
  data: val,
});

export const setAirFlowRateSelected = bool => ({
  type: SET_AIR_FLOW_RATE_SELECTED,
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

export const setCodesShown = bool => ({
  type: SET_CODES_SHOWN,
  data: bool,
});
