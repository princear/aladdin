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
  Platform,
  ActivityIndicator,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import {useNavigation} from '@react-navigation/native';
import {MONTSERRAT_BOLD, MONTSERRAT_MEDIUM} from '../styles/typography';
import {LEFT_ARROW} from '../../assets/icon';
import {WHITE} from '../styles/color';
import {sentOtp} from '../../redux/Action/otpAction';
import {onAllLocation, onAllServices} from '../../redux/Action/ServicesAction';

// import {sentOtp} from '../../../redux/Action/otpAction';

export default function VerifyNumberScreen(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [services, setServices] = useState('');
  const [Area, setArea] = useState('');

  const validator = signin => {
    if (mobile === '') {
      seterror('Mobile number is required');
    } else if (mobile.length < 10 || mobile.length > 10) {
      seterror('Mobile number should be 10 digit');
    }
    if (name == '') {
      seterror1('Please Enter the name');
    } else {
      console.log('data');
    }
  };

  const [error, seterror] = useState('');
  const [error1, seterror1] = useState('');

  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');

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
        {cancelable: false},
      );
      return true;
    }
  }

  useEffect(() => {
    dispatch(onAllServices(navigation));
    dispatch(onAllLocation(navigation));
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  const [state, setState] = useState('+964');
  const state_list = [
    {label: '+964', value: '+964'},
    {label: '+91', value: '+91'},
    {label: '+971', value: '+971'},
  ];
  const submitRegistration = () => {
    // setLoading(true);
    if (mobile == '') {
      seterror('Please the enter mobile number');
      //   console.log('Please fill the all field');
    } else if (mobile.length < 10 || mobile.length > 10) {
      seterror('Mobile number should be 10 digit');
    } else {
      dispatch(sentOtp({mobile: mobile, calling_code: state}, navigation));
    }
  };
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.registrationWrapper}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: hp(2),
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={LEFT_ARROW}
              resizeMode="contain"
              style={{height: hp(3), width: wp(6), marginLeft: wp(2)}}
            />
          </TouchableOpacity>
          <View
            style={{
              width: wp(85),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{fontSize: 18, color: WHITE, fontFamily: MONTSERRAT_BOLD}}>
              Sign Up
            </Text>
          </View>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingTop: hp(15),

          // justifyContent: 'center',
          flex: 1,
        }}>
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
                //  backgroundColor: "rgba(144,102,230,.8)",
                backgroundColor: '#9066e6',
                height: 80,
                width: 80,
                zIndex: 999,

                borderRadius: 15,
              }}
              size="small"
              color="#fff"
            />
          </View>
        )}
        <View
          style={{
            // marginTop: hp(3),
            marginHorizontal: wp(5),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 13,
              fontFamily: MONTSERRAT_MEDIUM,
              color: '#6D6D6D',
            }}>
            {' '}
            Mobile Number
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: wp(6),
            flexDirection: 'row',
            alignItems: 'center',
            // elevation: 2,
            width: wp(90),
            marginTop: hp(1.5),
            backgroundColor: WHITE,
          }}>
          <View
            style={{
              borderRightWidth: 1,
              borderRightColor: '#ede2ff',
              width: wp(23),
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              paddingVertical: Platform.OS == 'ios' ? hp(2) : hp(0),
            }}>
            <RNPickerSelect
              onValueChange={value => setState(value)}
              items={state_list}
              value={state}
              placeholder={{}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: wp(4),
                  // alignItems: 'center',
                }}>
                {state_list.map(
                  item =>
                    item.value === state && (
                      <Text
                        key={item.value}
                        style={{
                          fontSize: 13,
                          color: '#BCBCBC',
                          fontFamily: 'Montserrat-Medium',
                        }}>
                        {item.label}
                      </Text>
                    ),
                )}
                <Image
                  source={require('../../assets/images/Downarrow.png')}
                  resizeMode="contain"
                  style={{height: hp(3), width: wp(8)}}
                />
              </View>
            </RNPickerSelect>
          </View>
          <TextInput
            placeholder={'Add Your number (Iraq only) '}
            placeholderTextColor={'#c2c2c2'}
            keyboardType="numeric"
            maxLength={10}
            value={mobile}
            onChangeText={text => {
              seterror('');
              setMobile(text);
            }}
            style={{width: wp(80), marginLeft: wp(2)}}
          />
        </View>
        {error !== '' ? (
          <Text style={{marginLeft: wp(6), color: 'red', textAlign: 'left'}}>
            {error}
          </Text>
        ) : null}

        <TouchableOpacity
          style={{
            backgroundColor: '#9066e6',
            paddingVertical: hp(1),
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: hp(2),
            marginTop: hp(4),
            marginHorizontal: wp(5),
          }}
          // onPress={() => submitButton()}
          onPress={() => {
            submitRegistration();
          }}>
          <Text
            style={{color: '#fff', fontSize: 15, fontFamily: MONTSERRAT_BOLD}}>
            Send OTP
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F5F5F5'},
  containerText: {fontSize: 27, color: '#000'},
  pickerStyle: {
    color: 'red',
    fontSize: 12,
  },
  registrationWrapper: {
    height: Platform.OS == 'ios' ? hp(7) : hp(8),
    // paddingVertical: hp(2),
    backgroundColor: '#9066e6',
    // borderBottomLeftRadius: 9,
    // borderBottomRightRadius: 9,
  },
});
