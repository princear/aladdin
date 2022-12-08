import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ActivityIndicator, View, Alert, Image, TouchableOpacity, BackHandler, FlatList, Button, ScrollView, } from 'react-native';
import { BLACK, GREY_6C, LIGHT_BLUE, WHITE } from '../../styles/color';
import { HOME_HEADING, SPLASH, BLUE_BOX_ARROW, BAR, SEARCH, CLOCK, DATE } from '../../../assets/icon';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MONTSERRAT_BLACK, MONTSERRAT_BOLD, MONTSERRAT_REGULAR } from '../../styles/typography';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
import { onCountBooking, RecentBookings } from '../../../redux/Action/BookingAction';
import { DrawerActions } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Home({ props, navigation }) {

  const [bookings, setBookings] = useState([
    {
      id: 1,
      color: '#2ea749',
      image: require('../../../assets/images/Booking.png'),
      title: 'Completed Booking',
      number: '100',
    },
    {
      id: 2,
      color: '#f2ac00',
      image: require('../../../assets/images/Booking.png'),
      title: 'Pending Booking',
      number: '50',
    },
    {
      id: 3,
      color: '#23a2b7',
      image: require('../../../assets/images/Booking.png'),
      title: 'Approved Booking',
      number: '5',
    },
    {
      id: 4,
      color: '#157dfc',
      image: require('../../../assets/images/Booking.png'),
      title: 'In Progress Booking',
      number: '140',
    },
    {
      id: 5,
      color: '#da3348',
      image: require('../../../assets/images/Booking.png'),
      title: 'Cancelled Booking',
      number: '21',
    },
    {
      id: 6,
      color: '#6c757d',
      image: require('../../../assets/images/WalkInBookings.png'),
      title: 'Walk-In Booking',
      number: '1',
    },
    {
      id: 7,
      color: '#23a2b7',
      image: require('../../../assets/images/Booking.png'),
      title: 'Online Booking',
      number: '32',
    },
    {
      id: 8,
      color: '#343a40',
      image: require('../../../assets/images/TotalCustomers.png'),
      title: 'Total Customers',
      number: '425',
    },
    {
      id: 9,
      color: '#2ea749',
      image: require('../../../assets/images/TotalEarnings.png'),
      title: 'Total Earings',
      number: '1200',
    }
  ]);
  const [listing, setListing] = useState([
    {
      id: 1,
      image: require('../../../assets/images/user.jpg'),
      number: '+91-9874563210',
      email: 'nitika@delimp.com',
      content: 'IF8 6Kg 5 Star Aqua Energie , Laundry Add, Tub Clean, Fully Automatic Front Load With in-built Heater White (Diva Aqua VX)#JustHere x 1',
      date: "2022-02-04",
      time: "11:30 Pm"
    },
    {
      id: 2,
      image: require('../../../assets/images/user.jpg'),
      number: '+91-9874563210',
      email: 'abc@delimp.com',
      content: 'IF8 6Kg 5 Star Aqua Energie , Laundry Add, Tub Clean, Fully Automatic Front Load With in-built Heater White (Diva Aqua VX)#JustHere x 1',
      date: "2022-02-04",
      time: "11:30 Pm"
    },


  ]);
  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [show, setShow] = useState(false);
  const [showfix, setShowFix] = useState(false);
  const dispatch = useDispatch();

  const bookingCount = useSelector((state) => state.COUNTBOOKINGREDUCER);
  const recentBookings = useSelector((state) => state.COUNTBOOKINGREDUCER.recentBookingData);
  const { loading } = useSelector(state => state.UserReducers);
  const [t, i18n] = useTranslation();
  const [checkstatus, setCheckstatus] = useState('false');


  useEffect(() => {
    dispatch(onCountBooking(navigation));

  }, [])
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);

  async function checkStatus() {
    const status = await AsyncStorage.getItem('long');
    console.log('=======dddd=======>', status)
    setCheckstatus(status);

    if (status) {
      i18n.changeLanguage(status);
    }
  }

  console.log(checkstatus)
  useEffect(() => {
    checkStatus()
  }, [bookingCount ?.countData])

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
  const onChange2 = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowFix(Platform.OS === 'ios');
    setDate2(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setShowFix(false);
  };
  const showMode2 = (currentMode) => {
    setShow(false);
    setShowFix(true);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showDatepicker2 = () => {
    showMode2('date');
  };
  function handleBackButtonClick() {
    // navigation.isFocused() helps to exit the app on this component rather than in whole app.
    if (navigation.isFocused()) {
      BackHandler.exitApp();

      return true;
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.headerFlex}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Image source={BAR} style={styles.headerLeftImage} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{t('placeholders.homePage.dashbpard')}</Text>
        </View>
        {/* <TouchableOpacity onPress={() => Logout()}>
          <Text style={{ paddingRight: wp( 2 ), color: '#fff' }}>Logout</Text> */}
        {/* <Image source={SEARCH} resizeMode='contain' style={{ height: hp(4), width: wp(12) }} /> */}
        {/* </TouchableOpacity> */}
      </View>

      {(loading) &&
        <View style={{ flex: 1, justifyContent: 'center', position: 'absolute', top: '40%', left: '40%' }}>

          <ActivityIndicator


            size="large"
            style={{
              //  backgroundColor: "rgba(144,102,230,.8)",
              height: 80,
              width: 80,
              zIndex: 999,

              borderRadius: 15

            }}

            color="rgba(144,102,230,.8)"
          />
        </View>}
      <ScrollView contentContainerStyle={{ paddingBottom: hp(2) }}>
        <View style={styles.dateHeadingWrapper}>
          <Text style={styles.dateHeading}>{t('placeholders.rang.date_range')}</Text>

        </View>
        <TouchableOpacity onPress={showDatepicker} style={styles.dateWrapper}>
          <Text style={styles.dateText}>{moment(date).format("DD-MM-YYYY ")}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={showDatepicker2} style={styles.dateSecoondWrapper}>
          <Text style={{ fontFamily: MONTSERRAT_REGULAR, fontSize: 14, paddingLeft: wp(3), color: '#c2c2c2' }}>{moment(date2).format("DD-MM-YYYY ")}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(RecentBookings({ dateFrom: moment(date).format("YYYY-MM-DD "), dateTo: moment(date2).format("YYYY-MM-DD ") }, navigation))}
          style={styles.applyWrapper}>
          <Text style={styles.applyText}>{t('placeholders.rang.apply')}</Text>
        </TouchableOpacity>


        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode='date'
            display="default"
            onChange={onChange}
          />
        )}
        {showfix && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            minimumDate={date}
            mode='date'
            display="default"
            onChange={onChange2}
          />
        )}

        <View style={{ marginLeft: wp(1) }}>
          <Text style={styles.totalBookingText}>{t('placeholders.homePage.total_booking')} : {bookingCount ?.countData[6] ?.count}</Text>
          <FlatList
            // data={bookings}
            data={bookingCount.countData}
            keyExtractor={(item, index) => index}
            // horizontal={false}
            numColumns={3}
            renderItem={({ item, index }) => (
              <View style={styles.bookingWrapper}>
                <View
                  style={{
                    height: hp(16), width: wp(30),
                    backgroundColor: item.status_en === 'Pending' ? '#f2ac00' : item.status_en == 'Approved' ? '#23a2b7' : item.status_en == 'In Progress' ? '#157dfc' : item.status_en === 'Completed' ? '#2ea749' : item.status_en === 'Cancelled' ? '#da3348' : item.status_en === 'Total' ? '#343a40' : item.status_en === 'Blank Status' ? '#c2c2c2' : null,
                    alignItems: 'center', borderRadius: 4, justifyContent: 'center'
                  }}>
                  <Image source={require('../../../assets/images/Booking.png')} resizeMode='contain' style={styles.bookingImage} />
                  <Text style={styles.bookingCountText}>{item.count}</Text>
                </View>
                <Text style={styles.bookingTitleText}>{item.status}</Text>
              </View>
            )}
          />
        </View>

        <View>
          <View style={{ marginBottom: hp(2) }}>

            {
              recentBookings.data &&
              <Text style={styles.recentBookingText}>{t('placeholders.rang.recent_booking')}: {recentBookings ?.data ?.length}</Text>
            }

            <FlatList
              data={recentBookings.data}
              keyExtractor={(item, index) => index}
              // horizontal={false}
              numColumns={1}
              renderItem={({ item, index }) => (
                <View style={styles.recentWrapper}>
                  <View style={styles.recentLeftWrapper}>
                    <Image source={require('../../../assets/images/user.jpg')} resizeMode='contain' style={styles.recentLeftImage} />
                    <Text style={styles.recentleftEmail}>{item.customer_email}</Text>
                    <Text style={styles.recentleftEmail}>{item.customer_phone_number}</Text>
                  </View>
                  <View style={styles.recentRightWrapper}>
                    <Text style={styles.recentHeading}>{item.service_name}</Text>
                    <View style={styles.recentRightWrapp}>
                      {/* <Image source={CLOCK} resizeMode='contain' style={{ height: hp(3), width: wp(6) }} />
                      <Text style={{ fontFamily: MONTSERRAT_REGULAR, fontSize: 10, color: '#c2c2c2', }}> {item.date}</Text> */}
                      <Image source={DATE} resizeMode='contain' style={styles.recentRightImage} />
                      <Text style={styles.recentRightDateText}> {item.date}</Text>

                    </View>
                    <View style={styles.recentStatusWrapper}>
                      {/* backgroundColor: item.status === 'Pending' ? '#f2ac00' : item.status == 'Approved' ? '#23a2b7' : item.status == 'In Progress' ? '#157dfc' : item.status === 'Completed' ? '#2ea749' : item.status === 'Cancelled' ? '#da3348' : item.status === 'Total' ? '#343a40' : item.status === 'Blank Status' ? '#c2c2c2' : null, */}
                      <TouchableOpacity style={[styles.statusWrapper, { backgroundColor: item.status == 'Pending' ? '#f2ac00' : item.status == 'Approved' ? '#23a2b7' : item.status == 'In Progress' ? '#157dfc' : item.status === 'Completed' ? '#2ea749' : item.status === 'Cancelled' ? '#da3348' : null }]}>
                        <Text style={styles.statusText}>{item.status}</Text>
                      </TouchableOpacity>
                      {/* <TouchableOpacity style={{ backgroundColor: WHITE, marginLeft: wp(1), borderRadius: 2, borderColor: '#c2c2c2', borderWidth: 1, paddingVertical: wp(1), width: wp(28), justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#000', fontSize: 11, fontFamily: MONTSERRAT_BOLD }}>Send Reminder</Text>
                      </TouchableOpacity> */}
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f5f1', },
  containerText: { fontSize: 27, color: '#000' },
  headerWrapper: { backgroundColor: '#9066e6', paddingVertical: hp(1), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerFlex: { flexDirection: 'row', alignItems: 'center' },
  headerLeftImage: { height: hp(5), width: wp(10), marginRight: wp(6), marginLeft: wp(2) },
  headerText: { fontSize: 14, color: '#fff', fontFamily: MONTSERRAT_BOLD },
  dateHeadingWrapper: { marginTop: hp(2), marginHorizontal: wp(5) },
  dateHeading: { fontFamily: MONTSERRAT_BOLD, fontSize: 13, color: BLACK },
  dateWrapper: { marginTop: hp(2), backgroundColor: WHITE, marginHorizontal: wp(5), paddingVertical: hp(1.5), elevation: 2 },
  dateText: { fontFamily: MONTSERRAT_REGULAR, fontSize: 14, paddingLeft: wp(3), color: '#c2c2c2' },
  dateSecoondWrapper: { marginTop: hp(3), backgroundColor: WHITE, marginHorizontal: wp(5), paddingVertical: hp(1.5), elevation: 2 },
  applyWrapper: { justifyContent: 'center', alignItems: 'center', backgroundColor: '#9066e6', width: wp(50), borderRadius: 20, paddingVertical: hp(1.2), marginVertical: hp(2), alignSelf: 'center' },
  applyText: { fontFamily: MONTSERRAT_BOLD, fontSize: 13, color: WHITE },
  totalBookingText: { fontSize: 14, marginLeft: wp(3), fontFamily: MONTSERRAT_BOLD, color: '#000', marginVertical: hp(2) },
  bookingWrapper: { justifyContent: 'center', marginLeft: wp(2), marginTop: hp(1) },
  bookingImage: { height: hp(5), width: wp(10), },
  bookingCountText: { color: '#fff', fontSize: 15, fontFamily: MONTSERRAT_BOLD, marginTop: hp(2) },
  bookingTitleText: { fontFamily: MONTSERRAT_BOLD, fontSize: 10, color: '#000', textAlign: 'center' },
  recentBookingText: { fontSize: 14, marginLeft: wp(3), fontFamily: MONTSERRAT_BOLD, color: '#000', marginTop: hp(4) },
  recentWrapper: {
    flexDirection: 'row',
    elevation: 2,
    backgroundColor: WHITE,
    width: wp(94),
    paddingVertical: hp(2), marginTop: hp(2), marginHorizontal: wp(3), borderRadius: 4
  },

  recentLeftWrapper: { width: wp(35), alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderRightColor: '#c2c2c2' },
  recentLeftImage: { width: wp(30), height: wp(15) },
  recentleftEmail: { fontFamily: MONTSERRAT_REGULAR, fontSize: 12, color: BLACK },
  recentRightWrapper: { width: wp(58), paddingHorizontal: wp(1) },
  recentHeading: { fontFamily: MONTSERRAT_REGULAR, fontSize: 10, color: BLACK, paddingLeft: wp(1), lineHeight: 15 },
  recentRightWrapp: { marginTop: hp(1), flexDirection: 'row', alignItems: 'center' },
  recentRightImage: { height: hp(3), width: wp(6), marginLeft: wp(1) },
  recentRightDateText: { fontFamily: MONTSERRAT_REGULAR, fontSize: 10, color: '#c2c2c2', },
  recentStatusWrapper: { flexDirection: 'row', alignItems: 'flex-end', marginTop: hp(1) },
  statusWrapper: { backgroundColor: '#9066e6', marginLeft: wp(2.5), borderRadius: 2, paddingVertical: wp(1), width: wp(25), justifyContent: 'center', alignItems: 'center' },
  statusText: { color: WHITE, fontSize: 11, fontFamily: MONTSERRAT_BOLD },



});
