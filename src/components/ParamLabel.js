import React from 'react';
import {TouchableNativeFeedback, Text, View, StyleSheet} from 'react-native';

const ParamLabel = props => {
  return (
    <TouchableNativeFeedback
      onPress={props.onPress}
      onLongPress={props.onLongPress}>
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
    padding: 10,
    margin: 5,
    backgroundColor: 'white',
    opacity: 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
  },
  selected: {
    backgroundColor: '#ebebeb',
    borderWidth: 1,
    borderColor: 'black',
  },
  param: {
    width: '70%',
    color: 'black',
    fontSize: 15,
    // fontWeight: 'bold',
  },
  value: {
    width: '30%',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

export default ParamLabel;
