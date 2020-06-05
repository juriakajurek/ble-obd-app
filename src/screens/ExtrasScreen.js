import React from 'react';
import {StyleSheet, View} from 'react-native';
import * as constants from '../../assets/constants';

const ExtrasScreen = props => {
  return (
    <View style={styles.screen}>
      <View style={styles.labelContainer} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: constants.bgColor,
    width: '100%',
    height: '100%',
  },
});

export default ExtrasScreen;
