import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { MONTSERRAT_BOLD } from '../../styles/typography';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ARROW_WHITE, DOWN_ARROW } from '../../../assets/icon';
import { useDispatch, useSelector } from 'react-redux';
import {
  particularBookingId,
  cancelBooking,
  deleteBooking,
} from '../../../redux/Action/BookingAction';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { request, PERMISSIONS } from 'react-native-permissions';
import Lightbox from 'react-native-lightbox';
import { useTranslation } from 'react-i18next';
import { Rating, AirbnbRating } from 'react-native-ratings';
import {
  AvaerageRatingService,
  RatingServices,
} from '../../../redux/Action/notificationAction';

export default function BookingListDetail({ route, navigation }) {
  const dispatch = useDispatch();

  // const mapRef = React.createRef();

  const Pendinglist = useSelector(
    state => state.COUNTBOOKINGREDUCER.particularList,
  );
  const averageRating = useSelector(
    state => state.notificationReducer.Averagerating,
  );


  const { loading } = useSelector(state => state.UserReducers);
  const [saverate, setSaverate] = useState('');
  const [t] = useTranslation();


  const Invoice_Link = Pendinglist[0] && Pendinglist[0].invoice_link;

  const ratingFunction = serviceId => {

    dispatch(
      AvaerageRatingService(
        { service_id: serviceId, booking_id: route.params.bookingId },
        navigation,
      ),
    );
  };
  useEffect(() => {

    const booking_id = route.params.bookingId;
    setSaverate(Pendinglist[0]?.ServiceDetail?.id);
    dispatch(particularBookingId(booking_id, navigation)).then(res => {

      if (res.status == 1) {

        ratingFunction(res.data[0]?.ServiceDetail?.id);
      }
    });
  }, []);



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

  const setTotalCount = actualprice => {


    if (Pendinglist[0] && Pendinglist[0]?.estimates.length > 0) {
      const initialValue = 0;
      const sumWithInitial =
        Pendinglist[0] &&
        Pendinglist[0]?.estimates.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.unit_price * currentValue.qty,
          initialValue,
        );

      // return parseInt(actualprice) + sumWithInitial;
      return parseFloat(sumWithInitial);
    }
  };

  const [defaultRating, setDefaultRating] = useState(1);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const starImagFilled =
    'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png';
  const starImgCorner =
    'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';

  let total = 0;

  Pendinglist[0] &&
    Pendinglist[0]?.ratings.forEach(item => {
      total += parseInt(item.rating);
    });

  var totalLength = Pendinglist[0]?.ratings.length;
  var no_Of_Rating = total;

  var ratingResult = Math.round(no_Of_Rating / totalLength);

  const CustomRating = () => {
    return (
      <View style={styles.customRatingBar}>
        {maxRating.map((item, key) => {
          return (
            <View
              activeOpacity={0.5}
              key={item}
            // onPress={() => rating( item )}
            >
              <Image
                style={styles.starImgStyle}
                source={
                  item <= ratingResult
                    ? { uri: starImagFilled }
                    : { uri: starImgCorner }
                }
              />
            </View>
          );
        })}
      </View>
    );
  };
  const [userLocation, setUserLocation] = useState(false);
  const [selectlocation, setSelectLocation] = useState('');
  const [selectlonguitude, setSelectlonguitude] = useState('');
  const [showRating, setShowRating] = useState(0);


  const [state, setstate] = useState({
    coordinate: {
      latitude:
        Pendinglist[0]?.address == null
          ? 28.58364
          : Pendinglist[0]?.address?.lat,
      longitude:
        Pendinglist[0]?.address == null
          ? 77.3147
          : Pendinglist[0]?.address?.long,
      // latitude: 28.58364,
      // longitude: 77.3147,
    },
    marginBottom: 1,
  });

  const handleUserLocation = () => {
    const latitude = userLocation.latitude;
    const longitude = userLocation.longitude;
    setstate({ latitude, longitude });

    mapRef.current.animateToRegion(
      {
        latitude: Number(selectlocation),
        longitude: Number(selectlonguitude),
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
      1000,
    );
  };

  // ==================GET CURRENT POSITION =============================
  async function requestLocationPermission() {

    var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

    if (response == 'granted') {
      await Geolocation.getCurrentPosition(
        ({ coords }) => {

          setUserLocation(coords);
        },
        error => {
          console.log('error', error);
          // Alert.alert( error.code, error.message );
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 10000,
        },
      );
    }
  }

  // const renderScene = (route, navigator) => {
  //     const Component = route.component;

  //     return (
  //         <Component navigator={navigator} route={route} {...route.passProps} />
  //     );
  // };

  // const uri = 'http://knittingisawesome.com/wp-content/uploads/2012/12/cat-wearing-a-reindeer-hat1.jpg'
  // const longPress = (uri) => {
  //     CameraRoll.saveToCameraRoll(uri)
  // }
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

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.headerAligner}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={ARROW_WHITE} style={styles.headerLeftImage} />
          </TouchableOpacity>
          <Text style={styles.headerCenterText}>
            {t('placeholders.rang.Booking_detail')}
          </Text>
        </View>
      </View>
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
      <ScrollView contentContainerStyle={{ paddingBottom: hp(6) }}>
        <View
          style={{
            width: wp(90),
            marginLeft: wp(5),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 5,
              marginTop: hp(3),
              borderWidth: 3,
              borderColor: '#9066e6',
            }}>
            <Image
              source={{ uri: Pendinglist[0]?.customer_details?.user_image_url }}
              style={{ height: 96, width: 96 }}
            />
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              // height: hp(14.5),
              paddingLeft: wp(3),
              paddingTop: hp(1),
              borderRadius: 4,
              width: wp(59),
              marginTop: hp(3),
              marginLeft: wp(3),
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: 15,
                fontFamily: 'Montserrat-Bold',
              }}>
              {Pendinglist[0]?.customer_details?.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: hp(3),
                marginRight: wp(2),
              }}>
              {/* <Text style={{ color: '#000', fontSize: 12, fontFamily: 'Montserrat-Regular', paddingTop: hp(2) }}>{ }</Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <CustomRating />

                            </View> */}
              <Rating
                readonly
                imageSize={23}
                minValue={0}
                startingValue={
                  averageRating.rating == null ? 0 : averageRating.rating
                }
                style={{ paddingVertical: 10 }}
              />
              <Text
                style={{
                  color: '#000',
                  fontSize: 12,
                  fontFamily: 'Montserrat-Regular',
                  paddingLeft: wp(3),
                }}>
                ({averageRating.count == '' ? 0 : averageRating.count})
              </Text>
            </View>
          </View>
        </View>

        {/* <View style={styles.centerImageWrapper}>

                    <Image source={{ uri: Pendinglist[0]?.customer_details?.user_image_url }} style={styles.centerImage} />

                </View> */}
        <View style={styles.topWrapper}>
          <View style={styles.topLeftWRapper}>
            <Text style={styles.heading}>
              {t('placeholders.bookingList.email')}
            </Text>
            <View style={styles.flexWrapper}>
              <Image
                source={require('../../../assets/images/mail.png')}
                resizeMode="contain"
                style={styles.mailImage}
              />
              <Text style={styles.subHeading}>
                {Pendinglist[0]?.customer_details?.email}
              </Text>
            </View>
          </View>

          <View style={styles.topRightWRapper}>
            <Text style={styles.heading}>
              {t('placeholders.bookingList.mobile')}
            </Text>
            <View style={styles.flexWrapper}>
              <Image
                source={require('../../../assets/images/mobile.png')}
                resizeMode="contain"
                style={styles.mailImage}
              />

              <Text style={styles.subHeading}>
                {Pendinglist[0]?.customer_details?.mobile}
              </Text>
            </View>
          </View>
        </View>
        {Pendinglist[0]?.status === t('placeholders.settings.completed') ? (
          <View style={styles.topWrapper}>
            <View style={styles.topLeftNewWRapper}>
              <Text style={styles.heading}>
                {t('placeholders.bookingList.booking_date')}
              </Text>
              <View style={styles.flexWrapper}>
                <Image
                  source={require('../../../assets/images/date.png')}
                  resizeMode="contain"
                  style={styles.mailImage}
                />
                <Text style={styles.dateHeading}>{Pendinglist[0]?.date}</Text>
              </View>
            </View>

            <View style={styles.topInvoiceLeftNewWRapper}>
              <Text style={styles.headingInvoice}>Invoice</Text>
              <TouchableOpacity
                onPress={() => Linking.openURL('https://' + Invoice_Link)}
                style={styles.DownloadButton}>
                <Text style={styles.downloadText}>
                  {t('placeholders.bookingdetail.download')}

                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.topLeftNewWRapper}>
              <Text style={styles.heading}>
                {t('placeholders.bookingList.booking_status')}
              </Text>
              <View
                style={[
                  styles.cancellWrapper,
                  {
                    borderColor:
                      Pendinglist[0]?.status === 'Pending'
                        ? '#f2ac00'
                        : Pendinglist[0]?.status === 'In Progress'
                          ? '#157dfc'
                          : Pendinglist[0]?.status ===
                            t('placeholders.settings.completed')
                            ? '#2ea749'
                            : Pendinglist[0]?.status === 'Cancelled'
                              ? '#da3348'
                              : null,
                  },
                ]}>
                <Text
                  style={[
                    styles.cancelHeading,
                    {
                      color:
                        Pendinglist[0]?.status === 'Pending'
                          ? '#f2ac00'
                          : Pendinglist[0]?.status === 'In Progress'
                            ? '#157dfc'
                            : Pendinglist[0]?.status ===
                              t('placeholders.settings.completed')
                              ? '#2ea749'
                              : Pendinglist[0]?.status === 'Cancelled'
                                ? '#da3348'
                                : null,
                    },
                  ]}>
                  {Pendinglist[0]?.status}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.topWrapper}>
            <View style={styles.topLeftWRapper}>
              <Text style={styles.heading}>
                {t('placeholders.bookingList.booking_date')}
              </Text>
              <View style={styles.flexWrapper}>
                <Image
                  source={require('../../../assets/images/date.png')}
                  resizeMode="contain"
                  style={styles.mailImage}
                />
                <Text style={styles.dateHeading}>{Pendinglist[0]?.date}</Text>
              </View>
            </View>

            <View style={styles.topLeftWRapper}>
              <Text style={styles.heading}>
                {t('placeholders.bookingList.booking_status')}
              </Text>
              <View
                style={[
                  styles.cancellWrapper,
                  {
                    borderColor:
                      Pendinglist[0]?.status === 'Pending'
                        ? '#f2ac00'
                        : Pendinglist[0]?.status === 'In Progress'
                          ? '#157dfc'
                          : Pendinglist[0]?.status ===
                            t('placeholders.settings.completed')
                            ? '#2ea749'
                            : Pendinglist[0]?.status === 'Cancelled'
                              ? '#da3348'
                              : null,
                  },
                ]}>
                <Text
                  style={[
                    styles.cancelHeading,
                    {
                      color:
                        Pendinglist[0]?.status === 'Pending'
                          ? '#f2ac00'
                          : Pendinglist[0]?.status === 'In Progress'
                            ? '#157dfc'
                            : Pendinglist[0]?.status ===
                              t('placeholders.settings.completed')
                              ? '#2ea749'
                              : Pendinglist[0]?.status === 'Cancelled'
                                ? '#da3348'
                                : null,
                    },
                  ]}>
                  {Pendinglist[0]?.status}
                </Text>
              </View>
            </View>
          </View>

        )}

        <View style={styles.serviesHeading}>
          <Text style={styles.servicesText}>
            {' '}
            {t('placeholders.bookingdetail.servicename')}
          </Text>
          <Text style={styles.servicesText}>
            {' '}
            {t('placeholders.bookingdetail.serviceprice')}
          </Text>
          <Text style={styles.servicesText}>
            {' '}
            {t('placeholders.bookingdetail.discountprice')}
          </Text>
        </View>

        <View style={styles.productHeading}>
          <Text style={styles.productText}>
            {Pendinglist[0]?.ServiceDetail?.name}{' '}
          </Text>
          <Text style={styles.productText}>
            {Pendinglist[0]?.ServiceDetail?.formated_price} /hr
          </Text>
          <Text style={styles.productText}>
            $ {Pendinglist[0]?.ServiceDetail?.converted_discounted_price} /hr
          </Text>


        </View>

        {Pendinglist[0] &&
          Pendinglist[0]?.attribute_values_with_name.map(item => {
            return (
              <View style={styles.servicesHeadingContainer}>
                <Text style={styles.servicesHeading}>{item.name}</Text>

                {item.item.map(item1 => {
                  return (
                    <Text style={styles.servicesName}>- {item1.name}</Text>
                  );
                })}
              </View>
            );
          })}

        {Pendinglist[0] && Pendinglist[0]?.estimates.length > 0 ? (
          <View style={styles.EstimateservicesHeadingContainer}>
            <Text style={styles.EstimateservicesHeading}>
              {' '}
              {t('placeholders.bookingdetail.servicename')}
            </Text>
            <Text style={styles.EstimateservicesHeading}>
              {' '}
              {t('placeholders.bookingList.warrenty')}
            </Text>
            {/* <Text style={styles.EstimateservicesHeading}>Desc</Text> */}
            <Text style={styles.EstimateservicesHeading}>
              {' '}
              {t('placeholders.bookingList.Qty')}
            </Text>
            <Text style={styles.EstimateservicesHeading}>
              {' '}
              {t('placeholders.bookingList.unit_price')}
            </Text>
            <Text style={styles.EstimateservicesHeading}>
              {' '}
              {t('placeholders.bookingList.Total')}
            </Text>
          </View>
        ) : (
          <View />
        )}

        {Pendinglist[0] &&
          Pendinglist[0]?.estimates.length > 0 &&
          Pendinglist[0]?.estimates.map(item => {
            return (
              <View>
                <View style={styles.EstimateservicesHeadingContainer}>
                  <Text style={styles.EstimateServicesSubHeading}>
                    {item.name}
                  </Text>

                  <Text style={styles.EstimateServicesSubHeading}>
                    {item.warranty == null ? 'N/A' : item.warranty}
                  </Text>

                  {/* <Text style={styles.EstimateServicesSubHeading}>
                    {item.item.description}
                  </Text> */}
                  <Text style={styles.EstimateServicesSubHeading}>
                    {item.qty}
                  </Text>
                  <Text style={styles.EstimateServicesSubHeading}>
                    $ {item.unit_price}
                  </Text>
                  <Text style={styles.EstimateServicesSubHeading}>
                    $ {item.unit_price * item.qty}
                  </Text>
                </View>
              </View>
            );
          })}
        {Pendinglist[0] && Pendinglist[0]?.estimates.length > 0 && (
          <View>
            <View style={styles.EstimateservicesHeadingContainer}>
              <Text style={styles.EstimateServicesSubHeading}></Text>
              <Text style={styles.EstimateServicesSubHeading}></Text>
              <Text style={styles.EstimateServicesSubHeading}></Text>
              <Text style={styles.EstimateServicesSubHeading}>
                {' '}
                {t('placeholders.bookingList.Total')} :{' '}
              </Text>
              <Text style={styles.EstimateServicesSubHeading}>
                ${' '}
                {setTotalCount(
                  Pendinglist[0]?.ServiceDetail?.converted_discounted_price,
                )}
              </Text>
            </View>
          </View>
        )}

        {Pendinglist[0] && Pendinglist[0].ServiceUploadImage.length > 0 ? (
          <View style={{ marginHorizontal: wp(5), marginTop: hp(2) }}>
            <Text
              style={{
                fontSize: 14,
                color: '#000',
                fontFamily: 'Montserrat-Bold',
              }}>
              {t('placeholders.rang.uploadedimages')}
            </Text>

            {Pendinglist[0] &&
              Pendinglist[0].ServiceUploadImage &&
              Pendinglist[0].ServiceUploadImage.length > 0 &&
              Pendinglist[0].ServiceUploadImage.map(item => {
                return (
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: hp(2),
                      }}>
                      <Lightbox underlayColor="white" style={{ width: wp(30) }}>
                        <Image
                          style={{
                            flex: 1,
                            height: hp(20),
                          }}
                          resizeMode="contain"
                          source={{ uri: item.upload_image_url }}
                        />
                      </Lightbox>
                    </View>
                  </View>
                );
              })}
            <Text
              style={{
                fontSize: 14,
                marginTop: hp(2),
                fontFamily: 'Montserrat-Medium',
              }}>
              {Pendinglist[0] &&
                Pendinglist[0]?.ServiceUploadImage[0]?.description}
            </Text>
          </View>
        ) : null}

        {Pendinglist[0] &&
          Pendinglist[0]?.address &&
          Pendinglist[0]?.address?.address_one.length > 0 ? (
          <View style={styles.AddressWrapper}>
            <Text style={styles.addressHeading}>
              {t('placeholders.rang.address_detail')}
            </Text>
            <Text style={styles.addressSubHeading}>
              {Pendinglist[0]?.address?.name}
            </Text>
            <Text style={styles.addressSubHeading}>
              {Pendinglist[0]?.address?.type}
            </Text>
            <Text style={[styles.addressSubHeading, { paddingTop: hp(1) }]}>
              {Pendinglist[0]?.address?.address_map}
            </Text>
            <Text style={[styles.addressSubHeading, { paddingTop: hp(1) }]}>
              {Pendinglist[0]?.address?.address_one}
            </Text>
            <Text style={[styles.addressSubHeading, { paddingTop: hp(1) }]}>
              {Pendinglist[0]?.address?.address_two}
            </Text>
          </View>
        ) : (
          <View style={styles.AddressWrapper}>
            <Text style={styles.addressHeading}>
              {t('placeholders.rang.address_detail')}
            </Text>
            <Text style={styles.addressText}>
              {Pendinglist[0]?.current_address}
            </Text>
          </View>
        )}

        <View style={styles.containerWrapper}>
          {Pendinglist[0] && Pendinglist[0]?.address == null ? (
            <MapView
              style={[styles.map, { marginBottom: state.marginBottom }]}
              showsUserLocation={true}
              showsMyLocationButton={true}
              initialRegion={{
                latitude: 28.58364,

                longitude: 77.3147,

                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              onRegionChangeComplete={region =>
                setstate({
                  coordinate: region,
                })
              }
              onMapReady={() => {
                setstate({ marginBottom: 0 });
              }}>
              <Marker
                coordinate={{
                  latitude: 28.58364,

                  longitude: 77.3147,
                }}
                onDragEnd={e =>
                  this.setState({ x: e.nativeEvent.coordinate })
                }></Marker>
            </MapView>
          ) : (
            <MapView
              style={[styles.map, { marginBottom: state.marginBottom }]}
              showsUserLocation={true}
              showsMyLocationButton={true}
              initialRegion={{
                latitude:
                  Pendinglist[0]?.address == null || Pendinglist[0]?.address?.lat == null
                    ? 28.58364
                    : Pendinglist[0]?.address?.lat,
                longitude:
                  Pendinglist[0]?.address == null || Pendinglist[0]?.address?.long == null
                    ? 28.58364
                    : Pendinglist[0]?.address?.long,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              onRegionChangeComplete={region =>
                setstate({
                  coordinate: region,
                })
              }
              onMapReady={() => {
                setstate({ marginBottom: 0 });
              }}>
              <Marker
                coordinate={{
                  latitude:
                    Pendinglist[0]?.address == null || Pendinglist[0]?.address?.lat == null
                      ? 28.58364
                      : Pendinglist[0]?.address?.lat,
                  longitude:
                    Pendinglist[0]?.address == null || Pendinglist[0]?.address?.long == null
                      ? 28.58364
                      : Pendinglist[0]?.address?.long,
                }}
                onDragEnd={e =>
                  setState({ x: e.nativeEvent.coordinate })
                }></Marker>
            </MapView>
          )}
        </View>

        {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: wp(5), marginVertical: hp(1.5) }}>
                    <CustomRating />

                </View> */}

        {Pendinglist[0]?.status === 'Canceled' ||
          Pendinglist[0]?.status ===
          t('placeholders.settings.completed') ? null : (
          <View style={styles.editDeleteWRapper}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditPage', {
                  b_id: route.params.bookingId,
                })
              }
              style={styles.editWrapper}>
              <Image
                source={require('../../../assets/images/editbooking.png')}
                resizeMode="contain"
                style={{ height: hp(2), width: wp(5) }}
              />
              <Text style={styles.editTextWrapp}>
                {t('placeholders.rang.edit')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteWrapper}
              onPress={() => deltebooking()}>
              <Text style={styles.deleteCrossWrapp}>X</Text>
              <Text style={styles.deleteTextWrapp}>
                {t('placeholders.rang.delete')}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {Pendinglist[0]?.status === t('placeholders.settings.completed') ? (
          <View>
            <Rating
              tintColor="#dfdfdf"
              imageSize={25}
              minValue={0}
              startingValue={

                Pendinglist[0]?.ratings == ''
                  ? 0
                  : Pendinglist[0]?.ratings[0].rating

              }
              // showRating
              onFinishRating={rating => ratingdisplay(rating)}
              style={{ paddingVertical: 10 }}
            />
            <TouchableOpacity
              onPress={() => ratingCompleted()}
              style={{
                height: hp(6),
                marginTop: hp(2),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 4,
                width: wp(90),
                marginLeft: wp(5),
                backgroundColor: '#9066e6',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#fff',
                  fontFamily: 'Montserrat-Regular',
                }}>
                {t('placeholders.bookingList.submit')}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {/* <View style={{marginTop: hp(3)}}>
                      {ServiceDetail?.service?.ratings.slice(0, 2).map(item => {
                        return (
                          <View
                            style={{
                              marginLeft: wp(5),
                              backgroundColor: '#fff',
                              marginTop: hp(0.5),
                              width: wp(90),
                              paddingBottom: hp(1.5),
                              borderRadius: 5,
                            }}>
                            <View>
                              <Text
                                style={{
                                  fontSize: 15,
                                  marginTop: 10,
                                  paddingLeft: wp(3),
                                  fontFamily: 'Montserrat-Regular',
                                }}>
                                {item.review}
                              </Text>
                            </View>
                            <Rating
                              imageSize={17}
                              readonly
                              ratingCount={5}
                              defaultRating={item.rating}
                              startingValue={item.rating}
                              style={{
                                paddingVertical: 10,
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start',
                                paddingLeft: wp(3),
                              }}
                              ratingContainerStyle={{paddingLeft: wp(1)}}
                            />
                          </View>
                        );
                      })}
                    </View> */}
        {/* {
                    Pendinglist[0]?.status === 'Cancelled' && Pendinglist[0]?.status === 'completed' ?
                        <View>
                            <Rating
                                imageSize={25}
                                minValue={0}
                                startingValue={0}
                                // showRating
                                onFinishRating={rating => ratingdisplay(rating)}
                                style={{ paddingVertical: 10 }}
                            />
                            <TouchableOpacity style={{ height: hp(6), marginTop: hp(2), justifyContent: 'center', alignItems: 'center', borderRadius: 4, width: wp(90), marginLeft: wp(5), backgroundColor: '#9066e6' }}>
                                <Text style={{ fontSize: 14, color: '#fff', fontFamily: 'Montserrat-Regular' }}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                        : null
                } */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#dfdfdf' },
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
  topWrapper: {
    flexDirection: 'row',
    marginHorizontal: wp(5),
    marginTop: hp(4),
    borderBottomWidth: 1,
    borderColor: '#c2c2c2',
    paddingBottom: hp(1),
  },
  topLeftWRapper: {
    width: wp(50),
    borderRightWidth: 1,
    borderColor: '#c2c2c2',
    paddingLeft: 10,
    // backgroundColor: 'red'
  },
  topInvoiceLeftNewWRapper: {
    width: wp(30),
    borderRightWidth: 1,
    borderColor: '#c2c2c2',
    // backgroundColor: 'red'
  },
  topLeftNewWRapper: {
    width: wp(30),
    borderRightWidth: 1,
    borderColor: '#c2c2c2',
    paddingLeft: 5,
    // backgroundColor: 'red'
  },
  topRightWRapper: {
    width: wp(50),
    paddingLeft: wp(5),
  },
  mailImage: {
    height: hp(2),
    width: wp(4),
  },
  flexWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: hp(0.5),
  },
  headingInvoice: {
    fontSize: 12,
    color: '#000',
    paddingLeft: 10,
    fontFamily: 'Montserrat-Bold',
  },
  subHeading: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'Montserrat-Medium',
    paddingLeft: wp(2),
  },
  cancellWrapper: {
    borderWidth: 1,
    borderColor: 'red',
    width: wp(18),
    borderRadius: 7,
    marginTop: hp(0.5),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(0.5),
  },
  cancelHeading: {
    fontSize: 10,
    color: 'red',
    fontFamily: 'Montserrat-Medium',
  },
  dateHeading: {
    fontSize: 10,
    color: '#9066e6',
    fontFamily: 'Montserrat-Medium',
    paddingLeft: wp(2),
  },
  serviesHeading: {
    backgroundColor: '#9066e6',
    marginLeft: wp(5),
    paddingVertical: hp(1.5),
    marginTop: hp(3),
    flexDirection: 'row',
    width: wp(90),
  },
  servicesText: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'Montserrat-Medium',
    // paddingLeft: wp(2),
    width: wp(30),
    textAlign: 'center',
    // justifyContent:'center'
  },
  productHeading: {
    marginLeft: wp(5),
    paddingVertical: hp(1),
    borderBottomColor: '#c2c2c2',
    borderBottomWidth: 1,
    paddingBottom: hp(3),
    marginTop: hp(1),
    flexDirection: 'row',
    width: wp(90),
  },
  productText: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'Montserrat-Medium',
    // paddingLeft: wp(2)
    width: wp(30),
    textAlign: 'center',
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
  servicesName: {
    marginHorizontal: wp(5),
    //   width: wp(40),
    lineHeight: 20,
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
  },

  servicesHeading: {
    marginHorizontal: wp(5),
    width: wp(50),
    marginTop: hp(2),
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
  },

  EstimateservicesHeading: {
    backgroundColor: '#9066e6',

    padding: 10,
    fontSize: 11,
    color: '#fff',
    fontFamily: 'Montserrat-Medium',
    width: wp(20),
    marginTop: hp(2),
    textAlign: 'center',
  },

  EstimateServicesSubHeading: {
    width: wp(20),
    marginTop: hp(2),
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,

    textAlign: 'center',
  },
  EstimateservicesHeadingContainer: {
    width: wp(90),
    // alignSelf: 'center',
    flexDirection: 'row',
  },
  servicesHeadingContainer: {
    margin: 10,
    marginLeft: 0,
  },
  DownloadButton: {
    backgroundColor: 'green',
    padding: 5,
    width: wp(20),
    margin: 5,
    alignItems: 'center',
    borderRadius: 10,
  },
  downloadText: {
    fontSize: 10,
    color: '#fff',
    fontFamily: 'Montserrat-Medium',
  },
  addressHeading: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Montserrat-Bold',
  },
  addressSubHeading: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'Montserrat-Medium',
    paddingTop: hp(2),
    // paddingLeft: wp(1)
  },
  editWrapper: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#9066e6',
    width: wp(20),
    borderRadius: 6,
    marginTop: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(1),
  },
  editDeleteWRapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: wp(5),
  },
  editTextWrapp: {
    fontSize: 12,
    color: '#9066e6',
    fontFamily: 'Montserrat-Regular',
    paddingLeft: wp(1),
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
    paddingVertical: hp(0.3),
    marginLeft: wp(3),
  },
  deleteCrossWrapp: {
    fontSize: 12,
    color: 'red',
    fontFamily: 'Montserrat-Regular',
  },
  deleteTextWrapp: {
    fontSize: 12,
    color: 'red',
    fontFamily: 'Montserrat-Regular',
    paddingLeft: wp(2),
  },
  containerWrapper: {
    // ...StyleSheet.absoluteFillObject,
    height: hp(20),
    // height: 400,
    // width: 400,
    // alignItems: 'center',
    marginTop: hp(2),

    // marginTop: 50,
  },
  map: {
    // flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  customRatingBar: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginTop: 15,
    // marginHorizontal: wp( 2 )
  },
  starImgStyle: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
  },
  centerImageWrapper: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginTop: hp(3),
    // alignItems: 'center',
    // justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: '#9066e6',
  },
  centerImage: {
    height: 96,
    width: 96,
    borderRadius: 50,
    // borderWidth: 2,
  },
});
