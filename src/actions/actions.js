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
  SET_TROUBLE_CODES,
  SET_TROUBLE_CODES_QUANTITY,
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
  SET_THROTTLE_POSITION,
  SET_THROTTLE_POSITION_SELECTED,
  SET_RUN_TIME_SINCE_ENGINE_START,
  SET_RUN_TIME_SINCE_ENGINE_START_SELECTED,
  SET_DISTANCE_TRAVELED_WITH_MIL_ON,
  SET_DISTANCE_TRAVELED_WITH_MIL_ON_SELECTED,
  SET_FUEL_RAIL_PRESSURE,
  SET_FUEL_RAIL_PRESSURE_SELECTED,
  SET_FUEL_RAIL_GAUGE,
  SET_FUEL_RAIL_GAUGE_SELECTED,
  SET_COMMANDED_EGR,
  SET_COMMANDED_EGR_SELECTED,
  SET_EGR_ERROR,
  SET_EGR_ERROR_SELECTED,
  SET_FUEL_LEVEL,
  SET_FUEL_LEVEL_SELECTED,
  SET_WARM_UPS_SINCE_CODES_CLEARED,
  SET_WARM_UPS_SINCE_CODES_CLEARED_SELECTED,
  SET_DISTANCE_TRAVELED_SINCE_CODES_CLEARED,
  SET_DISTANCE_TRAVELED_SINCE_CODES_CLEARED_SELECTED,
  SET_CONTROL_MODULE_VOLTAGE,
  SET_CONTROL_MODULE_VOLTAGE_SELECTED,
  SET_FUEL_AIR_COMMANDED_EQUIVALENCE_RATIO,
  SET_FUEL_AIR_COMMANDED_EQUIVALENCE_RATIO_SELECTED,
  SET_RELATIVE_THROTTLE_POSITION,
  SET_RELATIVE_THROTTLE_POSITION_SELECTED,
  SET_AMBIENT_AIR_TEMPERATURE,
  SET_AMBIENT_AIR_TEMPERATURE_SELECTED,
  SET_TIME_RUN_WITH_MIL_ON,
  SET_TIME_RUN_WITH_MIL_ON_SELECTED,
  SET_TIME_SINCE_TROUBLE_CODES_CLEARED,
  SET_TIME_SINCE_TROUBLE_CODES_CLEARED_SELECTED,
  SET_FUEL_TYPE,
  SET_FUEL_TYPE_SELECTED,
  SET_FUEL_RAIL_ABSOLUTE_PRESSURE,
  SET_FUEL_RAIL_ABSOLUTE_PRESSURE_SELECTED,
  SET_RELATIVE_ACCELERATOR_PEDAL_POSITION,
  SET_RELATIVE_ACCELERATOR_PEDAL_POSITION_SELECTED,
  SET_ENGINE_OIL_TEMPERATURE,
  SET_ENGINE_OIL_TEMPERATURE_SELECTED,
  SET_FUEL_INJECTION_TIMING,
  SET_FUEL_INJECTION_TIMING_SELECTED,
  SET_ENGINE_FUEL_RATE,
  SET_ENGINE_FUEL_RATE_SELECTED,
  SET_DRIVERS_DEMAND_ENGINE_PERCENT_TORQUE,
  SET_DRIVERS_DEMAND_ENGINE_PERCENT_TORQUE_SELECTED,
  SET_ACTUAL_ENGINE_PERCENT_TORQUE,
  SET_ACTUAL_ENGINE_PERCENT_TORQUE_SELECTED,
  SET_ENGINE_REFERENCE_TORQUE,
  SET_ENGINE_REFERENCE_TORQUE_SELECTED,
  SET_DPF_TEMPERATURE,
  SET_DPF_TEMPERATURE_SELECTED,
  SET_ENGINE_RUN_TIME,
  SET_ENGINE_RUN_TIME_SELECTED,
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

export const setThrottlePosition = val => ({
  type: SET_THROTTLE_POSITION,
  data: val,
});

export const setThrottlePositionSelected = bool => ({
  type: SET_THROTTLE_POSITION_SELECTED,
  data: bool,
});

export const setRunTimeSinceEngineStart = val => ({
  type: SET_RUN_TIME_SINCE_ENGINE_START,
  data: val,
});

export const setRunTimeSinceEngineStartSelected = bool => ({
  type: SET_RUN_TIME_SINCE_ENGINE_START_SELECTED,
  data: bool,
});

export const setDistanceTraveledWithMilOn = val => ({
  type: SET_DISTANCE_TRAVELED_WITH_MIL_ON,
  data: val,
});

export const setDistanceTraveledWithMilOnSelected = bool => ({
  type: SET_DISTANCE_TRAVELED_WITH_MIL_ON_SELECTED,
  data: bool,
});

export const setFuelRailPressure = val => ({
  type: SET_FUEL_RAIL_PRESSURE,
  data: val,
});

export const setFuelRailPressureSelected = bool => ({
  type: SET_FUEL_RAIL_PRESSURE_SELECTED,
  data: bool,
});

export const setFuelRailGauge = val => ({
  type: SET_FUEL_RAIL_GAUGE,
  data: val,
});

export const setFuelRailGaugeSelected = bool => ({
  type: SET_FUEL_RAIL_GAUGE_SELECTED,
  data: bool,
});

export const setCommandedEgr = val => ({
  type: SET_COMMANDED_EGR,
  data: val,
});

export const setCommandedEgrSelected = bool => ({
  type: SET_COMMANDED_EGR_SELECTED,
  data: bool,
});

export const setEgrError = val => ({
  type: SET_EGR_ERROR,
  data: val,
});

export const setEgrErrorSelected = bool => ({
  type: SET_EGR_ERROR_SELECTED,
  data: bool,
});

export const setFuelLevel = val => ({
  type: SET_FUEL_LEVEL,
  data: val,
});

export const setFuelLevelSelected = bool => ({
  type: SET_FUEL_LEVEL_SELECTED,
  data: bool,
});

export const setWarmUpsSinceCodesCleared = val => ({
  type: SET_WARM_UPS_SINCE_CODES_CLEARED,
  data: val,
});

export const setWarmUpsSinceCodesClearedSelected = bool => ({
  type: SET_WARM_UPS_SINCE_CODES_CLEARED_SELECTED,
  data: bool,
});

export const setDistanceTraveledSinceCodesCleared = val => ({
  type: SET_DISTANCE_TRAVELED_SINCE_CODES_CLEARED,
  data: val,
});

export const setDistanceTraveledSinceCodesClearedSelected = bool => ({
  type: SET_DISTANCE_TRAVELED_SINCE_CODES_CLEARED_SELECTED,
  data: bool,
});

export const setControlModuleVoltage = val => ({
  type: SET_CONTROL_MODULE_VOLTAGE,
  data: val,
});

export const setControlModuleVoltageSelected = bool => ({
  type: SET_CONTROL_MODULE_VOLTAGE_SELECTED,
  data: bool,
});

export const setFuelAirCommandedEquivalenceRatio = val => ({
  type: SET_FUEL_AIR_COMMANDED_EQUIVALENCE_RATIO,
  data: val,
});

export const setFuelAirCommandedEquivalenceRatioSelected = bool => ({
  type: SET_FUEL_AIR_COMMANDED_EQUIVALENCE_RATIO_SELECTED,
  data: bool,
});

export const setRelativeThrottlePosition = val => ({
  type: SET_RELATIVE_THROTTLE_POSITION,
  data: val,
});

export const setRelativeThrottlePositionSelected = bool => ({
  type: SET_RELATIVE_THROTTLE_POSITION_SELECTED,
  data: bool,
});

export const setAmbientAirTemperature = val => ({
  type: SET_AMBIENT_AIR_TEMPERATURE,
  data: val,
});

export const setAmbientAirTemperatureSelected = bool => ({
  type: SET_AMBIENT_AIR_TEMPERATURE_SELECTED,
  data: bool,
});

export const setTimeRunWithMilOn = val => ({
  type: SET_TIME_RUN_WITH_MIL_ON,
  data: val,
});

export const setTimeRunWithMilOnSelected = bool => ({
  type: SET_TIME_RUN_WITH_MIL_ON_SELECTED,
  data: bool,
});

export const setTimeSinceTroubleCodesCleared = val => ({
  type: SET_TIME_SINCE_TROUBLE_CODES_CLEARED,
  data: val,
});

export const setTimeSinceTroubleCodesClearedSelected = bool => ({
  type: SET_TIME_SINCE_TROUBLE_CODES_CLEARED_SELECTED,
  data: bool,
});

export const setFuelType = val => ({
  type: SET_FUEL_TYPE,
  data: val,
});

export const setFuelTypeSelected = bool => ({
  type: SET_FUEL_TYPE_SELECTED,
  data: bool,
});

export const setFuelRailAbsolutePressure = val => ({
  type: SET_FUEL_RAIL_ABSOLUTE_PRESSURE,
  data: val,
});

export const setFuelRailAbsolutePressureSelected = bool => ({
  type: SET_FUEL_RAIL_ABSOLUTE_PRESSURE_SELECTED,
  data: bool,
});

export const setRelativeAcceleratorPedalPosition = val => ({
  type: SET_RELATIVE_ACCELERATOR_PEDAL_POSITION,
  data: val,
});

export const setRelativeAcceleratorPedalPositionSelected = bool => ({
  type: SET_RELATIVE_ACCELERATOR_PEDAL_POSITION_SELECTED,
  data: bool,
});

export const setEngineOilTemperature = val => ({
  type: SET_ENGINE_OIL_TEMPERATURE,
  data: val,
});

export const setEngineOilTemperatureSelected = bool => ({
  type: SET_ENGINE_OIL_TEMPERATURE_SELECTED,
  data: bool,
});

export const setFuelInjectionTiming = val => ({
  type: SET_FUEL_INJECTION_TIMING,
  data: val,
});

export const setFuelInjectionTimingSelected = bool => ({
  type: SET_FUEL_INJECTION_TIMING_SELECTED,
  data: bool,
});

export const setEngineFuelRate = val => ({
  type: SET_ENGINE_FUEL_RATE,
  data: val,
});

export const setEngineFuelRateSelected = bool => ({
  type: SET_ENGINE_FUEL_RATE_SELECTED,
  data: bool,
});

export const setDriversDemandEnginePercentTorque = val => ({
  type: SET_DRIVERS_DEMAND_ENGINE_PERCENT_TORQUE,
  data: val,
});

export const setDriversDemandEnginePercentTorqueSelected = bool => ({
  type: SET_DRIVERS_DEMAND_ENGINE_PERCENT_TORQUE_SELECTED,
  data: bool,
});

export const setActualEnginePercentTorque = val => ({
  type: SET_ACTUAL_ENGINE_PERCENT_TORQUE,
  data: val,
});

export const setActualEnginePercentTorqueSelected = bool => ({
  type: SET_ACTUAL_ENGINE_PERCENT_TORQUE_SELECTED,
  data: bool,
});

export const setEngineReferenceTorque = val => ({
  type: SET_ENGINE_REFERENCE_TORQUE,
  data: val,
});

export const setEngineReferenceTorqueSelected = bool => ({
  type: SET_ENGINE_REFERENCE_TORQUE_SELECTED,
  data: bool,
});

export const setDpfTemperature = val => ({
  type: SET_DPF_TEMPERATURE,
  data: val,
});

export const setDpfTemperatureSelected = bool => ({
  type: SET_DPF_TEMPERATURE_SELECTED,
  data: bool,
});

export const setEngineRunTime = val => ({
  type: SET_ENGINE_RUN_TIME,
  data: val,
});

export const setEngineRunTimeSelected = bool => ({
  type: SET_ENGINE_RUN_TIME_SELECTED,
  data: bool,
});

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

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

export const setTroubleCodesQuantity = iconName => ({
  type: SET_TROUBLE_CODES_QUANTITY,
  data: iconName,
});

export const setTroubleCodes = bool => ({
  type: SET_TROUBLE_CODES,
  data: bool,
});
