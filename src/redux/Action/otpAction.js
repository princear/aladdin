// import {CREATE_NOTIFY, LANGUGAE, NOTIFY, COUNT_NOTI} from './type';
import {logistical} from '../../logistical';
import {Alert} from 'react-native';
import {GetServices} from './ServiceAction';
import {DashboardBooking, GetBookingList} from './bookingAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RESEND_OTP, VERIFY_OTP, SENDOTP} from '../Constant/constants';
import {RemoveToken} from './LoginAction';

export const sentOtp = (data, navigation) => dispatch => {
  dispatch({
    type: 'LOADING',
    payload: true,
  });
  return new Promise(async (resolve, reject) => {
    const response = await logistical.post('/send-otp', data);
    console.log('response????????', response, response.data);
    if (response.status == '1' && response.message == 'Mobile Number exist') {
      dispatch({
        type: 'LOADING',
        payload: false,
      });
      Alert.alert('Mobile Number already exist');
    } else if (response.status == '1' && response.message == 'Otp Send') {
      dispatch({
        type: SENDOTP,
        payload: response,
      });

      resolve(response);
      dispatch({
        type: 'LOADING',
        payload: false,
      });
      navigation.navigate('OtpScreen', {
        mobilenumber: response.data.mobile.mobile,
        callingCode: response.data.mobile.calling_code,
        OTP: response.data.mobile.otp,
        Id: response.data.mobile.id,
      });
    } else if (
      response.status == '0' &&
      response.message == 'This phone number is already registered with us'
    ) {
      dispatch({
        type: 'LOADING',
        payload: false,
      });
      resolve(response);
      Alert.alert('This phone number is already registered with us');
    } else {
      dispatch({
        type: 'LOADING',
        payload: false,
      });
      console.log('errrrrrrrrrrrrrrr>>>>>>>>>>>>>>>', response);
      Alert.alert(response.message);
      reject(response);
    }
  });
};

export const verifyOtp = (data, navigation) => dispatch => {
  console.log('Verify>>>>>>>>>>', data);
  dispatch({
    type: 'LOADING',
    payload: true,
  });
  return new Promise(async (resolve, reject) => {
    const response = await logistical.post('/verify-otp', data);
    console.log('response verify otp?', response);

    if (response.status == '1') {
      dispatch({
        type: 'LOADING',
        payload: false,
      });
      dispatch({
        type: RESEND_OTP,
        payload: response,
      });

      dispatch({
        type: VERIFY_OTP,
        payload: response,
      });

      Alert.alert(response.response[0]);
      resolve(response);

      navigation.navigate('Registation', {
        // type: 'signUp',
        mobileSave: response.data.mobileOTP.mobile,
        Callcode: response.data.mobileOTP.calling_code,
        //   token: response.data.mobileOTP.token,
      });
    } else {
      dispatch({
        type: 'LOADING',
        payload: false,
      });
      Alert.alert(response.message);
      reject(response);
    }
  });
};
