import { Alert, } from 'react-native';
import API from '../server/Api';
import { LOGINUSER } from '../server/constant';
import { LOGIN } from '../Constant/constants';
import loaderData from './LoaderAction';
import AsyncStorage from '@react-native-async-storage/async-storage';



export function loginData(data) {
  return {
    type: LOGIN,
    loginData: data,
  };
}

export function onLogin(email, password, navigation) {
  console.log('navigation', navigation)
  return async (dispatch) => {
    dispatch(loaderData(true));
    let loginDetail = {
      email: email,
      password: password
    }
    console.log(loginDetail)
    API(loginDetail, LOGINUSER, 'POST', '')
      .then((resp) => {
        console.log('response', JSON.stringify(resp.data));
        dispatch(loaderData(false));
        if (resp.data.status === 1 && resp.data.message === 'loggedin') {
          AsyncStorage.setItem('token', JSON.stringify(resp.data.token));

          dispatch(loginData(resp.data.user));
          navigation.navigate('Home')
        }
        // else if (resp.data.error === 'invalid_credentials') {
        //   Alert.alert(
        //     'Unauthorized user',
        //     'Do you want to register user',
        //     [
        //       {
        //         text: 'OK'
        //       },
        //       {
        //         text: 'cancel',
        //         onPress: () => {
        //           props.navigation.push('Login');
        //         },
        //       },
        //     ],
        //     {
        //       cancelable: false,
        //     },
        //   );
        // }
        else {
          console.log('======>', resp.message)
          Alert.alert('', resp.response[0]);
        }
      })
      .catch((error) => {
        dispatch(loaderData(false));
        console.log(error);
      });
  }
}


