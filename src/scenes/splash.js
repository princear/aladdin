import React, { useEffect } from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SPLASH } from '../assets/icon';
import { WHITE } from './styles/color';


export default function SplashScreen(props) {


      const redirectTo = (screen) => {
        props.navigation.push(screen);
      };
    
      const loadData = () => {
        setTimeout(async () => {
          try {
            // const value = await AsyncStorage.getItem('token');
            const data = JSON.parse(value);
            if (data != null) {
              redirectTo('Home');
            } else {
              redirectTo('Home');
            }
          } catch (e) {
            props.navigation.navigate('Login');
          }
        }, 1500);
      };
    
      useEffect(() => {
        loadData();
      },[])



  return (
    <View style={styles.container}>
        <Image resizeMode='contain' source={SPLASH} style={{height:'40%', width:'40%'}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#9066e6' },
  containerText: { fontSize: 18 },
});
