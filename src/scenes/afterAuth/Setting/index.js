import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SPLASH } from '../assets/icon';
import { WHITE } from './styles/color';


export default function Setting(props) {

    return (
        <View style={styles.container}>
            <Text> abbb
            </Text> 
             </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#9066e6' },
    containerText: { fontSize: 18 },
});
