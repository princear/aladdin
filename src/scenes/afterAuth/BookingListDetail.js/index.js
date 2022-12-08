import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { MONTSERRAT_BOLD } from '../../styles/typography';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ARROW_WHITE, DOWN_ARROW } from '../../../assets/icon';
import { useDispatch, useSelector } from 'react-redux';
import { particularBookingId, cancelBooking, deleteBooking } from '../../../redux/Action/BookingAction';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { request, PERMISSIONS } from 'react-native-permissions';
import Lightbox from 'react-native-lightbox';
import { useTranslation } from 'react-i18next';

export default function BookingListDetail({ route, navigation }) {


    const dispatch = useDispatch();

    // const mapRef = React.createRef();

    const Pendinglist = useSelector((state) => state.COUNTBOOKINGREDUCER.particularList);

    console.log('Pendinglist', Pendinglist)
    const { loading } = useSelector(state => state.UserReducers);

    const [t] = useTranslation();

    useEffect(() => {
        const booking_id = route.params.bookingId;

        dispatch(particularBookingId(booking_id, navigation))

    }, [])

    const deltebooking = () => {
        Alert.alert(
            'Delete Booking',
            'Are you sure you want to delete booking', [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: () => dispatch(deleteBooking(route.params.bookingId, navigation))
            },], {
                cancelable: false
            }
        )


    }

    const [defaultRating, setDefaultRating] = useState(1);
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
    const starImagFilled = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png';
    const starImgCorner = 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';


    let total = 0;

    Pendinglist[0] && Pendinglist[0] ?.ratings.forEach(item => {
        total += parseInt(item.rating)
    });

    var totalLength = Pendinglist[0] ?.ratings.length;
    var no_Of_Rating = total;

    var ratingResult = Math.round(no_Of_Rating / totalLength);




    const CustomRating = () => {
        return (
            <View style={styles.customRatingBar}>



                {
                    maxRating.map((item, key) => {
                        return (
                            <View
                                activeOpacity={0.5}
                                key={item}
                            // onPress={() => rating( item )}
                            >
                                <Image style={styles.starImgStyle}
                                    source={item <= ratingResult ? { uri: starImagFilled } : { uri: starImgCorner }} />
                            </View>
                        )
                    })
                }
            </View>
        )
    }
    const [userLocation, setUserLocation] = useState(false)
    const [selectlocation, setSelectLocation] = useState('')
    const [selectlonguitude, setSelectlonguitude] = useState('')


    const [state, setstate] = useState(
        {
            coordinate: {
                latitude: Pendinglist[0] ?.address == null ? 28.58364 : Pendinglist[0] ?.address ?.lat,
                longitude: Pendinglist[0] ?.address == null ? 77.3147 : Pendinglist[0] ?.address ?.lat,
                // latitude: 28.58364,
                // longitude: 77.3147,
            },
            marginBottom: 1
        }
    )



    const handleUserLocation = () => {

        const latitude = userLocation.latitude;
        const longitude = userLocation.longitude;
        setstate({ latitude, longitude });
        console.log('mapRef', mapRef)
        mapRef.current.animateToRegion({
            latitude: Number(selectlocation),
            longitude: Number(selectlonguitude),
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
        }, 1000)

    }

    // ==================GET CURRENT POSITION =============================
    async function requestLocationPermission() {
        console.log('lakalak')
        var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)

        if (response == 'granted') {
            await Geolocation.getCurrentPosition(
                ({ coords }) => {
                    console.log('coords', coords)
                    setUserLocation(coords)

                },
                (error) => {
                    console.log('error', error)
                    // Alert.alert( error.code, error.message );
                },
                {
                    enableHighAccuracy: true, timeout: 20000, maximumAge: 10000
                }
            )
        }
    }

    const renderScene = (route, navigator) => {
        const Component = route.component;

        return (
            <Component navigator={navigator} route={route} {...route.passProps} />
        );
    };

    const uri = 'http://knittingisawesome.com/wp-content/uploads/2012/12/cat-wearing-a-reindeer-hat1.jpg'
    const longPress = (uri) => {
        CameraRoll.saveToCameraRoll(uri)
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerWrapper}>
                <View style={styles.headerAligner}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={ARROW_WHITE} style={styles.headerLeftImage} />
                    </TouchableOpacity>
                    <Text style={styles.headerCenterText}>{t('placeholders.rang.Booking_detail')}</Text>
                </View>
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
            <ScrollView contentContainerStyle={{ paddingBottom: hp(6) }}>

                <View style={styles.centerImageWrapper}>

                    <Image source={{ uri: Pendinglist[0] ?.customer_details ?.user_image_url }} style={styles.centerImage} />

                    {/* <Image source={{ uri: Pendinglist[0] ?.ServiceDetail ?.service_image_url }} style={styles.centerImage} /> */}
                </View>
                <View style={styles.topWrapper}>


                    <View style={styles.topLeftWRapper}>
                        <Text style={styles.heading}>{t('placeholders.bookingList.email')}</Text>
                        <View style={styles.flexWrapper}>
                            <Image source={require('../../../assets/images/mail.png')} resizeMode='contain' style={styles.mailImage} />
                            <Text style={styles.subHeading}>{Pendinglist[0] ?.customer_details ?.email}</Text>
                        </View>
                    </View>
                    <View style={styles.topRightWRapper}>
                        <Text style={styles.heading}>{t('placeholders.bookingList.mobile')}</Text>
                        <View style={styles.flexWrapper}>
                            <Image source={require('../../../assets/images/mobile.png')} resizeMode='contain' style={styles.mailImage} />

                            <Text style={styles.subHeading}>{Pendinglist[0] ?.customer_details ?.formatted_mobile}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.topWrapper}>

                    <View style={styles.topLeftWRapper}>
                        <Text style={styles.heading}>{t('placeholders.bookingList.booking_date')}</Text>
                        <View style={styles.flexWrapper}>
                            <Image source={require('../../../assets/images/date.png')} resizeMode='contain' style={styles.mailImage} />
                            <Text style={styles.dateHeading}>{Pendinglist[0] ?.date}</Text>
                        </View>
                    </View>
                    <View style={styles.topRightWRapper}>
                        <Text style={styles.heading}>{t('placeholders.bookingList.booking_status')}</Text>
                        <View style={[styles.cancellWrapper, {
                            borderColor: Pendinglist[0] ?.status === 'Pending' ? '#f2ac00' :
                                Pendinglist[0] ?.status === 'In Progress' ? '#157dfc' : Pendinglist[0] ?.status === 'Completed' ? '#2ea749'
                                    : Pendinglist[0] ?.status === 'Cancelled'
                                        ? '#da3348' : null
                        }]}>
                            <Text style={[styles.cancelHeading, {
                                color: Pendinglist[0] ?.status === 'Pending' ? '#f2ac00' :
                                    Pendinglist[0] ?.status === 'In Progress' ? '#157dfc' : Pendinglist[0] ?.status === 'Completed' ? '#2ea749'
                                        : Pendinglist[0] ?.status === 'Cancelled'
                                            ? '#da3348' : null
                            }]}>{Pendinglist[0] ?.status}</Text>
                        </View>
                    </View>
                </View>








                <View style={styles.serviesHeading}>
                    <Text style={styles.servicesText}> {t('placeholders.rang.serve_name')}</Text>
                    <Text style={styles.servicesText}> {'Service Price'}</Text>
                    <Text style={styles.servicesText}> {'Amount'}</Text>
                </View>

                <View style={styles.productHeading}>
                    <Text style={styles.productText}>{Pendinglist[0] ?.ServiceDetail ?.name} </Text>
                    <Text style={styles.productText}>{Pendinglist[0] ?.ServiceDetail ?.formated_price} </Text>
                    <Text style={styles.productText}>{Pendinglist[0] ?.ServiceDetail ?.formated_discounted_price} </Text>

                    {/* <View style={styles.servicesWrapper}>
                        <Text style={styles.servicesTextWrapper}>{t('placeholders.rang.service')}</Text>
                    </View> */}
                </View>



                <View style={{ marginHorizontal: wp(5), marginTop: hp(2), flexDirection: 'row', }}>


                    {
                        Pendinglist[0] ?.attributes.length > 0 ?
                            <View style={{ width: wp(50) }}>
                                <Text style={{ fontSize: 14, color: '#000', fontFamily: 'Montserrat-Bold' }}>{Pendinglist[0] ?.attributes[0] ?.name}</Text>
                            </View> : null
                    }

                    {
                        Pendinglist[0] ?.attributes ?.length > 1 ?
                            <View style={{ width: wp(40) }}>
                                <Text style={{ fontSize: 14, color: '#000', fontFamily: 'Montserrat-Bold' }}>{Pendinglist[0] ?.attributes[1] ?.name}</Text>
                            </View> : null
                    }


                </View>

                <View style={{ marginHorizontal: wp(5), marginTop: hp(1), flexDirection: 'row', }}>

                    {
                        Pendinglist[0] ?.attribute_values.length > 0 ?
                            <View style={{ width: wp(50) }}>
                                <Text style={{ fontSize: 12, color: '#000', fontFamily: 'Montserrat-Medium' }}>{Pendinglist[0].attribute_values[0].name}</Text>

                            </View> : null
                    }


                    {
                        Pendinglist[0] ?.attribute_values.length > 1 ?
                            <View style={{ width: wp(40) }}>
                                <Text style={{ fontSize: 12, color: '#000', fontFamily: 'Montserrat-Medium' }}>{Pendinglist[0].attribute_values[1].name}</Text>

                            </View> : null
                    }


                </View>
                <View style={{ marginHorizontal: wp(5), marginTop: hp(2), flexDirection: 'row', }}>

                    {
                        Pendinglist[0] ?.attributes.length > 3 ?
                            <View style={{ width: wp(50) }}>
                                <Text style={{ fontSize: 14, color: '#000', fontFamily: 'Montserrat-Bold' }}>{Pendinglist[0] ?.attributes[3] ?.name}</Text>
                            </View> : null
                    }


                    {
                        Pendinglist[0] ?.attributes.length > 4 ?
                            <View style={{ width: wp(40) }}>
                                <Text style={{ fontSize: 14, color: '#000', fontFamily: 'Montserrat-Bold' }}>{Pendinglist[0] ?.attributes[4] ?.name}</Text>
                            </View> : null
                    }


                </View>
                <View style={{ marginHorizontal: wp(5), marginTop: hp(1), flexDirection: 'row' }}>



                    {
                        Pendinglist[0] && Pendinglist[0].attribute_values.length > 3 ?
                            <View style={{ width: wp(50) }}>
                                <Text style={{ fontSize: 12, color: '#000', fontFamily: 'Montserrat-Medium' }}>{Pendinglist[0].attribute_values[3].name}</Text>

                            </View> : null
                    }

                    {
                        Pendinglist[0] && Pendinglist[0].attribute_values.length > 4 ?
                            <View style={{ width: wp(40) }}>
                                <Text style={{ fontSize: 12, color: '#000', fontFamily: 'Montserrat-Medium' }}>{Pendinglist[0].attribute_values[4].name}</Text>

                            </View> : null
                    }
                </View>




                {
                    Pendinglist[0] && Pendinglist[0].ServiceUploadImage.length > 0 ?

                        <View style={{ marginHorizontal: wp(5), marginTop: hp(2) }}>
                            <Text style={{
                                fontSize: 14,
                                color: '#000',
                                fontFamily: 'Montserrat-Bold',
                            }}>{t('placeholders.rang.uploadedimages')}</Text>


                            {
                                Pendinglist[0] && Pendinglist[0].ServiceUploadImage && Pendinglist[0].ServiceUploadImage.length > 0 && Pendinglist[0].ServiceUploadImage.map((item) => {
                                    return (
                                        <View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp(2) }}>

                                                <Lightbox underlayColor="white"
                                                    style={{ width: wp(30) }}>
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
                                    )
                                })
                            }
                            <Text style={{ fontSize: 14, marginTop: hp(2), fontFamily: 'Montserrat-Medium', }}>{Pendinglist[0] && Pendinglist[0] ?.ServiceUploadImage[0] ?.description}</Text>

                        </View>
                        : null}


                {
                    Pendinglist[0] && Pendinglist[0] ?.address && Pendinglist[0] ?.address ?.address_one.length > 0 ?

                        <View style={styles.AddressWrapper}>
                            <Text style={styles.addressHeading}>{t('placeholders.rang.address_detail')}</Text>
                            <Text style={styles.addressSubHeading}>{Pendinglist[0] ?.address ?.name}</Text>

                            <Text style={[styles.addressSubHeading, { paddingTop: hp(1) }]}>{Pendinglist[0] ?.address ?.address_one}</Text>
                        </View> :
                        null 
                    }



                <View style={styles.containerWrapper}>

                    <MapView
                        style={[styles.map, { marginBottom: state.marginBottom }]}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                        initialRegion={{
                            latitude: Pendinglist[0] ?.address == null ? 28.58364 : Pendinglist[0] ?.address ?.lat,
                            longitude: Pendinglist[0] ?.address == null ? 77.3147 : Pendinglist[0] ?.address ?.lat,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,

                        }}
                        onRegionChangeComplete={(region) => setstate({
                            coordinate: region
                        })}
                        onMapReady={() => { setstate({ marginBottom: 0 }) }}
                    >

                        <Marker
                            coordinate={{
                                latitude: Pendinglist[0] ?.address == null ? 28.58364 : Pendinglist[0] ?.address ?.lat,
                                longitude: Pendinglist[0] ?.address == null ? 77.3147 : Pendinglist[0] ?.address ?.lat,

                            }}
                            onDragEnd={(e) => this.setState({ x: e.nativeEvent.coordinate })}

                        ></Marker>


                    </MapView>
                </View >




                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: wp(5), marginVertical: hp(1.5) }}>
                    <CustomRating />

                </View>

                {
                    Pendinglist[0] ?.status === 'Cancelled' ? null :

                        <View style={styles.editDeleteWRapper}>
                            <TouchableOpacity onPress={() => navigation.navigate('EditPage', {
                                b_id: route.params.bookingId
                            })} style={styles.editWrapper}>
                                <Image source={require('../../../assets/images/editbooking.png')} resizeMode='contain' style={{ height: hp(2), width: wp(5) }} />
                                <Text style={styles.editTextWrapp}>{t('placeholders.rang.edit')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteWrapper}

                                onPress={() => deltebooking()}>
                                <Text style={styles.deleteCrossWrapp}>X</Text>
                                <Text style={styles.deleteTextWrapp}>{t('placeholders.rang.delete')}</Text>
                            </TouchableOpacity>
                        </View>
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    headerWrapper: { backgroundColor: '#9066e6', paddingVertical: hp(1.5), flexDirection: 'row', alignItems: 'center' },
    headerAligner: { flexDirection: 'row', alignItems: 'center' },
    headerLeftImage: { height: hp(4), width: wp(8), marginRight: wp(3), marginLeft: wp(2) },
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
        borderColor: '#c2c2c2'
        // backgroundColor: 'red'
    },
    topRightWRapper: {
        width: wp(50),
        paddingLeft: wp(5)
    },
    mailImage: {
        height: hp(2),
        width: wp(4)
    },
    flexWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: hp(.5)
    },
    heading: {
        fontSize: 12,
        color: '#000',
        fontFamily: 'Montserrat-Bold',
    },
    subHeading: {
        fontSize: 12,
        color: '#000',
        fontFamily: 'Montserrat-Medium',
        paddingLeft: wp(2)
    },
    cancellWrapper: {
        borderWidth: 1,
        borderColor: 'red',
        width: wp(18),
        borderRadius: 7,
        marginTop: hp(.5),
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: hp(.5)
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
        paddingLeft: wp(2)
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
        textAlign: 'center'
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
        width: wp(90)
    },
    productText: {
        fontSize: 12,
        color: '#000',
        fontFamily: 'Montserrat-Medium',
        // paddingLeft: wp(2)
        width: wp(30),
        textAlign: 'center'
    },
    servicesWrapper: {
        backgroundColor: '#9066e6',
        borderRadius: 10,
        width: wp(18),
        alignItems: 'center',
        marginTop: hp(1),
        marginLeft: wp(4),
        paddingVertical: hp(.2)


    },
    servicesTextWrapper: {
        fontSize: 11,
        color: '#fff',
        fontFamily: 'Montserrat-Medium',
    },
    AddressWrapper: {
        marginHorizontal: wp(5),
        paddingTop: hp(4),
        paddingLeft: wp(2)
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
        paddingVertical: hp(1)
    },
    editDeleteWRapper: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginHorizontal: wp(5)
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
        paddingVertical: hp(.3),
        marginLeft: wp(3)

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
        paddingLeft: wp(2)
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
        resizeMode: 'cover'
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
        borderColor: '#9066e6'
    },
    centerImage: {
        height: 96,
        width: 96,
        borderRadius: 50,
        // borderWidth: 2,
    }

});
