import { USER_LOGIN, GET_TOKEN, REMOVE_TOKEN, PROFILE_LOGIN, UPDATE_PROFILE_LOGIN } from "../Constant/constants";
import { logistical } from '../../logistical'
import AsyncStorage from "@react-native-community/async-storage";
import { Alert, ToastAndroid } from "react-native";


export const RemoveToken = (data, navigation) => dispatch => {

  return new Promise(async (resolve, reject) => {

    dispatch({
      type: REMOVE_TOKEN,
      Token: data
    })

    // navigation.navigate('AuthCheck');
  })
}


export const UserLogin = (data, navigation) => dispatch => {

  dispatch({
    type: 'LOADING',
    payload: true
  });

  console.log("login detail>>>>>>>>>>", data);
  return new Promise(async (resolve, reject) => {

    const response = await logistical.post('/service-provider-login', data);

    if (response.status == '1' && response.message == 'loggedin') {

      AsyncStorage.setItem("login", JSON.stringify(response.data.token));

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

      dispatch({

        type: 'LOADING',
        payload: false

      });
    }

    else if (response.status == '0' && response.message == 'invalid_credentials') {

      Alert.alert(response.response[0])
      dispatch({

        type: 'LOADING',
        payload: false

      });
    }

    else {
      // Alert.alert(response.message)
      Alert.alert(response.response[0])
      dispatch({

        type: 'LOADING',
        payload: false

      });
      console.log('errrrrrrrrrrrrrrr>>>>>>>>>>>>>>>')
      reject(response);
    }
  });
};

export const ProfileData = (data, navigation) => dispatch => {

  return new Promise(async (resolve, reject) => {

    const loginDataaa = await AsyncStorage.getItem('loginData');

    const response = await logistical.get('/get-profile' + '/' + loginDataaa, data);

    if (response.status == '1') {

      dispatch({
        type: PROFILE_LOGIN,
        profile: response.data.user,
      });

      resolve(response);
    }

    else {
      Alert.alert(response.response[0])
      dispatch({
        type: 'LOADING',
        payload: false

      });
      console.log('errrrrrrrrrrrrrrr>>>>>>>>>>>>>>>')
      reject(response);
    }
  });
};


export const UpdateProfileData = (data, navigation) => dispatch => {
  dispatch({
    type: 'LOADING',
    payload: true

  });
  return new Promise(async (resolve, reject) => {

    dispatch({
      type: 'LOADING',
      payload: false

    });

    //  const form = new FormData();

    //  form.append('image', {
    //    uri: "file:///...",
    //    type: 'image/jpg',
    //    name: 'image.jpg',
    //  });

    //  fetch('https://example.com/api/upload', {
    //    method: 'POST',
    //    body: form
    //  });


    const response = await logistical.post('/update-profile', data);

    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>', response)

    if (response.status == '1' && response.message == 'Successfully Response') {
      // dispatch({
      //   type: UPDATE_PROFILE_LOGIN,
      //   updateProfile: response.data.user,
      // });

      dispatch(ProfileData())
      // Alert.alert(response.response[0])
      ToastAndroid.showWithGravity(
        'Profile pic updated successfully!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
      resolve(response);

    }

    else {
      Alert.alert(response.response[0])
      dispatch({
        type: 'LOADING',
        payload: false

      });
      console.log('errrrrrrrrrrrrrrr>>>>>>>>>>>>>>>')
      reject(response);
    }
  });
};
