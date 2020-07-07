import {PermissionsAndroid} from 'react-native';

import {AppName} from '../../assets/constants';
export default async function requestLocationPermission() {
  try {
    let granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: '',
        message: `Aplikacja ${AppName} wymaga dostępu do twojej lokalizacji`,
        buttonNeutral: 'Zapytaj później',
        buttonNegative: 'Anuluj',
        buttonPositive: 'OK',
      }
    ).then(
      await PermissionsAndroid.request(
        (granted = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION),
        {
          title: '',
          message: `Aplikacja ${AppName} wymaga dostępu do twojej lokalizacji`,
          buttonNeutral: 'Zapytaj później',
          buttonNegative: 'Anuluj',
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
