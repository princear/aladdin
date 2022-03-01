import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, BackHandler, Alert, ImageBackground, ScrollView } from 'react-native';
import { BLACK, EEFD, GREY_6C, LIGHT_BLUE, WHITE } from '../../styles/color';
import { LEFT_ARROW, USER_PROFILE, MOBILE, LOCK, SERVICES, LOCATION } from '../../../assets/icon';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MONTSERRAT_BOLD, MONTSERRAT_REGULAR } from '../../styles/typography';
import { SafeAreaView } from 'react-native-safe-area-context';
import { handleValidations } from '../../../validations/validate';
import { useDispatch, useSelector } from 'react-redux';
import { onLogin } from '../../../redux/Action/LoginAction';
import Input from '../../../component/common/input';
import RNPickerSelect from 'react-native-picker-select';
import AntDesign from 'react-native-vector-icons/AntDesign';


export default function Registation(props) {

  const dispatch = useDispatch();

  const handlevalidate = async (text, type) => {
    let status = `${type}Status`;
    let errorText = `${type}Error`;
    let resp = handleValidations(text, type);
    await setInbuiltstate({
      ...inbuiltstate,
      [type]: resp.value,
      [errorText]: resp.errorText,
      [status]: resp.status,
    });
  };

  let [inbuiltstate, setInbuiltstate] = useState({

    mobNo: '',
    mobNoError: '',
    mobNoStatus: false,

    name: '',
    nameError: '',
    nameStatus: false,

    password: '',
    passwordError: '',
    passwordStatus: false,

  })

  const [services, setServices] = useState('');
  const [Area, setArea] = useState('');

  const validator = (signin) => {
    if (signin.mobileNumber === "") {
      seterror("Mobile number is required");
    } else if (signin.mobileNumber.length < 10 || signin.mobileNumber.length > 10) {
      seterror('Mobile number should be 10 digit')
    }
    if (signin.name == '') {
      seterror1('Please Enter the name')
    }
    if (signin.password === "") {
      seterror2("Please Enter Password");
    }
    if (services === '') {
      seterror3('Please select the services ')
    }
    if (Area === '') {
      seterror4('Please select the area ')
    }
    else {
      console.log('data')
    }
  };
  const validate = (text) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      // this.setState({ email: text })
      // alert("Invalid Email")
      seterror("Invalid mobile number");
      return false;
    }
    // this.setState({ email: text })
    return true;

  };
  const [error, seterror] = useState("");
  const [error1, seterror1] = useState("");
  const [error2, seterror2] = useState("");
  const [error3, seterror3] = useState("");
  const [error4, seterror4] = useState("");


  const [signin, setSignIn] = useState({
    mobileNumber: '',
    password: '',
    name: '',
    servicesShow: ''
  });

  const [servicesType, setServicesType] = useState('')
  const submitButton = () => {
    if (inbuiltstate.mobNoStatus) {
      if (inbuiltstate.nameStatus) {
        if (inbuiltstate.passwordStatus) {

          if (services) {
            console.log('builddd', inbuiltstate.mobNo, inbuiltstate.password, inbuiltstate.name, props)

          } else {
            setServices('*Please select Services.');
          }
        } else {
          setInbuiltstate({
            ...inbuiltstate, passwordError: false, passwordError: "Please enter valid password"
          })
        }
      } else {
        setInbuiltstate({
          ...inbuiltstate, nameError: false, nameError: "Please enter name"
        })
      }
    } else {
      setInbuiltstate({
        ...inbuiltstate, mobNoError: false, mobNoError: "Please enter mobile number"
      })
    }
  }


  function handleBackButtonClick() {
    // navigation.isFocused() helps to exit the app on this component rather than in whole app.
    if (props.navigation.isFocused()) {
      Alert.alert(
        '',
        'Are you sure you want to quit the app?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => BackHandler.exitApp(),
          },
        ],
        { cancelable: false },
      );
      return true;
    }
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.registrationWrapper}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: hp(2), }}>
          <TouchableOpacity>
            <Image source={LEFT_ARROW} resizeMode='contain' style={{ height: hp(3), width: wp(6), marginLeft: wp(2) }} />
          </TouchableOpacity>
          <View style={{ width: wp(85), justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ fontSize: 18, color: WHITE, fontFamily: MONTSERRAT_BOLD }}>Registation</Text>
          </View>
        </View>

        <View style={{ width: wp(90), alignItems: 'center', marginTop: hp(4), flexDirection: 'row', marginHorizontal: wp(5) }}>
          <View style={{ width: wp(30), alignItems: 'center' }}>
            <TouchableOpacity style={{ backgroundColor: '#757575', height: hp(13), width: wp(23), borderRadius: 50, }}>
              <ImageBackground source={USER_PROFILE} resizeMode='contain' style={{ height: hp(13), width: wp(23), justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: WHITE, fontFamily: MONTSERRAT_BOLD, fontSize: 11 }}>Tap to upload</Text>
              </ImageBackground>

            </TouchableOpacity>
          </View>
          <View style={{ width: wp(60) }}>
            <Text style={{ color: '#fff', fontSize: 15, fontFamily: MONTSERRAT_BOLD, lineHeight: 23 }}>Provider Image </Text>
            <Text style={{ color: '#fff', fontSize: 11, fontFamily: MONTSERRAT_REGULAR, lineHeight: 15 }}>Image must be personal or staff image {"\n"}or company logo</Text>
          </View>
        </View>

      </View>
      <ScrollView >
        <View style={{ marginTop: hp(3), marginHorizontal: wp(5), flexDirection: 'row', alignItems: 'center' }}>
          <Image source={MOBILE} resizeMode='contain' style={{ height: hp(3.5), width: wp(7.5) }} />
          <Text style={{ fontSize: 13, fontFamily: MONTSERRAT_BOLD, color: '#000' }}> Phone number/ Email Address</Text>

        </View>
        <View style={{ marginHorizontal: wp(6), flexDirection: 'row', alignItems: 'center', elevation: 2, width: wp(90), marginTop: hp(1.5), backgroundColor: WHITE }}>
          <View style={{ borderRightWidth: 1, borderRightColor: '#ede2ff', width: wp(15), justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            <Text style={{ color: '#000', fontSize: 13 }}> +964  </Text>
          </View>
          <TextInput
            placeholder={'Add Your number (Iraq only) '}
            placeholderTextColor={'#c2c2c2'}
            keyboardType='numeric'
            maxLength={10}
            value={signin.mobileNumber}
            onChangeText={(text) => { setSignIn({ ...signin, mobileNumber: text }); seterror('') }}

            // value={inbuiltstate.mobNo}
            // onChangeText={(text) => handlevalidate(text, 'mobNo')}
            errortext={inbuiltstate.mobNoError}
            style={{ width: wp(80), marginLeft: wp(2) }}
          />
        </View>
        {error !== "" ? <Text style={{ marginLeft: wp(6), color: "red", textAlign: 'left' }}>{error}</Text> : null}


        {/* {inbuiltstate.mobNo == '' || inbuiltstate.mobNo == null ? null : (
          <Text style={{ marginLeft: wp(6), color: 'red' }}
          >
            {inbuiltstate.mobNoError}
          </Text>
        )} */}

        <View style={{ marginTop: hp(3), marginHorizontal: wp(5), flexDirection: 'row', alignItems: 'center' }}>
          <Image source={USER_PROFILE} resizeMode='contain' style={{ height: hp(3), width: wp(8) }} />
          <Text style={{ fontSize: 13, fontFamily: MONTSERRAT_BOLD, color: '#000' }}> Profile Name</Text>

        </View>
        <View style={{ marginHorizontal: wp(6), flexDirection: 'row', alignItems: 'center', elevation: 2, width: wp(90), marginTop: hp(1.5), backgroundColor: WHITE }}>
          <TextInput
            placeholder={'Enter your name  '}
            placeholderTextColor={'#c2c2c2'}
            value={signin.name}
            onChangeText={(text) => { setSignIn({ ...signin, name: text }); seterror1('') }}

            // value={inbuiltstate.name}
            // onChangeText={(text) => handlevalidate(text, 'name')}
            errortext={inbuiltstate.nameError}
            style={{ width: wp(80), marginLeft: wp(4) }}
          />
        </View>
        {error1 !== "" ? <Text style={{ marginLeft: wp(6), color: "red", textAlign: 'left' }}>{error1}</Text> : null}

        {/* {inbuiltstate.name == '' || inbuiltstate.name == null ? null : (
          <Text style={{ marginLeft: wp(6), color: 'red' }}
          >
            {inbuiltstate.nameError}
          </Text>
        )} */}
        <View style={{ marginTop: hp(3), marginHorizontal: wp(5), flexDirection: 'row', alignItems: 'center' }}>
          <Image source={LOCK} resizeMode='contain' style={{ height: hp(3), width: wp(8) }} />
          <Text style={{ fontSize: 13, fontFamily: MONTSERRAT_BOLD, color: '#000' }}> Password</Text>

        </View>
        <View style={{ marginHorizontal: wp(6), flexDirection: 'row', alignItems: 'center', elevation: 2, width: wp(90), marginTop: hp(1.5), backgroundColor: WHITE }}>
          <TextInput
            placeholder={'*********'}
            placeholderTextColor={'#c2c2c2'}
            secureTextEntry={true}
            value={signin.password}
            onChangeText={(text) => { setSignIn({ ...signin, password: text }); seterror2('') }}

            // value={inbuiltstate.password}
            // onChangeText={(text) => handlevalidate(text, 'password')}
            errortext={inbuiltstate.passwordError}
            style={{ width: wp(80), marginLeft: wp(4) }}
          />
        </View>
        {error2 !== "" ? <Text style={{ marginLeft: wp(6), color: "red", textAlign: 'left' }}>{error2}</Text> : null}

        {/* {inbuiltstate.password == '' || inbuiltstate.password == null ? null : (
          <Text style={{ marginLeft: wp(6), color: 'red' }}
          >
            {inbuiltstate.passwordError}
          </Text>
        )} */}

        <View style={{ marginTop: hp(3), marginHorizontal: wp(5), flexDirection: 'row', alignItems: 'center' }}>
          <Image source={SERVICES} resizeMode='contain' style={{ height: hp(3), width: wp(8) }} />
          <Text style={{ fontSize: 13, fontFamily: MONTSERRAT_BOLD, color: '#000' }}> Select Services</Text>

        </View>

        <View style={{ backgroundColor: WHITE, marginHorizontal: wp(6), elevation: 2, width: wp(90), marginTop: hp(1.5) }}>
         
          <RNPickerSelect
            placeholder={{ label: "Select Services", value: '' }}
            onValueChange={(value) => { setServices(value); seterror3('') }}
            // onValueChange={(value) => {setSignIn({...signin, services: value}); seterror3('')}}
            // value={signin.services}
            items={[
              { label: 'car washing', value: 'car washing' },
              { label: 'Baseball', value: 'bike washing' },
              { label: 'Hockey', value: 'car' },
            ]}
            style={styles.pickerStyle}
          />
        </View>
        {error3 !== "" ? <Text style={{ marginLeft: wp(6), color: "red", textAlign: 'left' }}>{error3}</Text> : null}

        {/* <Text style={{ marginLeft: wp(6), color: 'red' }}>{}</Text> */}
        {/* {
          services == '' ? null : <View><Text style={{ marginLeft: wp(6), color: 'red' }}>{services}</Text></View>
        } */}





        <View style={{ marginTop: hp(3), marginHorizontal: wp(5), flexDirection: 'row', alignItems: 'center' }}>
          <Image source={LOCATION} resizeMode='contain' style={{ height: hp(3), width: wp(8) }} />
          <Text style={{ fontSize: 13, fontFamily: MONTSERRAT_BOLD, color: '#000' }}> Select Area</Text>

        </View>
        <View style={{ backgroundColor: WHITE, marginHorizontal: wp(6), elevation: 2, width: wp(90), marginTop: hp(1.5) }}>
          <RNPickerSelect
            placeholder={{ label: "Select Area", value: '' }}
            onValueChange={(value) => { setArea(value); seterror4('') }}
            // onValueChange={(value) => setArea(value)}
            items={[
              { label: 'Delhi', value: 'Delhi' },
              { label: 'Lucknow', value: 'Lucknow' },
              { label: 'Mumbai', value: 'Mumbai' },
            ]}
          />
        </View>
        {error4 !== "" ? <Text style={{ marginLeft: wp(6), color: "red", textAlign: 'left' }}>{error4}</Text> : null}

        {/* {
          Area == '' ? null : <View><Text style={{ marginLeft: wp(6), color: 'red' }}>{Area}</Text></View>
        } */}

        <View style={{ marginTop: hp(3.5), marginLeft: wp(10) }}>
          <Text style={{ fontSize: 13, fontFamily: MONTSERRAT_BOLD, color: '#000' }}>Services Provider type:</Text>
        </View>
        <View style={{ marginHorizontal: wp(6), marginTop: hp(2), flexDirection: 'row', width: wp(90) }}>

          <TouchableOpacity
            onPress={() => {
              servicesType === 'Company' ? setServicesType('') : setServicesType('Company')
            }}
            style={{ width: wp(45), justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#9066e6', paddingVertical: hp(1.2), backgroundColor: servicesType === 'Company' ? '#9066e6' : WHITE, }}>
            <Text style={{ color: servicesType === 'Company' ? WHITE : '#9066e6', fontSize: 13, fontFamily: MONTSERRAT_BOLD }}>Company</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              servicesType === 'Individual' ? setServicesType('') : setServicesType('Individual')
            }}
            style={{ width: wp(45), justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#9066e6', paddingVertical: hp(1.2), backgroundColor: servicesType == 'Individual' ? '#9066e6' : WHITE, }}>
            <Text style={{ color: servicesType === 'Individual' ? WHITE : '#9066e6', fontSize: 13, fontFamily: MONTSERRAT_BOLD }}>Individual</Text>
          </TouchableOpacity>

        </View>
        <TouchableOpacity
          style={{ backgroundColor: '#9066e6', paddingVertical: hp(1), justifyContent: 'center', alignItems: 'center', paddingVertical: hp(2), marginTop: hp(4) }}
          // onPress={() => submitButton()}
          onPress={() => { validator(signin); }}
        >
          <Text style={{ color: '#fff', fontSize: 15, fontFamily: MONTSERRAT_BOLD }}>Register</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f5f1' },
  containerText: { fontSize: 27, color: '#000' },
  pickerStyle: {
    color: 'red', fontSize: 12
  },
  registrationWrapper:{ height: hp(27), backgroundColor: '#9066e6', borderBottomLeftRadius: 9, borderBottomRightRadius: 9 }
});
