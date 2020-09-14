import React from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';
import ParamLabel from './ParamLabel';
import moment from 'moment';
import createDescription from '../auxiliaries/createDescription';

let PointsList = props => {
  const keyExtractor = (item, index) => index.toString();
  const renderPointItem = ({item, index}) => (
    <ParamLabel
      style={styles.listItem}
      key={item.id}
      title={index + 1}
      value={moment(item.date).format('kk:mm:ss')}
      onPress={() => {
        Alert.alert(
          'Co chcesz zrobić?',
          '',
          [
            {
              text: 'Zobacz zapisane dane',
              onPress: () => {
                let entriesArray = Object.entries(item);
                Alert.alert(
                  'Zapisane dane ',
                  createDescription(entriesArray),
                  [
                    {
                      text: 'Powrót',
                    },
                  ],
                  {cancelable: true}
                );
                props.setList(item.route);
              },
            },
            {
              text: 'Usuń punkt',
              onPress: () => {
                let pointToDelete = item.id;
                props.deletePoint(pointToDelete);
              },
              style: 'cancel',
            },
          ],
          {cancelable: true}
        );
      }}
    />
  );
  return (
    <View style={{...styles.listContainer, ...props.style}}>
      <ParamLabel
        style={styles.legend}
        key={'listLegend'}
        value={''}
        title={'<  Powrót'}
        onPress={() => {
          props.setList('routes');
        }}
      />
      <FlatList
        keyExtractor={keyExtractor}
        data={props.pointsArray.filter(point => {
          return point.route === props.route;
        })}
        renderItem={renderPointItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: '95%',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    flex: 5,
    paddingBottom: 8,
    margin: 10,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  legend: {
    backgroundColor: 'lightgray',
    opacity: 0.5,
  },
});

export default PointsList;
