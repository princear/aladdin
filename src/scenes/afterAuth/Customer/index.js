import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { MONTSERRAT_BOLD, MONTSERRAT_REGULAR } from '../../styles/typography';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ARROW_WHITE, SERACH_GREY, USER_PROFILE, EMAIL, CONTACT } from '../../../assets/icon';
import { BLACK, WHITE } from '../../styles/color';

export default function CustomerServices(props) {

    const [customerServices, setCustomerServices] = useState([
        {
            id: 1,
            email: 'nitika@gmail.com',
            mobileNo: "9874563214",
            date: "2022-02-11",
            booking: '0',
            image: require('../../../assets/images/serices.jpg')

        },
        {
            id: 2,
            email: 'nitika@gmail.com',
            mobileNo: "9874563214",
            date: "2022-02-11",
            booking: '0',
            image: require('../../../assets/images/serices.jpg')

        }
    ]);


    return (
        <View style={styles.container}>
            <View style={styles.headerWrapper}>
                <View style={styles.headerAligner}>
                    <TouchableOpacity>
                        <Image source={ARROW_WHITE} style={styles.headerLeftImage} />
                    </TouchableOpacity>
                    <Text style={styles.headerCenterText}>Customers</Text>
                </View>
            </View>

            <View style={styles.searchWrapper}>
                <TextInput
                    style={styles.searchInput}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder={'Search Customer by name, email '}
                    keyboardType="default"
                    returnKeyType="done"
                    autoCapitalize="none"
                //   value={filterData}
                //   onChangeText={(text) => SearchFilterFunction(text)}
                />
                <TouchableOpacity>
                    <Image source={SERACH_GREY} resizeMode='contain' style={styles.searchRightImage} />
                </TouchableOpacity>
            </View>


            <FlatList
                data={customerServices}
                keyExtractor={(item, index) => index}
                // horizontal={false}
                numColumns={1}
                renderItem={({ item, index }) => (
                    <View style={styles.customerWrapper}>
                        <View style={styles.customerBlueWrapper}>
                            <View style={styles.customerLeftWrapper}>
                                <Image source={USER_PROFILE} resizeMode='contain' style={styles.customerLeftImage} />
                            </View>
                            <View style={styles.customerRightBlueWrapper}>
                                <View style={styles.customerAligner}>
                                    <Image source={EMAIL} resizeMode='contain' style={styles.customerRightEmail} />
                                    <Text style={styles.customerRightEmailText}>{item.email}</Text>
                                </View>
                                <View style={styles.customerAligner}>
                                    <Image source={CONTACT} resizeMode='contain' style={styles.customerRightEmail} />
                                    <Text style={styles.customerRightEmailText}>{item.mobileNo}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.customerWhiteWrapper}>
                            <View style={styles.customerLeftWidthWrapper}>
                                <Text style={styles.customerbookingText}>{item.booking}</Text>
                                <Text style={styles.customerBookingHeading}>Booking</Text>
                            </View>
                            <View style={styles.customerRightWidthWrapper}>
                                <Text style={styles.customerbookingText}>{item.date}</Text>
                                <Text style={styles.customerBookingHeading}>Customer Service</Text>
                            </View>
                        </View>
                    </View>
                )}
            />



        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#c2c2c2' },
    headerWrapper: { backgroundColor: '#9066e6', paddingVertical: hp(1.5), flexDirection: 'row', alignItems: 'center' },
    headerAligner: { flexDirection: 'row', alignItems: 'center' },
    headerLeftImage: { height: hp(4), width: wp(8), marginRight: wp(3), marginLeft: wp(2) },
    headerCenterText: { fontSize: 14, color: '#fff', fontFamily: MONTSERRAT_BOLD },
    searchWrapper: { backgroundColor: WHITE, marginHorizontal: wp(5), alignItems: 'center', marginTop: hp(2), justifyContent: 'center', flexDirection: 'row', },
    searchInput: { width: wp(75), borderRightWidth: 1, borderColor: '#c2c2c2' },
    searchRightImage: { height: hp(5), width: wp(12), marginLeft: wp(2) },
    customerWrapper: { paddingVertical: hp(2), marginHorizontal: wp(5), marginTop: hp(1), },
    customerBlueWrapper: { flexDirection: 'row', borderTopLeftRadius: 4, borderTopRightRadius: 4, backgroundColor: '#23a2b7', alignSelf: 'center', width: wp(90), paddingVertical: hp(2) },
    customerLeftWrapper: { borderRadius: 100, borderWidth: 2, height: hp(15), width: wp(30), borderColor: WHITE, marginLeft: wp(5) },
    customerLeftImage: { height: hp(15.5), width: wp(30) },
    customerRightBlueWrapper: { marginLeft: wp(5), marginTop: hp(1) },
    customerAligner: { flexDirection: 'row', alignItems: 'center' },
    customerRightEmail: { height: hp(5), width: wp(10) },
    customerRightEmailText: { fontFamily: MONTSERRAT_REGULAR, fontSize: 12, color: '#fff' },
    customerWhiteWrapper:{ backgroundColor: WHITE, flexDirection: 'row', borderBottomLeftRadius: 4, borderBottomRightRadius: 4, },
    customerLeftWidthWrapper:{ width: wp(45), borderRightWidth: 1, alignItems: 'center', height: hp(9), justifyContent: 'center' },
    customerbookingText:{ fontFamily: MONTSERRAT_BOLD, fontSize: 13, color: BLACK },
    customerBookingHeading:{ fontFamily: MONTSERRAT_REGULAR, fontSize: 13, color: BLACK },
    customerRightWidthWrapper:{ width: wp(45), alignItems: 'center', height: hp(9), justifyContent: 'center' }
});
