import React from 'react';
import {StyleSheet, View, Image, Text, ImageBackground} from 'react-native';

import MainLabel from '../components/MainLabel';

import fetch from 'node-fetch';
import Unsplash from 'unsplash-js';
import {ScrollView} from 'react-native-gesture-handler';

const APP_ACCESS_KEY = 'CW6TaFLAKKmaCH4zp58J5XrhySC9vXqEM6Li9_E9bkI';
let carImgSrc =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTC_5LzVxz_CoITcmU9DZMdhUtk1gRL2-0Qhod8Xbj2j7Rr-45h';
let carInfo = 'Połącz się ze swoim samochodem przechodząc do Ustawień. ';
global.fetch = fetch;

const unsplash = new Unsplash({accessKey: {APP_ACCESS_KEY}});

function MainScreen({navigation}) {
  return (
    <View style={styles.screen}>
      <ImageBackground
        style={styles.imgBackground}
        resizeMode="cover"
        source={require('../../assets/background.png')}>
        <View style={styles.carInfo}>
          <Image
            resizeMode="cover"
            style={styles.carImage}
            source={{uri: `${carImgSrc}`}}
          />

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
            onPress={() => navigation.navigate('Extras')}
            iconName="star">
            Extras
          </MainLabel>
          <MainLabel
            style={styles.lastLabel}
            onPress={() => navigation.navigate('Settings')}
            iconName="settings">
            Ustawienia
          </MainLabel>
        </View>
      </ImageBackground>
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
  carInfo: {
    flex: 1,
    alignSelf: 'center',
    width: '70%',
  },
  carInfoTextContainer: {
    flex: 1,
    marginTop: 20,
    padding: 10,
  },
  carInfoText: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
  },
  carImage: {
    width: 200,
    height: 200,
    flex: 2,
    alignSelf: 'center',
    margin: 20,
    opacity: 0.8,
    borderRadius: 500,
    borderColor: 'white',
    borderWidth: 1,
  },
  labelContainer: {
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

export default MainScreen;
