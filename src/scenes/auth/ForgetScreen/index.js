import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, TouchableOpacity, TextInput, BackHandler, Alert, ImageBackground, Platform } from 'react-native';
import { BLACK, EEFD, GREY_6C, LIGHT_BLUE, WHITE } from '../../styles/color';
import { FORGET_IMAGE } from '../../../assets/icon';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FREDOKA_ONE_REGULAR, MONTSERRAT_BLACK, MONTSERRAT_BOLD, MONTSERRAT_MEDIUM, MONTSERRAT_REGULAR } from '../../styles/typography';
import { SafeAreaView } from 'react-native-safe-area-context';
import { handleValidations } from '../../../validations/validate';
import { useDispatch, useSelector } from 'react-redux';
import { ForgetPassword, onLogin } from '../../../redux/Action/LoginAction';
import Input from '../../../component/common/input';
import { ScrollView } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';


export default function ForgetScreen({ props, navigation }) {

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');

  const { loading } = useSelector(state => state.UserReducers);

  const submitButton = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (email == '') {
      Alert.alert('Please Enter the email');
    }
    // else if (email.length > 0) {
    //   Alert.alert('Please Enter the valid email');
    // }

    else {
      dispatch(ForgetPassword({ email: email, }, navigation))

    }
  }

  const [t] = useTranslation();




  return (
    <ImageBackground style={styles.containerBackgroundWrapper} resizeMode='cover' source={require('../../../assets/images/loginbackground.png')} >
      <ScrollView>

        {(loading) &&
          <View style={{ flex: 1, justifyContent: 'center', position: 'absolute', top: '40%', left: '40%' }}>

            <ActivityIndicator


              size="large"
              style={{
                //  backgroundColor: "rgba(144,102,230,.8)",
                height: 80,
                width: 80,
                zIndex: 999,

                borderRadius: 15

              }}

              color="rgba(144,102,230,.8)"
            />
          </View>}
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginRight: wp(3), marginTop: hp(1), alignItems: 'flex-end' }}>
          <Image source={require('../../../assets/images/Delete.png')} style={{ height: hp(4), width: wp(8) }} />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image resizeMode='contain' source={FORGET_IMAGE} style={styles.logoImage} />
        </View>
        <View>

          <View style={styles.headingWrapper}>
            <Text style={styles.headingTextWrapper}>{t('placeholders.rang.scrren_password')}</Text>

          </View>
          <View style={styles.textinputWrapper}>
            <TextInput
              placeholder={t('placeholders.auth.enter_email')}
              placeholderTextColor={'#c2c2c2'}
              value={email}
              onChangeText={(text) => setEmail(text, 'email')}
              style={styles.input}
            />
          </View>

        </View>


        <TouchableOpacity onPress={() => submitButton()}
          style={styles.otpWrapper}>
          <Text style={styles.otpTextWrapper}>{t('placeholders.rang.send')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  containerBackgroundWrapper: { flex: 1, width: '100%', height: '100%', },
  logoContainer: { alignItems: 'center', justifyContent: 'center', paddingTop: hp(14) },
  logoImage: { height: wp(50), width: wp(50), },
  headingWrapper: { marginTop: hp(3), marginHorizontal: wp(5), },
  headingTextWrapper: { fontSize: 14, fontFamily: MONTSERRAT_MEDIUM, color: '#000' },
  textinputWrapper: { marginHorizontal: wp(5), flexDirection: 'row', alignItems: 'center', elevation: 2, width: wp(90), marginTop: hp(2.5), backgroundColor: WHITE },
  input: { width: wp(80), marginLeft: wp(4), paddingVertical: hp(2) },
  otpWrapper: { paddingVertical: hp(2), backgroundColor: '#9066e6', width: wp(65), alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginTop: hp(10) },
  otpTextWrapper: { color: WHITE, fontFamily: MONTSERRAT_BOLD, fontSize: 15 },


});
