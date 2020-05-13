import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, Text, ImageBackground} from 'react-native';

import MainLabel from '../../components/MainLabel';
import Cube from '../../components/Cube';

function BlackBoxMainScreen({navigation}) {
  const [travelling, setTravelling] = useState(false);
  const [buttonText, setButtonText] = useState('Rozpocznij podróż');
  const [buttonIcon, setButtonIcon] = useState('play-circle');

  return (
    <View style={styles.screen}>
      {/* <ImageBackground
                style={ styles.imgBackground } 
                resizeMode='cover' 
                source={require('../assets/background.png')} > */}
      <View style={styles.logoContainer}>
        <Cube isTravelling={travelling} setTravelling={setTravelling} />
      </View>
      <View style={styles.buttonsContainer}>
        <MainLabel
          style={styles.firstLabel}
          onPress={() => {
            if (travelling) {
              setTravelling(false);
              setButtonText('Rozpocznij podróż');
              setButtonIcon('play-circle');
            } else {
              setTravelling(true);
              setButtonText('Zakończ podróż');
              setButtonIcon('stop-circle');
            }
          }}
          iconName={buttonIcon}>
          {buttonText}
        </MainLabel>
        <MainLabel
          style={styles.lastLabel}
          onPress={() => {}}
          iconName="go-kart-track">
          Przeglądaj trasy
        </MainLabel>
      </View>
      {/* </ImageBackground> */}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#ddd',
    width: '100%',
    height: '100%',
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  logoContainer: {
    flex: 1,
    alignSelf: 'center',
    marginTop: 20,
  },
  logoImage: {
    flex: 2,
    alignSelf: 'center',
    margin: 20,
    opacity: 0.8,
  },
  buttonsContainer: {
    marginBottom: 20,
    width: '100%',
    maxHeight: '55%',
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  firstLabel: {
    borderTopLeftRadius: 25,
  },
  lastLabel: {
    borderBottomRightRadius: 25,
  },
});

export default BlackBoxMainScreen;
