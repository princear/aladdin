import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, BackHandler, Alert, ImageBackground } from 'react-native';
import { BLACK, EEFD, GREY_6C, LIGHT_BLUE, WHITE } from '../../styles/color';
import { HOME_HEADING, LOGO_ALLADIN, BLUE_BOX_ARROW,MOBILE,USER_PROFILE,LOCK } from '../../../assets/icon';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FREDOKA_ONE_REGULAR, MONTSERRAT_BOLD, MONTSERRAT_REGULAR } from '../../styles/typography';
import { SafeAreaView } from 'react-native-safe-area-context';
import { handleValidations } from '../../../validations/validate';
import { useDispatch, useSelector } from 'react-redux';
import { onLogin } from '../../../redux/Action/LoginAction';
import Input from '../../../component/common/input';


export default function Login(props) {

  const dispatch = useDispatch();

  const handlevalidate = async (text, type) => {
    let status = `${type}Status`;
    let errorText = `${type}Error`;
    let resp = handleValidations(text, type);
    await setInbuiltstate({
      ...inbuiltstate,
      [type]: resp.value,
      [errorText]: resp.errorText,
      [status]: resp.status,
    });
  };


  let [inbuiltstate, setInbuiltstate] = useState({
    email: '',
    emailError: '',
    emailStatus: false,
    password: '',
    passwordError: '',
    passwordStatus: false,
  })

  const submitButton = () => {
    if (inbuiltstate.emailStatus) {
      if (inbuiltstate.passwordStatus) {
        dispatch(onLogin(inbuiltstate.email, inbuiltstate.password, props))
      } else {
        setInbuiltstate({
          ...inbuiltstate,
          passwordStatus: false,
          passwordError: '*Please enter valid password.',
        });
      }
    }
    else {
      setInbuiltstate({
        ...inbuiltstate,
        emailStatus: false,
        emailError: '*Please enter email.',
      });
    }
  }

  function handleBackButtonClick() {
    // navigation.isFocused() helps to exit the app on this component rather than in whole app.
    if (props.navigation.isFocused()) {
      Alert.alert(
        '',
        'Are you sure you want to quit the app?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => BackHandler.exitApp(),
          },
        ],
        { cancelable: false },
      );
      return true;
    }
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);



  return (
    <ImageBackground style={{ flex: 1, width: '100%', height: '100%', }} resizeMode='cover' source={require('../../../assets/images/loginbackground.png')} >
      <View style={{alignItems:'center', justifyContent:'center', paddingTop:hp(14)}}>
      <Image resizeMode='contain' source={LOGO_ALLADIN} style={{height:wp(50), width:wp(50),}}/>
      </View>
      <View>

        <View style={{ marginTop: hp(3), marginHorizontal: wp(5), flexDirection: 'row', alignItems: 'center' }}>
          <Image source={USER_PROFILE} resizeMode='contain' style={{ height: hp(3), width: wp(8) }} />
          <Text style={{ fontSize: 13, fontFamily: MONTSERRAT_BOLD, color: '#000' }}>Mobile no</Text>

        </View>
        <View style={{ marginHorizontal: wp(6), flexDirection: 'row', alignItems: 'center', elevation: 2, width: wp(90), marginTop: hp(1.5), backgroundColor: WHITE }}>
          <TextInput
            placeholder={'Enter your name mobile no. '}
            placeholderTextColor={'#c2c2c2'}
            value={inbuiltstate.email}
            onChangeText={(text) => handlevalidate(text, 'email')}
            errortext={inbuiltstate.emailError}
            style={{ width: wp(80), marginLeft: wp(4) }}
          />
        </View>
      </View>
      <View style={{ marginTop: hp(3), marginHorizontal: wp(5), flexDirection: 'row', alignItems: 'center' }}>
          <Image source={LOCK} resizeMode='contain' style={{ height: hp(3), width: wp(8) }} />
          <Text style={{ fontSize: 13, fontFamily: MONTSERRAT_BOLD, color: '#000' }}> Password</Text>

        </View>
        <View style={{ marginHorizontal: wp(6), flexDirection: 'row', alignItems: 'center', elevation: 2, width: wp(90), marginTop: hp(1.5), backgroundColor: WHITE }}>
          <TextInput
            placeholder={'*********'}
            placeholderTextColor={'#c2c2c2'}
            secureTextEntry={true}
            value={inbuiltstate.password}
            onChangeText={(text) => handlevalidate(text, 'password')}
            errortext={inbuiltstate.passwordError}
            style={{ width: wp(80), marginLeft: wp(4) }}
          />
        </View>
        <TouchableOpacity onPress={() => props.navigation.navigate('ForgetScreen')} style={{justifyContent:'flex-end', marginRight:wp(5), alignItems:'flex-end', marginTop:hp(2)}}>
        <Text style={{fontFamily: MONTSERRAT_REGULAR, fontSize: 15, color: '#9066e6'}}>Forgot Password</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.navigation.navigate('Home')} style={{paddingVertical:hp(2), backgroundColor:'#9066e6', marginHorizontal:wp(5), justifyContent:'center', alignItems:'center', marginTop:hp(4)}}>
          <Text style={{color: WHITE, fontFamily: MONTSERRAT_BOLD, fontSize: 15}}>Login</Text>
        </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: LIGHT_BLUE },
  containerText: { fontSize: 27, color: '#000' },
});
