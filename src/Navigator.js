import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';


import SplashScreen from './scenes/splash';
import BottomTabContent from './navigation/BottomTabContent';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Registation from './scenes/auth/Registration';
import Home from './scenes/afterAuth/Home';
import DrawerContent from './navigation/DrawerContent';
import Setting from './scenes/afterAuth/Setting';
import 'react-native-gesture-handler';
import Booking from './scenes/afterAuth/Booking';
import BookingServices from './scenes/afterAuth/BookingServices';
import CustomerServices from './scenes/afterAuth/Customer';
import Login from './scenes/auth/Login';
import ForgetScreen from './scenes/auth/ForgetScreen';
import OtpScreen from './scenes/auth/OtpScreen';

const Stack = createStackNavigator();

function StackNavigator({ navigation, route }) {
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
        name="OtpScreen"
        component={OtpScreen}
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

    </Stack.Navigator>
  );
}



const Drawer = createDrawerNavigator();

function MyDrawer({ navigation, route }) {

  return (
    <Drawer.Navigator defaultStatus="closed"
      // screenOptions={{
      //   drawerStyle: {
      //     backgroundColor: '#fff',
      //     width: wp(100),
      //   },
      //   swipeEdgeWidth:0,
      //   drawerPosition: "right",
      //   headerShown: false,
      //   drawerActiveBackgroundColor: "#FAFAFC",
      //   unmountOnBlur: true

      // }}
      screenOptions={{
        drawerPosition: 'right',
        headerShown: false,
        drawerActiveBackgroundColor: "#FAFAFC",
        drawerActiveTintColor: '#fff',
        drawerStyle: {
          backgroundColor: '#fff',
          width: wp(100),
        },
      }}

      initialRouteName="Home"
      drawerContent={props => <DrawerContent {...props} />}
    >

      <Drawer.Screen name="Home" component={Home} options={{
        headerShown: false,
        animationEnabled: false,
        swipeEnabled: true,
      }} />
      {/* <Drawer.Screen name="Register" component={Register} /> */}
    </Drawer.Navigator>
  );

}



export default function AuthToHome() {
  return (
    <NavigationContainer independent={true}>
      <StackNavigator />
    </NavigationContainer>
  );
}
