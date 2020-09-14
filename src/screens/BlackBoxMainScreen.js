import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, View, Animated, PermissionsAndroid} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import {
  setTraveling,
  setButtonText,
  setButtonIcon,
  setDx,
  setDy,
  setCubeIntervalId,
  setDbTimeoutId,
  setRouteNumber,
} from '../actions/actions';
import LottieView from 'lottie-react-native';
import Geolocation from '@react-native-community/geolocation';
import * as constants from '../../assets/constants';
import MainLabel from '../components/MainLabel';
import Cube from '../components/Cube';
import withObservables from '@nozbe/with-observables';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import {Easing} from 'react-native-reanimated';
import LabelsData from '../auxiliaries/LabelsData';

import RoutesList from '../components/RoutesList';
import PointsList from '../components/PointsList';
import MapOfPoints from '../components/MapOfPoints';

function BlackBoxMainScreen({database}) {
  const routesCollection = database.collections.get('routes');
  // const allRoutes = routesCollection.query().fetch();
  let routesMap = routesCollection._cache.map;
  let [watchId, setWatchId] = useState('');
  let [isDataShown, setDataShown] = useState(false);
  let [isListShown, setListShown] = useState(false);
  let [list, setList] = useState('');
  let [isMapShown, setMapShown] = useState(false);

  let data = LabelsData();
  let pointsArray = [];
  for (const element of routesMap) {
    pointsArray.push({
      acc: element[1].acc,
      date: element[1].date,
      geo: element[1].geo,
      id: element[1].id,
      paramsData: element[1].paramsData,
      route: element[1].route,
      speed: element[1].speed,
    });
  }

  const dataAnimationOpacity = useRef(new Animated.Value(0)).current;
  const isTraveling = useSelector(state => state.box.isTraveling);
  const dx = useSelector(state => state.box.dx);
  const dy = useSelector(state => state.box.dy);
  const cubeIntervalId = useSelector(state => state.box.cubeIntervalId);
  const dbTimeoutId = useSelector(state => state.box.dbTimeoutId);
  const timeInterval = useSelector(state => state.box.timeInterval);
  const routeNumber = useSelector(state => state.box.routeNumber);
  const buttonText = useSelector(state => state.box.buttonText);
  const buttonIcon = useSelector(state => state.box.buttonIcon);
  const dispatch = useDispatch();

  let ddx = dx;
  let ddy = dy;

  const getParamData = async () => {
    let selectedData = data.filter(param => {
      return param.isSelected;
    });
    return selectedData
      .map(element => {
        return element.title + ': ' + element.value;
      })
      .join();
  };

  const getRouteNumber = () => {
    if (routeNumber) {
      return routeNumber;
    } else {
      dispatch(setRouteNumber(1));
      return 1;
    }
  };

  const addData = async () => {
    await getParamData()
      .then(data => {
        Geolocation.getCurrentPosition(
          info => {
            addPointToDb({
              paramsData: data,
              geo: `${info.coords.latitude}:${info.coords.longitude}`,
              acc: info.coords.accuracy,
              speed: info.coords.speed,
              date: moment(),
              route: getRouteNumber(),
            });
            console.log(
              'Point added: ' +
                info.coords.latitude +
                ', ' +
                info.coords.longitude,
              data
            );
          },
          error => {
            console.log('Point cannot be added; ' + error.message);
          },
          {
            timeout: timeInterval,
            maximumAge: timeInterval + 1000,
            enableHighAccuracy: true,
          }
        );
      })
      .then(() => {
        dispatch(setDbTimeoutId(null));
      });
  };

  useEffect(() => {
    if (isTraveling) {
      if (!isDataShown) {
        showData();
        setDataShown(true);
      }
      if (!cubeIntervalId) {
        dispatch(
          setCubeIntervalId(
            setInterval(() => {
              if (ddx > 3620) {
                ddx = -ddx;
              }
              if (ddy > 3590) {
                ddy = -ddy;
              }
              dispatch(setDx((ddx += 1)));
              dispatch(setDy((ddy += 1)));
            }, 50)
          )
        );
      }
      if (!dbTimeoutId) {
        dispatch(setDbTimeoutId(setTimeout(addData, timeInterval)));
      }
    } else {
      if (isDataShown) {
        hideData();
        setDataShown(false);
      }
      dispatch(setDx(3260));
      dispatch(setDy(3230));
    }
  });

  const addPointToDb = async data => {
    await database
      .action(async () => {
        const newPoint = await routesCollection.create(point => {
          point.paramsData = data.paramsData;
          point.geo = data.geo;
          point.acc = data.acc;
          point.speed = data.speed;
          point.date = data.date;
          point.route = data.route;
        });
      })
      .then(() => {});
  };

  const deletePoint = async id => {
    const routeToDelete = await routesCollection.find(id);
    await database.action(async () => {
      await routeToDelete.destroyPermanently();
    });
  };

  const showData = () => {
    Animated.timing(dataAnimationOpacity, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };
  const hideData = () => {
    Animated.timing(dataAnimationOpacity, {
      toValue: 0,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const startJourney = () => {
    console.log('JOURNEY STARTED');
    dispatch(setTraveling(true));
    dispatch(setButtonText('Zakończ podróż'));
    dispatch(setButtonIcon('stop-circle'));
  };
  const stopJourney = () => {
    Geolocation.clearWatch(watchId);
    console.log('--JOURNEY STOPPED--');
    dispatch(setTraveling(false));
    dispatch(setButtonText('Rozpocznij podróż'));
    dispatch(setButtonIcon('play-circle'));
    clearInterval(cubeIntervalId);
    dispatch(setCubeIntervalId(null));
    clearInterval(dbTimeoutId);
    dispatch(setDbTimeoutId(null));
    dispatch(setRouteNumber(routeNumber + 1));
  };

  return (
    <View style={styles.screen}>
      {!isListShown ? (
        <View style={styles.headerContainer}>
          <Animated.View style={[styles.data, {opacity: dataAnimationOpacity}]}>
            <LottieView
              resizeMode="cover"
              source={require('../../assets/data.json')}
              autoPlay
              loop
            />
          </Animated.View>
          <View style={styles.logoContainer}>
            <Cube isTravelling={isTraveling} />
          </View>
        </View>
      ) : isMapShown ? (
        <MapOfPoints
          setMapShown={setMapShown}
          pointsArray={pointsArray}
          list={list}
          setList={setList}
        />
      ) : list == 'routes' ? (
        <RoutesList
          pointsArray={pointsArray}
          setList={setList}
          deletePoint={deletePoint}
          setMapShown={setMapShown}
        />
      ) : (
        <PointsList
          route={list}
          pointsArray={pointsArray}
          setList={setList}
          deletePoint={deletePoint}
        />
      )}
      <View style={styles.buttonsContainer}>
        <MainLabel
          style={
            !isListShown
              ? {...styles.firstLabel}
              : {...styles.firstLabel, ...styles.faded}
          }
          onPress={() => {
            if (!isListShown) {
              if (isTraveling) {
                stopJourney();
              } else {
                startJourney();
              }
            }
          }}
          iconName={buttonIcon}>
          {buttonText}
        </MainLabel>
        <MainLabel
          style={
            !isTraveling
              ? {...styles.lastLabel}
              : {...styles.lastLabel, ...styles.faded}
          }
          onPress={() => {
            if (!isTraveling) {
              setList('routes');
              setMapShown(false);
              setListShown(!isListShown);
            }
          }}
          iconName="go-kart-track">
          Przeglądaj trasy
        </MainLabel>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: constants.bgColor,
    width: '100%',
    height: '100%',
  },

  headerContainer: {
    justifyContent: 'center',
    flex: 5,
  },
  logoContainer: {
    alignSelf: 'center',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  data: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 200,
    height: 200,
    opacity: 1,
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
  listItem: {
    backgroundColor: '#f7f7f7',
  },
  legend: {
    backgroundColor: 'lightgray',
    opacity: 0.5,
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
    borderTopLeftRadius: 15,
  },
  lastLabel: {
    borderBottomRightRadius: 15,
  },
  faded: {
    backgroundColor: 'black',
    opacity: 0.2,
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

export default withDatabase(
  withObservables([], ({database}) => ({
    routes: database.collections
      .get('routes')
      .query()
      .observe(),
  }))(BlackBoxMainScreen)
);
