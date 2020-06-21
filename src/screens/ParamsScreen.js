import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import * as constants from '../../assets/constants';
import ParamLabel from '../components/ParamLabel';
import {
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import LabelsData from '../LabelsData';

const ParamsScreen = ({navigation}) => {
  // const btModule = useSelector(state => state.main.btModule);
  const selectedDevice = useSelector(state => state.main.selectedDevice);

  let labelObjectsList = LabelsData();

  const keyExtractor = (item, index) => index.toString();
  const renderItem = ({item}) => (
    <ParamLabel
      key={item.key}
      isSelected={item.isSelected}
      title={item.title}
      value={item.value}
      onPress={item.onPress}
      onLongPress={item.onLongPress}
    />
  );

  return (
    <View style={styles.screen}>
      {1 ? (
        <View>
          <View style={styles.heading}>
            <Text style={styles.headerTitle}>
              Wybierz parametr aby odczytać jego aktualną wartość.
            </Text>
            <Text style={styles.headerDescription}>
              Przytrzymaj aby zaznaczyć wiele.
            </Text>
          </View>
          <FlatList
            style={styles.list}
            keyExtractor={keyExtractor}
            data={labelObjectsList}
            renderItem={renderItem}
          />
        </View>
      ) : (
        <TouchableOpacity
          style={styles.warnWindow}
          onPress={() => {
            navigation.navigate('Settings');
          }}>
          <Text style={styles.warnText}>
            Połącz się z odbiornikiem Bluetooth, aby odczytywać parametry
            pojazdu. Zrobisz to{' '}
            <Text style={styles.link}>przechodząc do ustawień.</Text>
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: constants.bgColor,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    alignSelf: 'center',
    padding: 10,
    width: '80%',
  },
  headerTitle: {
    textAlign: 'center',

    fontSize: 18,
  },
  headerDescription: {
    textAlign: 'center',
  },
  list: {
    width: '100%',
  },
  warnWindow: {
    padding: '5%',
    margin: '10%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    opacity: 0.6,
  },
  warnText: {
    fontSize: 16,
    textAlign: 'center',
  },
  link: {
    color: 'blue',
    textDecorationColor: 'blue',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
});

export default ParamsScreen;
