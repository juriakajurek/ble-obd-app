import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {BleManager} from 'react-native-ble-plx';
import * as constants from '../../assets/constants';
import {decode as btoa, encode as atob} from 'base-64';

import {addDevice, addDeviceToList} from '../actions/actions';

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
    this.manager = new BleManager();

    this.serviceUUID = '000018F0-0000-1000-8000-00805F9B34FB';
    this.notifyUUID = '00002AF0-0000-1000-8000-00805F9B34FB';
    this.writeUUID = '00002AF1-0000-1000-8000-00805F9B34FB';
  }

  componentDidMount() {
    requestLocationPermission();
    // if (Platform.OS === 'ios') {
    //   this.manager.onStateChange(state => {
    //     if (state === 'PoweredOn') {
    //       this.setState({info: 'Wyszukiwanie dostępnych urządzeń...'});
    //       this.scanAndConnect();
    //     } else {
    //       this.setState({info: 'Sprawdź połączenie Bluetooth'});
    //     }
    //     this.setState({bluetoothState: state});
    //   });
    // } else {
    this.scanAndConnect();
    // }
  }

  async discoverServices(device) {
    console.log('discovering services; device id: ' + device.id);

    await device.discoverAllServicesAndCharacteristics();
    const services = await device.services();

    console.log(services);
  }

  async setupNotifications(device, value) {
    console.log('setting up notification; device id: ' + device.id);

    const service = this.serviceUUID;
    const characteristicW = this.writeUUID;
    const characteristicN = this.notifyUUID;

    if (value[value.length - 1] !== '\r') {
      value =
        value +
        '\r'; /* 010C in hex - RPM, 2F - fuel level [%],  5C - oil temp*/ // MUSI BYC W BASE64
    }

    console.log('atob(value) = ' + atob(value));

    const characteristic = await device.writeCharacteristicWithResponseForService(
      service,
      characteristicW,
      atob(value) /* 0x01 in hex */
    );

    // TODO \/
    subscription = device.monitorCharacteristicForService(
      service,
      characteristicN,
      (error, characteristic) => {
        if (error) {
          console.error(error.message);
          return;
        }

        if (characteristic.value == 'RVJST1INDT4=') {
          // 'ERROR >'
          console.ERROR('ERROR returned from ELM327');
        }

        if (characteristic.value != 'DT4=' && characteristic.value != 'Lg==') {
          // '>' && '.'

          console.log(
            'characteristic.value: ' +
              characteristic.value +
              '   parseint :     ' +
              parseInt('0x' + btoa(characteristic.value).replace(/\s/g, '')) +
              '         ori :          ' +
              btoa(characteristic.value)
          );
        }
      }
    );
  }

  // subscription.remove();

  // AT D -> Set all to defaults
  // AT Z -> Reset Obd
  // AT E0 -> Echo off
  // AT L0 -> Line feed off
  // AT S0 -> Spaces off
  // AT H0 -> Headers off
  // AT SP 0 -> Set Protocol to 0 "Auto", search all protocols and connect it with proper protocol for that obd

  async elmInitialization(device) {
    console.log('elmInitialization... ');
    await this.setupNotifications(device, 'ATZ').catch(error => {
      console.error(error.message);
    });
    await this.setupNotifications(device, 'ATSP0').catch(error => {
      console.error(error.message);
    });
    await this.setupNotifications(device, 'ATS0').catch(error => {
      console.error(error.message);
    });
    await this.setupNotifications(device, 'ATL0').catch(error => {
      //!!!!
      console.error(error.message);
    });
  }

  async scanAndConnect() {
    console.log('device scanning starting................');

    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        //  (scanning will be stopped automatically)
        console.error(error);
        return;
      }

      const connect = async device => {
        await this.manager
          .connectToDevice(device.id)
          .then(() => {
            this.setState({selectedDevice: device});
          })
          .catch(error => {
            // Handle errors
            console.error(error);
          });
        console.log(`connected to ${device.name}: ${device.id}`);
      };

      if (device.name != null) {
        if (
          this.props.devices.find(el => {
            return el.id === device.id;
          }) === undefined
        ) {
          console.log(device.name);
          this.props.addDevice(device);
          this.props.addDeviceToList(
            <View>
              <Button
                key={device.id}
                title={device.name}
                onPress={async () => {
                  await connect(device)
                    .then(() => {
                      this.discoverServices(device);
                    })
                    .catch(error => {
                      console.error(error);
                    });
                  // this.manager.stopDeviceScan();
                }}
              />
              <Button
                key={device.id + 'st'}
                title={'stablish'}
                onPress={async () => {
                  await this.elmInitialization(device).catch(error => {
                    console.error(error.message);
                  });
                }}
              />
              <Button
                key={device.id + 'bgst'}
                title={'atdp'}
                onPress={async () => {
                  await this.setupNotifications(device, 'ATDP').catch(error => {
                    console.error(error.message);
                  });
                }}
              />
              <Button
                key={device.id + 'bg0100st'}
                title={'010C'}
                onPress={async () => {
                  await this.setupNotifications(device, '010C1').catch(
                    error => {
                      console.error(error.message);
                    }
                  );
                }}
              />
            </View>
          );
        }
        // Proceed with connection.
      }
    });
  }

  render() {
    return (
      <View style={styles.screen}>
        <Text>Bluetooth: {this.props.bluetoothState}</Text>
        {/* <Text>Połączone urządzenie: {this.props.selectedDevice.name}</Text> */}
        <Button
          title="szukaj"
          onPress={() => {
            this.scanAndConnect();
          }}
        />
        <Text>{this.props.info}</Text>
        {this.props.foundDevicesList}
        <Text>{this.props.rpm || '-'}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    width: '100%',
    height: '100%',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
});

const mapStateToProps = state => {
  console.log(state);
  return {
    devices: state.main.devices,
    foundDevicesList: state.main.foundDevicesList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addDevice: device => dispatch(addDevice(device)),
    addDeviceToList: device => dispatch(addDeviceToList(device)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);
