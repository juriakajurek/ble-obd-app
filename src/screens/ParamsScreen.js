import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {setRpm, setRpmSelected} from '../actions/actions';

import * as constants from '../../assets/constants';
import ParamLabel from '../components/ParamLabel';

const ParamsScreen = props => {
  const rpm = useSelector(state => state.params.rpm);
  const isRpmSelected = useSelector(state => state.params.isRpmSelected);
  const btModule = useSelector(state => state.main.btModule);
  const selectedDevice = useSelector(state => state.main.selectedDevice);
  const response = useSelector(state => state.main.response);

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(isRpmSelected);
  });

  const getRpm = () => {
    btModule.setupNotifications(selectedDevice, '010C').then(() => {
      console.log(response.toString(10));
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
          isSelected={isRpmSelected}
          title="Obroty silnika"
          value={rpm}
          onPress={() => {
            getRpm();
            dispatch(setRpm(200));
          }}
          onLongPress={() => {
            dispatch(setRpmSelected(!isRpmSelected));
          }}
        />
        <ParamLabel
          title="Prędkość"
          value="300"
          onPress={() => {}}
          onLongPress={() => {}}
        />
        <ParamLabel
          title="Temperatura cieczy chłodzącej a nawet jeszcze dłuższy parametr"
          value="100"
          onPress={() => {}}
          onLongPress={() => {}}
        />
        <ParamLabel
          title="Napięcie akumulatora"
          value="12.8"
          onPress={() => {}}
          onLongPress={() => {}}
        />
        <Text>{'aa' + isRpmSelected}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: constants.bgColor,
    marginTop: 15,
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
