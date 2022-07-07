import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SPLASH, SPLASH_BACKGROUND } from '../assets/icon';
import { WHITE } from './styles/color';


export default function SplashScreen(props) {


  const redirectTo = (screen) => {
    props.navigation.push(screen);
  };



  const loadData = () => {
    setTimeout(async () => {
      try {
        const login = await AsyncStorage.getItem('login');

        if (login != null) {
          redirectTo('Home');
        } else {
          redirectTo('Login');
        }
      } catch (e) {
        props.navigation.navigate('Login');
      }
    }, 1500);
  };

  useEffect(() => {
    loadData();
  }, [])



  return (
    <ImageBackground source={SPLASH_BACKGROUND} style={styles.container}>

      <Image resizeMode='contain' source={SPLASH} style={{ height: '40%', width: '40%' }} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', },
  containerText: { fontSize: 18 },
});
