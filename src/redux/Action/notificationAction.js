// import {CREATE_NOTIFY, LANGUGAE, NOTIFY, COUNT_NOTI} from './type';
import {logistical} from '../../logistical';
import {Alert} from 'react-native';
import {GetServices} from './ServiceAction';
import {DashboardBooking, GetBookingList} from './bookingAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NOTIFY, CREATE_NOTIFY, RATING} from '../Constant/constants';
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
export const RatingServices = (data, navigation) => dispatch => {
  dispatch({
    type: 'LOADING',
    payload: true,
  });
  console.log(data, 'hsjhsjhshsjshjh reststststts');
  return new Promise(async (resolve, reject) => {
    console.log(' enter tehe hsjksjk', response);
    const response = await logistical.post('/create-rating', data);
    console.log(response, 'rating ');
    if (response.status == 1) {
      console.log('response.fata', response.data);
      dispatch({
        type: RATING,
        ratingBooking: response.data.ratings,
      });
      dispatch({
        type: 'LOADING',
        payload: true,
      });
      resolve(response);
      Alert.alert(response.message);
      navigation.navigate('Booking');
      dispatch({
        type: 'LOADING',
        payload: false,
      });
    }
    // else if (response.message == 'Unauthenticated.') {
    //   Alert.alert('Session expired please login again ..');
    //   dispatch(RemoveToken('null'));
    //   AsyncStorage.removeItem('login');
    //   navigation.navigate('Auth');
    //   dispatch({
    //     type: 'LOADING',
    //     payload: false,
    //   });
    // }
    else {
      dispatch({
        type: 'LOADING',
        payload: false,
      });
      console.log('errrrrrrrrrrrrrrr>>>>>>>>>>>>>>>');
      console.log('datattatatat');
      reject(response.data);
    }
  });
};
