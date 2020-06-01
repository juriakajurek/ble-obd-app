import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  PermissionsAndroid,
  ScrollView,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {BleManager} from 'react-native-ble-plx';
import * as constants from '../../assets/constants';
import {decode as btoa, encode as atob} from 'base-64';

import BtModule from './BtModule';
import DeviceListItem from '../components/DevicesListItem';
import SearchingStatus from '../components/SearchingStatus';

import {
  addDevice,
  addDeviceToList,
  setSelectedDevice,
} from '../actions/actions';
import {TextInput} from 'react-native-gesture-handler';

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: 'ObdApp Location Permission',
        message: 'ObdApp needs access to your Location ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    ).then(
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'ObdApp Location Permission',
          message: 'ObdApp needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      )
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can know the Location');
      return true;
    } else {
      console.log('Location permission denied');
      return false;
    }
  } catch (err) {
    console.warn(err);
  }
}

class SettingsScreen extends React.Component {
  constructor() {
    super();
    // this.manager = new BleManager();

    this.value = '';
    this.response = '';

    // this.serviceUUID = '000018F0-0000-1000-8000-00805F9B34FB';
    // this.notifyUUID = '00002AF0-0000-1000-8000-00805F9B34FB';
    // this.writeUUID = '00002AF1-0000-1000-8000-00805F9B34FB';
  }

  componentDidMount() {
    requestLocationPermission();
    // if (Platform.OS === 'ios') {
    //   this.manager.onStateChange(sta-te => {
    //     if (state === 'PoweredOn') {
    //       this.setState({info: 'Wyszukiwanie dostępnych urządzeń...'});
    //       this.scanAndConnect();
    //     } else {
    //       this.setState({info: 'Sprawdź połączenie Bluetooth'});
    //     }
    //     this.setState({bluetoothState: state});
    //   });
    // } else {
    BtModule.prototype.scanAndConnect();
    // }
  }

  // convertStringToBinary(str) {
  //   str
  //     .split('')
  //     .map(l => l.charCodeAt(0).toString(2))
  //     .join(' ');
  // }

  // async discoverServices(device) {
  //   await device.discoverAllServicesAndCharacteristics();
  //   // const services = await device.services();
  // }

  // async setupNotifications(device, value) {
  //   const service = this.serviceUUID;
  //   const characteristicW = this.writeUUID;
  //   const characteristicN = this.notifyUUID;

  //   if (value[value.length - 1] !== '\r') {
  //     value = value + '\r';
  //   }

  //   const characteristic = await device.writeCharacteristicWithResponseForService(
  //     service,
  //     characteristicW,
  //     atob(value) /* 0x01 in hex */
  //   );

  //   // TODO \/
  //   subscription = device.monitorCharacteristicForService(
  //     service,
  //     characteristicN,
  //     (error, characteristic) => {
  //       if (error) {
  //         console.error(error.message);
  //         return;
  //       }

  //       if (characteristic && characteristic.value) {
  //         if (characteristic.value == 'RVJST1INDT4=') {
  //           // 'ERROR >'
  //           console.error('ERROR returned from ELM327');
  //         }

  //         //PIERW 2 - START OF TXT; POTEM 1 - START OF HEADING

  //         let tab = Array.from(btoa(characteristic.value).split(' ')); //elements in hex

  //         let vin = tab
  //           .slice(5)
  //           .map(el => parseInt(el, 16))
  //           .filter(el => (el >= 48 && el <= 57) || (el >= 65 && el <= 90))
  //           .map(el => String.fromCharCode(el))
  //           .join('');

  //         if (
  //           characteristic.value != 'DT4=' && // '>' && '.'
  //           characteristic.value != 'Lg=='
  //         ) {
  //           // console.log('base :  ' + characteristic.value);
  //           // console.log('ori :  ' + btoa(characteristic.value));
  //           console.log(vin);

  //           // this.response = btoa(characteristic.value);
  //         }
  //       }
  //     }
  //   );
  // }

  // // subscription.remove();

  // async elmInitialization(device) {
  //   console.log('elmInitialization... ');

  //   //reset obd
  //   await this.setupNotifications(device, 'ATZ')
  //     .finally(() => {
  //       //set all to default
  //       this.setupNotifications(device, 'ATD')
  //         .finally(() => {
  //           // Line feed off
  //           this.setupNotifications(device, 'ATL0')
  //             .finally(() => {
  //               // Spaces off
  //               this.setupNotifications(device, 'ATS0')
  //                 .finally(() => {
  //                   // headers off
  //                   this.setupNotifications(device, 'ATH0')
  //                     .finally(() => {
  //                       // echo off
  //                       this.setupNotifications(device, 'ATE0')
  //                         .finally(() => {
  //                           // ENABLE FORMATING
  //                           this.setupNotifications(device, 'CAF1')
  //                             .finally(() => {
  //                               // > Set Protocol to 0 "Auto"
  //                               this.setupNotifications(device, 'ATSP0').catch(
  //                                 error => {
  //                                   console.error(error.message);
  //                                 }
  //                               );
  //                             })
  //                             .catch(error => {
  //                               console.error(error.message);
  //                             });
  //                         })
  //                         .catch(error => {
  //                           console.error(error.message);
  //                         });
  //                     })
  //                     .catch(error => {
  //                       // headers off
  //                       console.error(error.message);
  //                     });
  //                 })
  //                 .catch(error => {
  //                   console.error(error.message);
  //                 });
  //             })
  //             .catch(error => {
  //               console.error(error.message);
  //             });
  //         })
  //         .catch(error => {
  //           console.error(error.message);
  //         });
  //     })
  //     .catch(error => {
  //       console.error(error.message);
  //     });
  // }

  // async scanAndConnect() {
  //   console.log('device scanning starting................');

  //   this.manager.startDeviceScan(null, null, (error, device) => {
  //     if (error) {
  //       //  (scanning will be stopped automatically)
  //       console.error(error);
  //       return;
  //     }

  //     const connect = async device => {
  //       await this.manager
  //         .connectToDevice(device.id)
  //         .then(() => {
  //           this.setState({selectedDevice: device});
  //         })
  //         .catch(error => {
  //           // Handle errors
  //           console.error(error);
  //         });
  //       console.log(`connected to ${device.name}: ${device.id}`);
  //     };

  //     if (device.name != null) {
  //       if (
  //         this.props.devices.find(el => {
  //           return el.id === device.id;
  //         }) === undefined
  //       ) {
  //         console.log(device.name);
  //         this.props.addDevice(device);
  //         this.props.addDeviceToList(
  //           <DeviceListItem
  //             key={device.id}
  //             title={device.name}
  //             onPress={async () => {
  //               await connect(device)
  //                 .then(() => {
  //                   this.discoverServices(device)
  //                     .then(() => {
  //                       this.elmInitialization(device)
  //                         .then(() => {
  //                           this.props.setSelectedDevice(device);
  //                           Alert.alert(
  //                             '',
  //                             'Połączono z urządzeniem ' + device.name,
  //                             [
  //                               {
  //                                 text: 'OK',
  //                                 onPress: () => {},
  //                               },
  //                             ],
  //                             {cancelable: true}
  //                           );
  //                         })
  //                         .catch(error => {
  //                           console.error(error);
  //                         });
  //                     })
  //                     .catch(error => {
  //                       console.error(error);
  //                     });
  //                 })
  //                 .catch(error => {
  //                   console.error(error);
  //                 });
  //               // this.manager.stopDeviceScan();
  //             }}
  //           />
  //         );
  //       }
  //       // Proceed with connection.
  //     }
  //   });
  // }

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.heading}>
          <Text style={styles.headerTitle}>Bluetooth</Text>
          <Text style={styles.btStatus}>Włączony</Text>

          <Text>
            Połączone urządzenie:{' '}
            {this.props.selectedDevice ? this.props.selectedDevice.name : ''}
          </Text>

          <TextInput
            onChangeText={txt => (this.value = txt)}
            value={this.txt}
          />
          <Button
            title="send"
            onPress={() => {
              this.setupNotifications(this.props.selectedDevice, this.value);
            }}
          />
          <Text>{this.response}</Text>
          {/* TODO wyswietlac info albo wyszukiwanie ↓ albo połaczone urządzenie */}
          <SearchingStatus style={styles.searchingStatus} />

          <Text style={styles.headerDescription}>Wyszukiwanie urządzeń...</Text>
        </View>

        <ScrollView style={styles.scroll}>
          {this.props.foundDevicesList}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
  },
  heading: {
    padding: 10,
    width: '80%',
  },
  headerTitle: {
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 36,
    color: constants.btColor,
    fontWeight: 'bold',
    letterSpacing: 4,
  },
  searchingStatus: {
    alignSelf: 'center',
  },
  btStatus: {
    textAlign: 'right',
  },
  headerDescription: {
    padding: 10,
    fontSize: 18,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  scroll: {
    // borderColor: 'green',
    // borderWidth: 1,
  },
});

const mapStateToProps = state => {
  console.log(state);
  return {
    devices: state.main.devices,
    foundDevicesList: state.main.foundDevicesList,
    selectedDevice: state.main.selectedDevice,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addDevice: device => dispatch(addDevice(device)),
    addDeviceToList: device => dispatch(addDeviceToList(device)),
    setSelectedDevice: device => dispatch(setSelectedDevice(device)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);
