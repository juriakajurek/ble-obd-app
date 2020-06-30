import React from 'react';
import {StyleSheet, View, Text, Linking, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import LottieView from 'lottie-react-native';

import * as constants from '../../assets/constants';
import MainLabel from '../components/MainLabel';
import {
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native-gesture-handler';
import {
  setCodesShown,
  setTroubleCodesQuantity,
  setTroubleCodes,
} from '../actions/actions';

const TroubleCodesScreen = ({navigation}, props) => {
  const btModule = useSelector(state => state.main.btModule);
  const selectedDevice = useSelector(state => state.main.selectedDevice);
  const areCodesShown = useSelector(state => state.codes.areCodesShown);
  const troubleCodesQuantity = useSelector(
    state => state.codes.troubleCodesQuantity
  );
  const troubleCodes = useSelector(state => state.codes.troubleCodes);
  const dispatch = useDispatch();

  const searchInGoogle = async query => {
    let url = `https://www.google.com/search?hl=&site=&q=${query}`;
    if (Linking.canOpenURL(url)) {
      Linking.openURL(url);
    } else {
      console.log(`Don't know how to open this URL: ${url}`);
    }
  };

  const getTroubleCodes = async () => {
    await btModule.setupNotifications(selectedDevice, '03', val => {
      let tab = val.split(' ');
      console.log(tab);

      if (tab[0].toString().includes('ELM327')) {
        return '0';
      }

      let index = tab.findIndex(el => {
        return el.toString() == '43';
      });
      console.log('index: ' + index);

      if (index != -1) {
        let hex = [tab[index + 1].toString()];
        alert('Znaleziono ' + tab[index + 1].toString() + ' kodów błędów');

        let quantity = parseInt(tab[index + 1]);

        dispatch(setTroubleCodesQuantity(quantity));

        let codes = [];
        for (i = 0; i < quantity; i++) {
          hex.push(tab[index + 2 * i + 1].toString());
          hex.push(tab[index + 2 * i + 2].toString());

          codes.push(
            tab[index + 2 * i + 1].toString() +
              tab[index + 2 * i + 2].toString()
          );
        }

        dispatch(setTroubleCodes(codes));

        console.log('codes: ' + codes);
        return codes;
      } else return '0';
    });
  };

  const clearTroubleCodes = async () => {
    await btModule.setupNotifications(selectedDevice, '04', val => {
      // if (tab[0].toString().includes('ELM327')) {
      //   return '0';
      // }
      let tab = val.split(' ');
      console.log(tab);
      Alert.alert(
        '',
        'Polecenie wykasowania błędów zostało wysłane.',
        [{text: 'OK', onPress: () => {}}],
        {cancelable: true}
      );
    });
  };

  const keyExtractor = (item, index) => index.toString();
  const renderItem = ({item}) => (
    <MainLabel
      style={styles.codeLabel}
      iconName="search-web"
      onPress={() => {
        searchInGoogle(item.toString());
      }}>
      `P+${item.toString()}`
    </MainLabel>
  );

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
                {troubleCodesQuantity > 0 ? (
                  <FlatList
                    style={styles.list}
                    keyExtractor={keyExtractor}
                    data={troubleCodes}
                    renderItem={renderItem}
                  />
                ) : (
                  <View style={styles.warnWindow}>
                    <Text style={styles.warnText}>
                      Nie znaleziono żadnych błędów.
                    </Text>
                  </View>
                )}
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
    borderTopLeftRadius: 15,
  },
  lastLabel: {
    borderBottomRightRadius: 15,
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
  list: {
    width: '100%',
  },
  link: {
    color: 'blue',
    textDecorationColor: 'blue',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
});

export default TroubleCodesScreen;
