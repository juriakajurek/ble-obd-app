import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ImageBackground,
  Item,
  Button,
  Animated,
  Alert,
} from 'react-native';
import {Q} from '@nozbe/watermelondb';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import {
  setTraveling,
  setButtonText,
  setButtonIcon,
  setDx,
  setDy,
  setCubeIntervalId,
  setDbIntervalId,
  setLastPointId,
} from '../actions/actions';
import LottieView from 'lottie-react-native';
import Geolocation from '@react-native-community/geolocation';
import * as constants from '../../assets/constants';
import MainLabel from '../components/MainLabel';
import Cube from '../components/Cube';
import withObservables from '@nozbe/with-observables';
import {withDatabase} from '@nozbe/watermelondb/DatabaseProvider';
import {FlatList} from 'react-native-gesture-handler';
import {Easing} from 'react-native-reanimated';
import ParamLabel from '../components/ParamLabel';
import LabelsData from '../LabelsData';

function BlackBoxMainScreen({database}) {
  const routesCollection = database.collections.get('routes');
  // const allRoutes = getAllRoutes(routesCollection);
  let routesMap = routesCollection._cache.map;
  let [watchId, setWatchId] = useState('');
  let [isDataShown, setDataShown] = useState(false);
  let [isListShown, setListShown] = useState(false);
  let [list, setList] = useState('');

  let selectedParamsList = LabelsData().filter(param => {
    return param.isSelected;
  });

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

  const getRoutes = () => {
    let array = [];
    if (Array.isArray(pointsArray) && pointsArray.length) {
      let lastRouteNumber = parseInt(pointsArray[pointsArray.length - 1].route);
      for (let i = 1; i <= lastRouteNumber; i++) {
        let index = pointsArray.findIndex(el => {
          return el.route == i;
        });
        if (index != -1) {
          array.push({
            date: pointsArray[index].date,
            id: pointsArray[index].id,
            route: pointsArray[index].route,
          });
        }
      }
    }
    return array;
  };

  const dataOpacity = useRef(new Animated.Value(0)).current;
  const isTraveling = useSelector(state => state.box.isTraveling);
  const dx = useSelector(state => state.box.dx);
  const dy = useSelector(state => state.box.dy);
  const cubeIntervalId = useSelector(state => state.box.cubeIntervalId);
  const dbIntervalId = useSelector(state => state.box.dbIntervalId);
  const timeInterval = useSelector(state => state.box.timeInterval);
  const buttonText = useSelector(state => state.box.buttonText);
  const buttonIcon = useSelector(state => state.box.buttonIcon);
  const dispatch = useDispatch();

  let ddx = dx;
  let ddy = dy;

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
              if (ddx > 3000) {
                ddx = -ddx;
              }
              if (ddy > 3000) {
                ddy = -ddy;
              }
              dispatch(setDx((ddx += 1)));
              dispatch(setDy((ddy += 1)));
            }, 50)
          )
        );
      }
      if (!dbIntervalId) {
        dispatch(
          setDbIntervalId(
            setInterval(() => {
              Geolocation.getCurrentPosition(
                info => {
                  addPointToDb({
                    paramsData: selectedParamsList
                      .map(element => {
                        return element.title + ':' + element.value;
                      })
                      .toString(),
                    geo: `${info.coords.latitude}:${info.coords.longitude}`,
                    acc: info.coords.accuracy,
                    speed: info.coords.speed,
                    date: moment(),
                    route:
                      Array.isArray(pointsArray) && pointsArray.length
                        ? parseInt(pointsArray[pointsArray.length - 1].route) +
                          1
                        : 1,
                  });

                  console.log(
                    'Point added: ' +
                      info.coords.latitude +
                      ', ' +
                      info.coords.longitude
                  );
                },
                error => {
                  console.log('Point cannot be added; ' + error.message);
                },
                {
                  timeout: timeInterval,
                  maximumAge: timeInterval,
                  enableHighAccuracy: true,
                }
              );
            }, timeInterval)
          )
        );
      }
    } else {
      if (isDataShown) {
        hideData();
        setDataShown(false);
      }

      dispatch(setDx(20));
      dispatch(setDy(-10));
    }
  });

  async function getAllRoutes(collection) {
    return await collection.query().fetch();
  }

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
    Animated.timing(dataOpacity, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };
  const hideData = () => {
    Animated.timing(dataOpacity, {
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
    clearInterval(dbIntervalId);
    dispatch(setDbIntervalId(null));
  };

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
                setList(item.route);
              },
            },
            {
              text: 'Otwórz w mapach Google',
              onPress: () => console.log('Ask me later pressed'),
            },

            {
              text: 'Usuń trasę',
              onPress: () => {
                let routeToDelete = item.route;
                pointsArray.forEach(point => {
                  if (point.route == routeToDelete) {
                    deletePoint(point.id);
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
                  entriesArray
                    .map(el => {
                      console.log(el);
                      switch (el[0].toString()) {
                        case 'acc':
                          return (
                            'Dokładność lokalizacji: ' +
                            Math.round(parseFloat(el[1]) * 100) / 100
                          );
                        case 'date':
                          return (
                            'Data: ' +
                            moment(el[1]).format('D.MM.YYYY, kk:mm:ss')
                          );
                        case 'geo':
                          return 'Położenie geograficzne: ' + el[1];
                        case 'id':
                          return 'ID punktu: ' + el[1];
                        case 'paramsData':
                          return (
                            'Zapisane parametry: ' +
                            el[1].split(',').map(el => {
                              return '\n' + el;
                            })
                          );
                        case 'route':
                          return 'Nr trasy: ' + el[1];
                        case 'speed':
                          return 'Prędkość: ' + el[1];
                        default:
                          return;
                      }
                    })
                    .join('\n')
                    .toString(),
                  [
                    {
                      text: 'Powrót',
                    },
                  ],
                  {cancelable: true}
                );
                setList(item.route);
              },
            },
            {
              text: 'Usuń punkt',
              onPress: () => {
                let pointToDelete = item.id;
                deletePoint(pointToDelete);
              },

              style: 'cancel',
            },
          ],
          {cancelable: true}
        );
      }}
    />
  );

  let PointsList = props => {
    return (
      <View style={styles.list}>
        <ParamLabel
          style={styles.legend}
          key={'listLegend'}
          value={''}
          title={'<  Powrót'}
          onPress={() => {
            setList('routes');
          }}
        />
        <FlatList
          keyExtractor={keyExtractor}
          data={pointsArray.filter(point => {
            return point.route === props.route;
          })}
          renderItem={renderPointItem}
        />
      </View>
    );
  };

  let RoutesList = () => {
    return (
      <View style={styles.list}>
        <ParamLabel
          style={styles.legend}
          key={'listLegend'}
          value={'Nr trasy'}
          title={'Data'}
          onPress={() => {}}
        />
        <FlatList
          keyExtractor={keyExtractor}
          data={getRoutes()}
          renderItem={renderItem}
        />
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      {!isListShown ? (
        <View style={styles.headerContainer}>
          <Animated.View style={[styles.data, {opacity: dataOpacity}]}>
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
      ) : list == 'routes' ? (
        <RoutesList />
      ) : (
        <PointsList route={list} />
      )}
      <View>
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
              // setListData(getRoutes());
              setList('routes');

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
  list: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    flex: 5,
    paddingBottom: 8,
    margin: 10,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
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
