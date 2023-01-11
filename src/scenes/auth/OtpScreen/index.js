import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  BackHandler,
  Alert,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {BLACK, EEFD, GREY_6C, LIGHT_BLUE, WHITE} from '../../styles/color';
import {OTP} from '../../../assets/icon';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  FREDOKA_ONE_REGULAR,
  MONTSERRAT_BLACK,
  MONTSERRAT_BOLD,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_REGULAR,
} from '../../styles/typography';
import {SafeAreaView} from 'react-native-safe-area-context';
import {handleValidations} from '../../../validations/validate';
import {useDispatch, useSelector} from 'react-redux';
import {onLogin} from '../../../redux/Action/LoginAction';
import Input from '../../../component/common/input';
import CountDown from 'react-native-countdown-component';
import OTPInputView from '@twotalltotems/react-native-otp-input';

export default function OtpScreen(props) {
  const [otp, setOtp] = useState('');

  useEffect(() => {}, []);

  return (
    <ImageBackground
      style={styles.containerBackgroundWrapper}
      resizeMode="cover"
      source={require('../../../assets/images/loginbackground.png')}>
      <View style={{flex: 0.8}}>
        <View style={styles.logoContainer}>
          <Image resizeMode="contain" source={OTP} style={styles.logoImage} />
        </View>
        <View>
          <Text style={styles.inboxText}>Check Your Inbox</Text>

          <View style={styles.headingWrapper}>
            <Text style={styles.headingTextWrapper}>
              Please enter the OTP sent to {'\n'} your mobile number.
            </Text>
          </View>
          <OTPInputView
            style={{
              width: '60%',
              height: 50,
              alignSelf: 'center',
              marginTop: hp(6),
            }}
            pinCount={4}
            code={otp} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            onCodeChanged={otp => setOtp(otp)}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            // onCodeFilled = {(code => {
            //     console.log(`Code is ${code}, you are good to go!`)
            // })}
          />
        </View>
      </View>
      <View style={{flex: 0.2, justifyContent: 'flex-end'}}>
        <Text style={styles.otpNotText}>Didn't receive an OTP ?</Text>
        <Text style={styles.resentTextWrapper}>Resend OTP</Text>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('Home')}
          style={styles.otpWrapper}>
          <Text style={styles.otpTextWrapper}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  containerBackgroundWrapper: {flex: 1, width: '100%', height: '100%'},
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: hp(14),
  },
  logoImage: {height: wp(30), width: wp(40)},
  inboxText: {
    fontSize: 22,
    fontFamily: MONTSERRAT_BOLD,
    color: '#9066e6',
    textAlign: 'center',
  },
  headingWrapper: {marginTop: hp(2), marginHorizontal: wp(5)},
  headingTextWrapper: {
    fontSize: 16,
    fontFamily: MONTSERRAT_MEDIUM,
    color: '#000',
    textAlign: 'center',
    lineHeight: 25,
  },
  underlineStyleBase: {
    width: 45,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: '#000',
    borderRadius: 5,
    backgroundColor: '#fff',
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  textinputWrapper: {
    marginHorizontal: wp(5),
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    width: wp(90),
    marginTop: hp(2.5),
    backgroundColor: WHITE,
  },
  input: {width: wp(80), marginLeft: wp(4)},
  otpNotText: {
    fontSize: 18,
    fontFamily: MONTSERRAT_MEDIUM,
    color: BLACK,
    textAlign: 'center',
  },
  resentTextWrapper: {
    fontSize: 15,
    fontFamily: MONTSERRAT_MEDIUM,
    color: '#c2c2c2',
    textAlign: 'center',
    marginTop: hp(1),
  },
  otpWrapper: {
    paddingVertical: hp(2),
    backgroundColor: '#9066e6',
    width: wp(65),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(2),
  },
  otpTextWrapper: {color: WHITE, fontFamily: MONTSERRAT_BOLD, fontSize: 15},
});
