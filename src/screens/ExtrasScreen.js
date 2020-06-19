import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import LottieView from 'lottie-react-native';

import * as constants from '../../assets/constants';
import MainLabel from '../components/MainLabel';

const TroubleCodesScreen = props => {
  const btModule = useSelector(state => state.main.btModule);
  const selectedDevice = useSelector(state => state.main.selectedDevice);

  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <View style={styles.heading}>
        {/* <Text style={styles.headerTitle}>Extras</Text> */}
        <View style={styles.logo}>
          <LottieView
            style={{...styles.animation, ...props.style}}
            source={require('../../assets/gift.json')}
            resizeMode="cover"
            autoPlay
            loop
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <MainLabel
          style={{...styles.firstLabel, ...styles.lastLabel}}
          iconName="timer"
          onPress={() => {}}>
          Pomiar przyspieszenia
        </MainLabel>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: constants.bgColor,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  heading: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 3,
  },
  headerTitle: {
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 36,
    color: '#3D8CFC',
    fontWeight: 'bold',
    letterSpacing: 3,
  },
  logo: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    marginBottom: 20,
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
  },
  firstLabel: {
    borderTopLeftRadius: 25,
  },
  lastLabel: {
    borderBottomRightRadius: 25,
  },
});

export default TroubleCodesScreen;
