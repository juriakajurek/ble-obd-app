import React from 'react';
import {StyleSheet, View} from 'react-native';

const ExtrasScreen = props => {
  return (
    <View style={styles.screen}>
      <View style={styles.labelContainer} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: '100%',
    height: '100%',
  },
});

export default ExtrasScreen;
