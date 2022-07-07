import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { BLACK, WHITE } from '../scenes/styles/color';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FREDOKA_ONE_REGULAR } from '../scenes/styles/typography';

export default function BottomTabContent(props) {
    const { icon, onPress,label } = props
    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
            <Image source={icon} resizeMode='contain' style={{width:wp(12)}}/>
            <Text style={{fontFamily: FREDOKA_ONE_REGULAR, fontSize: 12, color: BLACK,marginLeft:-wp(1.5) }}> {label} </Text>

            </View>
           

        </View>
    )
}

const styles = StyleSheet.create({
    containerText: { fontSize: 27, color: '#000' },
    uriBack:{ height:hp(9), width:wp(100), }
});
