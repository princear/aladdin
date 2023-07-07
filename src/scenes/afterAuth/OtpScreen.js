import React, { useEffect, useState } from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  Pressable,
  KeyboardAvoidingView,
  SafeAreaView,
  useWindowDimensions,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Button,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import Colors from '../Layout/Colors';
// import Device from './Device';
// import {sentOtp, verifyOtp} from '../Redux/Action/SendOtp';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import CountDown from 'react-native-countdown-component';
import { useTranslation } from 'react-i18next';
import { sentOtp, verifyOtp } from '../../redux/Action/otpAction';
import { WHITE } from '../styles/color';
import { MONTSERRAT_BOLD } from '../styles/typography';

const OtpScreenShow = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [counter, SetCounter] = useState(140);

  const [random, SetRandom] = useState(Math.random());
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  const handleResend = () => {
    setLoading(true);
    SetRandom(Math.random());
    dispatch(
      sentOtp(
        {
          mobile: route.params.mobilenumber,
          calling_code: route.params.callingCode,
        },
        navigation,
      ),
    );

    // Handle Resend otp action here
  };

  const OTPVerify = otpText => {
    // const  dataotp = route.params.OTP;

    const dataotp = otpText;
    const id = route.params.Id;

    if (otpText === '') {
      Alert.alert('Please enter the OTP');
    } else {
      dispatch(verifyOtp({ otp: dataotp, mobile_otp_id: id }, navigation));
    }
  };

  const [t] = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.UpperBlock}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.listIcon}
            source={require('../../assets/images/left-arrow.png')}
          />
        </TouchableOpacity>
        <View
          style={{
            width: wp(89),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{ fontSize: 18, color: WHITE, fontFamily: MONTSERRAT_BOLD }}>
            Sign Up
          </Text>
        </View>
        {/* <Text style={{ width: wp('70%'), marginLeft: 20, fontSize: 14, paddingTop: 5, color: '#fff', fontFamily: 'Montserrat-SemiBold' }}>{ServiceDetail.service.name}</Text> */}
      </View>

      {loading && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            position: 'absolute',
            top: '50%',
            left: '40%',
          }}>
          <ActivityIndicator
            style={{
              // backgroundColor: 'rgba(20,116,240,.8)',
              backgroundColor: '#9066e6',
              height: 80,
              width: 80,
              zIndex: 999,
              borderRadius: 15,
            }}
            size="small"
            color="#ffffff"
          />
        </View>
      )}

      {/* <Image style={styles.logo} source={require('../assets/otpheader.png')} /> */}

      <View style={styles.OTPContainer}>
        {/* <Text> {route.params.OTP}</Text>
        <Text> {route.params.Id}</Text> */}
        <Text style={styles.HomeText}>
          {t('placeholders.auth.Otp_verification')}
        </Text>
        <Text style={{ paddingTop: 10, paddingBottom: 10 }}>
          {t('placeholders.auth.time_password')} {'\n'}
          {t('placeholders.auth.thisNumber')}
        </Text>
      </View>

      <View style={styles.tabViewContainer}>
        {/* <OTP/> */}
        <Text style={{ textAlign: 'center', padding: 25 }}>
          {t('placeholders.auth.otpENter')}
        </Text>
        <OTPInputView
          style={{ width: '60%', height: 50, alignSelf: 'center' }}
          pinCount={4}
          keyboardType={'phone-pad'}
          code={otp} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          onCodeChanged={otp => setOtp(otp?.replace(/[^0-9]/g, ''))}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => {
            console.log(`Code is ${code}, you are good to go!`);
          }}
        />
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <CountDown
          key={random}
          until={counter}
          size={15}
          onFinish={() => setDisabled(() => false)}
          separatorStyle={{ color: 'black' }}
          digitStyle={{ backgroundColor: 'transparent' }}
          digitTxtStyle={{ color: 'black' }}
          timeToShow={['M', 'S']}
          showSeparator
          timeLabels={{ m: '', s: '' }}
        />
      </View>



      <TouchableOpacity style={styles.button} onPress={() => OTPVerify(otp)}>
        <Text style={styles.buttonText}>
          {t('placeholders.auth.verify_oto')}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OtpScreenShow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dfdfdf',
  },
  button: {
    marginTop: 30,
    marginHorizontal: 40,
    backgroundColor: '#9066e6',
    padding: 10,
    width: wp('40%'),
    borderRadius: 10,
    alignSelf: 'center',
  },

  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    //  textTransform:'uppercase'
  },

  UpperBlock: {
    height: hp('7%'),
    backgroundColor: '#9066e6',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  OTPContainer: {
    width: wp('90%'),
    marginTop: 20,
    alignSelf: 'center',
  },
  listIcon: {
    height: 20,
    width: 20,
    // marginLeft: 10,
  },
  logo: {
    // resizeMode:'contain',
    alignSelf: 'center',
    height: hp('30%'),
    width: wp('100%'),
  },

  HomeText: {
    color: '#9066e6',
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    // alignSelf:'center'
  },

  content: {
    //  padding: 10,
    marginTop: 20,
  },

  // tabViewContainer: {
  //   //marginVertical: 50,
  //   height: Device.height * 0.2,
  // },

  maxHeight: { height: '100%' },

  tabBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  tabItem: {
    width: '50%',
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  tabTitle: {
    fontSize: 15,
    color: '#000',
  },
  borderStyleHighLighted: {
    borderColor: '#03DAC6',
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
});
