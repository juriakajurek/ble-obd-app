import React from 'react';
import {StyleSheet, View, ScrollView, Text, PanResponder} from 'react-native';

import * as constants from '../../assets/constants';

import DeviceListItem from '../components/DevicesListItem';
import SearchingStatus from '../components/SearchingStatus';

const Settings = () => {
  return (
    <View style={styles.screen}>
      <View style={styles.heading}>
        <Text style={styles.headerTitle}>Bluetooth</Text>
        <Text style={styles.btStatus}>Włączony</Text>
        <SearchingStatus style={styles.searchingStatus}>
          Wyszukiwanie urządzeń...
        </SearchingStatus>

        <Text style={styles.headerDescription}>Wyszukiwanie urządzeń...</Text>
      </View>

      <ScrollView style={styles.scroll}>
        <DeviceListItem>iOS VLink LE</DeviceListItem>
        <DeviceListItem>Creaive MUVO 1C</DeviceListItem>
        <DeviceListItem>Galaxy Watch LE</DeviceListItem>
        <DeviceListItem>Redmi</DeviceListItem>
        <DeviceListItem>JBL GO</DeviceListItem>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    alignItems: 'center',
  },
  heading: {
    padding: 10,
    width: '80%',
  },
  headerTitle: {
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 36,
    color: constants.btColor,
    fontWeight: 'bold',
    letterSpacing: 4,
  },
  searchingStatus: {
    alignSelf: 'center',
  },
  btStatus: {
    textAlign: 'right',
  },
  headerDescription: {
    padding: 10,
    fontSize: 18,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  scroll: {
    // borderColor: 'green',
    // borderWidth: 1,
  },
});
export default Settings;
