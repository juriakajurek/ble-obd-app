import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  PermissionsAndroid,
  ScrollView,
  Switch,
} from 'react-native';
import {connect} from 'react-redux';
import * as constants from '../../assets/constants';

import BtModule from '../../BtModule';
import DeviceListItem from '../components/DevicesListItem';
import SearchingStatus from '../components/SearchingStatus';
import {BluetoothStatus} from 'react-native-bluetooth-status';

import {
  setBtModule,
  addDevice,
  addDeviceToList,
  addToResponse,
  setSelectedDevice,
  setBtSearching,
  setBluetoothStatus,
} from '../actions/actions';

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
  constructor(props) {
    super(props);
    this.getDevices = this.getDevices.bind(this);

    this.props.setBluetoothStatus(BluetoothStatus.bluetoothState == 'on');
    BluetoothStatus.addListener(() => {
      this.props.setBluetoothStatus(BluetoothStatus.bluetoothState == 'on');
    });

    if (!this.props.btModule.manager) {
      this.props.setBtModule(
        new BtModule({...this.props, getDevices: this.getDevices})
      );
    }
  }

  getDevices() {
    return this.props.devices;
  }

  componentDidMount() {
    requestLocationPermission();
  }

  componentWillUnmount() {
    BluetoothStatus.removeListener();
  }

  btSwitch() {
    return Platform.OS !== 'ios' ? (
      <Switch
        trackColor={{false: '#767577', true: constants.btColor}}
        thumbColor={'#ffffff'}
        onValueChange={() => {
          if (this.props.bluetoothStatus) {
            this.props.btModule.manager.stopDeviceScan();
            this.props.setBtSearching(false);
          }
          BluetoothStatus.enable(!this.props.bluetoothStatus);
        }}
        value={this.props.bluetoothStatus}
      />
    ) : (
      <View />
    );
  }

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.heading}>
          <Text style={styles.headerTitle}>Bluetooth</Text>
          {this.btSwitch()}

          {this.props.bluetoothStatus ? (
            <View>
              <Text style={styles.btStatus}>Włączony</Text>
              {!this.props.selectedDevice.id && !this.props.isBtSearching ? (
                <DeviceListItem
                  title="Wyszukaj urządzenia"
                  onPress={() => {
                    this.props.btModule.scanAndConnect();
                    this.props.setBtSearching(true);
                  }}
                />
              ) : this.props.selectedDevice.id ? (
                <View>
                  <Text style={styles.headerDescription}>
                    Połączone urządzenie:{' '}
                    {this.props.selectedDevice.id
                      ? this.props.selectedDevice.name
                      : ''}
                  </Text>
                  <DeviceListItem
                    style={{
                      backgroundColor: 'rgba(255,0, 0, 0.6)',
                    }}
                    title="Rozłącz"
                    onPress={() => {
                      this.props.selectedDevice.cancelConnection();
                      this.props.setSelectedDevice({});
                    }}
                  />
                </View>
              ) : this.props.isBtSearching ? (
                <View>
                  <Text style={styles.headerDescription}>
                    Wyszukiwanie urządzeń...
                  </Text>
                  <SearchingStatus style={styles.searchingStatus} />
                  <ScrollView style={styles.scroll}>
                    {this.props.foundDevicesList}
                  </ScrollView>
                </View>
              ) : (
                <View />
              )}
            </View>
          ) : (
            <View>
              <Text style={{...styles.btStatus, color: 'red'}}> Wyłączony</Text>
            </View>
          )}

          {/* <Text>{this.props.response}</Text>
          <TextInput
            onChangeText={txt => (this.value = txt)}
            value={this.txt}
          />
          <Button
            title="send"
            onPress={() => {
              this.module.setupNotifications(
                this.props.selectedDevice,
                this.value
              );
            }}
          /> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: constants.bgColor,
    height: '100%',
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
    marginBottom: 50,
  },
  headerDescription: {
    padding: 10,
    fontSize: 18,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  scroll: {},
});

const mapStateToProps = state => {
  return {
    btModule: state.main.btModule,
    devices: state.main.devices,
    foundDevicesList: state.main.foundDevicesList,
    response: state.main.response,
    selectedDevice: state.main.selectedDevice,
    isBtSearching: state.main.isBtSearching,
    bluetoothStatus: state.main.bluetoothStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setBtModule: mod => dispatch(setBtModule(mod)),
    addDevice: device => dispatch(addDevice(device)),
    addDeviceToList: device => dispatch(addDeviceToList(device)),
    setResponse: res => dispatch(addToResponse(res)),
    setSelectedDevice: device => dispatch(setSelectedDevice(device)),
    setBtSearching: val => dispatch(setBtSearching(val)),
    setBluetoothStatus: status => dispatch(setBluetoothStatus(status)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);
