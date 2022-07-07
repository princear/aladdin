import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SplashScreen from './scenes/splash';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Home from './scenes/afterAuth/Home';
import DrawerContent from './navigation/DrawerContent';
import 'react-native-gesture-handler';
import Booking from './scenes/afterAuth/Booking';
import BookingServices from './scenes/afterAuth/BookingServices';
import CustomerServices from './scenes/afterAuth/Customer';
import Login from './scenes/auth/Login';
import ForgetScreen from './scenes/auth/ForgetScreen';
import OtpScreen from './scenes/auth/OtpScreen';
import BookingListDetail from './scenes/afterAuth/BookingListDetail.js';
import EditPage from './component/editpage';
import ProfileScreen from './scenes/afterAuth/Profile';
import { I18nextProvider } from "react-i18next";

import i18n from '../src/i18n/index';
import LanguageScreen from '../src/scenes/afterAuth/LanguageScreen';
const Stack = createStackNavigator();

function StackNavigator ( { navigation, route } ) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <Stack.Screen
        name="ForgetScreen"
        component={ForgetScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <Stack.Screen
        name="Home"
        component={MyDrawer}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <Stack.Screen
        name="Booking"
        component={Booking}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <Stack.Screen
        name="BookingServices"
        component={BookingServices}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <Stack.Screen
        name="CustomerServices"
        component={CustomerServices}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <Stack.Screen
        name="BookingListDetail"
        component={BookingListDetail}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <Stack.Screen
        name="EditPage"
        component={EditPage}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false, animationEnabled: false }}
      />
     <Stack.Screen name="LanguageScreen" component={LanguageScreen}
     options={{ headerShown: false, animationEnabled: false }} />


    </Stack.Navigator>
  );
}



const Drawer = createDrawerNavigator();

function MyDrawer ( { navigation, route } ) {

  return (
    <Drawer.Navigator defaultStatus="closed"

      screenOptions={{
        drawerPosition: 'left',
        headerShown: false,
        drawerActiveBackgroundColor: "#FAFAFC",
        drawerActiveTintColor: '#000',
        drawerStyle: {
          backgroundColor: '#fff',
          width: wp( 70 ),
        },
      }}
      initialRouteName="Home"
      drawerContent={props => <DrawerContent {...props} />}
    >

      <Drawer.Screen name="Home" component={Home} options={{
        headerShown: false,
        animationEnabled: false,
        swipeEnabled: false,
      }} />
      {/* <Drawer.Screen name="Register" component={Register} /> */}
    </Drawer.Navigator>
  );

}



export default function AuthToHome () {
  return (
    <I18nextProvider i18n={i18n}>

    <NavigationContainer independent={true}>
      <StackNavigator />
    </NavigationContainer>
    </I18nextProvider>
  );
}
