// import {CREATE_NOTIFY, LANGUGAE, NOTIFY, COUNT_NOTI} from './type';
import {logistical} from '../../logistical';
import {Alert} from 'react-native';
import {GetServices} from './ServiceAction';
import {DashboardBooking, GetBookingList} from './bookingAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NOTIFY, CREATE_NOTIFY} from '../Constant/constants';
import {RemoveToken} from './LoginAction';

export const AllNotification = navigation => dispatch => {
  return new Promise(async (resolve, reject) => {
    const response = await logistical.get('/push-notifications');
    // console.log(response.data, '========================');

    if (response.status == 1) {
      dispatch({
        type: NOTIFY,
        notiData: response.data.pushNotification,
      });
      resolve(response);
    } else if (response.message == 'Unauthenticated.') {
      Alert.alert('Session expired Please login again..');
      dispatch(RemoveToken('null'));
      AsyncStorage.removeItem('login');
      navigation.navigate('Login');
    } else {
      console.log('errrrr language');
      reject(response);
    }
  });
};

export const ParticularNotification = (data, navigation) => dispatch => {
  console.log(data, 'datata shoe ');

  return new Promise(async (resolve, reject) => {
    const response = await logistical.post('/save-push-notifications/', data);

    if (response.status == '1') {
      dispatch({
        type: CREATE_NOTIFY,
        selectnotifyData: response.data,
      });
      dispatch(AllNotification(navigation));
      // navigation.navigate('notification');
      resolve(response);

      // navigation.navigate("MainHome")
    } else if (response.message == 'Unauthenticated.') {
      Alert.alert('Session expired Please login again..');
      dispatch(RemoveToken('null'));
      AsyncStorage.removeItem('login');
      navigation.navigate('Login');
    } else {
      Alert.alert(response.response[0]);
      dispatch({
        type: 'LOADING',
        payload: false,
      });
      console.log('errrrrrrrrrrrrrrr>>>>>>>>>>>>>>>');
      reject(response);
    }
  });
};

export const CountNotification = data => dispatch => {
  dispatch({
    type: COUNT_NOTI,
    countData: data,
  });
};
