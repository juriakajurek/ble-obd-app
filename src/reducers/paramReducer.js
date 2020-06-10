import {
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
} from '../actions/types';

const initialState = {
  engineLoad: '',
  isEngineLoadSelected: false,
  coolantTemperature: '',
  isCoolantTemperatureSelected: false,
  fuelPressure: '',
  isFuelPressureSelected: false,
  intakeManifoldPressure: '',
  isIntakeManifoldPressureSelected: false,
  rpm: '',
  isRpmSelected: false,
  speed: '',
  isSpeedSelected: false,
  timingAdvance: '',
  isTimingAdvanceSelected: false,
  intakeAirTemperature: '',
  isIntakeAirTemperatureSelected: false,
  airFlowRate: '',
  isAirFlowRateSelected: false,
};

const paramReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ENGINE_LOAD:
      return {
        ...state,
        engineLoad: action.data,
      };
    case SET_ENGINE_LOAD_SELECTED:
      return {
        ...state,
        isEngineLoadSelected: action.data,
      };
    case SET_COOLANT_TEMPERATURE:
      return {
        ...state,
        coolantTemperature: action.data,
      };
    case SET_COOLANT_TEMPERATURE_SELECTED:
      return {
        ...state,
        isCoolantTemperatureSelected: action.data,
      };
    case SET_FUEL_PRESSURE:
      return {
        ...state,
        fuelPressure: action.data,
      };
    case SET_FUEL_PRESSURE_SELECTED:
      return {
        ...state,
        isFuelPressureSelected: action.data,
      };
    case SET_INTAKE_MANIFOLD_PRESSURE:
      return {
        ...state,
        intakeManifoldPressure: action.data,
      };
    case SET_INTAKE_MANIFOLD_PRESSURE_SELECTED:
      return {
        ...state,
        isIntakeManifoldPressureSelected: action.data,
      };
    case SET_RPM:
      return {
        ...state,
        rpm: action.data,
      };
    case SET_RPM_SELECTED:
      return {
        ...state,
        isRpmSelected: action.data,
      };
    case SET_SPEED:
      return {
        ...state,
        speed: action.data,
      };
    case SET_SPEED_SELECTED:
      return {
        ...state,
        isSpeedSelected: action.data,
      };
    case SET_TIMING_ADVANCE:
      return {
        ...state,
        timingAdvance: action.data,
      };
    case SET_TIMING_ADVANCE_SELECTED:
      return {
        ...state,
        isTimingAdvanceSelected: action.data,
      };
    case SET_INTAKE_AIR_TEMPERATURE:
      return {
        ...state,
        intakeAirTemperature: action.data,
      };
    case SET_INTAKE_AIR_TEMPERATURE_SELECTED:
      return {
        ...state,
        isIntakeAirTemperatureSelected: action.data,
      };
    case SET_AIR_FLOW_RATE:
      return {
        ...state,
        airFlowRate: action.data,
      };
    case SET_AIR_FLOW_RATE_SELECTED:
      return {
        ...state,
        isAirFlowRateSelected: action.data,
      };

    default:
      return state;
  }
};

export default paramReducer;
