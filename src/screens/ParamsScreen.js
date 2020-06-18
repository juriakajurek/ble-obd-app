import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {
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
} from '../actions/actions';

import * as constants from '../../assets/constants';
import ParamLabel from '../components/ParamLabel';
import {responseConverter} from '../responseConverter';

const ParamsScreen = props => {
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

  const btModule = useSelector(state => state.main.btModule);
  const selectedDevice = useSelector(state => state.main.selectedDevice);

  const dispatch = useDispatch();

  const getParam = async (code, callback) => {
    await btModule.setupNotifications(selectedDevice, '01' + code, tab => {
      if (tab[0].toString().includes('ELM327')) {
        return '0';
      }

      let index = tab.findIndex(el => {
        return el.toString() == code;
      });

      if (index != -1) {
        let hex = [tab[index + 1].toString(), tab[index + 2].toString()];
        let value = responseConverter(code, hex);
        if (typeof callback !== 'function') {
          callback = false;
        }
        if (callback) {
          callback(value);
        }
        return value.toString();
      } else return '0';
    });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.heading}>
        <Text style={styles.headerTitle}>
          Wybierz parametr aby odczytać jego aktualną wartość.
        </Text>
        <Text style={styles.headerDescription}>
          Przytrzymaj aby zaznaczyć wiele.
        </Text>
      </View>
      <View style={styles.labelContainer}>
        <ParamLabel
          isSelected={isEngineLoadSelected}
          title="Obliczone obciążenie silnika [%]"
          value={engineLoad}
          onPress={() => {
            getParam('04', value => {
              dispatch(setEngineLoad(value));
            });
          }}
          onLongPress={() => {
            dispatch(setEngineLoadSelected(!isEngineLoadSelected));
          }}
        />
        <ParamLabel
          isSelected={isCoolantTemperatureSelected}
          title="Temperatura cieczy chłodzącej [°C]"
          value={coolantTemperature}
          onPress={() => {
            getParam('05', value => {
              dispatch(setCoolantTemperature(value));
            });
          }}
          onLongPress={() => {
            console.log(isCoolantTemperatureSelected);
            dispatch(
              setCoolantTemperatureSelected(!isCoolantTemperatureSelected)
            );
            console.log(isCoolantTemperatureSelected);
          }}
        />
        <ParamLabel
          isSelected={isFuelPressureSelected}
          title="Ciśnienie paliwa [kPa]"
          value={fuelPressure}
          onPress={() => {
            getParam('0A', value => {
              dispatch(setFuelPressure(value));
            });
          }}
          onLongPress={() => {
            dispatch(setFuelPressureSelected(!isFuelPressureSelected));
          }}
        />
        <ParamLabel
          isSelected={isIntakeManifoldPressureSelected}
          title="Ciśnienie w kolektorze dolotowym [kPa]"
          value={intakeManifoldPressure}
          onPress={() => {
            getParam('0B', value => {
              dispatch(setIntakeManifoldPressure(value));
            });
          }}
          onLongPress={() => {
            dispatch(
              setIntakeManifoldPressureSelected(
                !isIntakeManifoldPressureSelected
              )
            );
          }}
        />
        <ParamLabel
          isSelected={isRpmSelected}
          title="Prędkośc obrotowa silnika [1/s]"
          value={rpm}
          onPress={() => {
            getParam('0C', value => {
              dispatch(setRpm(value));
            });
          }}
          onLongPress={() => {
            dispatch(setRpmSelected(!isRpmSelected));
          }}
        />
        <ParamLabel
          isSelected={isSpeedSelected}
          title="Prędkość pojazdu [km/h]"
          value={speed}
          onPress={() => {
            getParam('0D', value => {
              dispatch(setSpeed(value));
            });
          }}
          onLongPress={() => {
            dispatch(setSpeedSelected(!isSpeedSelected));
          }}
        />
        <ParamLabel
          isSelected={isTimingAdvanceSelected}
          title="Stopień przed GMP [°]"
          value={timingAdvance}
          onPress={() => {
            getParam('0E', value => {
              dispatch(setTimingAdvance(value));
            });
          }}
          onLongPress={() => {
            dispatch(setTimingAdvanceSelected(!isTimingAdvanceSelected));
          }}
        />
        <ParamLabel
          isSelected={isIntakeAirTemperatureSelected}
          title="Temperatura pobieranego powietrza [°C]"
          value={intakeAirTemperature}
          onPress={() => {
            getParam('0F', value => {
              dispatch(setIntakeAirTemperature(value));
            });
          }}
          onLongPress={() => {
            dispatch(
              setIntakeAirTemperatureSelected(!isIntakeAirTemperatureSelected)
            );
          }}
        />
        <ParamLabel
          isSelected={isAirFlowRateSelected}
          title="Przepływ powietrza [g/s]"
          value={airFlowRate}
          onPress={() => {
            getParam('10', value => {
              dispatch(setAirFlowRate(value));
            });
          }}
          onLongPress={() => {
            dispatch(setAirFlowRateSelected(!isAirFlowRateSelected));
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: constants.bgColor,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  heading: {
    padding: 10,
    width: '80%',
  },
  headerTitle: {
    textAlign: 'center',

    fontSize: 18,
  },
  headerDescription: {
    textAlign: 'center',
  },
  labelContainer: {
    width: '80%',
    alignItems: 'center',
  },
});

export default ParamsScreen;
