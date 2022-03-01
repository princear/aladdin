import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { BLACK, WHITE,  GREY_DD,} from '../../scenes/styles/color';
import { PINK_ARROW, SPRING_SEASON_BACKGROUND } from '../../assets/icon';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FREDOKA_ONE_REGULAR } from '../../scenes/styles/typography';


export default function MonthHeader(props) {
    const {screenName,  onPress } = props;
    return (
        <View style={styles.container}>
                <TouchableOpacity 
                onPress={() =>
                    onPress
                      ? props.props.navigation.navigate(screenName)
                      : console.log('pressed')
                  }>
                    <Image source={PINK_ARROW} resizeMode='contain' style={{height:hp(7), width:wp(14)}} />
                </TouchableOpacity>
                <ImageBackground source={SPRING_SEASON_BACKGROUND} resizeMode='cover'  style={styles.uriBack}>
                    <View style={{ paddingLeft: wp(8), marginTop: hp(2.5), elevation: 5, }}>
                        <Text style={{ fontFamily: FREDOKA_ONE_REGULAR, fontSize: 12, color: BLACK }}>SPRING SEASON</Text>
                        <Text style={{ fontFamily: FREDOKA_ONE_REGULAR, fontSize: 10, color: GREY_DD }}>April 20 (9.37am) > June 20 (10:00pm)</Text>
                    </View>
                </ImageBackground>
             
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: WHITE },
    containerText: { fontSize: 27, color: '#000' },
    uriBack:{ height:hp(9), width:wp(100), }
});
