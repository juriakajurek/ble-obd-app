import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import LottieView from 'lottie-react-native';

import * as constants from '../../assets/constants';
import MainLabel from '../components/MainLabel';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {setCodesShown} from '../actions/actions';

const TroubleCodesScreen = ({navigation}, props) => {
  const btModule = useSelector(state => state.main.btModule);
  const selectedDevice = useSelector(state => state.main.selectedDevice);
  const areCodesShown = useSelector(state => state.codes.areCodesShown);

  const dispatch = useDispatch();

  const getTroubleCodes = async callback => {
    await btModule.setupNotifications(selectedDevice, '03', tab => {
      if (tab[0].toString().includes('ELM327')) {
        return '0';
      }

      let index = tab.findIndex(el => {
        return el.toString() == '03';
      });

      if (index != -1) {
        let hex = [tab[index + 1].toString(), tab[index + 2].toString()];

        tab.forEach(element => {
          console.log(element);
        });

        // let value = responseConverter(code, hex);
        // if (typeof callback !== 'function') {
        //   callback = false;
        // }
        // if (callback) {
        //   callback(value);
        // }
        // return value.toString();
      } else return '0';
    });
  };

  const clearTroubleCodes = async () => {
    await btModule.setupNotifications(selectedDevice, '04', tab => {
      // if (tab[0].toString().includes('ELM327')) {
      //   return '0';
      // }

      let index = tab.findIndex(el => {
        return el.toString() == '04';
      });

      // if (index != -1) {
      //   let hex = [tab[index + 1].toString(), tab[index + 2].toString()];

      //   tab.forEach(element => {
      //     console.log(element);
      //   });

      // let value = responseConverter(code, hex);
      // if (typeof callback !== 'function') {
      //   callback = false;
      // }
      // if (callback) {
      //   callback(value);
      // }
      // return value.toString();
      // } else return '0';
    });
  };

  return (
    <View style={styles.screen}>
      {1 ? (
        <View>
          <View style={styles.heading}>
            {!areCodesShown ? (
              <View style={styles.logo}>
                <LottieView
                  style={{
                    ...styles.animation,
                    ...props.style,
                  }}
                  resizeMode="cover"
                  source={require('../../assets/error.json')}
                  autoPlay
                  loop
                />
              </View>
            ) : (
              <View style={styles.labelContainer}>
                <ScrollView>
                  <MainLabel style={styles.codeLabel} iconName="search-web">
                    P0104 drfdfdsfsdfsdsd
                  </MainLabel>
                  <MainLabel style={styles.codeLabel} iconName="search-web">
                    P0104 d
                  </MainLabel>
                  <MainLabel style={styles.codeLabel} iconName="search-web">
                    P0104 drfdfdsfsdfsdsddrfdfdsfsdfsdsd
                  </MainLabel>

                  <MainLabel style={styles.codeLabel} iconName="search-web">
                    P0104 d
                  </MainLabel>
                  <MainLabel style={styles.codeLabel} iconName="search-web">
                    P0104 drfdfdsfsdfsdsddrfdfdsfsdfsdsd
                  </MainLabel>
                  <MainLabel style={styles.codeLabel} iconName="search-web">
                    P0104 drfdfdsfsdfsdsd
                  </MainLabel>
                </ScrollView>
              </View>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <MainLabel
              style={styles.firstLabel}
              iconName="download-multiple"
              onPress={() => {
                if (areCodesShown) {
                  getTroubleCodes();
                } else {
                  getTroubleCodes();
                  dispatch(setCodesShown(!areCodesShown));
                }
              }}>
              Pobierz kody usterek
            </MainLabel>
            <MainLabel
              style={styles.lastLabel}
              iconName="trash-can"
              onPress={() => {
                clearTroubleCodes();
              }}>
              Kasuj błędy
            </MainLabel>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.warnWindow}
          onPress={() => {
            navigation.navigate('Settings');
          }}>
          <Text style={styles.warnText}>
            Połącz się z odbiornikiem Bluetooth, aby odczytywać i kasować kody
            błędów. Zrobisz to{' '}
            <Text style={styles.link}>przechodząc do ustawień.</Text>
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: constants.bgColor,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 10,
    alignItems: 'center',
    flex: 3,
  },
  logo: {
    width: 200,
    height: 200,
  },
  labelContainer: {
    marginTop: 40,
    width: '100%',
    maxHeight: '80%',
  },
  codeLabel: {
    maxWidth: '100%',
    minWidth: '100%',
    borderRadius: 5,
  },
  buttonContainer: {
    marginBottom: 20,
    width: '100%',
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  firstLabel: {
    borderTopLeftRadius: 25,
  },
  lastLabel: {
    borderBottomRightRadius: 25,
  },
  warnWindow: {
    padding: '5%',
    margin: '10%',
    alignSelf: 'center',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    opacity: 0.6,
  },
  warnText: {
    fontSize: 16,
    textAlign: 'center',
  },
  link: {
    color: 'blue',
    textDecorationColor: 'blue',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
});

export default TroubleCodesScreen;
