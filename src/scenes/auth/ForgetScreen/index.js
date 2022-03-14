import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, BackHandler, Alert, ImageBackground } from 'react-native';
import { BLACK, EEFD, GREY_6C, LIGHT_BLUE, WHITE } from '../../styles/color';
import { FORGET_IMAGE } from '../../../assets/icon';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FREDOKA_ONE_REGULAR, MONTSERRAT_BLACK, MONTSERRAT_BOLD, MONTSERRAT_MEDIUM, MONTSERRAT_REGULAR } from '../../styles/typography';
import { SafeAreaView } from 'react-native-safe-area-context';
import { handleValidations } from '../../../validations/validate';
import { useDispatch, useSelector } from 'react-redux';
import { onLogin } from '../../../redux/Action/LoginAction';
import Input from '../../../component/common/input';


export default function ForgetScreen(props) {

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
    mobile: '',
    mobileError: '',
    mobileStatus: false,
    password: '',
    passwordError: '',
    passwordStatus: false,
  })

  const submitButton = () => {
    if (inbuiltstate.mobileStatus) {
      if (inbuiltstate.passwordStatus) {
        dispatch(onLogin(inbuiltstate.mobile, inbuiltstate.password, props))
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
        mobileStatus: false,
        mobileError: '*Please enter your mobile number.',
      });
    }
  }

  useEffect(() => {
   
  }, []);



  return (
    <ImageBackground style={styles.containerBackgroundWrapper} resizeMode='cover' source={require('../../../assets/images/loginbackground.png')} >
      <View style={styles.logoContainer}>
        <Image resizeMode='contain' source={FORGET_IMAGE} style={styles.logoImage} />
      </View>
      <View>

        <View style={styles.headingWrapper}>
          <Text style={styles.headingTextWrapper}>Enter the mobile number with your account and we'll send an otp to reset your password</Text>

        </View>
        <View style={styles.textinputWrapper}>
          <TextInput
            placeholder={'Enter your name mobile no. '}
            placeholderTextColor={'#c2c2c2'}
            value={inbuiltstate.mobile}
            onChangeText={(text) => handlevalidate(text, 'mobile')}
            errortext={inbuiltstate.mobileError}
            style={styles.input}
          />
        </View>
      </View>


      <TouchableOpacity onPress={() => props.navigation.navigate('OtpScreen')} style={styles.otpWrapper}>
        <Text style={styles.otpTextWrapper}>Send OTP</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  containerBackgroundWrapper:{ flex: 1, width: '100%', height: '100%', },
  logoContainer:{ alignItems: 'center', justifyContent: 'center', paddingTop: hp(14) },
  logoImage:{ height: wp(50), width: wp(50), },
  headingWrapper:{ marginTop: hp(3), marginHorizontal: wp(5), },
  headingTextWrapper:{ fontSize: 14, fontFamily: MONTSERRAT_MEDIUM, color: '#000' },
  textinputWrapper:{ marginHorizontal: wp(5), flexDirection: 'row', alignItems: 'center', elevation: 2, width: wp(90), marginTop: hp(2.5), backgroundColor: WHITE },
  input:{ width: wp(80), marginLeft: wp(4) },
  otpWrapper:{ paddingVertical: hp(2), backgroundColor: '#9066e6', width:wp(65), alignSelf:'center', justifyContent: 'center', alignItems: 'center', marginTop: hp(10) },
  otpTextWrapper:{ color: WHITE, fontFamily: MONTSERRAT_BOLD, fontSize: 15 },


});
