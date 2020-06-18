import React from 'react';
import {TouchableNativeFeedback, Text, View, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const DevicesListItem = props => {
  return (
    <TouchableNativeFeedback onPress={props.onPress}>
      <View style={{...styles.label, ...props.style}}>
        <Text style={styles.text}>{props.title}</Text>
        <MaterialCommunityIcons name={props.iconName} size={26} color="black" />
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
    opacity: 0.8,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
  },
  text: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default DevicesListItem;
