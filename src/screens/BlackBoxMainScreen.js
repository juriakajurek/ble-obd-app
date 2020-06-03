import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ImageBackground,
  Item,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {setTraveling, setButtonText, setButtonIcon} from '../actions/actions';

import MainLabel from '../components/MainLabel';
import Cube from '../components/Cube';

import withObservables from '@nozbe/with-observables';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import {FlatList} from 'react-native-gesture-handler';

// import {useDatabase} from '@nozbe/watermelondb/src/hooks';

function BlackBoxMainScreen({database}) {
  const routesCollection = database.collections.get('routes');
  const allRoutes = getAllRoutes(routesCollection);

  async function getAllRoutes(collection) {
    return await collection.query();
  }

  // const {routes} = database;

  const isTraveling = useSelector(state => state.box.isTraveling);
  const buttonText = useSelector(state => state.box.buttonText);
  const buttonIcon = useSelector(state => state.box.buttonIcon);
  const dispatch = useDispatch();

  console.log('aaa');
  // printData();

  // console.log(
  //   Object.values(routesCollection).map(el => {
  //     return el.id.toString() + ' ' + el.geo.toString;
  //   })
  // );
  console.log(routesCollection._cache.map);

  const addTask = async () => {
    await database.action(async () => {
      const newPoint = await routesCollection.create(point => {
        point.pointId = '1';
        point.geo = '1.14, 2.18';
        point.acc = 3;
        point.speed = 120;
        point.date = new Date();
        point.route = 1;
      });
      // console.log(newPost.database.collections.get('tasks'));
    });
  };

  function Item({item}) {
    console.log(item);
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item}</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={Object.values(allRoutes)}
        renderItem={({item}) => <Item title={item} />}
        keyExtractor={item => Math.random.toString()}
      />

      {/* <ImageBackground
                style={ styles.imgBackground } 
                resizeMode='cover' 
                source={require('../assets/background.png')} > */}
      <View style={styles.logoContainer}>
        <Cube isTravelling={isTraveling} />
      </View>
      {/* <Text>{'aaa' + database.collections.get('tasks')}</Text> */}
      <View style={styles.buttonsContainer}>
        <MainLabel
          style={styles.firstLabel}
          onPress={() => {
            if (isTraveling) {
              dispatch(setTraveling(false));
              dispatch(setButtonText('Rozpocznij podróż'));
              dispatch(setButtonIcon('play-circle'));
              addTask();
            } else {
              dispatch(setTraveling(true));
              dispatch(setButtonText('Zakończ podróż'));
              dispatch(setButtonIcon('stop-circle'));
            }
          }}
          iconName={buttonIcon}>
          {buttonText}
        </MainLabel>
        <MainLabel
          style={styles.lastLabel}
          onPress={() => {
            Array.from(Object.values(allRoutes)).forEach(element => {
              console.log(element);
            });
          }}
          iconName="go-kart-track">
          Przeglądaj trasy
        </MainLabel>
      </View>
      {/* </ImageBackground> */}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#ddd',
    width: '100%',
    height: '100%',
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  logoContainer: {
    flex: 1,
    alignSelf: 'center',
    marginTop: 20,
  },
  logoImage: {
    flex: 2,
    alignSelf: 'center',
    margin: 20,
    opacity: 0.8,
  },
  buttonsContainer: {
    marginBottom: 20,
    width: '100%',
    maxHeight: '55%',
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  firstLabel: {
    borderTopLeftRadius: 25,
  },
  lastLabel: {
    borderBottomRightRadius: 25,
  },

  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    color: 'red',
  },
});

// export default BlackBoxMainScreen;

export default withDatabase(
  withObservables([], ({database}) => ({
    routes: database.collections
      .get('routes')
      .query()
      .observe(),
  }))(BlackBoxMainScreen)
);
