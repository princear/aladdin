import {
  USER_LOGIN,
  GET_TOKEN,
  REMOVE_TOKEN,
  PROFILE_LOGIN,
  UPDATE_PROFILE_LOGIN,
  FORGET,
} from '../Constant/constants';
import {logistical} from '../../logistical';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, ToastAndroid} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import {onCountBooking} from './BookingAction';

export const RemoveToken = (data, navigation) => dispatch => {
  return new Promise(async (resolve, reject) => {
    dispatch({
      type: REMOVE_TOKEN,
      Token: data,
    });

    // navigation.navigate('AuthCheck');
  });
};

export const UserLogin = (data, navigation) => dispatch => {
  dispatch({
    type: 'LOADING',
    payload: true,
  });

  console.log('login detail>>>>>>>>>>', data);
  return new Promise(async (resolve, reject) => {
    const response = await logistical.post('/service-provider-login', data);

    if (response.status == '1' && response.message == 'loggedin') {
      AsyncStorage.setItem('login', JSON.stringify(response.data.token));
      AsyncStorage.setItem('loginId', JSON.stringify(response.data.user.id));

      dispatch({
        type: USER_LOGIN,
        Userdata: response.data,
      });

      dispatch({
        type: GET_TOKEN,
        Token: response.data.token,
      });

      //   Alert.alert(response.response[0])
      resolve(response);

      // navigation.navigate('AuthCheck');

      navigation.navigate('Home');
      //   navigation.dispatch(DrawerActions.closeDrawer())
      dispatch(onCountBooking(navigation));
      dispatch(ProfileData());
      dispatch({
        type: 'LOADING',
        payload: false,
      });
    } else if (
      response.status == '0' &&
      response.message == 'invalid_credentials'
    ) {
      Alert.alert(response.response[0]);
      dispatch({
        type: 'LOADING',
        payload: false,
      });
    } else {
      // Alert.alert(response.message)
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

export const ProfileData = navigation => dispatch => {
  dispatch({
    type: 'LOADING',
    payload: true,
  });

  return new Promise(async (resolve, reject) => {
    const loginId = await AsyncStorage.getItem('loginId');

    const response = await logistical.get(
      '/get-provider-profile' + '/' + loginId,
    );

    if (response.status == '1') {
      dispatch({
        type: PROFILE_LOGIN,
        profile: response.data.user,
      });
      resolve(response);
      dispatch({
        type: 'LOADING',
        payload: false,
      });
    } else if (response.status == 0 && response.message == 'unauthenticated') {
      Alert.alert('Session expired Please login again..');
      dispatch(RemoveToken('null'));
      AsyncStorage.removeItem('login');
      navigation.navigate('Login');
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

export const UpdateProfileData = (data, navigation) => dispatch => {
  dispatch({
    type: 'LOADING',
    payload: true,
  });
  return new Promise(async (resolve, reject) => {
    dispatch({
      type: 'LOADING',
      payload: false,
    });
    const response = await logistical.post('/update-provider-profile', data);

    // console.log('====================================>', response)
    if (response.status == '1' && response.message == 'Successfully Response') {
      dispatch(ProfileData());
      // Alert.alert(response.response[0])
      ToastAndroid.showWithGravity(
        'Data updated successfully!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
      resolve(response);
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

export const ForgetPassword = (data, navigation) => dispatch => {
  dispatch({
    type: 'LOADING',
    payload: true,
  });

  console.log('login detail>>>>>>>>>>', data);
  return new Promise(async (resolve, reject) => {
    const response = await logistical.post('/forget-password', data);

    if (response.status == '1' && response.message == 'Successfully Response') {
      dispatch({
        type: FORGET,
        forgetdata: response.data,
      });

      resolve(response);

      Alert.alert(response.response[0]);
      navigation.navigate('Login');

      dispatch({
        type: 'LOADING',
        payload: false,
      });
    } else {
      // Alert.alert(response.message)
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
