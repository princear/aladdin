//Designed By Pradeep Gupta
/* eslint-disable no-shadow */
/* eslint-disable global-require */
/* eslint-disable react/jsx-props-no-spreading */
import React, {useEffect, useState} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import {
  Alert,
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  MONTSERRAT_BOLD,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_REGULAR,
} from '../scenes/styles/typography';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RemoveToken} from '../redux/Action/LoginAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {DrawerActions} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const DrawerContent = ({props, navigation}) => {
  const dispatch = useDispatch();
  const Logout = () => {
    dispatch(RemoveToken('null'));

    AsyncStorage.removeItem('login');
    navigation.navigate('Login');
  };

  const [active, setActive] = useState('Dashboard');

  const {loading} = useSelector(state => state.UserReducers);

  const dashboardBack = () => {
    setActive('Dashboard');
    navigation.navigate('Home');
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  const bookingBack = () => {
    setActive('Bookings'),
      navigation.navigate('Booking', {
        BookingStatus: 'Pending',
      }),
      navigation.dispatch(DrawerActions.closeDrawer());
  };
  const profileBack = () => {
    setActive('Profile'),
      navigation.navigate('ProfileScreen'),
      navigation.dispatch(DrawerActions.closeDrawer());
  };
  const langugaeBack = () => {
    setActive('Language'),
      navigation.navigate('LanguageScreen'),
      navigation.dispatch(DrawerActions.closeDrawer());
  };
  const [t] = useTranslation();

  return (
    <View style={styles.drawerContainer}>
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
      <DrawerContentScrollView {...props}>
        <View style={styles.menuWrapper}>
          <Text style={styles.leftTextWrapper}>
            {t('placeholders.rang.menu')}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
            <Image
              source={require('../assets/images/closeingray.png')}
              resizeMode="contain"
              style={styles.rightImageWrapper}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => dashboardBack()}
          style={[
            styles.dashboardWrapper,
            {backgroundColor: active === 'Dashboard' ? '#9066e6' : '#fff'},
          ]}>
          <Image
            source={require('../assets/images/dashboard.png')}
            resizeMode="contain"
            style={styles.dashboardImage}
          />
          <Text style={styles.dashboardText}>
            {t('placeholders.homePage.dashbpard')}
          </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.bookingWrapper}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require( '../assets/images/Bookservices.png' )} resizeMode='contain' style={styles.bookingImage} />
            <Text style={styles.bookingText}>Booking Services</Text>
          </View>
          <Image source={require( '../assets/images/rightArrow.png' )} resizeMode='contain' style={styles.bookingImage} />


        </TouchableOpacity> */}
        <TouchableOpacity
          style={[
            styles.bookingWrapper,
            {backgroundColor: active === 'Bookings' ? '#9066e6' : '#fff'},
          ]}
          onPress={() => bookingBack()}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../assets/images/Bookings.png')}
              resizeMode="contain"
              style={styles.bookingImage}
            />
            <Text style={styles.bookingText}>
              {t('placeholders.bookingList.booking')}
            </Text>
          </View>
          <Image
            source={require('../assets/images/rightArrow.png')}
            resizeMode="contain"
            style={styles.bookingImage}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.bookingWrapper,
            {backgroundColor: active === 'Profile' ? '#9066e6' : '#fff'},
          ]}
          onPress={() => profileBack()}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../assets/images/CustomerFordashboard.png')}
              resizeMode="contain"
              style={styles.bookingImage}
            />
            <Text style={styles.bookingText}>
              {t('placeholders.profile.profileHeading')}
            </Text>
          </View>
          <Image
            source={require('../assets/images/rightArrow.png')}
            resizeMode="contain"
            style={styles.bookingImage}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.bookingWrapper,
            {backgroundColor: active === 'Language' ? '#9066e6' : '#fff'},
          ]}
          onPress={() => langugaeBack()}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../assets/images/play.png')}
              resizeMode="contain"
              style={styles.bookingImage}
            />
            <Text style={styles.bookingText}>
              {t('placeholders.settings.language')}{' '}
            </Text>
          </View>
          <Image
            source={require('../assets/images/rightArrow.png')}
            resizeMode="contain"
            style={styles.bookingImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.bookingWrapper,
            {backgroundColor: active === 'Logout' ? '#9066e6' : '#fff'},
          ]}
          onPress={() => {
            setActive('Logout'), Logout();
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../assets/images/logout.png')}
              resizeMode="contain"
              style={styles.bookingImage}
            />
            <Text style={styles.bookingText}>
              {t('placeholders.settings.logout')}
            </Text>
          </View>
          <Image
            source={require('../assets/images/rightArrow.png')}
            resizeMode="contain"
            style={styles.bookingImage}
          />
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContainer: {flex: 1, backgroundColor: '#fff'},
  menuWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    marginTop: hp(2),
  },
  leftTextWrapper: {
    fontSize: 14,
    color: '#000',
    fontFamily: MONTSERRAT_BOLD,
  },
  rightImageWrapper: {
    height: hp(4),
    width: wp(8),
  },
  dashboardImage: {
    height: hp(6),
    width: wp(7),
  },
  dashboardWrapper: {
    backgroundColor: '#9066e6',
    paddingVertical: hp(1),
    paddingHorizontal: wp(5),
    flexDirection: 'row',
    marginTop: hp(2),
    alignItems: 'center',
  },
  dashboardText: {
    fontFamily: MONTSERRAT_MEDIUM,
    color: '#000',
    fontSize: 14,
    paddingLeft: wp(3),
  },
  bookingWrapper: {
    marginTop: hp(2),
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  bookingText: {
    fontFamily: MONTSERRAT_MEDIUM,
    // color: '#c2c2c2',
    color: '#000',
    fontSize: 13,
    paddingLeft: wp(2),
  },
  bookingImage: {
    height: hp(3),
    width: wp(8),
  },
});
