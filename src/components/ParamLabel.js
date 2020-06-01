import React from 'react';
import {TouchableNativeFeedback, Text, View, StyleSheet} from 'react-native';

const ParamLabel = props => {
  return (
    <TouchableNativeFeedback
      onPress={props.onPress}
      onLongPress={props.onLongPress}
      // background={TouchableNativeFeedback.Ripple('blue')}
      // delayPressIn={0}
    >
      <View
        style={
          props.isSelected
            ? {...styles.label, ...props.style, ...styles.selected}
            : {...styles.label, ...props.style}
        }>
        <Text style={styles.param}>{props.title}</Text>
        <Text style={styles.value}>{props.value}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  label: {
    width: '100%',
    padding: 10,
    margin: 5,
    backgroundColor: 'white',
    opacity: 0.65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
  },
  selected: {
    backgroundColor: 'red',
  },
  param: {
    width: '70%',
    color: 'black',
    fontSize: 15,
    // fontWeight: 'bold',
  },
  value: {fontSize: 18, fontWeight: 'bold'},
});

export default ParamLabel;
