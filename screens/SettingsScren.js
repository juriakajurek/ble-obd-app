import React, { useEffect } from 'react';
import {StyleSheet, View, Text, Button, PermissionsAndroid, Alert} from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import * as constants from "../assets/constants"
import {decode as btoa, encode as atob} from 'base-64'
// import Base64 from "../components/Base64"


async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: 'ObdApp Location Permission',
          message:
            'ObdApp needs access to your Location ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      ).then(await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'ObdApp Location Permission',
          message:
            'ObdApp needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      ));


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
        super()
        this.manager = new BleManager()

        //TODO trzeba by je pobierac a nie wpisac na twardo
        this.serviceUUID = "000018F0-0000-1000-8000-00805F9B34FB"
        this.notifyUUID = "00002AF0-0000-1000-8000-00805F9B34FB"
        this.writeUUID = "00002AF1-0000-1000-8000-00805F9B34FB"



        this.state = {
            devices: [],
            foundDevicesList: [],
            bluetoothState: "",
            info: "", 
            selectedDevice: {},
            rpm: "",
            uuid: ""
          };
    }
    
    componentDidMount() {
        requestLocationPermission();

        if (Platform.OS === 'ios') {
          this.manager.onStateChange((state) => {
            if (state === 'PoweredOn') {            
                this.setState({info: "Wyszukiwanie dostępnych urządzeń..."});
                this.scanAndConnect();
            } else {
                this.setState({info: "Sprawdź połączenie Bluetooth"});
            }
            this.setState({bluetoothState: state});
        });

        } else {
          this.scanAndConnect()
        }
    }

    async discoverServices (device) {
        console.log("discovering services; device id: " + device.id); 

        await device.discoverAllServicesAndCharacteristics();
        const services = await device.services();
        
        console.log(services);
    
    }

    async setupNotifications(device, value) {
      console.log("setting up notification; device id: " + device.id); 

        const service = this.serviceUUID
        const characteristicW = this.writeUUID
        const characteristicN = this.notifyUUID

        if(value[value.length-1] !== '\r' ) {
          value = value + '\r'; /* 010C in hex - RPM, 2F - fuel level [%],  5C - oil temp*/   // MUSI BYC W BASE64
        } 

        console.log("atob(value) = " + atob(value))





        const characteristic = await device.writeCharacteristicWithResponseForService(
          service, characteristicW, atob(value) /* 0x01 in hex */
        )

        console.log('writed')

        // const characteristic = await this.manager.writeCharacteristicWithResponseForDevice(
        //   device.id, service, characteristicW, atob(value)
        // )



  // TODO \/
        subscription = device.monitorCharacteristicForService(service, characteristicN, (error, characteristic) => {
          if (error) {
            console.error(error.message)
            return
          }
          
            console.log('characteristic.value: ' + characteristic.value, btoa(characteristic.value));
            console.log(btoa(characteristic.value));

            if((characteristic.value) == 'RVJST1INDT4=') {   // 'ERROR >' 
              console.ERROR("ERROR returned from ELM327");
            }

            if((characteristic.value) != 'DT4=' && (characteristic.value) != 'Lg==') {   // '>' && '.'
              this.setState({uuid: characteristic.uuid})
              this.setState({rpm: btoa(characteristic.value)})
            }
        })         
    }

        // subscription.remove();
         


    async elmInitialization (device) {

      console.log("elmInitialization... ");
      await this.setupNotifications(device, "ATZ")
      .catch((error) => {
        console.error(error.message)
      })
      await this.setupNotifications(device, "ATSP0")
      .catch((error) => {
        console.error(error.message)
      })

    
    }


    scanAndConnect() {
            this.manager.startDeviceScan(null, null, (error, device) => {
                if (error) {
                    // Handle error (scanning will be stopped automatically)
                    alert(error);
                    return
                }
        
                // Check if it is a device you are looking for based on advertisement data
                // or other criteria.
                const connect = async (device) => {
                    await this.manager.connectToDevice(device.id)
                    .then(()=>{
                        this.setState({selectedDevice: device});
                    })
                    .catch((error) => {
                        // Handle errors
                        console.error(error);
                    });
                    console.log(`connected to ${device.name}: ${device.id}`)
                }

                if (device.name != null) {
                    if (this.state.devices.find((el)=>{console.log(el); return el === device.name}) === undefined  ){
                        this.setState({devices: [...this.state.devices, device.name]});
                        this.setState({foundDevicesList: [...this.state.foundDevicesList, 
                                <Button 
                                    key={device.id} 
                                    title={device.name} 
                                    onPress={ async () => {
                                        await connect(device)
                                        .then(() => {
                                          this.discoverServices(device)
                                        })
                                        .catch((error) => {
                                          // Handle errors
                                          console.error(error);
                                      });
                                        // this.manager.stopDeviceScan();
                                    } }
                                />, 
                                <Button 
                                  key={device.id+'st'} 
                                  title={'stablish'} 
                                  onPress={ async () => {
                                      await this.elmInitialization(device)
                                      .catch((error) => {
                                        // Handle errors
                                        console.error(error.message);
                                    });
                                      // this.manager.stopDeviceScan();
                                  } }
                                />, 
                                <Button 
                                  key={device.id+'bgst'} 
                                  title={'atdp'} 
                                  onPress={ async () => {
                                      await this.setupNotifications(device, 'ATDP')
                                      .catch((error) => {
                                        // Handle errors
                                        console.error(error.message);
                                    });
                                      // this.manager.stopDeviceScan();
                                  } }
                                /> , 
                                <Button 
                                  key={device.id+'bg0100st'} 
                                  title={'010C'} 
                                  onPress={ async () => {
                                      await this.setupNotifications(device, '010C')
                                      .catch((error) => {
                                        // Handle errors
                                        console.error(error.message);
                                    });
                                      // this.manager.stopDeviceScan();
                                  } }
                                /> ]
                              })     
                        
                    };
        
     // Proceed with connection.
    }
});
}




    render() {
        return (
            <View style={styles.screen}>
                <Text>Bluetooth: {this.state.bluetoothState}</Text>
                <Text>Połączone urządzenie: {this.state.selectedDevice.name}</Text>
                <Button title="szukaj" onPress={() => {this.scanAndConnect();} } />
                <Text>{this.state.info}</Text>
                {this.state.foundDevicesList}
                <Text>
                   {this.state.rpm || "-" }
                </Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    screen: {
      width: '100%',
      height: '100%',
      paddingTop: 40, 
      paddingHorizontal: 20
    }
});

export default SettingsScreen;