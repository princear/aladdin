import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, SafeAreaView, TouchableOpacity } from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';



export function DrawerContent({ props, navigation }) {

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <DrawerContentScrollView>
                <View style={styles.wrapper}>
                    <View style={styles.iconWrapper} >
                        <Image source={require('../assets/drawerIcon.png')} resizeMode='contain' style={styles.iconHeader} />
                    </View>

                    <Text style={styles.dateHeading}>Monday 2nd March 2022</Text>
                    <Text style={styles.dateSubHeading}>Download today's paper</Text>
                    <View style={styles.degreWrapper}>
                        <Text style={styles.degreeText}>18* C</Text>
                        <Image source={require('../assets/cloud.png')} resizeMode='contain' style={styles.degreeImage} />
                    </View>
                    <TouchableOpacity style={styles.accountWrapper}>
                        <Text style={styles.accountText}>My Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('HaveYouSay')} style={styles.headingWrapper}>
                        <Text style={styles.heading}>Have You Say</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headingSecondWrapper}>
                        <Text style={styles.heading}>Notifications</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('PrivacyTabBar')} style={styles.headingSecondWrapper}>
                        <Text style={styles.heading}>Privacy and Terms</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Contact')} style={styles.headingSecondWrapper}>
                        <Text style={styles.heading}>Contact</Text>
                    </TouchableOpacity>
                </View>
            </DrawerContentScrollView>
            <View style={styles.secondFlexWrapper}>
                <Text style={styles.versionText}>Version 4.28.0</Text>
            </View>


        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: wp(5),
        flex: 0.9
    },
    iconWrapper: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginTop: hp(2)
    },
    iconHeader: {
        height: hp(15),
        width: wp(30),
    },
    dateHeading: {
        fontSize: 22,
        fontFamily: 'CormorantGaramond-Bold',
        color: '#000',
        textAlign: 'right',
        paddingTop: hp(1)
    },
    dateSubHeading: {
        fontSize: 15,
        fontFamily: 'OpenSans-Regular',
        color: '#000',
        textAlign: 'right',
        paddingTop: hp(1)
    },
    degreWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: hp(1),
    },
    degreeText: {
        fontSize: 25,
        fontFamily: 'CormorantGaramond-Bold',
        color: '#000',
        textAlign: 'right',
        paddingRight: wp(4)
    },
    degreeImage: {
        height: hp(5),
        width: wp(10)
    },
    accountWrapper: {
        backgroundColor: '#000',
        paddingVertical: hp(2),
        marginTop: hp(2),
        justifyContent: 'center', alignItems: 'center'
    },
    accountText: {
        fontSize: 15,
        fontFamily: 'OpenSans-Medium',
        color: '#fff',
    },
    headingWrapper: {
        marginTop: hp(5),
        borderBottomWidth: 1,
        borderColor: '#d2d2d2',
        paddingBottom: hp(2)
    },
    heading: {
        fontSize: 18,
        fontFamily: 'OpenSans-Regular',
        color: '#000',
        textAlign: 'right',
    },
    headingSecondWrapper: {
        marginTop: hp(1),
        borderBottomWidth: 1,
        borderColor: '#d2d2d2',
        paddingBottom: hp(2)
    },
    secondFlexWrapper: {
        flex: 0.1,
        paddingHorizontal: wp(5)
    },
    versionText: {
        fontSize: 17,
        fontFamily: 'OpenSans-Regular',
        color: '#000',
        textAlign: 'right',
    },

});
