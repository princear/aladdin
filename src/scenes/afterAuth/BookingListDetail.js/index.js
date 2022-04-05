import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { MONTSERRAT_BOLD, MONTSERRAT_REGULAR } from '../../styles/typography';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ARROW_WHITE, DOWN_ARROW } from '../../../assets/icon';
import { BLACK, WHITE } from '../../styles/color';
import RNPickerSelect from 'react-native-picker-select';
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from 'react-redux';
import { particularBookingId } from '../../../redux/Action/BookingAction';

export default function BookingListDetail({ route, navigation }) {


    const dispatch = useDispatch();
    const [email, setEmail] = useState('');


    const Pendinglist = useSelector((state) => state.COUNTBOOKINGREDUCER.particularList);
    console.log('booking_idQQQQQQQQQQQ', Pendinglist[0].customer_details)

    //console.log('data', data)
    useEffect(() => {
        const booking_id = route.params.bookingId;

        console.log('booking_id', booking_id)
        dispatch(particularBookingId(booking_id))

        // setEmail(Pendinglist[0].customer_details.email);
    }, [])



    return (
        <View style={styles.container}>
            <View style={styles.headerWrapper}>
                <View style={styles.headerAligner}>
                    <TouchableOpacity>
                        <Image source={ARROW_WHITE} style={styles.headerLeftImage} />
                    </TouchableOpacity>
                    <Text style={styles.headerCenterText}>Booking Detail</Text>
                </View>
            </View>
            {/* {data.length >= 0 ? <> */}


            <View style={styles.topWrapper}>

                <View style={styles.topLeftWRapper}>
                    <Text style={styles.heading}>Email</Text>
                    <View style={styles.flexWrapper}>
                        <Image source={require('../../../assets/images/mail.png')} resizeMode='contain' style={styles.mailImage} />
                        <Text style={styles.subHeading}>{email}</Text>
                        <Text style={styles.subHeading}>{Pendinglist[0] == '' ? Pendinglist[0].customer_details.email : null}</Text>
                    </View>
                </View>
                <View style={styles.topRightWRapper}>
                    <Text style={styles.heading}>Mobile</Text>
                    <View style={styles.flexWrapper}>
                        <Image source={require('../../../assets/images/mobile.png')} resizeMode='contain' style={styles.mailImage} />

                        {/* <Text style={styles.subHeading}>{Pendinglist[0].customer_details.formatted_mobile}</Text> */}
                    </View>
                </View>
            </View>
            <View style={styles.topWrapper}>


                <View style={styles.topLeftWRapper}>
                    <Text style={styles.heading}>Booking Date</Text>
                    <View style={styles.flexWrapper}>
                        <Image source={require('../../../assets/images/date.png')} resizeMode='contain' style={styles.mailImage} />
                        {/* <Text style={styles.dateHeading}>{data.BookingDetail.date}</Text> */}
                    </View>
                </View>
                <View style={styles.topRightWRapper}>
                    <Text style={styles.heading}>Booking Status</Text>
                    <View style={styles.cancellWrapper}>
                        {/* <Text style={[styles.cancelHeading, {
                            color: data.BookingDetail.status === 'pending' ? '#f2ac00' :
                                data.BookingDetail.status === 'in progress' ? '#157dfc' : data.BookingDetail.status === 'complete' ? '#2ea749'
                                    : data.BookingDetail.status === 'canceled'
                                        ? '#da3348' : null
                        }]}>{data.BookingDetail.status}</Text> */}
                    </View>
                </View>
            </View>


            <View style={styles.serviesHeading}>
                <Text style={styles.servicesText}>#    Services Name</Text>
            </View>

            <View style={styles.productHeading}>
                {/* <Text style={styles.productText}>{data.ServiceDetail.name} </Text> */}
                <View style={styles.servicesWrapper}>
                    <Text style={styles.servicesTextWrapper}>Services</Text>
                </View>
            </View>
            <View style={styles.AddressWrapper}>
                <Text style={styles.addressHeading}>Address Details</Text>
                <Text style={styles.addressSubHeading}>fafaggshs v</Text>
            </View>

            <View style={styles.editDeleteWRapper}>
                <View style={styles.editWrapper}>
                    <Text style={styles.editTextWrapp}>Edit</Text>
                </View>
                <View style={styles.deleteWrapper}>
                    <Text style={styles.deleteCrossWrapp}>X</Text>
                    <Text style={styles.deleteTextWrapp}>Delete Booking</Text>
                </View>
            </View>


            {/* </> 
                : null
            } */}

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
        fontFamily: 'Montserrat-Medium',
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
        justifyContent: 'center'
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
        marginHorizontal: wp(5),
        paddingVertical: hp(1.5),
        marginTop: hp(3)
    },
    servicesText: {
        fontSize: 12,
        color: '#fff',
        fontFamily: 'Montserrat-Medium',
        paddingLeft: wp(2)
    },
    productHeading: {
        marginHorizontal: wp(5),
        paddingVertical: hp(1),
        borderBottomColor: '#c2c2c2',
        borderBottomWidth: 1,
        paddingBottom: hp(3),
        marginTop: hp(1)
    },
    productText: {
        fontSize: 12,
        color: '#000',
        fontFamily: 'Montserrat-Medium',
        paddingLeft: wp(2)
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
        fontFamily: 'Montserrat-Medium',
    },
    addressSubHeading: {
        fontSize: 12,
        color: '#000',
        fontFamily: 'Montserrat-Medium',
        paddingTop: hp(2),
        paddingLeft: wp(1)
    },
    editWrapper: {
        borderWidth: 1,
        borderColor: '#9066e6',
        width: wp(20),
        borderRadius: 6,
        marginTop: hp(2),
        alignItems: 'center',
        paddingVertical: hp(.3)
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
    }

});
