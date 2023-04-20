import {LANGUGAE, SET_LANGUGAE} from '../Constant/constants';
import {logistical} from '../../logistical';
import {Alert} from 'react-native';
import {RemoveToken} from './LoginAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { GetServices } from "./ServiceAction";
// import { DashboardBooking, GetBookingList } from "./bookingAction";

export const AllLangugae = navigation => dispatch => {
  dispatch({
    type: 'LOADING',
    payload: true,
  });
  return new Promise(async (resolve, reject) => {
    const response = await logistical.get('/all-language');

    if (response.status == 1) {
      dispatch({
        type: LANGUGAE,
        langData: response.data.lang,
      });

      resolve(response);
      dispatch({
        type: 'LOADING',
        payload: false,
      });
    } else if (response.message == 'Unauthenticated.') {
      Alert.alert('Session expired Please login again..');
      dispatch(RemoveToken('null'));
      AsyncStorage.removeItem('login');
      navigation.navigate('Login');
      dispatch({
        type: 'LOADING',
        payload: false,
      });
    } else {
      console.log('errrrrrrrrrrrrrrr>>>>>>>>>>>>>>>');
      reject(response);
    }
  });
};

export const ParticularLangugae = (data, navigation) => dispatch => {
  console.log(data, navigation);
  dispatch({
    type: 'LOADING',
    payload: true,
  });
  return new Promise(async (resolve, reject) => {
    const response = await logistical.post('/set-local/', data);

    if (response.status == 1) {
      dispatch({
        type: SET_LANGUGAE,
        selectlangData: response.data.user,
      });
      // dispatch(GetServices())
      // dispatch(GetBookingList())
      // dispatch(DashboardBooking())

      resolve(response);
      dispatch({
        type: 'LOADING',
        payload: false,
      });
      // navigation.navigate("MainHome")
    } else if (response.message == 'Unauthenticated.') {
      Alert.alert('Session expired Please login again..');
      dispatch(RemoveToken('null'));
      AsyncStorage.removeItem('login');
      navigation.navigate('Login');
      dispatch({
        type: 'LOADING',
        payload: false,
      });
    } else {
      dispatch({
        type: 'LOADING',
        payload: false,
      });
      console.log('errrrrrrrrrrrrrrr>>>>>>>>>>>>>>>');
      reject(response);
    }
  });
};
