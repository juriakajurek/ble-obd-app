import React from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';
import ParamLabel from './ParamLabel';
import moment from 'moment';

let RoutesList = props => {
  const keyExtractor = (item, index) => index.toString();
  const renderItem = ({item}) => (
    <ParamLabel
      style={styles.listItem}
      key={item.id}
      value={item.route}
      title={moment(item.date).format('D.MM.YYYY, kk:mm')}
      onPress={() => {
        Alert.alert(
          'Co chcesz zrobić?',
          '',
          [
            {
              text: 'Przeglądaj dane trasy',
              onPress: () => {
                props.setList(item.route);
              },
            },
            {
              text: 'Pokaż na mapie',
              onPress: () => {
                props.setList(item.route);

                props.setMapShown(true);
              },
            },

            {
              text: 'Usuń trasę',
              onPress: () => {
                let routeToDelete = item.route;
                props.pointsArray.forEach(point => {
                  if (point.route == routeToDelete) {
                    props.deletePoint(point.id);
                  }
                });
              },
              style: 'cancel',
            },
          ],
          {cancelable: true}
        );
      }}
    />
  );
  const getRoutes = () => {
    let array = [];
    if (Array.isArray(props.pointsArray) && props.pointsArray.length) {
      let lastRouteNumber = parseInt(
        props.pointsArray[props.pointsArray.length - 1].route
      );
      for (let i = 1; i <= lastRouteNumber; i++) {
        let index = props.pointsArray.findIndex(el => {
          return el.route == i;
        });
        if (index != -1) {
          array.push({
            date: props.pointsArray[index].date,
            id: props.pointsArray[index].id,
            route: props.pointsArray[index].route,
          });
        }
      }
    }
    return array;
  };

  return (
    <View style={{...styles.listContainer, ...props.style}}>
      <ParamLabel
        style={styles.legend}
        key={'listLegend'}
        value={'Nr trasy'}
        title={'Data'}
        onPress={() => {}}
      />
      <FlatList
        keyExtractor={keyExtractor}
        data={getRoutes().reverse()}
        renderItem={renderItem}
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

export default RoutesList;
