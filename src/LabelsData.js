import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import ParamLabel from './components/ParamLabel';
import {responseConverter} from './responseConverter';

import {useSelector, useDispatch} from 'react-redux';
import {
  setTimer1,
  setTimer2,
  setTimer3,
  setTimer4,
  setRpm,
  setRpmSelected,
  setEngineLoad,
  setEngineLoadSelected,
  setCoolantTemperature,
  setCoolantTemperatureSelected,
  setFuelPressure,
  setFuelPressureSelected,
  setIntakeManifoldPressure,
  setIntakeManifoldPressureSelected,
  setSpeed,
  setSpeedSelected,
  setTimingAdvance,
  setTimingAdvanceSelected,
  setIntakeAirTemperature,
  setIntakeAirTemperatureSelected,
  setAirFlowRate,
  setAirFlowRateSelected,
  setThrottlePosition,
  setThrottlePositionSelected,
  setDistanceTraveledWithMilOn,
  setDistanceTraveledWithMilOnSelected,
  setFuelRailPressure,
  setFuelRailPressureSelected,
  setFuelRailGauge,
  setFuelRailGaugeSelected,
  setCommandedEgr,
  setCommandedEgrSelected,
  setEgrError,
  setEgrErrorSelected,
  setFuelLevel,
  setFuelLevelSelected,
  setWarmUpsSinceCodesCleared,
  setWarmUpsSinceCodesClearedSelected,
  setDistanceTraveledSinceCodesClearedSelected,
  setDistanceTraveledSinceCodesCleared,
  setControlModuleVoltageSelected,
  setControlModuleVoltage,
  setFuelAirCommandedEquivalenceRatio,
  setFuelAirCommandedEquivalenceRatioSelected,
  setRelativeThrottlePosition,
  setRelativeThrottlePositionSelected,
  setAmbientAirTemperature,
  setAmbientAirTemperatureSelected,
  setTimeRunWithMilOnSelected,
  setTimeRunWithMilOn,
  setTimeSinceTroubleCodesCleared,
  setTimeSinceTroubleCodesClearedSelected,
  setFuelType,
  setFuelTypeSelected,
  setFuelRailAbsolutePressure,
  setFuelRailAbsolutePressureSelected,
  setRelativeAcceleratorPedalPosition,
  setRelativeAcceleratorPedalPositionSelected,
  setEngineOilTemperature,
  setEngineOilTemperatureSelected,
  setFuelInjectionTiming,
  setFuelInjectionTimingSelected,
  setEngineFuelRate,
  setEngineFuelRateSelected,
  setDriversDemandEnginePercentTorque,
  setDriversDemandEnginePercentTorqueSelected,
  setActualEnginePercentTorque,
  setActualEnginePercentTorqueSelected,
  setEngineReferenceTorque,
  setEngineReferenceTorqueSelected,
  setDpfTemperature,
  setDpfTemperatureSelected,
  setEngineRunTime,
  setEngineRunTimeSelected,
  setRunTimeSinceEngineStart,
  setRunTimeSinceEngineStartSelected,
} from './actions/actions';

const LabelsData = () => {
  const checkTimer = i => {
    if (
      timer1.index == -1 ||
      timer2.index == -1 ||
      timer3.index == -1 ||
      timer4.index == -1
    ) {
      if (
        //jesli element nie jest w zadnym timerze
        i != timer1.index ||
        i != timer2.index ||
        i != timer3.index ||
        i != timer4.index
      ) {
        let timer = findFreeTimer();

        switch (timer) {
          case 1: {
            dispatch(
              setTimer1({
                id: setInterval(() => {
                  console.log('CHCIAŁBYM POBRAĆ DANE.1..');
                  onPress[i]();
                }, 4000),
                index: i,
              })
            );
            break;
          }
          case 2: {
            dispatch(
              setTimer2({
                id: setInterval(() => {
                  console.log('CHCIAŁBYM POBRAĆ DANE.2..');
                  onPress[i]();
                }, 4000),
                index: i,
              })
            );
            break;
          }
          case 3: {
            dispatch(
              setTimer3({
                id: setInterval(() => {
                  console.log('CHCIAŁBYM POBRAĆ DANE.3..');
                  onPress[i]();
                }, 4000),
                index: i,
              })
            );
            break;
          }
          case 4: {
            dispatch(
              setTimer4({
                id: setInterval(() => {
                  console.log('CHCIAŁBYM POBRAĆ DANE.4..');
                  onPress[i]();
                }, 4000),
                index: i,
              })
            );
            break;
          }
          case -1:
            console.log('Brak wolnego timera');
          default:
        }
      }
    }
  };

  const removeTimer = index => {
    switch (index) {
      case timer1.index: {
        clearInterval(timer1.id);
        dispatch(setTimer1({id: {}, index: -1}));
        break;
      }
      case timer2.index: {
        clearInterval(timer2.id);
        dispatch(setTimer2({id: {}, index: -1}));
        break;
      }
      case timer3.index: {
        clearInterval(timer3.id);
        dispatch(setTimer3({id: {}, index: -1}));
        break;
      }
      case timer4.index: {
        clearInterval(timer4.id);
        dispatch(setTimer4({id: {}, index: -1}));
        break;
      }
      default:
        break;
    }
  };

  const btModule = useSelector(state => state.main.btModule);
  const selectedDevice = useSelector(state => state.main.selectedDevice);

  const timer1 = useSelector(state => state.params.timer1);
  const timer2 = useSelector(state => state.params.timer2);
  const timer3 = useSelector(state => state.params.timer3);
  const timer4 = useSelector(state => state.params.timer4);
  const engineLoad = useSelector(state => state.params.engineLoad);
  const isEngineLoadSelected = useSelector(
    state => state.params.isEngineLoadSelected
  );
  const coolantTemperature = useSelector(
    state => state.params.coolantTemperature
  );
  const isCoolantTemperatureSelected = useSelector(
    state => state.params.isCoolantTemperatureSelected
  );
  const fuelPressure = useSelector(state => state.params.fuelPressure);
  const isFuelPressureSelected = useSelector(
    state => state.params.isFuelPressureSelected
  );
  const intakeManifoldPressure = useSelector(
    state => state.params.intakeManifoldPressure
  );
  const isIntakeManifoldPressureSelected = useSelector(
    state => state.params.isIntakeManifoldPressureSelected
  );
  const rpm = useSelector(state => state.params.rpm);
  const isRpmSelected = useSelector(state => state.params.isRpmSelected);
  const speed = useSelector(state => state.params.speed);
  const isSpeedSelected = useSelector(state => state.params.isSpeedSelected);
  const timingAdvance = useSelector(state => state.params.timingAdvance);
  const isTimingAdvanceSelected = useSelector(
    state => state.params.isTimingAdvanceSelected
  );
  const intakeAirTemperature = useSelector(
    state => state.params.intakeAirTemperature
  );
  const isIntakeAirTemperatureSelected = useSelector(
    state => state.params.isIntakeAirTemperatureSelected
  );
  const airFlowRate = useSelector(state => state.params.airFlowRate);
  const isAirFlowRateSelected = useSelector(
    state => state.params.isAirFlowRateSelected
  );
  const throttlePosition = useSelector(state => state.params.throttlePosition);
  const isThrottlePositionSelected = useSelector(
    state => state.params.isThrottlePositionSelected
  );
  const runTimeSinceEngineStart = useSelector(
    state => state.params.runTimeSinceEngineStart
  );
  const isRunTimeSinceEngineStartSelected = useSelector(
    state => state.params.isRunTimeSinceEngineStartSelected
  );
  const distanceTraveledWithMilOn = useSelector(
    state => state.params.distanceTraveledWithMilOn
  );
  const isDistanceTraveledWithMilOnSelected = useSelector(
    state => state.params.isDistanceTraveledWithMilOnSelected
  );
  const fuelRailPressure = useSelector(state => state.params.fuelRailPressure);
  const isFuelRailPressureSelected = useSelector(
    state => state.params.isFuelRailPressureSelected
  );
  const fuelRailGauge = useSelector(state => state.params.fuelRailGauge);
  const isFuelRailGaugeSelected = useSelector(
    state => state.params.isFuelRailGaugeSelected
  );
  const commandedEgr = useSelector(state => state.params.commandedEgr);
  const isCommandedEgrSelected = useSelector(
    state => state.params.isCommandedEgrSelected
  );
  const egrError = useSelector(state => state.params.egrError);
  const isEgrErrorSelected = useSelector(
    state => state.params.isEgrErrorSelected
  );
  const fuelLevel = useSelector(state => state.params.fuelLevel);
  const isFuelLevelSelected = useSelector(
    state => state.params.isFuelLevelSelected
  );
  const warmUpsSinceCodesCleared = useSelector(
    state => state.params.warmUpsSinceCodesCleared
  );
  const isWarmUpsSinceCodesClearedSelected = useSelector(
    state => state.params.isWarmUpsSinceCodesClearedSelected
  );
  const distanceTraveledSinceCodesCleared = useSelector(
    state => state.params.distanceTraveledSinceCodesCleared
  );
  const isDistanceTraveledSinceCodesClearedSelected = useSelector(
    state => state.params.isDistanceTraveledSinceCodesClearedSelected
  );
  const controlModuleVoltage = useSelector(
    state => state.params.controlModuleVoltage
  );
  const isControlModuleVoltageSelected = useSelector(
    state => state.params.isControlModuleVoltageSelected
  );
  const fuelAirCommandedEquivalenceRatio = useSelector(
    state => state.params.fuelAirCommandedEquivalenceRatio
  );
  const isFuelAirCommandedEquivalenceRatioSelected = useSelector(
    state => state.params.isFuelAirCommandedEquivalenceRatioSelected
  );
  const relativeThrottlePosition = useSelector(
    state => state.params.relativeThrottlePosition
  );
  const IsRelativeThrottlePositionSelected = useSelector(
    state => state.params.IsRelativeThrottlePositionSelected
  );
  const ambientAirTemperature = useSelector(
    state => state.params.ambientAirTemperature
  );
  const IsAmbientAirTemperatureSelected = useSelector(
    state => state.params.IsAmbientAirTemperatureSelected
  );
  const timeRunWithMilOn = useSelector(state => state.params.timeRunWithMilOn);
  const isTimeRunWithMilOnSelected = useSelector(
    state => state.params.isTimeRunWithMilOnSelected
  );
  const timeSinceTroubleCodesCleared = useSelector(
    state => state.params.timeSinceTroubleCodesCleared
  );
  const isTimeSinceTroubleCodesClearedSelected = useSelector(
    state => state.params.isTimeSinceTroubleCodesClearedSelected
  );
  const fuelType = useSelector(state => state.params.fuelType);
  const isFuelTypeSelected = useSelector(
    state => state.params.isFuelTypeSelected
  );
  const fuelRailAbsolutePressure = useSelector(
    state => state.params.fuelRailAbsolutePressure
  );
  const isFuelRailAbsolutePressureSelected = useSelector(
    state => state.params.isFuelRailAbsolutePressureSelected
  );
  const relativeAcceleratorPedalPosition = useSelector(
    state => state.params.relativeAcceleratorPedalPosition
  );
  const isRelativeAcceleratorPedalPositionSelected = useSelector(
    state => state.params.isRelativeAcceleratorPedalPositionSelected
  );
  const engineOilTemperature = useSelector(
    state => state.params.engineOilTemperature
  );
  const isEngineOilTemperatureSelected = useSelector(
    state => state.params.isEngineOilTemperatureSelected
  );
  const fuelInjectionTiming = useSelector(
    state => state.params.fuelInjectionTiming
  );
  const isFuelInjectionTimingSelected = useSelector(
    state => state.params.isFuelInjectionTimingSelected
  );
  const engineFuelRate = useSelector(state => state.params.engineFuelRate);
  const isEngineFuelRateSelected = useSelector(
    state => state.params.isEngineFuelRateSelected
  );
  const driversDemandEnginePercentTorque = useSelector(
    state => state.params.driversDemandEnginePercentTorque
  );
  const isDriversDemandEnginePercentTorqueSelected = useSelector(
    state => state.params.isDriversDemandEnginePercentTorqueSelected
  );
  const actualEnginePercentTorque = useSelector(
    state => state.params.actualEnginePercentTorque
  );
  const isActualEnginePercentTorqueSelected = useSelector(
    state => state.params.isActualEnginePercentTorqueSelected
  );
  const engineReferenceTorque = useSelector(
    state => state.params.engineReferenceTorque
  );
  const isEngineReferenceTorqueSelected = useSelector(
    state => state.params.isEngineReferenceTorqueSelected
  );
  const dpfTemperature = useSelector(state => state.params.dpfTemperature);
  const isDpfTemperatureSelected = useSelector(
    state => state.params.isDpfTemperatureSelected
  );
  const engineRunTime = useSelector(state => state.params.engineRunTime);
  const isEngineRunTimeSelected = useSelector(
    state => state.params.isEngineRunTimeSelected
  );

  const dispatch = useDispatch();

  const findFreeTimer = () => {
    if (timer1.index == -1) return 1;
    if (timer2.index == -1) return 2;
    if (timer3.index == -1) return 3;
    if (timer4.index == -1) return 4;
    return -1;
  };

  const getParam = async (code, callback) => {
    await btModule.setupNotifications(selectedDevice, '01' + code, val => {
      let tab = val.split(' ');

      if (tab[0].toString().includes('ELM327')) {
        return '0';
      }

      let index = tab.findIndex(el => {
        return el.toString() == code;
      });

      if (index != -1) {
        let hex;
        if (tab[index + 2]) {
          hex = [tab[index + 1].toString(), tab[index + 2].toString()];
        } else {
          hex = [tab[index + 1].toString()];
        }
        let value = responseConverter(code, hex);
        if (typeof callback !== 'function') {
          callback = false;
        }
        if (callback) {
          callback(value);
        }
        console.log('value: ' + value.toString());
        return value.toString();
      } else return '0';
    });
  };

  const isSelected = [
    isEngineLoadSelected,
    isCoolantTemperatureSelected,
    isFuelPressureSelected,
    isIntakeManifoldPressureSelected,
    isRpmSelected,
    isSpeedSelected,
    isTimingAdvanceSelected,
    isIntakeAirTemperatureSelected,
    isAirFlowRateSelected,
    isThrottlePositionSelected,
    isRunTimeSinceEngineStartSelected,
    isDistanceTraveledWithMilOnSelected,
    isFuelRailPressureSelected,
    isFuelRailGaugeSelected,
    isCommandedEgrSelected,
    isEgrErrorSelected,
    isFuelLevelSelected,
    isWarmUpsSinceCodesClearedSelected,
    isDistanceTraveledSinceCodesClearedSelected,
    isControlModuleVoltageSelected,
    isFuelAirCommandedEquivalenceRatioSelected,
    IsRelativeThrottlePositionSelected,
    IsAmbientAirTemperatureSelected,
    isTimeRunWithMilOnSelected,
    isTimeSinceTroubleCodesClearedSelected,
    isFuelTypeSelected,
    isFuelRailAbsolutePressureSelected,
    isRelativeAcceleratorPedalPositionSelected,
    isEngineOilTemperatureSelected,
    isFuelInjectionTimingSelected,
    isEngineFuelRateSelected,
    isDriversDemandEnginePercentTorqueSelected,
    isActualEnginePercentTorqueSelected,
    isEngineReferenceTorqueSelected,
    isDpfTemperatureSelected,
    isEngineRunTimeSelected,
  ];

  const title = [
    'Obliczone obciążenie silnika [%]',
    'Temperatura cieczy chłodzącej [°C]',
    'Ciśnienie paliwa [kPa]',
    'Ciśnienie w kolektorze dolotowym [kPa]',
    'Prędkośc obrotowa silnika [1/s]',
    'Prędkość pojazdu [km/h]',
    'Stopień przed górnym martwym położeniem tłoka [°]',
    'Temperatura pobieranego powietrza [°C]',
    'Przepływ powietrza [g/s]',
    'Pozycja przepustnicy [%]',
    'Czas który upłynął od uruchomienia silnika [s]',
    'Dystans przejechany od zapalenia kontrolki sygnalizującej usterki [km]',
    'Ciśnienie w szynie paliwa (w stosunku do ciśnienia w kolektorze dolotowym) [kPa]',
    'Ciśnienie w szynie paliwa (z czujnika ciśnienia) [kPa]',
    'Zadany dla EGR stopień recyrkulacji spalin [%]',
    'Błąd EGR (różnica pomiędzy wartością zadaną a rzeczywistą zaworu EGR) [%]',
    'Poziom paliwa [%]',
    'Liczba uruchomień silnika od czasu wykasowania pamięci błędów',
    'Dystans przejechany od czasu wykasowania pamięci błędów [km]',
    'Napięcie modułu sterującego [V]',
    'Zadany stosunek współczynnika paliwo-powietrze',
    'Względny stopień otwarcia przepustnicy [%]',
    'Temperatura otoczenia [°C]',
    'Czas jaki upłynął od zapalenia kontrolki sygnalizującej usterki [min]',
    'Czas jaki upłynął od wyczyszczenia pamięci błędów [min]',
    'Typ paliwa',
    'Ciśnienie absolutne szyny paliwa [kPa]',
    'Względna pozycja pedału przyspieszenia [%]',
    'Temperatura oleju silnikowego [°C]',
    'Kąt wyprzedzenia wtrysku paliwa [°]',
    'Spalanie silnika [L/h]',
    'Zadany moment obrotowy silnika [%]',
    'Rzeczywisty moment obrotowy silnika [%]',
    'Względny moment obrotowy silnika[Nm]',
    'Temperatura DPF [°C]',
    'Czas pracy silnika [s]',
  ];

  const val = [
    engineLoad,
    coolantTemperature,
    fuelPressure,
    intakeManifoldPressure,
    rpm,
    speed,
    timingAdvance,
    intakeAirTemperature,
    airFlowRate,
    throttlePosition,
    runTimeSinceEngineStart,
    distanceTraveledWithMilOn,
    fuelRailPressure,
    fuelRailGauge,
    commandedEgr,
    egrError,
    fuelLevel,
    warmUpsSinceCodesCleared,
    distanceTraveledSinceCodesCleared,
    controlModuleVoltage,
    fuelAirCommandedEquivalenceRatio,
    relativeThrottlePosition,
    ambientAirTemperature,
    timeRunWithMilOn,
    timeSinceTroubleCodesCleared,
    fuelType,
    fuelRailAbsolutePressure,
    relativeAcceleratorPedalPosition,
    engineOilTemperature,
    fuelInjectionTiming,
    engineFuelRate,
    driversDemandEnginePercentTorque,
    actualEnginePercentTorque,
    engineReferenceTorque,
    dpfTemperature,
    engineRunTime,
  ];

  const onPress = [
    () => {
      getParam('04', value => {
        dispatch(setEngineLoad(value));
        console.log('setted engine load ' + value);
      });
    },
    () => {
      getParam('05', value => {
        dispatch(setCoolantTemperature(value));
      });
    },
    () => {
      getParam('0A', value => {
        dispatch(setFuelPressure(value));
      });
    },
    () => {
      getParam('0B', value => {
        if (value != '1') dispatch(setIntakeManifoldPressure(value));
      });
    },
    () => {
      getParam('0C', value => {
        dispatch(setRpm(value));
      });
    },
    () => {
      getParam('0D', value => {
        dispatch(setSpeed(value));
      });
    },
    () => {
      getParam('0E', value => {
        dispatch(setTimingAdvance(value));
      });
    },
    () => {
      getParam('0F', value => {
        dispatch(setIntakeAirTemperature(value));
      });
    },
    () => {
      getParam('10', value => {
        dispatch(setAirFlowRate(value));
      });
    },
    () => {
      getParam('11', value => {
        dispatch(setThrottlePosition(value));
      });
    },
    () => {
      getParam('1F', value => {
        dispatch(setRunTimeSinceEngineStart(value));
      });
    },
    () => {
      getParam('21', value => {
        dispatch(setDistanceTraveledWithMilOn(value));
      });
    },
    () => {
      getParam('22', value => {
        dispatch(setFuelRailPressure(value));
      });
    },
    () => {
      getParam('23', value => {
        dispatch(setFuelRailGauge(value));
      });
    },
    () => {
      getParam('2C', value => {
        dispatch(setCommandedEgr(value));
      });
    },
    () => {
      getParam('2D', value => {
        dispatch(setEgrError(value));
      });
    },
    () => {
      getParam('2F', value => {
        dispatch(setFuelLevel(value));
      });
    },
    () => {
      getParam('30', value => {
        dispatch(setWarmUpsSinceCodesCleared(value));
      });
    },
    () => {
      getParam('31', value => {
        dispatch(setDistanceTraveledSinceCodesCleared(value));
      });
    },
    () => {
      getParam('42', value => {
        dispatch(setControlModuleVoltage(value));
      });
    },
    () => {
      getParam('44', value => {
        dispatch(setFuelAirCommandedEquivalenceRatio(value));
      });
    },
    () => {
      getParam('45', value => {
        dispatch(setRelativeThrottlePosition(value));
      });
    },
    () => {
      getParam('46', value => {
        dispatch(setAmbientAirTemperature(value));
      });
    },
    () => {
      getParam('4D', value => {
        dispatch(setTimeRunWithMilOn(value));
      });
    },
    () => {
      getParam('4E', value => {
        dispatch(setTimeSinceTroubleCodesCleared(value));
      });
    },
    () => {
      getParam('51', value => {
        dispatch(setFuelType(value));
      });
    },
    () => {
      getParam('59', value => {
        dispatch(setFuelRailAbsolutePressure(value));
      });
    },
    () => {
      getParam('5A', value => {
        dispatch(setRelativeAcceleratorPedalPosition(value));
      });
    },
    () => {
      getParam('5C', value => {
        dispatch(setEngineOilTemperature(value));
      });
    },
    () => {
      getParam('5D', value => {
        dispatch(setFuelInjectionTiming(value));
      });
    },
    () => {
      getParam('5E', value => {
        dispatch(setEngineFuelRate(value));
      });
    },
    () => {
      getParam('61', value => {
        dispatch(setDriversDemandEnginePercentTorque(value));
      });
    },
    () => {
      getParam('62', value => {
        dispatch(setActualEnginePercentTorque(value));
      });
    },
    () => {
      getParam('63', value => {
        dispatch(setEngineReferenceTorque(value));
      });
    },
    () => {
      getParam('7C', value => {
        dispatch(setDpfTemperature(value));
      });
    },
    () => {
      getParam('7F', value => {
        dispatch(setEngineRunTime(value));
      });
    },
  ];

  const onLongPress = [
    () => {
      if (isEngineLoadSelected) {
        dispatch(setEngineLoadSelected(false));
        removeTimer(0);
      } else {
        if (findFreeTimer() != -1) {
          dispatch(setEngineLoadSelected(true));
          checkTimer(0);
        }
      }
    },
    () => {
      if (isCoolantTemperatureSelected) {
        dispatch(setCoolantTemperatureSelected(false));
        removeTimer(1);
      } else {
        if (findFreeTimer() != -1) {
          dispatch(setCoolantTemperatureSelected(true));
          checkTimer(1);
        }
      }
    },
    () => {
      if (isFuelPressureSelected) {
        dispatch(setFuelPressureSelected(false));
        removeTimer(2);
      } else {
        if (findFreeTimer() != -1) {
          dispatch(setFuelPressureSelected(true));
          checkTimer(2);
        }
      }
    },
    () => {
      if (isIntakeManifoldPressureSelected) {
        dispatch(setIntakeManifoldPressureSelected(false));
        removeTimer(3);
      } else {
        if (findFreeTimer() != -1) {
          dispatch(setIntakeManifoldPressureSelected(true));
          checkTimer(3);
        }
      }
    },
    () => {
      if (isRpmSelected) {
        dispatch(setRpmSelected(false));
        removeTimer(4);
      } else {
        if (findFreeTimer() != -1) {
          dispatch(setRpmSelected(true));
          checkTimer(4);
        }
      }
    },
    () => {
      if (isSpeedSelected) {
        dispatch(setSpeedSelected(false));
        removeTimer(5);
      } else {
        if (findFreeTimer() != -1) {
          dispatch(setSpeedSelected(true));
          checkTimer(5);
        }
      }
    },
    () => {
      if (isTimingAdvanceSelected) {
        dispatch(setTimingAdvanceSelected(false));
        removeTimer(6);
      } else {
        if (findFreeTimer() != -1) {
          dispatch(setTimingAdvanceSelected(true));
          checkTimer(6);
        }
      }
    },
    () => {
      if (isIntakeAirTemperatureSelected) {
        dispatch(setIntakeAirTemperatureSelected(false));
        removeTimer(7);
      } else {
        if (findFreeTimer() != -1) {
          dispatch(setIntakeAirTemperatureSelected(true));
          checkTimer(7);
        }
      }
    },
    () => {
      dispatch(setAirFlowRateSelected(!isAirFlowRateSelected));
    },
    () => {
      dispatch(setThrottlePositionSelected(!isThrottlePositionSelected));
    },
    () => {
      dispatch(
        setRunTimeSinceEngineStartSelected(!isRunTimeSinceEngineStartSelected)
      );
    },
    () => {
      dispatch(
        setDistanceTraveledWithMilOnSelected(
          !isDistanceTraveledWithMilOnSelected
        )
      );
    },
    () => {
      dispatch(setFuelRailPressureSelected(!isFuelRailPressureSelected));
    },
    () => {
      dispatch(setFuelRailGaugeSelected(!isFuelRailGaugeSelected));
    },
    () => {
      dispatch(setCommandedEgrSelected(!isCommandedEgrSelected));
    },
    () => {
      dispatch(setEgrErrorSelected(!isEgrErrorSelected));
    },
    () => {
      dispatch(setFuelLevelSelected(!isFuelLevelSelected));
    },
    () => {
      dispatch(
        setWarmUpsSinceCodesClearedSelected(!isWarmUpsSinceCodesClearedSelected)
      );
    },
    () => {
      dispatch(
        setDistanceTraveledSinceCodesClearedSelected(
          !isDistanceTraveledSinceCodesClearedSelected
        )
      );
    },
    () => {
      dispatch(
        setControlModuleVoltageSelected(!isControlModuleVoltageSelected)
      );
    },
    () => {
      dispatch(
        setFuelAirCommandedEquivalenceRatioSelected(
          !isFuelAirCommandedEquivalenceRatioSelected
        )
      );
    },
    () => {
      dispatch(
        setRelativeThrottlePositionSelected(!IsRelativeThrottlePositionSelected)
      );
    },
    () => {
      dispatch(
        setAmbientAirTemperatureSelected(!IsAmbientAirTemperatureSelected)
      );
    },
    () => {
      dispatch(setTimeRunWithMilOnSelected(!isTimeRunWithMilOnSelected));
    },
    () => {
      dispatch(
        setTimeSinceTroubleCodesClearedSelected(
          !isTimeSinceTroubleCodesClearedSelected
        )
      );
    },
    () => {
      dispatch(setFuelTypeSelected(!isFuelTypeSelected));
    },
    () => {
      dispatch(
        setFuelRailAbsolutePressureSelected(!isFuelRailAbsolutePressureSelected)
      );
    },
    () => {
      dispatch(
        setRelativeAcceleratorPedalPositionSelected(
          !isRelativeAcceleratorPedalPositionSelected
        )
      );
    },
    () => {
      dispatch(
        setEngineOilTemperatureSelected(!isEngineOilTemperatureSelected)
      );
    },
    () => {
      dispatch(setFuelInjectionTimingSelected(!isFuelInjectionTimingSelected));
    },
    () => {
      dispatch(setEngineFuelRateSelected(!isEngineFuelRateSelected));
    },
    () => {
      dispatch(
        setDriversDemandEnginePercentTorqueSelected(
          !isDriversDemandEnginePercentTorqueSelected
        )
      );
    },
    () => {
      dispatch(
        setActualEnginePercentTorqueSelected(
          !isActualEnginePercentTorqueSelected
        )
      );
    },
    () => {
      dispatch(
        setEngineReferenceTorqueSelected(!isEngineReferenceTorqueSelected)
      );
    },
    () => {
      dispatch(setDpfTemperatureSelected(!isDpfTemperatureSelected));
    },
    () => {
      dispatch(setEngineRunTimeSelected(!isEngineRunTimeSelected));
    },
  ];

  const getData = () => {
    let arr = [];

    for (i = 0; i < isSelected.length; i++) {
      let newObj = {
        key: i,
        isSelected: isSelected[i],
        title: title[i],
        value: val[i],
        onPress: onPress[i],
        onLongPress: onLongPress[i],
      };
      arr.push(newObj);
    }
    return arr;
  };

  let arr = [];

  for (i = 0; i < isSelected.length; i++) {
    let newObj = {
      key: i,
      isSelected: isSelected[i],
      title: title[i],
      value: val[i],
      onPress: onPress[i],
      onLongPress: onLongPress[i],
    };
    arr.push(newObj);
  }
  return arr;
};

export default LabelsData;
