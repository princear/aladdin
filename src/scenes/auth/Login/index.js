import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  TextInput,
  BackHandler,
  Alert,
  ImageBackground,
  Platform,
} from 'react-native';
import {BLACK, EEFD, GREY_6C, LIGHT_BLUE, WHITE} from '../../styles/color';
import {
  HOME_HEADING,
  LOGO_ALLADIN,
  BLUE_BOX_ARROW,
  MOBILE,
  USER_PROFILE,
  LOCK,
} from '../../../assets/icon';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  MONTSERRAT_BOLD,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_REGULAR,
} from '../../styles/typography';
import {handleValidations} from '../../../validations/validate';
import {useDispatch, useSelector} from 'react-redux';
import {onLogin, UserLogin} from '../../../redux/Action/LoginAction';
import {useNavigation} from '@react-navigation/native';
import OneSignal from 'react-native-onesignal';
import {useTranslation} from 'react-i18next';

export default function Login(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

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

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  // ravinsan015 @gmail.com
  const [showpassword, setShowpassword] = useState(true);
  const [t, i18n] = useTranslation();
  let [inbuiltstate, setInbuiltstate] = useState({
    email: '',
    emailError: '',
    emailStatus: false,
    password: '',
    passwordError: '',
    passwordStatus: false,
  });

  const {loading} = useSelector(state => state.UserReducers);

  const [pId, setPId] = useState('');

  const fetchKey = async authProps => {
    try {
      const data = await OneSignal.getDeviceState();
      const player_id = data.userId;
      setPId(player_id);
    } catch (e) {
      console.log(`Axios request failed! : ${e}`);
      return e;
    }
  };

  useEffect(async => {
    fetchKey();
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId('0687d663-8db1-494f-a5a7-8f4eae0d6726');
    //END OneSignal Init Code
    // OneSignal.promptForPushNotificationsWithUserResponse(response => {
    //   // console.log('Prompt responsePPPPPPPPPPPPPPP:', response);
    // });
    //Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log('OneSignal: notification opened:', notification);
      // console.log('xyaj/sakja======================>', notification)
    });
    // OneSignal.setNotificationWillShowInForegroundHandler((notificationReceivedEvent) => {
    //   const notification = notificationReceivedEvent.getNotification();
    //   console.log('sksksksksksl===================================', notification.body);
    // });
    OneSignal.setNotificationWillShowInForegroundHandler(
      notificationReceivedEvent => {
        console.log(
          'OneSignal: notification will show in foreground:',
          notificationReceivedEvent,
        );
        let notification = notificationReceivedEvent.getNotification();
        console.log('notification Reciveddddddddddddddddddd: ', notification);
        const data = notification.additionalData;
        console.log('additionalData: ', data);

        //Silence notification by calling complete() with no argument
        notificationReceivedEvent.complete(notification);
      },
    );

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  });

  const submitButton = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (email == '') {
      Alert.alert('Please Enter the email');
    } else if (password == '') {
      Alert.alert('password must be 6 characters');
    } else {
      dispatch(
        UserLogin(
          {
            email: email,
            password: password,
            device_token: pId,
          },
          navigation,
        ),
      );
    }
  };

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

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
  //   return () => {
  //     BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
  //   };
  // }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setEmail('');
      setPassword('');
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ImageBackground
      style={styles.imageBackgroundWrapper}
      resizeMode="cover"
      source={require('../../../assets/images/loginbackground.png')}>
      <ScrollView>
        {loading && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              position: 'absolute',
              top: '40%',
              left: '40%',
            }}>
            <ActivityIndicator
              size="large"
              style={{
                //  backgroundColor: "rgba(144,102,230,.8)",
                height: 80,
                width: 80,
                zIndex: 999,

                borderRadius: 15,
              }}
              color="rgba(144,102,230,.8)"
            />
          </View>
        )}

        <View style={styles.logoWrapper}>
          <Image
            resizeMode="contain"
            source={LOGO_ALLADIN}
            style={styles.logoImage}
          />
        </View>
        <View>
          <View style={styles.emailWrapper}>
            <Image
              source={USER_PROFILE}
              resizeMode="contain"
              style={styles.emailImage}
            />
            <Text style={styles.emailText}>{t('placeholders.cart.email')}</Text>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder={t('placeholders.auth.enter_email')}
              placeholderTextColor={'#c2c2c2'}
              value={email}
              keyboardType="email-address"
              onChangeText={email => setEmail(email)}
              style={styles.input}
            />
          </View>
        </View>
        <View style={styles.emailWrapper}>
          <Image source={LOCK} resizeMode="contain" style={styles.emailImage} />
          <Text style={styles.emailText}>
            {' '}
            {t('placeholders.auth.password')}
          </Text>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder={'*********'}
            placeholderTextColor={'#c2c2c2'}
            secureTextEntry={showpassword}
            value={password}
            onChangeText={text => setPassword(text)}
            style={[styles.input, {width: wp(75)}]}
          />

          <TouchableOpacity
            onPress={() => setShowpassword(!showpassword)}
            style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              style={styles.searchIcon}
              source={
                showpassword
                  ? require('../../../assets/images/HidePassword.png')
                  : require('../../../assets/images/show_Password_copy.png')
              }
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('ForgetScreen')}
          style={styles.forgetWrapper}>
          <Text style={styles.forgetText}>
            {' '}
            {t('placeholders.auth.forgotPassword')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => submitButton()}
          style={styles.loginWrapper}>
          <Text style={styles.loginText}> {t('placeholders.auth.login')}</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: hp(2),
          }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: MONTSERRAT_MEDIUM,
              color: '#000',
            }}>
            Not Registered ?{' '}
          </Text>
          <TouchableOpacity
            // onPress={() => navigation.navigate('Registation')}>
            onPress={() => navigation.navigate('VerifyNumberScreen')}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: MONTSERRAT_BOLD,
                color: '#9066e6',
              }}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: LIGHT_BLUE},
  containerText: {fontSize: 27, color: '#000'},
  imageBackgroundWrapper: {flex: 1, width: '100%', height: '100%'},
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: hp(14),
  },
  logoImage: {height: wp(50), width: wp(50)},
  emailWrapper: {
    marginTop: hp(3),
    marginHorizontal: wp(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailImage: {height: hp(3), width: wp(8)},
  emailText: {fontSize: 13, fontFamily: MONTSERRAT_BOLD, color: '#000'},
  inputWrapper: {
    marginHorizontal: wp(6),
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    width: wp(90),
    marginTop: hp(1.5),
    backgroundColor: WHITE,
  },
  input: {
    width: wp(80),
    marginLeft: wp(4),
    paddingVertical: Platform.OS === 'ios' ? hp(2) : hp(2),
  },
  forgetWrapper: {
    justifyContent: 'flex-end',
    marginRight: wp(5),
    alignItems: 'flex-end',
    marginTop: hp(2),
  },
  forgetText: {fontFamily: MONTSERRAT_REGULAR, fontSize: 15, color: '#9066e6'},
  loginWrapper: {
    paddingVertical: hp(2),
    backgroundColor: '#9066e6',
    marginHorizontal: wp(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(4),
  },
  loginText: {color: WHITE, fontFamily: MONTSERRAT_BOLD, fontSize: 15},
  searchIcon: {
    height: hp(5),
    width: wp(8),
    alignItems: 'center',
    // marginTop:10,
    // height:25,
    // width:25,
    // backgroundColor:'red'
  },
});
