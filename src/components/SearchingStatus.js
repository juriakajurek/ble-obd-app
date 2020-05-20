import React from 'react';
import {View, StyleSheet} from 'react-native';

import LottieView from 'lottie-react-native';

const SearchingStatus = props => {
  return (
    <View style={{...styles.container, ...props.style}}>
      <LottieView
        style={{...styles.animation, ...props.style}}
        source={require('../../assets/searching.json')}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  animation: {
    width: 100,
    height: 100,
  },
});

export default SearchingStatus;
