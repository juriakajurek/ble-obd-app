import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import MapView from 'react-native-maps';
import {Marker, Callout} from 'react-native-maps';

import ParamLabel from './ParamLabel';
import moment from 'moment';
import createDescription from '../auxiliaries/createDescription';

let MapOfPoints = props => {
  const waypoints = props.pointsArray.filter(point => {
    return point.route === parseInt(props.list);
  });

  return (
    <View style={styles.listContainer}>
      <ParamLabel
        style={styles.legend}
        key={'listLegend'}
        value={''}
        title={'<  Powrót'}
        onPress={() => {
          props.setMapShown(false);
          props.setList('routes');
        }}
      />
      <View style={styles.mapContainer}>
        <MapView
          style={styles.mapView}
          initialCamera={{
            center: {
              latitude: parseFloat(waypoints[0].geo.split(':')[0]),
              longitude: parseFloat(waypoints[0].geo.split(':')[1]),
            },
            pitch: 0,
            heading: 0,
            altitude: 1,
            zoom: 13,
          }}>
          {waypoints.map((point, index) => {
            let entriesArray = Object.entries(point);

            let description = createDescription(entriesArray);

            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: parseFloat(point.geo.split(':')[0]),
                  longitude: parseFloat(point.geo.split(':')[1]),
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}>
                <View style={styles.customMarker} />
                <Callout onPress={() => {}} style={styles.customCallout}>
                  <View>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}>
                      {moment(point.date).format('kk:mm:ss')}
                    </Text>
                  </View>
                  <View>
                    <Text>{description}</Text>
                  </View>
                </Callout>
              </Marker>
            );
          })}
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: '90%',
    padding: 10,
  },
  mapView: {
    width: '100%',
    height: '100%',
  },
  customMarker: {
    backgroundColor: 'darkslateblue',
    width: 7,
    height: 7,
    borderColor: 'white',
    borderWidth: 0.5,
    borderRadius: 50,
  },
  customCallout: {
    width: 250,
  },

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

export default MapOfPoints;
