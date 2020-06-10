import React from 'react';
import {Alert, TouchableNativeFeedbackBase} from 'react-native';
import {BleManager} from 'react-native-ble-plx';
import * as constants from '../assets/constants';
import {decode as btoa, encode as atob} from 'base-64';
import DeviceListItem from './components/DevicesListItem';

class BtModule extends React.Component {
  constructor(props) {
    super(props);
    this.manager = new BleManager();
    this.subscription = {};

    this.serviceUUID = '000018F0-0000-1000-8000-00805F9B34FB';
    this.notifyUUID = '00002AF0-0000-1000-8000-00805F9B34FB';
    this.writeUUID = '00002AF1-0000-1000-8000-00805F9B34FB';
  }

  convertStringToBinary(str) {
    str
      .split('')
      .map(l => l.charCodeAt(0).toString(2))
      .join(' ');
  }

  async discoverServices(device) {
    await device.discoverAllServicesAndCharacteristics();
    // const services = await device.services();
  }

  async setupNotifications(device, value, callback) {
    const service = this.serviceUUID;
    const characteristicW = this.writeUUID;
    const characteristicN = this.notifyUUID;

    console.log('LOG from setupNotifications, ' + device.name + '  ' + value);

    if (value[value.length - 1] !== '\r') {
      value = value + '\r';
    }

    const characteristic = await device.writeCharacteristicWithResponseForService(
      service,
      characteristicW,
      atob(value) /* 0x01 in hex */
    );

    this.subscription = device.monitorCharacteristicForService(
      service,
      characteristicN,
      (error, characteristic) => {
        if (error) {
          console.error(error.message);
          return;
        }

        if (characteristic && characteristic.value) {
          if (characteristic.value == 'RVJST1INDT4=') {
            // 'ERROR >'
            console.error('ERROR returned from ELM327');
          }

          let tab = Array.from(btoa(characteristic.value).split(' ')); //elements in hex

          if (typeof callback !== 'function') {
            callback = false;
          }
          if (callback) {
            callback(btoa(characteristic.value));
          }

          let vin = tab
            .slice(5)
            .map(el => parseInt(el, 16))
            .filter(el => (el >= 48 && el <= 57) || (el >= 65 && el <= 90))
            .map(el => String.fromCharCode(el))
            .join('');

          if (
            characteristic.value != 'DT4=' && // '>' && '.'
            characteristic.value != 'Lg=='
          ) {
            // console.log('base :  ' + characteristic.value);
            // console.log('ori :  ' + btoa(characteristic.value));
            // console.log(vin);
          }
        }
      }
    );
    // this.subscription.remove();
  }

  async elmInitialization(device) {
    console.log('elmInitialization... ');
    //reset obd
    await this.setupNotifications(device, 'ATZ')
      .finally(() => {
        //set all to default
        this.setupNotifications(device, 'ATD')
          .finally(() => {
            // Line feed off
            this.setupNotifications(device, 'ATL0')
              .finally(() => {
                // Spaces off
                this.setupNotifications(device, 'ATS0')
                  .finally(() => {
                    // headers off
                    this.setupNotifications(device, 'ATH0')
                      .finally(() => {
                        // echo off
                        this.setupNotifications(device, 'ATE0')
                          .finally(() => {
                            // ENABLE FORMATING
                            this.setupNotifications(device, 'CAF1')
                              .finally(() => {
                                // > Set Protocol to 0 "Auto"
                                this.setupNotifications(device, 'ATSP0').catch(
                                  error => {
                                    console.error(error.message);
                                  }
                                );
                              })
                              .catch(error => {
                                console.error(error.message);
                              });
                          })
                          .catch(error => {
                            console.error(error.message);
                          });
                      })
                      .catch(error => {
                        // headers off
                        console.error(error.message);
                      });
                  })
                  .catch(error => {
                    console.error(error.message);
                  });
              })
              .catch(error => {
                console.error(error.message);
              });
          })
          .catch(error => {
            console.error(error.message);
          });
      })
      .catch(error => {
        console.error(error.message);
      });
  }

  async scanAndConnect() {
    console.log('scanning for devices...');

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
            this.props.setSelectedDevice(device);
          })
          .catch(error => {
            // Handle errors
            console.error(error);
          });
        console.log(`connected to ${device.name}: ${device.id}`);
      };

      if (device.name != null) {
        if (
          this.props.getDevices().find(el => {
            return el.id === device.id;
          }) === undefined
        ) {
          this.props.addDevice(device);

          this.props.addDeviceToList(
            <DeviceListItem
              key={device.id}
              title={device.name}
              onPress={async () => {
                await connect(device)
                  .then(() => {
                    this.discoverServices(device)
                      .then(() => {
                        this.elmInitialization(device)
                          .then(() => {
                            this.props.setSelectedDevice(device);
                            Alert.alert(
                              '',
                              'Połączono z urządzeniem ' + device.name,
                              [
                                {
                                  text: 'OK',
                                  onPress: () => {},
                                },
                              ],
                              {cancelable: true}
                            );
                            this.props.setBtSearching(false);
                            this.manager.stopDeviceScan();
                          })
                          .catch(error => {
                            console.error(error);
                          });
                      })
                      .catch(error => {
                        console.error(error);
                      });
                  })
                  .catch(error => {
                    console.error(error);
                  });
              }}
            />
          );
        }
        // Proceed with connection.
      }
    });
  }
}

export default BtModule;
