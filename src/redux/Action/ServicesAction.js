import {Alert} from 'react-native';
import {
  COUNT,
  BOOKINGLIST,
  BOOKING_LIST_ID,
  EDIT_BOOKING,
  CANCEL_BOOKING,
  LOCATIONS,
  SERVICES,
} from '../Constant/constants';
import {logistical} from '../../logistical';
import {RemoveToken} from './LoginAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const onAllServices = navigation => dispatch => {
  dispatch({
    type: 'LOADING',
    payload: true,
  });
  return new Promise(async (resolve, reject) => {
    const response = await logistical.get('/get-service-categories-list');

    if (response.status == 1) {
      dispatch({
        type: SERVICES,
        servicesListData: response.data.serviceCategory,
      });

      resolve(response);
      dispatch({
        type: 'LOADING',
        payload: false,
      });
    } else {
      Alert.alert(response.message);
      dispatch({
        type: 'LOADING',
        payload: false,
      });
      console.log('errrrrrrrrrrrrrrr>>>>>>>>>>>>>>>');
      reject(response);
    }
  });
};

export const onAllLocation = navigation => dispatch => {
  dispatch({
    type: 'LOADING',
    payload: true,
  });
  return new Promise(async (resolve, reject) => {
    const response = await logistical.get('/get-location-without-auth');

    if (response.status == 1) {
      dispatch({
        type: LOCATIONS,
        locationListData: response.data.locations,
      });

      resolve(response);
      dispatch({
        type: 'LOADING',
        payload: false,
      });
    } else {
      Alert.alert(response.message);
      dispatch({
        type: 'LOADING',
        payload: false,
      });
      console.log('errrrrrrrrrrrrrrr>>>>>>>>>>>>>>>');
      reject(response);
    }
  });
};
