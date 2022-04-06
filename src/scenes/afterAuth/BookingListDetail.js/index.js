import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { MONTSERRAT_BOLD } from '../../styles/typography';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ARROW_WHITE, DOWN_ARROW } from '../../../assets/icon';
import { useDispatch, useSelector } from 'react-redux';
import { particularBookingId, cancelBooking, deleteBooking } from '../../../redux/Action/BookingAction';

export default function BookingListDetail({ route, navigation }) {


    const dispatch = useDispatch();


    const Pendinglist = useSelector((state) => state.COUNTBOOKINGREDUCER.particularList);

    useEffect(() => {
        const booking_id = route.params.bookingId;

        dispatch(particularBookingId(booking_id))

    }, [])



    return (
        <View style={styles.container}>
            <View style={styles.headerWrapper}>
                <View style={styles.headerAligner}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={ARROW_WHITE} style={styles.headerLeftImage} />
                    </TouchableOpacity>
                    <Text style={styles.headerCenterText}>Booking Detail</Text>
                </View>
            </View>


            <View style={styles.topWrapper}>

                <View style={styles.topLeftWRapper}>
                    <Text style={styles.heading}>Email</Text>
                    <View style={styles.flexWrapper}>
                        <Image source={require('../../../assets/images/mail.png')} resizeMode='contain' style={styles.mailImage} />
                        <Text style={styles.subHeading}>{Pendinglist[0] ?.customer_details ?.email}</Text>
                    </View>
                </View>
                <View style={styles.topRightWRapper}>
                    <Text style={styles.heading}>Mobile</Text>
                    <View style={styles.flexWrapper}>
                        <Image source={require('../../../assets/images/mobile.png')} resizeMode='contain' style={styles.mailImage} />

                        <Text style={styles.subHeading}>{Pendinglist[0] ?.customer_details ?.formatted_mobile}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.topWrapper}>


                <View style={styles.topLeftWRapper}>
                    <Text style={styles.heading}>Booking Date</Text>
                    <View style={styles.flexWrapper}>
                        <Image source={require('../../../assets/images/date.png')} resizeMode='contain' style={styles.mailImage} />
                        <Text style={styles.dateHeading}>{Pendinglist[0] ?.date}</Text>
                    </View>
                </View>
                <View style={styles.topRightWRapper}>
                    <Text style={styles.heading}>Booking Status</Text>
                    <View style={[styles.cancellWrapper, {
                        borderColor: Pendinglist[0] ?.status === 'pending' ? '#f2ac00' :
                            Pendinglist[0] ?.status === 'in progress' ? '#157dfc' : Pendinglist[0] ?.status === 'complete' ? '#2ea749'
                                : Pendinglist[0] ?.status === 'canceled'
                                    ? '#da3348' : null}]}>
                        <Text style={[styles.cancelHeading, {
                            color: Pendinglist[0] ?.status === 'pending' ? '#f2ac00' :
                                Pendinglist[0] ?.status === 'in progress' ? '#157dfc' : Pendinglist[0] ?.status === 'complete' ? '#2ea749'
                                    : Pendinglist[0] ?.status === 'canceled'
                                        ? '#da3348' : null
                        }]}>{Pendinglist[0] ?.status}</Text>
                    </View>
                </View>
            </View>


            <View style={styles.serviesHeading}>
                <Text style={styles.servicesText}>#    Services Name</Text>
            </View>

            <View style={styles.productHeading}>
                <Text style={styles.productText}>{Pendinglist[0] ?.ServiceDetail ?.name} </Text>
                <View style={styles.servicesWrapper}>
                    <Text style={styles.servicesTextWrapper}>Services</Text>
                </View>
            </View>
            <View style={styles.AddressWrapper}>
                <Text style={styles.addressHeading}>Address Details</Text>
                <Text style={styles.addressSubHeading}>{Pendinglist[0] ?.additional_notes}</Text>
            </View>

            <View style={styles.editDeleteWRapper}>
                <TouchableOpacity onPress={() => navigation.navigate('EditPage', {
                    b_id: route.params.bookingId
                })} style={styles.editWrapper}>
                    <Image source={require('../../../assets/images/editbooking.png')} resizeMode='contain' style={{ height: hp(2), width: wp(5) }} />
                    <Text style={styles.editTextWrapp}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteWrapper}

                    onPress={() => dispatch(deleteBooking(route.params.bookingId, navigation))}>
                    <Text style={styles.deleteCrossWrapp}>X</Text>
                    <Text style={styles.deleteTextWrapp}>Delete Booking</Text>
                </TouchableOpacity>
            </View>

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
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#9066e6',
        width: wp(20),
        borderRadius: 6,
        marginTop: hp(2),
        alignItems: 'center',
        justifyContent: 'center',
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
    }

});
