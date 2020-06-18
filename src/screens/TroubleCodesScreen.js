import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import LottieView from 'lottie-react-native';

import * as constants from '../../assets/constants';
import MainLabel from '../components/MainLabel';
import {ScrollView} from 'react-native-gesture-handler';
import {setCodesShown} from '../actions/actions';

const TroubleCodesScreen = props => {
  const btModule = useSelector(state => state.main.btModule);
  const selectedDevice = useSelector(state => state.main.selectedDevice);
  const areCodesShown = useSelector(state => state.codes.areCodesShown);

  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <View style={styles.heading}>
        <Text style={styles.headerTitle}>Błędy silnika</Text>

        {!areCodesShown ? (
          <View style={styles.logo}>
            <LottieView
              style={{...styles.animation, ...props.style}}
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
            dispatch(setCodesShown(!areCodesShown));
          }}>
          Pobierz kody usterek
        </MainLabel>
        <MainLabel
          style={styles.lastLabel}
          iconName="trash-can"
          onPress={() => {}}>
          Kasuj błędy
        </MainLabel>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  heading: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
    flex: 3,
  },
  headerTitle: {
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 36,
    color: '#6FA8AF',
    fontWeight: 'bold',
    letterSpacing: 3,
  },
  logo: {
    width: 150,
    height: 150,
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
