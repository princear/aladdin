import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { MONTSERRAT_BOLD, MONTSERRAT_REGULAR, MONTSERRAT_MEDIUM } from '../../scenes/styles/typography';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ARROW_WHITE, DOWN_ARROW } from '../../assets/icon';
import { useDispatch, useSelector } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import { BLACK, WHITE } from '../../scenes/styles/color';
import { editBooking, cancelBooking, deleteBooking } from '../../redux/Action/BookingAction';
import { useTranslation } from 'react-i18next';


export default function EditPage ( { route, navigation } ) {


    const dispatch = useDispatch();

    const [date, setDate] = useState( new Date( 1598051730000 ) );
    const [show, setShow] = useState( false );
    const[t] = useTranslation();
    const onChange = ( event, selectedDate ) => {
        const currentDate = selectedDate || date;
        setShow( Platform.OS === 'ios' );
        setDate( currentDate );
    };
    const showMode = ( currentMode ) => {
        setShow( true );
    };
    const showDatepicker = () => {
        showMode( 'date' );
    };

    const [state, setState] = useState( 'Select status' )
    const state_list = [
        { label: 'Select status', value: 'Select status' },
        { label: 'Pending', value: 'Pending' },
        { label: 'Completed', value: 'Completed' },
        { label: 'In Progress', value: 'In Progress' },
        // { label: 'canceled', value: 'canceled' },
        { label: 'Approved', value: 'Approved' },

    ];
    const bookingid = route.params.b_id;

    const Pendinglist = useSelector( ( state ) => state.COUNTBOOKINGREDUCER.particularList );

    const { loading } = useSelector( state => state.UserReducers );
    const deltebooking = () => {
        Alert.alert(
            'Delete Booking',
            'Are you sure you want to delete booking', [{
                text: 'Cancel',
                onPress: () => console.log( 'Cancel Pressed' ),
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: () => dispatch( deleteBooking( route.params.bookingId, navigation ) )
            },], {
            cancelable: false
        }
        )


    }


    return (
        <View style={styles.container}>
            <View style={styles.headerWrapper}>
                <View style={styles.headerAligner}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={ARROW_WHITE} style={styles.headerLeftImage} />
                    </TouchableOpacity>
                    <Text style={styles.headerCenterText}>{t('placeholders.rang.edit_page')} </Text>
                </View>
            </View>
            {( loading ) &&
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
            <View style={styles.bodyWrapper}>
                <Text style={styles.headingTextWrapp}>{t('placeholders.cart.Name')}</Text>
                <View style={styles.emailWrapper}>
                    <Image source={require( '../../assets/images/registartionUser.png' )} resizeMode='contain' style={styles.userImage} />
                    <Text style={styles.rightText}>{Pendinglist[0]?.customer_details?.name}</Text>
                </View>
                <Text style={styles.headingSecondTextWrapp}>{t('placeholders.cart.email')}</Text>
                <View style={styles.emailWrapper}>
                    <Image source={require( '../../assets/images/mail.png' )} resizeMode='contain' style={styles.userImage} />
                    <Text style={styles.rightText}>{Pendinglist[0]?.customer_details?.email}</Text>
                </View>
                <Text style={styles.headingSecondTextWrapp}>{t('placeholders.bookingList.mobile')}</Text>
                <View style={styles.emailWrapper}>
                    <Image source={require( '../../assets/images/mobile.png' )} resizeMode='contain' style={styles.userImage} />
                    <Text style={styles.rightText}>{Pendinglist[0]?.customer_details?.formatted_mobile}</Text>
                </View>

                {/* <Text style={[styles.headingSecondTextWrapp, { marginTop: hp(6) }]}>Booking Date</Text> */}

                {/* <TouchableOpacity onPress={showDatepicker} style={styles.bookingDateWrapper}>

                    <View>
                        <Text style={styles.bookingText}>{moment(date).format("DD-MM-YYYY ")}</Text>
                    </View>
                    <Image source={require('../../assets/images/Downarrow.png')} resizeMode='contain' style={styles.downArrowImage} />
                </TouchableOpacity>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={new Date()}
                        mode='date'
                        display="default"
                        onChange={onChange}
                    />
                )} */}


                <Text style={[styles.headingSecondTextWrapp]}>{t('placeholders.bookingList.booking_status')}</Text>

                <TouchableOpacity style={{ backgroundColor: '#fff', borderWidth: 1, borderRadius: 5, borderColor: '#9066e6', marginTop: hp( 2 ), elevation: 3, paddingVertical: hp( 1 ), }}>
                    <RNPickerSelect
                        onValueChange={( value ) => setState( value )}
                        items={state_list}
                        value={state}
                        placeholder={{}}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: wp( 4 ) }}>
                            {state_list.map(
                                ( item ) =>
                                    item.value === state && (
                                        <Text
                                            key={item.value}
                                            style={{ fontSize: 14, color: '#000', fontFamily: 'Montserrat-Medium' }}>
                                            {item.label}
                                        </Text>
                                    )
                            )}
                            <Image source={require( '../../assets/images/Downarrow.png' )} resizeMode='contain' style={{ height: hp( 3 ), width: wp( 5 ) }} />

                        </View>
                    </RNPickerSelect>

                </TouchableOpacity>



                <View style={styles.serviesHeading}>
                    <Text style={styles.servicesText}>#   {t('placeholders.rang.serve_name')} </Text>
                </View>

                <View style={styles.productHeading}>
                    <Text style={styles.productText}>{Pendinglist[0]?.ServiceDetail?.name} </Text>
                    {/* <View style={styles.servicesWrapper}>
                        <Text style={styles.servicesTextWrapper}>Services</Text>
                    </View> */}
                </View>


                <View style={styles.editDeleteWRapper}>

                    <TouchableOpacity style={styles.deleteWrapper} onPress={() => deltebooking()}>
                        <Text style={styles.deleteCrossWrapp}>X</Text>
                        <Text style={styles.deleteTextWrapp}>{t('placeholders.rang.delete')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.editWrapper} onPress={() => dispatch( cancelBooking( { booking_id: route.params.b_id, status: 'canceled' }, navigation ) )}>
                        <Image source={require( '../../assets/images/whiteclose.png' )} resizeMode='contain' style={{ height: hp( 2 ), width: wp( 2 ) }} />
                        <Text style={[styles.editTextWrapp, { color: '#fff' }]}>{t('placeholders.bookingList.cancel')}</Text>
                    </TouchableOpacity>

                    {/* <Text> {state}</Text> */}
                    <TouchableOpacity style={[styles.editWrapper, { backgroundColor: '#2ea749' }]}
                        onPress={() => dispatch( editBooking( { status: state, booking_id: bookingid, }, navigation ) )} >
                        {/* <Text style={[styles.deleteCrossWrapp, { color: '#fff' }]}>X</Text> */}
                        <Image source={require( '../../assets/images/right.png' )} resizeMode='contain' style={{ height: hp( 2 ), width: wp( 3 ) }} />

                        <Text style={[styles.editTextWrapp, { color: '#fff' }]}>{t('placeholders.bookingList.submit')}</Text>
                    </TouchableOpacity>
                </View>

            </View>





        </View>
    );
}

const styles = StyleSheet.create( {
    container: { flex: 1, backgroundColor: '#fff' },
    headerWrapper: { backgroundColor: '#9066e6', paddingVertical: hp( 1.5 ), flexDirection: 'row', alignItems: 'center' },
    headerAligner: { flexDirection: 'row', alignItems: 'center' },
    headerLeftImage: { height: hp( 4 ), width: wp( 8 ), marginRight: wp( 3 ), marginLeft: wp( 2 ) },
    headerCenterText: { fontSize: 14, color: '#fff', fontFamily: MONTSERRAT_BOLD },

    bodyWrapper: {
        marginHorizontal: wp( 5 ),
        marginTop: hp( 3 )
    },
    headingTextWrapp: {
        fontSize: 13, color: '#000', fontFamily: MONTSERRAT_MEDIUM
    },
    headingSecondTextWrapp: {
        fontSize: 13, color: '#000', fontFamily: MONTSERRAT_MEDIUM, marginTop: hp( 2 )

    },
    emailWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp( .5 )
    },
    userImage: {
        height: hp( 2 ),
        width: wp( 5 )
    },
    rightText: {
        fontSize: 12, color: '#000', fontFamily: MONTSERRAT_REGULAR, paddingLeft: wp( 2 )
    },

    bookingText: { fontFamily: MONTSERRAT_REGULAR, fontSize: 14, color: '#c2c2c2' },
    bookingImage: { height: hp( 2.5 ), width: wp( 5 ), marginRight: wp( 4 ) },
    resetButtonWrapper: { paddingVertical: hp( 1.5 ), width: wp( 30 ), backgroundColor: '#da3348', alignItems: 'center', justifyContent: 'flex-end', marginTop: hp( 3 ), alignSelf: 'flex-end', marginRight: wp( 5 ) },
    resetTextWrapper: { color: '#fff', fontFamily: MONTSERRAT_BOLD, fontSize: 13 },
    selectedHeading: { marginTop: hp( 2 ), marginHorizontal: wp( 5 ) },
    selectedText: { fontFamily: MONTSERRAT_BOLD, fontSize: 13, color: BLACK },
    statusChangeWrapper: { paddingVertical: hp( 2 ), width: wp( 35 ), marginLeft: wp( 2 ), backgroundColor: '#9066e6', alignItems: 'center', justifyContent: 'flex-end', marginTop: hp( 3 ), alignSelf: 'flex-end', marginRight: wp( 5 ) },
    statusChangeText: { color: '#fff', fontFamily: MONTSERRAT_BOLD, fontSize: 14 },
    downArrowImage: {
        height: hp( 3 ),
        width: wp( 5 )
    },
    bookingDateWrapper: {
        flexDirection: 'row',
        marginTop: hp( 2 ),
        backgroundColor: WHITE,
        // marginHorizontal: wp(5),
        paddingVertical: hp( 1 ),
        elevation: 2,
        justifyContent: 'space-between',
        paddingHorizontal: wp( 5 ),
        borderWidth: 1,
        borderColor: '#9066e6',
        borderRadius: 5,
    },
    bookingText: { fontFamily: MONTSERRAT_REGULAR, fontSize: 14, color: '#c2c2c2' },
    bookingWrapper:
    {
        backgroundColor: '#fff',
        paddingTop: hp( 1 ),
        elevation: 3,
        marginHorizontal: wp( 5 ),
        borderRadius: 4,
        marginTop: hp( 2 )
    },
    bookingTopWrapper: {
        // flexDirection: 'row', 
        // paddingHorizontal: wp(3), 
        // justifyContent: 'space-between', 
        // alignItems: 'center'
        width: wp( 50 ),
        // backgroundColor: 'red',
        paddingLeft: wp( 3 )
    },
    bookingLeftText: { fontSize: 12, fontFamily: 'Montserrat-Bold', color: '#000' },
    bookingBottomText: { fontSize: 12, fontFamily: 'Montserrat-Medium', color: '#000', marginTop: hp( 1 ) },
    leftImageWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imagebackgroundwrappper: {
        height: hp( 7 ), width: wp( 16 ),
        borderRadius: 50,
        backgroundColor: '#f7f5f1',
        marginLeft: wp( 3 ),
        marginTop: hp( 2 )
    },
    imageBox: { height: hp( 7 ), width: wp( 16 ) },
    rightBoxWrapper: { paddingLeft: wp( 2 ), width: wp( 45 ), paddingTop: hp( 1 ) },
    serviesHeading: {
        backgroundColor: '#9066e6',
        paddingVertical: hp( 1.5 ),
        marginTop: hp( 3 )
    },
    servicesText: {
        fontSize: 12,
        color: '#fff',
        fontFamily: 'Montserrat-Medium',
        paddingLeft: wp( 2 )
    },
    productHeading: {
        paddingVertical: hp( 1 ),
        borderBottomColor: '#c2c2c2',
        borderBottomWidth: 1,
        paddingBottom: hp( 3 ),
        marginTop: hp( 1 )
    },
    productText: {
        fontSize: 12,
        color: '#000',
        fontFamily: 'Montserrat-Medium',
        paddingLeft: wp( 2 )
    },
    servicesWrapper: {
        backgroundColor: '#9066e6',
        borderRadius: 10,
        width: wp( 18 ),
        alignItems: 'center',
        marginTop: hp( 1 ),
        marginLeft: wp( 4 ),
        paddingVertical: hp( .2 )


    },
    servicesTextWrapper: {
        fontSize: 11,
        color: '#fff',
        fontFamily: 'Montserrat-Medium',
    },
    AddressWrapper: {
        marginHorizontal: wp( 5 ),
        paddingTop: hp( 4 ),
        paddingLeft: wp( 2 )
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
        paddingTop: hp( 2 ),
        paddingLeft: wp( 1 )
    },
    editWrapper: {
        flexDirection: 'row',
        // borderWidth: 1,
        // borderColor: '#9066e6',
        width: wp( 20 ),
        borderRadius: 6,
        marginTop: hp( 2 ),
        alignItems: 'center',
        paddingVertical: hp( .3 ),
        marginLeft: wp( 3 ),
        justifyContent: 'center',
        backgroundColor: 'red'
    },
    editDeleteWRapper: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: hp( 5 )
    },
    editTextWrapp: {
        fontSize: 12,
        color: '#9066e6',
        fontFamily: 'Montserrat-Medium',
        paddingLeft: wp( 2 )
    },
    deleteWrapper: {
        borderWidth: 1,
        borderColor: 'red',
        width: wp( 34 ),
        borderRadius: 6,
        marginTop: hp( 2 ),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: hp( .3 ),


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
        paddingLeft: wp( 2 )
    }

} );
