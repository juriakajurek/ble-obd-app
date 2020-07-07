import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ImageBackground,
  StatusBar,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';

import MainLabel from '../components/MainLabel';
import * as constants from '../../assets/constants';

import {ScrollView} from 'react-native-gesture-handler';
import {setInfo, setVinNumber} from '../actions/actions';

function MainScreen({navigation}) {
  const carInfo = useSelector(state => state.main.info);
  const selectedDevice = useSelector(state => state.main.selectedDevice);
  const vinNumber = useSelector(state => state.main.vinNumber);
  const dispatch = useDispatch();

  useEffect(() => {
    StatusBar.setHidden(true);
    console.disableYellowBox = true;

    if (selectedDevice && selectedDevice.name !== undefined) {
      if (!vinNumber) {
        dispatch(setInfo('Podłączone urządzenie: ' + selectedDevice.name));
      } else {
        dispatch(
          setInfo(
            'Podłączone urządzenie: ' +
              selectedDevice.name +
              '\n\nVIN pojazdu: ' +
              vinNumber
          )
        );
      }
    } else {
      dispatch(
        setInfo('Połącz się ze swoim samochodem przechodząc do Ustawień. ')
      );
    }
  });

  return (
    <View style={styles.screen}>
      <View style={styles.info}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="center"
            style={styles.logo}
            source={require('../../assets/boa_logo.png')}
          />
        </View>
        <View style={styles.carInfoTextContainer}>
          <ScrollView>
            <Text style={styles.carInfoText}>{carInfo}</Text>
          </ScrollView>
        </View>
      </View>
      <View style={styles.labelContainer}>
        <MainLabel
          style={styles.firstLabel}
          onPress={() => navigation.navigate('Params')}
          iconName="gauge">
          Parametry pojazdu
        </MainLabel>
        <MainLabel
          onPress={() => navigation.navigate('Errors')}
          iconName="engine">
          Błędy silnika
        </MainLabel>
        <MainLabel
          onPress={() => navigation.navigate('BlackBox')}
          iconName="treasure-chest">
          Czarna skrzynka
        </MainLabel>
        <MainLabel
          style={styles.lastLabel}
          onPress={() => navigation.navigate('Settings')}
          iconName="settings">
          Ustawienia
        </MainLabel>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: constants.bgColor,
    paddingBottom: 20,
    width: '100%',
    height: '100%',
  },
  info: {
    flex: 1,
    alignSelf: 'center',
    width: '70%',
  },
  carInfoTextContainer: {
    flex: 1,
    padding: 10,
  },
  carInfoText: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  imageContainer: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  logo: {
    width: 200,
    height: 200,
    opacity: 0.8,
  },
  labelContainer: {
    width: '100%',
    maxHeight: '50%',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  firstLabel: {
    borderTopLeftRadius: 15,
  },
  lastLabel: {
    borderBottomRightRadius: 15,
  },
});

export default MainScreen;
