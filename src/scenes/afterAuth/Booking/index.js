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
import { onALlBooking } from '../../../redux/Action/BookingAction';

export default function Booking({ props, navigation }) {
    const [date, setDate] = useState(new Date(1598051730000));
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };
    const showMode = (currentMode) => {
        setShow(true);
    };
    const showDatepicker = () => {
        showMode('date');
    };

    const [state, setState] = useState('Filter Status: View All')
    const state_list = [
        { label: 'Filter Status: View All', value: 'Filter Status: View All' },
        { label: 'pending', value: 'pending' },
        { label: 'completed', value: 'completed' },
        { label: 'in progress', value: 'in progress' },
        { label: 'canceled', value: 'canceled' },
        { label: 'approved', value: 'approved' },

    ];


    const dispatch = useDispatch();
    const bookingList = useSelector((state) => state.COUNTBOOKINGREDUCER.bookingListData);

    useEffect(() => {
        dispatch(onALlBooking())
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.headerWrapper}>
                <View style={styles.headerAligner}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={ARROW_WHITE} style={styles.headerLeftImage} />
                    </TouchableOpacity>
                    <Text style={styles.headerCenterText}>Booking</Text>
                </View>
            </View>


            <TouchableOpacity style={{ backgroundColor: '#fff', marginTop: hp(4), elevation: 3, paddingVertical: hp(1.7), marginHorizontal: wp(5) }}>
                <RNPickerSelect
                    onValueChange={(value) => setState(value)}
                    items={state_list}
                    value={state}
                    placeholder={{}}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: wp(4) }}>
                        {state_list.map(
                            (item) =>
                                item.value === state && (
                                    <Text
                                        key={item.value}
                                        style={{ fontSize: 14, color: '#000', fontFamily: 'Montserrat-Medium' }}>
                                        {item.label}
                                    </Text>
                                )
                        )}
                        <Image source={require('../../../assets/images/Downarrow.png')} resizeMode='contain' style={{ height: hp(3), width: wp(8) }} />

                    </View>
                </RNPickerSelect>

            </TouchableOpacity>

            <TouchableOpacity onPress={showDatepicker} style={styles.bookingDateWrapper}>

                <View>
                    <Text style={styles.bookingText}>{moment(date).format("DD-MM-YYYY ")}</Text>
                </View>
                <Image source={require('../../../assets/images/Downarrow.png')} resizeMode='contain' style={styles.downArrowImage} />
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
            {
                state === 'pending' ? <FlatList
                    key={'_'}
                    keyExtractor={item => "_" + item.id}
                    data={bookingList.data}
                    horizontal={false}
                    renderItem={({ item, index }) => (
                        <>
                            {item.status === state ? <TouchableOpacity
                                onPress={() => navigation.navigate('BookingListDetail', {
                                    bookingId: item.id
                                })}
                                style={styles.bookingWrapper}>

                                <View style={styles.leftImageWrapper}>
                                    <View style={styles.imagebackgroundwrappper}>
                                        <Image source={require('../../../assets/images/userProfile.png')} style={styles.imageBox} resizeMode='contain' />
                                    </View>
                                    <View style={styles.bookingTopWrapper}>
                                        <Text style={styles.bookingLeftText}>Booking #{item.id}</Text>
                                        <Text style={styles.bookingBottomText}>{item.service_name}</Text>
                                    </View>
                                    <View style={{ justifyContent: 'flex-start', marginTop: -hp(4) }}>
                                        <Text style={styles.bookingLeftText}>{item.date
                                        }</Text>
                                    </View>
                                </View>
                                <View style={[styles.approvedWrapper, { backgroundColor: '#f2ac00' }]}>
                                    <Text style={styles.approvedText}>
                                        {item.status === state ? item.status : null}
                                    </Text>
                                </View>
                            </TouchableOpacity> : null}
                        </>
                    )}
                /> : state === 'canceled' ?
                        <FlatList
                            key={'_'}
                            keyExtractor={item => "_" + item.id}
                            data={bookingList.data}
                            horizontal={false}
                            renderItem={({ item, index }) => (
                                <>
                                    {state === item.status ? <TouchableOpacity
                                        onPress={() => navigation.navigate('BookingListDetail', {
                                            bookingId: item.id
                                        })}
                                        style={styles.bookingWrapper}>

                                        <View style={styles.leftImageWrapper}>
                                            <View style={styles.imagebackgroundwrappper}>
                                                <Image source={require('../../../assets/images/userProfile.png')} style={styles.imageBox} resizeMode='contain' />
                                            </View>
                                            <View style={styles.bookingTopWrapper}>
                                                <Text style={styles.bookingLeftText}>Booking #{item.id}</Text>
                                                <Text style={styles.bookingBottomText}>{item.service_name}</Text>
                                            </View>
                                            <View style={{ justifyContent: 'flex-start', marginTop: -hp(4) }}>
                                                <Text style={styles.bookingLeftText}>{item.date
                                                }</Text>
                                            </View>
                                        </View>

                                        <View style={[styles.approvedWrapper, { backgroundColor: '#da3348' }]}>
                                            <Text style={styles.approvedText}>
                                                {item.status === state ? item.status : null}
                                            </Text>
                                        </View>
                                    </TouchableOpacity> : null}
                                </>
                            )}
                        /> : state === 'completed' ?
                            <FlatList
                                key={'_'}
                                keyExtractor={item => "_" + item.id}
                                data={bookingList.data}
                                horizontal={false}
                                renderItem={({ item, index }) => (
                                    <>
                                        {item.status === state ? <TouchableOpacity
                                            onPress={() => navigation.navigate('BookingListDetail', {
                                                bookingId: item.id
                                            })}
                                            style={styles.bookingWrapper}>

                                            <View style={styles.leftImageWrapper}>
                                                <View style={styles.imagebackgroundwrappper}>
                                                    <Image source={require('../../../assets/images/userProfile.png')} style={styles.imageBox} resizeMode='contain' />
                                                </View>
                                                <View style={styles.bookingTopWrapper}>
                                                    <Text style={styles.bookingLeftText}>Booking #{item.id}</Text>
                                                    <Text style={styles.bookingBottomText}>{item.service_name}</Text>
                                                </View>
                                                <View style={{ justifyContent: 'flex-start', marginTop: -hp(4) }}>
                                                    <Text style={styles.bookingLeftText}>{item.date
                                                    }</Text>
                                                </View>
                                            </View>

                                            <View style={[styles.approvedWrapper, { backgroundColor: '#2ea749' }]}>
                                                <Text style={styles.approvedText}>
                                                    {/* {item.status} */}
                                                    {item.status === state ? item.status : null}
                                                </Text>
                                            </View>
                                        </TouchableOpacity> : null}
                                    </>
                                )}
                            /> : state === 'in progress' ?
                                <FlatList
                                    key={'_'}
                                    keyExtractor={item => "_" + item.id}
                                    data={bookingList.data}
                                    horizontal={false}
                                    renderItem={({ item, index }) => (
                                        <>
                                            {item.status === state ? <TouchableOpacity
                                                onPress={() => navigation.navigate('BookingListDetail', {
                                                    bookingId: item.id
                                                })}
                                                style={styles.bookingWrapper}>

                                                <View style={styles.leftImageWrapper}>
                                                    <View style={styles.imagebackgroundwrappper}>
                                                        <Image source={require('../../../assets/images/userProfile.png')} style={styles.imageBox} resizeMode='contain' />
                                                    </View>
                                                    <View style={styles.bookingTopWrapper}>
                                                        <Text style={styles.bookingLeftText}>Booking #{item.id}</Text>
                                                        <Text style={styles.bookingBottomText}>{item.service_name}</Text>
                                                    </View>
                                                    <View style={{ justifyContent: 'flex-start', marginTop: -hp(4) }}>
                                                        <Text style={styles.bookingLeftText}>{item.date
                                                        }</Text>
                                                    </View>
                                                </View>

                                                <View style={[styles.approvedWrapper, { backgroundColor: '#157dfc' }]}>
                                                    <Text style={styles.approvedText}>
                                                        {item.status === state ? item.status : null}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity> : null}
                                        </>
                                    )}
                                /> : state === 'approved' ?
                                    <FlatList
                                        key={'_'}
                                        keyExtractor={item => "_" + item.id}
                                        data={bookingList.data}
                                        horizontal={false}
                                        renderItem={({ item, index }) => (
                                            <>
                                                {item.status === state ? <TouchableOpacity
                                                    onPress={() => navigation.navigate('BookingListDetail', {
                                                        bookingId: item.id
                                                    })}
                                                    style={styles.bookingWrapper}>

                                                    <View style={styles.leftImageWrapper}>
                                                        <View style={styles.imagebackgroundwrappper}>
                                                            <Image source={require('../../../assets/images/userProfile.png')} style={styles.imageBox} resizeMode='contain' />
                                                        </View>
                                                        <View style={styles.bookingTopWrapper}>
                                                            <Text style={styles.bookingLeftText}>Booking #{item.id}</Text>
                                                            <Text style={styles.bookingBottomText}>{item.service_name}</Text>
                                                        </View>
                                                        <View style={{ justifyContent: 'flex-start', marginTop: -hp(4) }}>
                                                            <Text style={styles.bookingLeftText}>{item.date
                                                            }</Text>
                                                        </View>
                                                    </View>

                                                    <View style={[styles.approvedWrapper, { backgroundColor: '#157dfc' }]}>
                                                        <Text style={styles.approvedText}>
                                                            {item.status === state ? item.status : null}
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity> : null}
                                            </>
                                        )}
                                    /> : null

            }





            {/* <TouchableOpacity style={styles.resetButtonWrapper}>
                <Text style={styles.resetTextWrapper}>Reset</Text>
            </TouchableOpacity> */}
            {/* <View style={styles.selectedHeading}>
                <Text style={styles.selectedText}>0 Booking Selected</Text>
            </View> */}
            {/* <View style={{ flexDirection: 'row', marginHorizontal: wp(5) }}>
                <View style={{ backgroundColor: WHITE, width: wp(54), marginTop: hp(2) }}>
                    <RNPickerSelect
                        placeholder={{ label: "Select Customer: View All", value: '' }}
                        onValueChange={(value) => { setServices(value); }}
                        items={[
                            { label: 'Pending', value: 'Pending' },
                            { label: 'Approved', value: 'Approved' },
                            { label: 'Cancel', value: 'Cancel' },
                        ]}
                        style={styles.pickerStyle}
                    />
                </View>
                <TouchableOpacity style={styles.statusChangeWrapper}>
                    <Text style={styles.statusChangeText}>Change Status</Text>
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: hp(2), marginHorizontal: wp(5) }}>
                <Text style={{ fontFamily: MONTSERRAT_BOLD, fontSize: 13, color: BLACK }}>Click booking to select it</Text>

            </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#c2c2c2' },
    headerWrapper: { backgroundColor: '#9066e6', paddingVertical: hp(1.5), flexDirection: 'row', alignItems: 'center' },
    headerAligner: { flexDirection: 'row', alignItems: 'center' },
    headerLeftImage: { height: hp(4), width: wp(8), marginRight: wp(3), marginLeft: wp(2) },
    headerCenterText: { fontSize: 14, color: '#fff', fontFamily: MONTSERRAT_BOLD },
    pickerWrapper: {
        backgroundColor: WHITE,
        marginHorizontal: wp(5),
        marginTop: hp(2),
        paddingVertical: hp(1.7),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp(4),
    },
    pickWrapp: {
        // backgroundColor: 'red    ',
        flexDirection: 'row',
        width: wp(80),
        justifyContent: 'space-between'
    },

    downArrowImage: {
        height: hp(3),
        width: wp(7)
    },
    pickerStyle: { backgroundColor: 'red', width: wp(90), alignItems: 'center', marginTop: hp(2) },
    bookingDateWrapper: {
        flexDirection: 'row',
        marginTop: hp(2),
        backgroundColor: WHITE,
        marginHorizontal: wp(5),
        paddingVertical: hp(1.7),
        elevation: 2,
        justifyContent: 'space-between',
        paddingHorizontal: wp(5),
    },
    bookingText: { fontFamily: MONTSERRAT_REGULAR, fontSize: 14, color: '#c2c2c2' },
    bookingImage: { height: hp(2.5), width: wp(5), marginRight: wp(4) },
    resetButtonWrapper: { paddingVertical: hp(1.5), width: wp(30), backgroundColor: '#da3348', alignItems: 'center', justifyContent: 'flex-end', marginTop: hp(3), alignSelf: 'flex-end', marginRight: wp(5) },
    resetTextWrapper: { color: '#fff', fontFamily: MONTSERRAT_BOLD, fontSize: 13 },
    selectedHeading: { marginTop: hp(2), marginHorizontal: wp(5) },
    selectedText: { fontFamily: MONTSERRAT_BOLD, fontSize: 13, color: BLACK },
    statusChangeWrapper: { paddingVertical: hp(2), width: wp(35), marginLeft: wp(2), backgroundColor: '#9066e6', alignItems: 'center', justifyContent: 'flex-end', marginTop: hp(3), alignSelf: 'flex-end', marginRight: wp(5) },
    statusChangeText: { color: '#fff', fontFamily: MONTSERRAT_BOLD, fontSize: 14 },
    bookingWrapper:
    {
        backgroundColor: '#fff',
        paddingTop: hp(1),
        elevation: 3,
        marginHorizontal: wp(5),
        borderRadius: 4,
        marginTop: hp(2)
    },
    bookingTopWrapper: {
        // flexDirection: 'row', 
        // paddingHorizontal: wp(3), 
        // justifyContent: 'space-between', 
        // alignItems: 'center'
        width: wp(50),
        // backgroundColor: 'red',
        paddingLeft: wp(3)
    },
    bookingLeftText: { fontSize: 12, fontFamily: 'Montserrat-Bold', color: '#000' },
    bookingBottomText: { fontSize: 12, fontFamily: 'Montserrat-Medium', color: '#000', marginTop: hp(1) },
    leftImageWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imagebackgroundwrappper: {
        height: hp(7), width: wp(16),
        borderRadius: 50,
        backgroundColor: '#f7f5f1',
        marginLeft: wp(3),
        marginTop: hp(2)
    },
    imageBox: { height: hp(7), width: wp(16) },
    rightBoxWrapper: { paddingLeft: wp(2), width: wp(45), paddingTop: hp(1) },
    approvedWrapper: { paddingVertical: hp(2), backgroundColor: '#2ea749', marginTop: hp(1), justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 4, borderBottomRightRadius: 4 },
    approvedText: { color: '#fff', fontFamily: 'Montserrat-Medium', fontSize: 14 }

});
