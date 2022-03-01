import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { MONTSERRAT_BOLD, MONTSERRAT_REGULAR } from '../../styles/typography';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ARROW_WHITE, DOWN_ARROW } from '../../../assets/icon';
import { BLACK, WHITE } from '../../styles/color';
import RNPickerSelect from 'react-native-picker-select';
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Booking(props) {
    const [services, setServices] = useState('');
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

    return (
        <View style={styles.container}>
            <View style={styles.headerWrapper}>
                <View style={styles.headerAligner}>
                    <TouchableOpacity>
                        <Image source={ARROW_WHITE} style={styles.headerLeftImage} />
                    </TouchableOpacity>
                    <Text style={styles.headerCenterText}>Completed</Text>
                </View>
            </View>

            <View style={styles.pickerWrapper}>
                <RNPickerSelect
                    placeholder={{ label: "Select", value: '' }}
                    onValueChange={(value) => { setServices(value); }}
                    // onValueChange={(value) => {setSignIn({...signin, services: value}); seterror3('')}}
                    // value={signin.services}
                    items={[
                        { label: 'Pending', value: 'Pending' },
                        { label: 'Approved', value: 'Approved' },
                        { label: 'Cancel', value: 'Cancel' },
                    ]}
                    style={styles.pickerStyle}
                />
            </View>
            <View style={styles.pickerWrapper}>
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
            <View style={styles.pickerWrapper}>
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
            <View style={styles.pickerWrapper}>
                <RNPickerSelect
                    placeholder={{ label: "Sort By", value: '' }}
                    onValueChange={(value) => { setServices(value); }}
                    items={[
                        { label: 'Pending', value: 'Pending' },
                        { label: 'Approved', value: 'Approved' },
                        { label: 'Cancel', value: 'Cancel' },
                    ]}
                    style={styles.pickerStyle}
                />
            </View>
            <TouchableOpacity onPress={showDatepicker} style={styles.bookingDateWrapper}>

                <View>
                    <Text style={styles.bookingText}>{moment(date).format("DD-MM-YYYY ")}</Text>
                </View>
                <Image source={DOWN_ARROW} resizeMode='contain' style={styles.bookingImage} />
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



            <TouchableOpacity style={styles.resetButtonWrapper}>
                <Text style={styles.resetTextWrapper}>Reset</Text>
            </TouchableOpacity>
            <View style={styles.selectedHeading}>
                <Text style={styles.selectedText}>0 Booking Selected</Text>
            </View>
            <View style={{ flexDirection: 'row', marginHorizontal: wp(5) }}>
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

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#c2c2c2' },
    headerWrapper: { backgroundColor: '#9066e6', paddingVertical: hp(1.5), flexDirection: 'row', alignItems: 'center' },
    headerAligner: { flexDirection: 'row', alignItems: 'center' },
    headerLeftImage: { height: hp(4), width: wp(8), marginRight: wp(3), marginLeft: wp(2) },
    headerCenterText: { fontSize: 14, color: '#fff', fontFamily: MONTSERRAT_BOLD },
    pickerWrapper: { backgroundColor: WHITE, marginHorizontal: wp(5), marginTop: hp(2) },
    bookingDateWrapper: { flexDirection: 'row', marginTop: hp(2), backgroundColor: WHITE, marginHorizontal: wp(5), paddingVertical: hp(2.4), elevation: 2, justifyContent: 'space-between' },
    bookingText: { fontFamily: MONTSERRAT_REGULAR, fontSize: 14, paddingLeft: wp(3), color: '#c2c2c2' },
    bookingImage: { height: hp(2.5), width: wp(5), marginRight: wp(4) },
    resetButtonWrapper: { paddingVertical: hp(1.5), width: wp(30), backgroundColor: '#da3348', alignItems: 'center', justifyContent: 'flex-end', marginTop: hp(3), alignSelf: 'flex-end', marginRight: wp(5) },
    resetTextWrapper: { color: '#fff', fontFamily: MONTSERRAT_BOLD, fontSize: 13 },
    selectedHeading: { marginTop: hp(2), marginHorizontal: wp(5) },
    selectedText: { fontFamily: MONTSERRAT_BOLD, fontSize: 13, color: BLACK },
    statusChangeWrapper:{ paddingVertical: hp(2), width: wp(35), marginLeft: wp(2), backgroundColor: '#9066e6', alignItems: 'center', justifyContent: 'flex-end', marginTop: hp(3), alignSelf: 'flex-end', marginRight: wp(5) },
    statusChangeText:{ color: '#fff', fontFamily: MONTSERRAT_BOLD,fontSize:14 },

});
