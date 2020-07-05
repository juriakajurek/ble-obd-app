import {
  SET_TIMER1,
  SET_TIMER2,
  SET_TIMER3,
  SET_TIMER4,
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
} from '../actions/types';

const initialState = {
  timer1: {id: {}, index: -1},
  timer2: {id: {}, index: -1},
  timer3: {id: {}, index: -1},
  timer4: {id: {}, index: -1},
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
  throttlePosition: '',
  isThrottlePositionSelected: false,
  runTimeSinceEngineStart: '',
  isRunTimeSinceEngineStartSelected: false,
  distanceTraveledWithMilOn: '',
  isDistanceTraveledWithMilOnSelected: false,
  fuelRailPressure: '',
  isFuelRailPressureSelected: false,
  fuelRailGauge: '',
  isFuelRailGaugeSelected: false,
  commandedEgr: '',
  isCommandedEgrSelected: false,
  egrError: '',
  isEgrErrorSelected: false,
  fuelLevel: '',
  isFuelLevelSelected: false,
  warmUpsSinceCodesCleared: '',
  isWarmUpsSinceCodesClearedSelected: false,
  distanceTraveledSinceCodesCleared: '',
  isDistanceTraveledSinceCodesClearedSelected: false,
  controlModuleVoltage: '',
  isControlModuleVoltageSelected: false,
  fuelAirCommandedEquivalenceRatio: '',
  isFuelAirCommandedEquivalenceRatioSelected: false,
  relativeThrottlePosition: '',
  IsRelativeThrottlePositionSelected: false,
  ambientAirTemperature: '',
  IsAmbientAirTemperatureSelected: false,
  timeRunWithMilOn: '',
  isTimeRunWithMilOnSelected: false,
  timeSinceTroubleCodesCleared: '',
  isTimeSinceTroubleCodesClearedSelected: false,
  fuelType: '',
  isFuelTypeSelected: false,
  fuelRailAbsolutePressure: '',
  isFuelRailAbsolutePressureSelected: false,
  relativeAcceleratorPedalPosition: '',
  isRelativeAcceleratorPedalPositionSelected: false,
  engineOilTemperature: '',
  isEngineOilTemperatureSelected: false,
  fuelInjectionTiming: '',
  isFuelInjectionTimingSelected: false,
  engineFuelRate: '',
  isEngineFuelRateSelected: false,
  driversDemandEnginePercentTorque: '',
  isDriversDemandEnginePercentTorqueSelected: false,
  actualEnginePercentTorque: '',
  isActualEnginePercentTorqueSelected: false,
  engineReferenceTorque: '',
  isEngineReferenceTorqueSelected: false,
  dpfTemperature: '',
  isDpfTemperatureSelected: false,
  engineRunTime: '',
  isEngineRunTimeSelected: false,
};

const paramReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TIMER1:
      return {
        ...state,
        timer1: action.data,
      };
    case SET_TIMER2:
      return {
        ...state,
        timer2: action.data,
      };
    case SET_TIMER3:
      return {
        ...state,
        timer3: action.data,
      };
    case SET_TIMER4:
      return {
        ...state,
        timer4: action.data,
      };
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
    case SET_THROTTLE_POSITION:
      return {
        ...state,
        throttlePosition: action.data,
      };
    case SET_THROTTLE_POSITION_SELECTED:
      return {
        ...state,
        isThrottlePositionSelected: action.data,
      };
    case SET_RUN_TIME_SINCE_ENGINE_START:
      return {
        ...state,
        runTimeSinceEngineStart: action.data,
      };
    case SET_RUN_TIME_SINCE_ENGINE_START_SELECTED:
      return {
        ...state,
        isRunTimeSinceEngineStartSelected: action.data,
      };
    case SET_DISTANCE_TRAVELED_WITH_MIL_ON:
      return {
        ...state,
        distanceTraveledWithMilOn: action.data,
      };
    case SET_DISTANCE_TRAVELED_WITH_MIL_ON_SELECTED:
      return {
        ...state,
        isDistanceTraveledWithMilOnSelected: action.data,
      };
    case SET_FUEL_RAIL_PRESSURE:
      return {
        ...state,
        fuelRailPressure: action.data,
      };
    case SET_FUEL_RAIL_PRESSURE_SELECTED:
      return {
        ...state,
        isFuelRailPressureSelected: action.data,
      };
    case SET_FUEL_RAIL_GAUGE:
      return {
        ...state,
        fuelRailGauge: action.data,
      };
    case SET_FUEL_RAIL_GAUGE_SELECTED:
      return {
        ...state,
        isFuelRailGaugeSelected: action.data,
      };
    case SET_COMMANDED_EGR:
      return {
        ...state,
        commandedEgr: action.data,
      };
    case SET_COMMANDED_EGR_SELECTED:
      return {
        ...state,
        isCommandedEgrSelected: action.data,
      };
    case SET_EGR_ERROR:
      return {
        ...state,
        egrError: action.data,
      };
    case SET_EGR_ERROR_SELECTED:
      return {
        ...state,
        isEgrErrorSelected: action.data,
      };
    case SET_FUEL_LEVEL:
      return {
        ...state,
        fuelLevel: action.data,
      };
    case SET_FUEL_LEVEL_SELECTED:
      return {
        ...state,
        isFuelLevelSelected: action.data,
      };
    case SET_WARM_UPS_SINCE_CODES_CLEARED:
      return {
        ...state,
        warmUpsSinceCodesCleared: action.data,
      };
    case SET_WARM_UPS_SINCE_CODES_CLEARED_SELECTED:
      return {
        ...state,
        isWarmUpsSinceCodesClearedSelected: action.data,
      };
    case SET_DISTANCE_TRAVELED_SINCE_CODES_CLEARED:
      return {
        ...state,
        distanceTraveledSinceCodesCleared: action.data,
      };
    case SET_DISTANCE_TRAVELED_SINCE_CODES_CLEARED_SELECTED:
      return {
        ...state,
        isDistanceTraveledSinceCodesClearedSelected: action.data,
      };
    case SET_CONTROL_MODULE_VOLTAGE:
      return {
        ...state,
        controlModuleVoltage: action.data,
      };
    case SET_CONTROL_MODULE_VOLTAGE_SELECTED:
      return {
        ...state,
        isControlModuleVoltageSelected: action.data,
      };
    case SET_FUEL_AIR_COMMANDED_EQUIVALENCE_RATIO:
      return {
        ...state,
        fuelAirCommandedEquivalenceRatio: action.data,
      };
    case SET_FUEL_AIR_COMMANDED_EQUIVALENCE_RATIO_SELECTED:
      return {
        ...state,
        isFuelAirCommandedEquivalenceRatioSelected: action.data,
      };

    case SET_RELATIVE_THROTTLE_POSITION:
      return {
        ...state,
        relativeThrottlePosition: action.data,
      };
    case SET_RELATIVE_THROTTLE_POSITION_SELECTED:
      return {
        ...state,
        IsRelativeThrottlePositionSelected: action.data,
      };
    case SET_AMBIENT_AIR_TEMPERATURE:
      return {
        ...state,
        ambientAirTemperature: action.data,
      };
    case SET_AMBIENT_AIR_TEMPERATURE_SELECTED:
      return {
        ...state,
        IsAmbientAirTemperatureSelected: action.data,
      };
    case SET_TIME_RUN_WITH_MIL_ON:
      return {
        ...state,
        timeRunWithMilOn: action.data,
      };
    case SET_TIME_RUN_WITH_MIL_ON_SELECTED:
      return {
        ...state,
        isTimeRunWithMilOnSelected: action.data,
      };

    case SET_TIME_SINCE_TROUBLE_CODES_CLEARED:
      return {
        ...state,
        timeSinceTroubleCodesCleared: action.data,
      };
    case SET_TIME_SINCE_TROUBLE_CODES_CLEARED_SELECTED:
      return {
        ...state,
        isTimeSinceTroubleCodesClearedSelected: action.data,
      };
    case SET_FUEL_TYPE:
      return {
        ...state,
        fuelType: action.data,
      };
    case SET_FUEL_TYPE_SELECTED:
      return {
        ...state,
        isFuelTypeSelected: action.data,
      };
    case SET_FUEL_RAIL_ABSOLUTE_PRESSURE:
      return {
        ...state,
        fuelRailAbsolutePressure: action.data,
      };
    case SET_FUEL_RAIL_ABSOLUTE_PRESSURE_SELECTED:
      return {
        ...state,
        isFuelRailAbsolutePressureSelected: action.data,
      };
    case SET_RELATIVE_ACCELERATOR_PEDAL_POSITION:
      return {
        ...state,
        relativeAcceleratorPedalPosition: action.data,
      };
    case SET_RELATIVE_ACCELERATOR_PEDAL_POSITION_SELECTED:
      return {
        ...state,
        isRelativeAcceleratorPedalPositionSelected: action.data,
      };
    case SET_ENGINE_OIL_TEMPERATURE:
      return {
        ...state,
        engineOilTemperature: action.data,
      };
    case SET_ENGINE_OIL_TEMPERATURE_SELECTED:
      return {
        ...state,
        isEngineOilTemperatureSelected: action.data,
      };
    case SET_FUEL_INJECTION_TIMING:
      return {
        ...state,
        fuelInjectionTiming: action.data,
      };
    case SET_FUEL_INJECTION_TIMING_SELECTED:
      return {
        ...state,
        isFuelInjectionTimingSelected: action.data,
      };
    case SET_ENGINE_FUEL_RATE:
      return {
        ...state,
        engineFuelRate: action.data,
      };
    case SET_ENGINE_FUEL_RATE_SELECTED:
      return {
        ...state,
        isEngineFuelRateSelected: action.data,
      };

    case SET_DRIVERS_DEMAND_ENGINE_PERCENT_TORQUE:
      return {
        ...state,
        driversDemandEnginePercentTorque: action.data,
      };
    case SET_DRIVERS_DEMAND_ENGINE_PERCENT_TORQUE_SELECTED:
      return {
        ...state,
        isDriversDemandEnginePercentTorqueSelected: action.data,
      };
    case SET_ACTUAL_ENGINE_PERCENT_TORQUE:
      return {
        ...state,
        actualEnginePercentTorque: action.data,
      };
    case SET_ACTUAL_ENGINE_PERCENT_TORQUE_SELECTED:
      return {
        ...state,
        isActualEnginePercentTorqueSelected: action.data,
      };
    case SET_ENGINE_REFERENCE_TORQUE:
      return {
        ...state,
        engineReferenceTorque: action.data,
      };
    case SET_ENGINE_REFERENCE_TORQUE_SELECTED:
      return {
        ...state,
        isEngineReferenceTorqueSelected: action.data,
      };
    case SET_DPF_TEMPERATURE:
      return {
        ...state,
        dpfTemperature: action.data,
      };
    case SET_DPF_TEMPERATURE_SELECTED:
      return {
        ...state,
        isDpfTemperatureSelected: action.data,
      };
    case SET_ENGINE_RUN_TIME:
      return {
        ...state,
        engineRunTime: action.data,
      };
    case SET_ENGINE_RUN_TIME_SELECTED:
      return {
        ...state,
        isEngineRunTimeSelected: action.data,
      };

    default:
      return state;
  }
};

export default paramReducer;
