import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput,
} from 'react-native';
import {
  particularBookingId,


} from '../../redux/Action/BookingAction';
import {
  MONTSERRAT_BOLD,
  MONTSERRAT_REGULAR,
  MONTSERRAT_MEDIUM,
} from '../../scenes/styles/typography';
import { Rating, AirbnbRating } from 'react-native-ratings';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ARROW_WHITE, DOWN_ARROW } from '../../assets/icon';
import { useDispatch, useSelector } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import { BLACK, WHITE } from '../../scenes/styles/color';

import {
  editBooking,
  cancelBooking,
  deleteBooking,
} from '../../redux/Action/BookingAction';

import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import {
  AvaerageRatingService,
  RatingServices,
} from '../../redux/Action/notificationAction';

let index = 0;

export default function EditPage({ route, navigation }) {

  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);
  const [Loader, setLoader] = useState(false);
  const [t] = useTranslation();
  const [showRating, setShowRating] = useState(0);
  const [saverate, setSaverate] = useState('');
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  //const [state, setState] = useState(t('placeholders.editpage.bookingstatus'));
  const [state, setState] = useState('Pending');

  const state_list = [
    // {label: 'Select status', value: 'Select status'},
    {
      label: t('placeholders.settings.pending'),
      // value: t('placeholders.editpage.pending'),
      value: 'Pending',
    },
    {
      label: t('placeholders.settings.completed'),
      //  value: t('placeholders.editpage.completed'),
      value: 'Completed',
    },
    {
      label: t('placeholders.settings.inprogress'),
      //  value: t('placeholders.editpage.inprogress'),
      value: 'In Progress',
    },
    {
      label: t('placeholders.settings.cancelled'),
      //  value: t('placeholders.editpage.cancelled'),
      value: 'Canceled',
    },
    {
      label: t('placeholders.settings.approved'),
      //  value: t('placeholders.editpage.approved'),
      value: 'Approved',
    },
    {
      label: t('placeholders.settings.awaiting'),
      //value: t('placeholders.editpage.awaiting'),
      value: 'awaiting',
    },
  ];


  const bookingid = route.params.b_id;


  const Pendinglist = useSelector(
    state => state.COUNTBOOKINGREDUCER.particularList,
  );

  const averageRating = useSelector(
    state => state.notificationReducer.Averagerating,
  );


  const [serviceName, setserviceName] = useState([
    {
      index: index++,
      servicePlaceholder: t('placeholders.editpage.service'),
      name: '',
    },
    {
      index: index++,
      servicePlaceholder: t('placeholders.editpage.material'),
      name: '',
    },
    {
      index: index++,
      servicePlaceholder: t('placeholders.editpage.Visit'),
      name: '',
    },
  ]);


  const { loading } = useSelector(state => state.UserReducers);
  useEffect(() => {
    setLoader(true);
    if (Pendinglist && Pendinglist[0] && Pendinglist[0]?.estimates.length > 0) {
      stateData = Pendinglist[0].estimates.map(item => item);
      setserviceName(stateData);
    }

    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);

  const ratingFunction = serviceId => {

    dispatch(
      AvaerageRatingService(
        { service_id: serviceId, booking_id: bookingid },
        navigation,
      ),
    );
  };
  useEffect(() => {

    const booking_id = route.params.b_id;
    setSaverate(Pendinglist[0]?.ServiceDetail?.id);
    dispatch(particularBookingId(booking_id, navigation)).then(res => {

      if (res.status == 1) {

        ratingFunction(res.data[0]?.ServiceDetail?.id);
      }
    });
  }, []);


  const ratingdisplay = rating => {


    setShowRating(rating);




  };
  const ratingCompleted = () => {
    dispatch(
      RatingServices(
        {
          booking_id: Pendinglist[0].id.toString(),
          company_id: Pendinglist[0]?.company_id.toString(),
          service_id: Pendinglist[0]?.ServiceDetail?.id?.toString(),
          rating: showRating.toString(),
          review: '',
        },
        navigation,
      ),
    );
  };

  const deltebooking = () => {
    Alert.alert(
      'Delete Booking',
      'Are you sure you want to delete booking',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () =>
            dispatch(deleteBooking(route.params.bookingId, navigation)),
        },
      ],
      {
        cancelable: false,
      },
    );
  };



  const EditBookingFunc = () => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 2000);





    if (
      Names.some(
        el =>
          (el == null && state == t('placeholders.settings.awaiting')) ||
          (el == '' && state == t('placeholders.settings.awaiting')),
      )
    ) {
      Alert.alert('Please fill all fields');
    } else if (
      UnitPrice.some(
        el =>
          (el == null && state == t('placeholders.settings.awaiting')) ||
          (el == '' && state == t('placeholders.settings.awaiting')),
      )
    ) {
      Alert.alert('Please fill all fields');
    } else {

      dispatch(
        editBooking(
          {
            status: state,
            booking_id: bookingid,
            name: Names,
            description: Description,
            qty: Qty,
            unit_price: UnitPrice,
            warranty: Warrenty,
            ratingValue: showRating
          },
          navigation,
        ),
      );
    }
  };
  const insertSomeThing = placeholder => {
    setserviceName([
      ...serviceName,
      { index: index++, servicePlaceholder: placeholder },
    ]);
  };

  const removeSomeThing = () => {
    setserviceName(serviceName.slice(0, -1));
  };

  const onchangeTextFunc = (i, text) => {

    // let newFormValues = [...arr];
    let newFormValues = [...serviceName];
    newFormValues[i]['name'] = text;

    // setArr(newFormValues);
    setserviceName(newFormValues);
  };

  const onchangeTextDesc = (i, text) => {

    // let newFormValues = [...arr];
    let newFormValues = [...serviceName];
    newFormValues[i]['description'] = text;
    setserviceName(newFormValues);
    // setArr(newFormValues);
  };

  const onchangeTextQty = (i, text) => {

    //let newFormValues = [...arr];
    let newFormValues = [...serviceName];
    newFormValues[i]['qty'] = text;
    setserviceName(newFormValues);
    // setArr(newFormValues);
  };

  const onchangeTextUnit = (i, text) => {

    //let newFormValues = [...arr];
    let newFormValues = [...serviceName];
    newFormValues[i]['unit_price'] = text;
    setserviceName(newFormValues);
    // setArr(newFormValues);
  };

  const onchangeTextWarrenty = (i, text) => {

    // let newFormValues = [...arr];
    let newFormValues = [...serviceName];
    newFormValues[i]['warranty'] = text;
    // setArr(newFormValues);
    setserviceName(newFormValues);
  };


  var Names = [];
  var Description = [];
  var Qty = [];
  var UnitPrice = [];
  var Warrenty = [];
  serviceName.forEach(element => {
    let name = element.name;
    let desc = element.description;
    let qty = element.qty;
    let unit = element.unit_price;
    let warrenty = element.warranty;
    Names.push(name);
    Description.push(desc);
    Qty.push(qty);
    UnitPrice.push(unit);
    Warrenty.push(warrenty);
  });


  return (

    <ScrollView style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.headerAligner}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={ARROW_WHITE} style={styles.headerLeftImage} />
          </TouchableOpacity>
          <Text style={styles.headerCenterText}>
            {t('placeholders.editpage.heading')}
          </Text>
        </View>
      </View>
      {Loader && (
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

      <View style={styles.bodyWrapper}>
        <Text style={styles.headingTextWrapp}>
          {t('placeholders.cart.Name')}
        </Text>
        <View style={styles.emailWrapper}>
          <Image
            source={require('../../assets/images/registartionUser.png')}
            resizeMode="contain"
            style={styles.userImage}
          />
          <Text style={styles.rightText}>
            {Pendinglist[0]?.customer_details?.name}
          </Text>
        </View>
        <Text style={styles.headingSecondTextWrapp}>
          {t('placeholders.cart.email')}
        </Text>
        <View style={styles.emailWrapper}>
          <Image
            source={require('../../assets/images/mail.png')}
            resizeMode="contain"
            style={styles.userImage}
          />
          <Text style={styles.rightText}>
            {Pendinglist[0]?.customer_details?.email}
          </Text>
        </View>
        <Text style={styles.headingSecondTextWrapp}>
          {t('placeholders.bookingList.mobile')}
        </Text>
        <View style={styles.emailWrapper}>
          <Image
            source={require('../../assets/images/mobile.png')}
            resizeMode="contain"
            style={styles.userImage}
          />
          <Text style={styles.rightText}>
            {Pendinglist[0]?.customer_details?.mobile}
          </Text>
        </View>


        <Text style={[styles.headingSecondTextWrapp]}>
          {t('placeholders.bookingList.booking_status')}


        </Text>

        <TouchableOpacity
          style={{
            // backgroundColor: '#fff',
            backgroundColor: '#fff',
            borderWidth: 1,
            borderRadius: 5,
            borderColor: '#9066e6',
            marginTop: hp(2),
            elevation: 3,
            paddingVertical: hp(1),
          }}>

          <RNPickerSelect
            placeholder={{}}
            onValueChange={value => setState(value)}
            items={state_list}
            value={state}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: wp(4),
              }}>
              {state === 'Pending' ? (
                <Text
                  //key={item.value}
                  style={{
                    fontSize: 14,
                    color: '#000',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  {t('placeholders.settings.pending')}
                </Text>
              ) : state == 'Approved' ? (
                <Text
                  //key={item.value}
                  style={{
                    fontSize: 14,
                    color: '#000',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  {t('placeholders.settings.approved')}
                </Text>
              ) : state == 'In Progress' ? (
                <Text
                  //key={item.value}
                  style={{
                    fontSize: 14,
                    color: '#000',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  {t('placeholders.settings.inprogress')}
                </Text>
              ) : state === 'Completed' ? (
                <Text
                  //key={item.value}
                  style={{
                    fontSize: 14,
                    color: '#000',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  {t('placeholders.settings.completed')}
                </Text>
              ) : state === 'Canceled' ? (
                <Text
                  //key={item.value}
                  style={{
                    fontSize: 14,
                    color: '#000',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  {t('placeholders.settings.cancelled')}
                </Text>
              ) : state === 'awaiting' ? (
                <Text
                  //key={item.value}
                  style={{
                    fontSize: 14,
                    color: '#000',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  {t('placeholders.settings.awaiting')}
                </Text>
              ) : (
                <Text
                  //key={item.value}
                  style={{
                    fontSize: 14,
                    color: '#000',
                    fontFamily: 'Montserrat-Medium',
                  }}>
                  {t('placeholders.settings.pending')}
                </Text>
              )}

              <Image
                source={require('../../assets/images/Downarrow.png')}
                resizeMode="contain"
                style={{ height: hp(3), width: wp(5) }}
              />
            </View>
          </RNPickerSelect>

        </TouchableOpacity>

        {state == t('placeholders.editpage.awaiting') && (
          <View>
            {serviceName.map((r, i) => (
              <View
                key={i}
                style={{
                  backgroundColor: '#e5e5e5',
                  marginTop: hp(2),
                  justifyContent: 'space-between',
                  elevation: 10,
                  paddingVertical: hp(1),
                }}>
                <View
                  style={{
                    backgroundColor: '#e5e5e5',
                    marginTop: hp(2),
                    justifyContent: 'space-between',
                    elevation: 10,
                    flexDirection: 'row',
                    paddingVertical: hp(1),
                    paddingHorizontal: wp(2),
                  }}>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      borderWidth: 1,
                      width: wp(40),
                      padding: 10,
                      borderRadius: 5,
                      borderColor: '#9066e6',
                    }}
                    value={r.name}
                    onChangeText={text => onchangeTextFunc(i, text)}
                    // placeholder="Service/Material/Visit Price"
                    placeholder={r.servicePlaceholder}
                  />
                  <Text>{r.ServiceName}</Text>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      borderWidth: 1,
                      width: wp(40),
                      padding: 10,
                      borderRadius: 5,
                      borderColor: '#9066e6',
                    }}
                    value={r.description}
                    onChangeText={text => onchangeTextDesc(i, text)}
                    placeholder={t('placeholders.editpage.Description')}
                  />
                </View>

                <View
                  //  key={i}
                  style={{

                    backgroundColor: '#e5e5e5',
                    marginTop: hp(2),
                    justifyContent: 'space-between',
                    elevation: 10,
                    flexDirection: 'row',
                    paddingVertical: hp(1),
                    paddingHorizontal: wp(2),

                  }}>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      borderWidth: 1,
                      width: i == 0 || i == 2 ? wp(40) : wp(25),

                      padding: 10,
                      borderRadius: 5,
                      borderColor: '#9066e6',
                    }}
                    value={r.qty}
                    onChangeText={text => onchangeTextQty(i, text)}
                    placeholder={t('placeholders.editpage.Qty')}

                  />

                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      borderWidth: 1,
                      width: i == 0 || i == 2 ? wp(40) : wp(25),
                      padding: 10,
                      marginLeft: i == 0 || i == 2 ? wp(5) : wp(0),
                      borderRadius: 5,
                      borderColor: '#9066e6',
                    }}
                    value={r.unit_price}
                    onChangeText={text => onchangeTextUnit(i, text)}
                    placeholder={t('placeholders.editpage.unit_price')}
                  />

                  {i == 0 || i == 2 ? (
                    <TextInput
                      style={{
                        width: wp(0),
                        height: wp(0),
                      }}
                      value="N/A"
                      // editable={i == 0 || i == 2 ? false : true}
                      onChangeText={text => onchangeTextWarrenty(i, text)}
                      placeholder={t('placeholders.editpage.warrenty')}
                    />
                  ) : (
                    <TextInput
                      style={{
                        backgroundColor: '#fff',
                        borderWidth: 1,
                        width: wp(25),
                        padding: 10,
                        borderRadius: 5,
                        borderColor: '#9066e6',
                      }}
                      value={r.warranty}
                      // editable={i == 0 || i == 2 ? false : true}
                      onChangeText={text => onchangeTextWarrenty(i, text)}
                      placeholder={t('placeholders.editpage.warrenty')}
                    />
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        {state == t('placeholders.editpage.awaiting') ? (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              onPress={() =>
                insertSomeThing(t('placeholders.editpage.serviceText'))
              }
              style={[styles.AddRow, { backgroundColor: '#2ea749' }]}>
              <Text style={[styles.editTextWrapp, { color: '#fff' }]}>
                {t('placeholders.editpage.addrow')}{' '}
              </Text>
            </TouchableOpacity>
            {serviceName.length > 3 && (
              <TouchableOpacity
                onPress={() => removeSomeThing('add')}
                style={[styles.AddRow, { backgroundColor: '#2ea749' }]}>
                <Text style={[styles.editTextWrapp, { color: '#fff' }]}>
                  {t('placeholders.editpage.remove')}{' '}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View />
        )}




        <View style={styles.serviesHeading}>
          <Text style={styles.servicesText}>
            {t('placeholders.rang.serve_name')}{' '}
          </Text>
        </View>

        <View style={styles.productHeading}>
          <Text style={styles.productText}>
            {Pendinglist[0]?.ServiceDetail?.name}{' '}
          </Text>

        </View>

        {state == t('placeholders.settings.completed') ? (

          <View>
            <Text style={styles.headingTextRating}>{t('placeholders.editpage.Ratingmsg')}</Text>
            <Rating
              //  tintColor="#dfdfdf"

              imageSize={25}
              minValue={0}
              startingValue={
                Pendinglist[0]?.ratings == ''
                  ? 0
                  : Pendinglist[0]?.ratings[0].rating
              }
              // showRating
              onFinishRating={rating => ratingdisplay(rating)}
              style={{ paddingVertical: 0, }}



            />

          </View>
        ) : null}


        <View style={styles.editDeleteWRapper}>
          <TouchableOpacity
            style={styles.deleteWrapper}
            onPress={() => deltebooking()}>
            <Text style={styles.deleteCrossWrapp}>X</Text>
            <Text style={styles.deleteTextWrapp}>
              {t('placeholders.rang.delete')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.editWrapper, { backgroundColor: '#2ea749' }]}
            onPress={() => EditBookingFunc()}>
            {/* <Text style={[styles.deleteCrossWrapp, { color: '#fff' }]}>X</Text> */}
            <Image
              source={require('../../assets/images/right.png')}
              resizeMode="contain"
              style={{ height: hp(2), width: wp(3) }}
            />

            <Text style={[styles.editTextWrapp, { color: '#fff' }]}>
              {t('placeholders.bookingList.submit')}
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerWrapper: {
    backgroundColor: '#9066e6',
    paddingVertical: hp(1.5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAligner: { flexDirection: 'row', alignItems: 'center' },
  headerLeftImage: {
    height: hp(4),
    width: wp(8),
    marginRight: wp(3),
    marginLeft: wp(2),
  },
  headerCenterText: { fontSize: 14, color: '#fff', fontFamily: MONTSERRAT_BOLD },

  bodyWrapper: {
    marginHorizontal: wp(5),
    marginTop: hp(3),
  },
  headingTextWrapp: {
    fontSize: 13,
    color: '#000',
    fontFamily: MONTSERRAT_BOLD,
  },

  headingTextRating: {
    fontSize: 13,
    color: '#000',
    textAlign: 'center',
    paddingVertical: hp(2),
    fontFamily: MONTSERRAT_BOLD,
  },
  headingSecondTextWrapp: {
    fontSize: 13,
    color: '#000',
    fontFamily: MONTSERRAT_BOLD,
    marginTop: hp(2),
  },
  emailWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(0.5),
  },
  userImage: {
    height: hp(2),
    width: wp(5),
  },
  rightText: {
    fontSize: 12,
    color: '#000',
    fontFamily: MONTSERRAT_REGULAR,
    paddingLeft: wp(2),
  },

  bookingText: { fontFamily: MONTSERRAT_REGULAR, fontSize: 14, color: '#c2c2c2' },
  bookingImage: { height: hp(2.5), width: wp(5), marginRight: wp(4) },
  resetButtonWrapper: {
    paddingVertical: hp(1.5),
    width: wp(30),
    backgroundColor: '#da3348',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: hp(3),
    alignSelf: 'flex-end',
    marginRight: wp(5),
  },
  resetTextWrapper: { color: '#fff', fontFamily: MONTSERRAT_BOLD, fontSize: 13 },
  selectedHeading: { marginTop: hp(2), marginHorizontal: wp(5) },
  selectedText: { fontFamily: MONTSERRAT_BOLD, fontSize: 13, color: BLACK },
  statusChangeWrapper: {
    paddingVertical: hp(2),
    width: wp(35),
    marginLeft: wp(2),
    backgroundColor: '#9066e6',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: hp(3),
    alignSelf: 'flex-end',
    marginRight: wp(5),
  },
  statusChangeText: { color: '#fff', fontFamily: MONTSERRAT_BOLD, fontSize: 14 },
  downArrowImage: {
    height: hp(3),
    width: wp(5),
  },
  bookingDateWrapper: {
    flexDirection: 'row',
    marginTop: hp(2),
    backgroundColor: WHITE,
    // marginHorizontal: wp(5),
    paddingVertical: hp(1),
    elevation: 2,
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    borderWidth: 1,
    borderColor: '#9066e6',
    borderRadius: 5,
  },
  bookingText: { fontFamily: MONTSERRAT_REGULAR, fontSize: 14, color: '#c2c2c2' },
  bookingWrapper: {
    backgroundColor: '#fff',
    paddingTop: hp(1),
    elevation: 3,
    marginHorizontal: wp(5),
    borderRadius: 4,
    marginTop: hp(2),
  },
  bookingTopWrapper: {
    // flexDirection: 'row',
    // paddingHorizontal: wp(3),
    // justifyContent: 'space-between',
    // alignItems: 'center'
    width: wp(50),
    // backgroundColor: 'red',
    paddingLeft: wp(3),
  },
  bookingLeftText: { fontSize: 12, fontFamily: 'Montserrat-Bold', color: '#000' },
  bookingBottomText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Medium',
    color: '#000',
    marginTop: hp(1),
  },
  leftImageWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagebackgroundwrappper: {
    height: hp(7),
    width: wp(16),
    borderRadius: 50,
    backgroundColor: '#f7f5f1',
    marginLeft: wp(3),
    marginTop: hp(2),
  },
  imageBox: { height: hp(7), width: wp(16) },
  rightBoxWrapper: { paddingLeft: wp(2), width: wp(45), paddingTop: hp(1) },
  serviesHeading: {
    backgroundColor: '#9066e6',
    paddingVertical: hp(1.5),
    marginTop: hp(3),
  },
  servicesText: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'Montserrat-Medium',
    paddingLeft: wp(2),
  },
  productHeading: {
    paddingVertical: hp(1),
    borderBottomColor: '#c2c2c2',
    borderBottomWidth: 1,
    paddingBottom: hp(3),
    marginTop: hp(1),
  },
  productText: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'Montserrat-Medium',
    paddingLeft: wp(2),
  },
  servicesWrapper: {
    backgroundColor: '#9066e6',
    borderRadius: 10,
    width: wp(18),
    alignItems: 'center',
    marginTop: hp(1),
    marginLeft: wp(4),
    paddingVertical: hp(0.2),
  },
  servicesTextWrapper: {
    fontSize: 11,
    color: '#fff',
    fontFamily: 'Montserrat-Medium',
  },
  AddressWrapper: {
    marginHorizontal: wp(5),
    paddingTop: hp(4),
    paddingLeft: wp(2),
  },
  addressHeading: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Montserrat-Medium',
  },
  addressSubHeading: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'Montserrat-Medium',
    paddingTop: hp(2),
    paddingLeft: wp(1),
  },
  editWrapper: {
    flexDirection: 'row',
    // borderWidth: 1,
    // borderColor: '#9066e6',
    width: wp(20),
    borderRadius: 6,
    marginTop: hp(2),
    alignItems: 'center',
    paddingVertical: hp(0.3),
    marginLeft: wp(3),
    justifyContent: 'center',
    backgroundColor: 'red',

  },

  AddRow: {
    flexDirection: 'row',
    // borderWidth: 1,
    // borderColor: '#9066e6',
    width: wp(20),
    borderRadius: 6,
    marginTop: hp(2),

    alignItems: 'center',
    paddingVertical: hp(1),
    marginLeft: wp(3),
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  editDeleteWRapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: hp(10),


    marginTop: hp(5),
  },
  editTextWrapp: {
    fontSize: 12,
    color: '#9066e6',
    fontFamily: 'Montserrat-Medium',
    paddingLeft: wp(2),
  },
  deleteWrapper: {
    borderWidth: 1,
    borderColor: 'red',
    width: wp(34),
    borderRadius: 6,
    marginTop: hp(2),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: hp(1),
  },
  deleteCrossWrapp: {
    fontSize: 12,
    color: 'red',
    fontFamily: 'Montserrat-Medium',
  },
  deleteTextWrapp: {
    fontSize: 12,
    color: 'red',
    fontFamily: 'Montserrat-Regular',
    paddingLeft: wp(2),
  },
});
