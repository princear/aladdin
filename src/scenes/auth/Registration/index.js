import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  BackHandler,
  Alert,
  ImageBackground,
  ScrollView,
  Platform,
  Modal,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {WHITE} from '../../styles/color';
import {
  LEFT_ARROW,
  USER_PROFILE,
  MOBILE,
  LOCK,
  SERVICES,
  LOCATION,
  ARROW_WHITE,
} from '../../../assets/icon';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  MONTSERRAT_BOLD,
  MONTSERRAT_MEDIUM,
  MONTSERRAT_REGULAR,
} from '../../styles/typography';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  onAllLocation,
  onAllServices,
} from '../../../redux/Action/ServicesAction';
import {sentOtp} from '../../../redux/Action/otpAction';
import ImagePicker from 'react-native-image-crop-picker';
import {useTranslation} from 'react-i18next';
import axios from 'axios';
import CheckBox from '@react-native-community/checkbox';
import DocumentPicker from 'react-native-document-picker';

const headingListId = [];
const countryId = [];
const checkId = [];
var selectedTags = [];
var selectedAreaTags = [];
var unique = [];
var areaunique = [];

export default function Registation({props, route}) {
  const navigation = useNavigation();

  // console.log('serviceslist', route.params.serviceslist);
  const dispatch = useDispatch();
  const mobileroute = route.params.mobileSave;
  const callingNumberCode = route.params.Callcode;
  console.log('mobileroute', mobileroute, callingNumberCode);
  const [t] = useTranslation();

  const [services, setServices] = useState('');
  const [Area, setArea] = useState('');

  const [error, seterror] = useState('');
  const [error1, seterror1] = useState('');
  const [error2, seterror2] = useState('');
  const [error3, seterror3] = useState('');
  const [error4, seterror4] = useState('');
  const [error5, seterror5] = useState('');
  const [error6, seterror6] = useState('');
  const [error7, seterror7] = useState('');
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [type, setType] = useState('');
  const [servicesType, setServicesType] = useState('');
  const [modalImage, setModalImage] = useState(false);
  const [mutipleImage, setMutipleImage] = useState(null);
  const [data, setdata] = useState([]);
  const [modallistServices, setModalListServices] = useState(false);
  const [modalListArea, setModalListArea] = useState(false);
  const [modalServices, setModalServices] = useState(false);
  const [imagePath, setImagePath] = useState('');
  const [mutipleFile, setMutipleFile] = useState([]);
  const [dataArea, setDataArea] = useState([]);
  const locationsShowed = useSelector(
    state => state.ServiceReducer.locationListData,
  );
  const servicesShowed = useSelector(
    state => state.ServiceReducer.servicesListData,
  );
  // const { loading } = useSelector(state => state.UserReducers);

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
        {cancelable: false},
      );
      return true;
    }
  }

  useEffect(() => {
    // dispatch(onAllServices(navigation));
    // dispatch(onAllLocation(navigation));
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, [selectedTags, selectedAreaTags]);

  const onShowItemSelected = () => {
    setModalListServices(false);
  };

  const onShowItemSelected2 = () => {
    setModalListArea(false);
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const submitRegistration = async (
    name,
    email,
    password,
    confirmPassword,
    servicesType,
  ) => {
    // setLoading(true);
    console.log(name, email, password, confirmPassword, servicesType);
    if (name == '') {
      // setLoading(false);
      seterror1('Please Enter the name');
    } else if (email === '') {
      seterror2('Please Enter email');
    } else if (password === '') {
      seterror3('Enter the password');
    } else if (password.length <= 6) {
      seterror3('Password more than  6 characters');
    } else if (password !== confirmPassword) {
      seterror4('Enter the correct password');
    } else if (servicesType == '') {
      Alert.alert('Select the type');
    } else if (selectedTags === '') {
      Alert.alert('Please select the services');
    } else if (selectedAreaTags === '') {
      Alert.alert('Please select the area');
    } else {
      setModalServices2(true);
      var formdata = new FormData();
      formdata.append('name', name);
      formdata.append('email', email);
      formdata.append('calling_code', route.params.Callcode.toString());
      formdata.append('mobile', route.params.mobileSave.toString());
      formdata.append('password', password);

      // headingListId.forEach(item => {
      //   formdata.append('service_cagegory[]', item.toString());
      // });
      selectedTags.forEach(item => {
        formdata.append('service_cagegory[]', item.toString());
      });

      // countryId.forEach(item => {
      //   formdata.append('area[]', item.toString());
      // });
      selectedAreaTags.forEach(item => {
        formdata.append('area[]', item.toString());
      });

      formdata.append('company_type', servicesType.toString());

      mutipleFile.forEach(item => {
        formdata.append('company_document[]', {
          name: item.name,
          fileCopyUri: item.uri,
          type: item.type,
        });
      });

      {
        imagePath === ''
          ? formdata.append('image', null)
          : formdata.append('image', {
              uri: imagePath.path,
              type: imagePath.mime,
              name: 'image/jpeg',
            });
      }

      console.log(formdata, 'llllll');

      axios.defaults.baseURL = 'https://aladdin.com.iq/api/';

      const api = axios.defaults.baseURL + 'vendor-register';

      console.log(api);
      console.log(formdata._parts);
      return fetch(api, {
        method: 'POST',
        headers: {
          // Authorization: 'Bearer ' + token,
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
        body: formdata,
      })
        .then(response => response.json())
        .then(responseJson => {
          if (
            responseJson.status == '1' &&
            responseJson.response[0] == 'Successfully Registered'
          ) {
            setLoading(false);
            setModalServices2(true);
            Alert.alert(responseJson.response[0]);
            navigation.navigate('Login');
            selectedTags.length = 0;
            selectedAreaTags.length = 0;
            setModalServices2(false);
          } else if (responseJson.status == '0') {
            console.log('error');
            Alert.alert(responseJson.response[0]);
            setModalServices2(false);
            setLoading(false);
          } else {
            console.log('smsksk');
            Alert.alert(responseJson.message);
            setModalServices2(false);
            setLoading(false);
          }
        })
        .catch(function (error) {
          setModalServices2(false);
          console.log(error);
        });
    }
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        imageUpload(image);
      })
      .catch(e => console.log('error', e));
  };

  const imageUpload = imageData => {
    setModalServices(false);

    console.log('imagePath', imagePath);
    setImagePath(imageData);
  };

  const takePhotoFromCamera = () => {
    // var imagelist = []
    ImagePicker.openCamera({
      multiple: true,
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      imageUpload(image);
    });
  };

  const takePhotoFromCamera2 = () => {
    // setModalServices(false)
    var imagelist = [];
    ImagePicker.openCamera({
      mediaType: 'any',
      multiple: true,
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      imagelist.push({
        filename: 'image/jpeg',
        path: image.path,
        type: 'image/jpeg',
      });
      // setImagePath( image.path )
      imageUpload2(imagelist);
    });
  };

  const imageUpload2 = imagedata => {
    setModalImage(false);

    setMutipleImage(imagedata);
  };

  const choosePhotoFromLibrary2 = () => {
    var imagelist = [];

    ImagePicker.openPicker({
      isCamera: true,
      // multipleShot: true,
      mediaType: 'any',
      multiple: true,
      // waitAnimationEnd: false,
      // includeExif: true,
      // forceJpg: true,
      // compressImageQuality: 0.8,
      maxFiles: 10,
      // width: 300,
      // height: 400,
      // cropping: true,
    })
      .then(image => {
        console.log(image);
        image.map(item => {
          imagelist.push({
            // filename: 'image/jpeg',
            path: item.path,
            // type: 'image/jpeg',
          });
        });

        imageUpload2(imagelist);
      })
      .catch(e => console.log('error', e));
  };

  useEffect(() => {
    setdata(servicesShowed);
    setDataArea(locationsShowed);
  }, [servicesShowed, locationsShowed, dataArea]);

  const [state, setstate] = useState([]);

  const onchecked = (id, item) => {
    const check = data;
    const index = check.findIndex(x => x.id === id);
    check[index].checked = !check[index].checked;
    setstate(check);
  };
  const [products, setProducts] = useState([]);
  const handleChange2 = (checkboxId, checkBoxname, isRequired) => {
    console.log('checkBoxname', checkBoxname.name);
    let temp = data?.map(product => {
      if (checkboxId === product.id) {
        console.log(checkboxId, product.id, !product.isChecked);
        return {...product, isChecked: !product.isChecked};
      }
      return product;
    });

    if (!isExistInArray(selectedTags, checkboxId)) {
      console.log('insert in array');
      selectedTags.push(checkboxId);
      console.log('item?????????????????????????', checkboxId);
    } else {
      console.log('remove');
      RemoveTempExercise(selectedTags, checkboxId);
    }

    console.log('single item ', selectedTags);
    setProducts(temp);
  };
  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: wp(5),
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#fff',
          height: Platform.OS == 'ios' ? hp(7) : hp(6),
          marginTop: hp(2),
          borderRadius: 4,
          paddingHorizontal: wp(2),
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CheckBox
            disabled={false}
            style={
              {
                // borderColor: '#F5F5F5',
                // borderWidth: 1,
                // color: '#F5F5F5',
              }
            }
            onAnimationType="fill"
            offAnimationType="fade"
            value={item.checked}
            // onValueChange={() => onValueChange(item, index)}
            onChange={() => handleChange2(item.id, item)}
            onValueChange={() => {
              onchecked(item.id, item);
            }}

            // value={item.checked}
            // onValueChange={newValue => setToggleCheckBox(newValue)}
          />
          <Text
            style={{
              fontSize: 13,
              fontFamily: MONTSERRAT_MEDIUM,
              color: '#000',
              paddingLeft: wp(3),
            }}>
            {item.name}
          </Text>
        </View>
        <Image
          source={{uri: item.category_image_url}}
          resizeMode="contain"
          style={{height: hp(6), width: wp(14)}}
        />
      </View>
    );
  };

  const [areaState, setAreaState] = useState([]);

  const onchecked2 = (id, item) => {
    const areacheck = dataArea;
    console.log(areacheck);
    const index = areacheck.findIndex(x => x.id === id);
    areacheck[index].checked = !areacheck[index].checked;
    setAreaState(areacheck);
  };
  const [areaData, setAreaData] = useState([]);
  const handleChange3 = (id, checkBoxname, isRequired) => {
    let temp = dataArea?.map(area => {
      if (id === area.id) {
        return {...area, isChecked: !area.isChecked};
      }
      return area;
    });

    if (!isExist2(selectedAreaTags, id)) {
      console.log('insert area in array');
      selectedAreaTags.push(id);
      console.log('item?????????????????????????', id);
    } else {
      console.log('remove');
      RemoveAreaExercise2(selectedAreaTags, id);
    }

    console.log('single area item ', selectedAreaTags);
    setAreaData(temp);
  };
  {
    console.log(
      'selectedAreaTags',
      selectedAreaTags,
      'selectedTags',
      selectedTags,
    );
  }

  const renderItem2 = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: wp(5),
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#fff',
          height: Platform.OS == 'ios' ? hp(7) : hp(6),
          marginTop: hp(2),
          borderRadius: 4,
          paddingHorizontal: wp(2),
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CheckBox
            disabled={false}
            // tintColors={{
            //   true: '#04D833', false: '#D3D3D3'

            // }}
            style={
              {
                // borderColor: '#F5F5F5',
                // borderWidth: 1,
                // color: '#F5F5F5',
                // height: hp(4),
                // width: wp(4),
                //   height: 15,
                //   width: 15,
                //   alignItems: 'center',
              }
            }
            value={item.checked}
            // onValueChange={() => onValueChange(item, index)}
            onChange={() => handleChange3(item.id, item)}
            onValueChange={() => {
              onchecked2(item.id, item);
            }}
            // onValueChange={() => onValueChange2(item, index)}
            // onValueChange={newValue => setToggleCheckBox(newValue)}
          />
          <Text
            style={{
              fontSize: 13,
              fontFamily: MONTSERRAT_MEDIUM,
              color: '#000',
              paddingLeft: wp(3),
            }}>
            {item.name}
          </Text>
        </View>
      </View>
    );
  };

  const SelectMutiple = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      });
      for (const res of results) {
        console.log('res :', JSON.stringify(res));
        console.log('URI :', res.uri);
        console.log('Type :', res.type);
        console.log('file Name :', res.name);
        console.log('file Size :', res.size);
      }
      setMutipleFile(results);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('Cancellered from multiple picker');
      } else {
        alert('unkniwn Error' + JSON.stringify(err));
        throw err;
      }
    }
  };
  const isExistInArray = (Ex_array, Ex_value) => {
    var isExist = false;
    Ex_array.forEach(function (element, index) {
      if (Ex_array[index] && Ex_array[index] === Ex_value) {
        isExist = true;
        return false;
      }
    });

    return isExist;
  };
  const RemoveTempExercise = (Ex_array, Ex_value) => {
    console.log('sudhanshuuuuuuuuuuuuuuuuuu', JSON.stringify(Ex_array));

    Ex_array.forEach(function (element, index) {
      if (Ex_array[index] && Ex_array[index] === Ex_value) {
        console.log('id:' + Ex_value);
        Ex_array.splice(index, 1);
        return false;
      }
    });

    console.log('Array:' + JSON.stringify(Ex_array));
    selectedTags = Ex_array;
  };
  const isExist2 = (Ex_array, Ex_value) => {
    var isExist = false;
    Ex_array.forEach(function (element, index) {
      if (Ex_array[index] && Ex_array[index] === Ex_value) {
        isExist = true;
        return false;
      }
    });

    return isExist;
  };
  const RemoveAreaExercise2 = (Ex_array, Ex_value) => {
    console.log('Nitikaaaaaaaaaaaaaaa', JSON.stringify(Ex_array));

    Ex_array.forEach(function (element, index) {
      if (Ex_array[index] && Ex_array[index] === Ex_value) {
        console.log('id:' + Ex_value);
        Ex_array.splice(index, 1);
        return false;
      }
    });

    console.log('Array:' + JSON.stringify(Ex_array));
    selectedAreaTags = Ex_array;
  };
  // const [loading, setLoading] = useState()
  const [modalServices2, setModalServices2] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.registrationWrapper}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: hp(2),
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('VerifyNumberScreen')}>
            <Image
              source={LEFT_ARROW}
              resizeMode="contain"
              style={{height: hp(3), width: wp(6), marginLeft: wp(2)}}
            />
          </TouchableOpacity>
          <View
            style={{
              width: wp(85),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{fontSize: 18, color: WHITE, fontFamily: MONTSERRAT_BOLD}}>
              Registration
            </Text>
          </View>
        </View>
      </View>
      {loading && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            position: 'absolute',
            top: '50%',
            left: '40%',
          }}>
          <ActivityIndicator
            style={{
              //  backgroundColor: "rgba(144,102,230,.8)",
              backgroundColor: '#9066e6',
              height: 80,
              width: 80,
              zIndex: 999,

              borderRadius: 15,
            }}
            size="small"
            color="#fff"
          />
        </View>
      )}
      <ScrollView>
        <View
          style={{
            width: wp(90),
            // backgroundColor: 'red',
            alignItems: 'center',
            marginTop: hp(2),
            flexDirection: 'row',
            marginHorizontal: wp(5),
          }}>
          <View style={{width: wp(30), alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => setModalServices(true)}
              style={{
                backgroundColor: '#757575',
                // height: hp(13),
                // width: wp(23),
                height: Platform.OS == 'ios' ? 90 : 100,
                width: Platform.OS == 'ios' ? 90 : 100,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {imagePath == '' ? (
                <ImageBackground
                  source={USER_PROFILE}
                  resizeMode="contain"
                  style={{
                    height: hp(13),
                    width: wp(23),
                    // height: 20,
                    // width: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontFamily: MONTSERRAT_MEDIUM,
                      fontSize: 25,
                    }}>
                    +
                  </Text>
                </ImageBackground>
              ) : (
                <Image
                  source={{uri: imagePath.path}}
                  style={{
                    height: Platform.OS == 'ios' ? 90 : 100,
                    width: Platform.OS == 'ios' ? 90 : 100,
                    borderRadius: 50,
                  }}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={{width: wp(60), marginLeft: wp(3)}}>
            <Text
              style={{
                color: '#000',
                fontSize: 15,
                fontFamily: MONTSERRAT_BOLD,
                lineHeight: 23,
              }}>
              Provider Image{' '}
            </Text>
            <TouchableOpacity onPress={() => setModalServices(true)}>
              <Text
                style={{
                  color: '#1C1C1C',
                  fontSize: 11,
                  fontFamily: MONTSERRAT_REGULAR,
                  lineHeight: 15,
                }}>
                Tap to Change
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            marginTop: hp(3),
            marginHorizontal: wp(5),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 13,
              fontFamily: MONTSERRAT_MEDIUM,
              color: '#6D6D6D',
            }}>
            Mobile Number
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: wp(6),
            flexDirection: 'row',
            alignItems: 'center',
            // elevation: 2,
            width: wp(90),
            marginTop: hp(1.5),
            backgroundColor: WHITE,
          }}>
          <View
            style={{
              borderRightWidth: 1,
              borderRightColor: '#ede2ff',
              width: wp(15),
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              paddingVertical: Platform.OS == 'ios' ? hp(1.5) : hp(0),
            }}>
            <Text
              style={{
                color: '#BCBCBC',
                fontSize: 13,
                fontFamily: MONTSERRAT_MEDIUM,
                marginRight: wp(2),
              }}>
              {callingNumberCode}
            </Text>
          </View>
          <TextInput
            editable={false}
            placeholder={'Add Your number (Iraq only) '}
            placeholderTextColor={'#c2c2c2'}
            keyboardType="numeric"
            maxLength={10}
            // value={mobile}
            value={mobileroute}
            onChangeText={text => {
              seterror('');
              setMobile(text);
            }}
            style={{width: wp(80), marginLeft: wp(2), color: '#c2c2c2'}}
          />
        </View>
        {error !== '' ? (
          <Text style={{marginLeft: wp(6), color: 'red', textAlign: 'left'}}>
            {error}
          </Text>
        ) : null}

        <View
          style={{
            marginTop: hp(1.5),
            marginHorizontal: wp(5),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 13,
              fontFamily: MONTSERRAT_MEDIUM,
              color: '#6D6D6D',
            }}>
            {' '}
            Company Name
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: wp(6),
            flexDirection: 'row',
            alignItems: 'center',
            // elevation: 2,
            width: wp(90),
            marginTop: hp(1.5),
            backgroundColor: WHITE,
            paddingVertical: Platform.OS == 'ios' ? hp(1.5) : hp(0),
          }}>
          <TextInput
            placeholder={'Company Name  '}
            placeholderTextColor={'#c2c2c2'}
            // value={signin.name}
            value={name}
            onChangeText={text => {
              // setSignIn({...signin, name: text});
              setName(text);
              seterror1('');
            }}
            style={{width: wp(80), marginLeft: wp(4)}}
          />
        </View>
        {error1 !== '' ? (
          <Text style={{marginLeft: wp(6), color: 'red', textAlign: 'left'}}>
            {error1}
          </Text>
        ) : null}
        <View
          style={{
            marginTop: hp(1.5),
            marginHorizontal: wp(5),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 13,
              fontFamily: MONTSERRAT_MEDIUM,
              color: '#6D6D6D',
            }}>
            {' '}
            Email or Bussiness Email
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: wp(6),
            flexDirection: 'row',
            alignItems: 'center',
            // elevation: 2,
            width: wp(90),
            marginTop: hp(1.5),
            backgroundColor: WHITE,
            paddingVertical: Platform.OS == 'ios' ? hp(1.5) : hp(0),
          }}>
          <TextInput
            placeholder={'Enter You Email  '}
            placeholderTextColor={'#c2c2c2'}
            // value={signin.name}
            value={email}
            onChangeText={text => {
              // setSignIn({...signin, name: text});
              setEmail(text);
              seterror2('');
            }}
            // value={inbuiltstate.name}
            // onChangeText={(text) => handlevalidate(text, 'name')}
            // errortext={inbuiltstate.nameError}
            style={{width: wp(80), marginLeft: wp(4)}}
          />
        </View>
        {error2 !== '' ? (
          <Text style={{marginLeft: wp(6), color: 'red', textAlign: 'left'}}>
            {error2}
          </Text>
        ) : null}

        <View
          style={{
            marginTop: hp(1.5),
            marginHorizontal: wp(5),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 13,
              fontFamily: MONTSERRAT_MEDIUM,
              color: '#6D6D6D',
            }}>
            {' '}
            Password
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: wp(6),
            flexDirection: 'row',
            alignItems: 'center',
            // elevation: 2,
            width: wp(90),
            marginTop: hp(1.5),
            backgroundColor: WHITE,
            paddingVertical: Platform.OS == 'ios' ? hp(1.5) : hp(0),
          }}>
          {/* <TextInput
            secureTextEntry={true}
            value={password}
            onChangeText={password => setPassword(password)}
            style={styles.inputpassword}
            placeholder={t('placeholders.auth.password')}
          /> */}
          <TextInput
            placeholder={'Password'}
            placeholderTextColor={'#c2c2c2'}
            secureTextEntry={true}
            // value={signin.password}
            value={password}
            // onChangeText={password => {
            //   // setSignIn({...signin, password: text});
            //   setPassword(password);
            //   seterror3('');
            // }}
            onChangeText={text => {
              setPassword(text);
              seterror3('');
            }}
            // value={inbuiltstate.password}
            // onChangeText={(text) => handlevalidate(text, 'password')}
            // errortext={inbuiltstate.passwordError}
            style={{width: wp(80), marginLeft: wp(4)}}
          />
        </View>
        {error3 !== '' ? (
          <Text style={{marginLeft: wp(6), color: 'red', textAlign: 'left'}}>
            {error3}
          </Text>
        ) : null}
        <View
          style={{
            marginTop: hp(1.5),
            marginHorizontal: wp(5),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 13,
              fontFamily: MONTSERRAT_MEDIUM,
              color: '#6D6D6D',
            }}>
            {' '}
            Confirm Password
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: wp(6),
            flexDirection: 'row',
            alignItems: 'center',
            width: wp(90),
            marginTop: hp(1.5),
            backgroundColor: WHITE,
            paddingVertical: Platform.OS == 'ios' ? hp(1.5) : hp(0),
          }}>
          <TextInput
            placeholder={'Confirm Password'}
            placeholderTextColor={'#c2c2c2'}
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={confirmPassword => {
              setConfirmPassword(confirmPassword);
              seterror4('');
            }}
            style={{width: wp(80), marginLeft: wp(4)}}
          />

          {console.log(password, confirmPassword)}
        </View>
        {error4 !== '' ? (
          <Text style={{marginLeft: wp(6), color: 'red', textAlign: 'left'}}>
            {error4}
          </Text>
        ) : null}

        <View
          style={{
            marginTop: hp(1.5),
            marginHorizontal: wp(5),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 13,
              fontFamily: MONTSERRAT_MEDIUM,
              color: '#6D6D6D',
            }}>
            {' '}
            Select Service You Provide
          </Text>
        </View>
        {console.log('unique', unique, areaunique)}
        {console.log('unique', unique.length, areaunique.length)}
        <View
          style={{
            backgroundColor: WHITE,
            marginLeft: wp(5),
            paddingVertical: hp(2),
            marginTop: hp(1),
            width: wp(90),
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: wp(80),
              borderRightWidth: 1,
              borderRightColor: '#D9D9D9',
            }}>
            <Text
              style={{
                fontSize: 13,
                fontFamily: MONTSERRAT_MEDIUM,
                color: '#BCBCBC',
                paddingLeft: wp(5),
              }}>
              {selectedTags.length == 0
                ? 'Select Services'
                : `${selectedTags.length} selected`}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setModalListServices(true)}
            style={{
              width: wp(10),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/rightarrowblack.png')}
              style={{height: hp(2), width: wp(4)}}
            />
          </TouchableOpacity>
        </View>

        {error5 !== '' ? (
          <Text style={{marginLeft: wp(6), color: 'red', textAlign: 'left'}}>
            {error5}
          </Text>
        ) : null}

        <View
          style={{
            marginTop: hp(1.5),
            marginHorizontal: wp(5),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 13,
              fontFamily: MONTSERRAT_MEDIUM,
              color: '#6D6D6D',
            }}>
            {' '}
            Select Area
          </Text>
        </View>
        <View
          style={{
            backgroundColor: WHITE,
            marginLeft: wp(5),
            paddingVertical: hp(2),
            marginTop: hp(1),
            width: wp(90),
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: wp(80),
              borderRightWidth: 1,
              borderRightColor: '#D9D9D9',
            }}>
            <Text
              style={{
                fontSize: 13,
                fontFamily: MONTSERRAT_MEDIUM,
                color: '#BCBCBC',
                paddingLeft: wp(5),
              }}>
              {' '}
              {selectedAreaTags.length == 0
                ? ' Select Area'
                : `${selectedAreaTags.length} selected`}
            </Text>
          </View>
          <TouchableOpacity
            onPress={
              () => setModalListArea(true)
              // navigation.navigate('SelectArea')
            }
            style={{
              width: wp(10),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/rightarrowblack.png')}
              style={{height: hp(2), width: wp(4)}}
            />
          </TouchableOpacity>
        </View>

        {error6 !== '' ? (
          <Text style={{marginLeft: wp(6), color: 'red', textAlign: 'left'}}>
            {error6}
          </Text>
        ) : null}
        <View style={{marginTop: hp(1.5), marginLeft: wp(5)}}>
          <Text
            style={{
              fontSize: 13,
              fontFamily: MONTSERRAT_MEDIUM,
              color: '#6D6D6D',
            }}>
            Select Type:
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: wp(6),
            marginTop: hp(2),
            flexDirection: 'row',
            width: wp(90),
          }}>
          <TouchableOpacity
            onPress={() => {
              servicesType === 'Company'
                ? setServicesType('')
                : setServicesType(1);
            }}
            style={{
              width: wp(40),
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#9066e6',
              paddingVertical: hp(2),
              borderRadius: 5,
              backgroundColor: servicesType === 1 ? '#9066e6' : WHITE,
            }}>
            <Text
              style={{
                color: servicesType === 1 ? WHITE : '#9066e6',
                fontSize: 13,
                fontFamily: MONTSERRAT_MEDIUM,
              }}>
              Company
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              servicesType === 'Individual'
                ? setServicesType('')
                : setServicesType(2);
            }}
            style={{
              width: wp(40),
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#9066e6',
              paddingVertical: hp(2),
              marginLeft: wp(5),
              borderRadius: 5,
              backgroundColor: servicesType == 2 ? '#9066e6' : WHITE,
            }}>
            <Text
              style={{
                color: servicesType === 2 ? WHITE : '#9066e6',
                fontSize: 13,
                fontFamily: MONTSERRAT_MEDIUM,
              }}>
              Individual
            </Text>
          </TouchableOpacity>
        </View>
        {error7 !== '' ? (
          <Text style={{marginLeft: wp(6), color: 'red', textAlign: 'left'}}>
            {error7}
          </Text>
        ) : null}
        <View style={{marginTop: hp(3.5), marginLeft: wp(5)}}>
          <Text
            style={{
              fontSize: 13,
              fontFamily: MONTSERRAT_MEDIUM,
              color: '#6D6D6D',
            }}>
            Upload Company Files*
            {/* (Maximum 10) */}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: MONTSERRAT_MEDIUM,
              color: '#9166E9',
              width: wp(90),
              marginTop: hp(1),
            }}>
            Company registration means you are working as company and you need
            to submit company documents
          </Text>
        </View>

        <TouchableOpacity
          // onPress={() => setModalImage(true)}
          onPress={SelectMutiple}
          style={{
            width: wp(40),
            backgroundColor: '#E4E4E4',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: wp(5),
            marginTop: hp(1),
            paddingVertical: hp(2),
            marginBottom: hp(1),
          }}>
          <Text
            style={{
              color: '#000',
              fontSize: 13,
              fontFamily: MONTSERRAT_MEDIUM,
            }}>
            Choose Files
          </Text>
        </TouchableOpacity>

        {mutipleFile == null ? (
          <TouchableOpacity
            // onPress={() => setModalImage(true)}
            onPress={SelectMutiple}
            style={{
              width: wp(40),
              backgroundColor: '#E4E4E4',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: wp(5),
              marginTop: hp(1),
              paddingVertical: hp(2),
              marginBottom: hp(1),
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: 13,
                fontFamily: MONTSERRAT_MEDIUM,
              }}>
              Choose Files
            </Text>
          </TouchableOpacity>
        ) : (
          mutipleFile &&
          mutipleFile.length > 0 &&
          mutipleFile?.map(item => {
            return (
              <View key={item.mine} style={{marginLeft: wp(5)}}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 13,
                    fontFamily: MONTSERRAT_MEDIUM,
                  }}>
                  {item.name}
                </Text>
              </View>
            );
          })
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalImage}
          onRequestClose={() => {
            setModalImage(false);
          }}>
          <View style={styles.modalWrapper}>
            <View style={styles.modalCont}>
              <View style={styles.panel}>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.panelTitle}>
                    {t('placeholders.profile.upload')}
                  </Text>
                  <Text style={styles.panelSubtitle}>
                    {t('placeholders.profile.choose_picture')}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.panelButton}
                  onPress={takePhotoFromCamera2}>
                  <Text style={styles.panelButtonTitle}>
                    {t('placeholders.profile.take_photo')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.panelButton}
                  onPress={SelectMutiple}>
                  <Text style={styles.panelButtonTitle}>
                    {t('placeholders.profile.take_photo')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.panelButton}
                  onPress={choosePhotoFromLibrary2}>
                  <Text style={styles.panelButtonTitle}>
                    {t('placeholders.profile.choose_librray')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.panelButton}
                  // onPress={() => this.bs.current.snapTo(1)}
                  onPress={() => setModalImage(false)}>
                  <Text style={styles.panelButtonTitle}>
                    {t('placeholders.bookingList.cancel')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalServices}
          onRequestClose={() => {
            setModalServices(false);
          }}>
          <View style={styles.modalWrapper}>
            <View style={styles.modalCont}>
              <View style={styles.panel}>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.panelTitle}>
                    {t('placeholders.profile.upload')}
                  </Text>
                  <Text style={styles.panelSubtitle}>
                    {t('placeholders.profile.choose_picture')}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.panelButton}
                  onPress={takePhotoFromCamera}>
                  <Text style={styles.panelButtonTitle}>
                    {t('placeholders.profile.take_photo')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.panelButton}
                  onPress={choosePhotoFromLibrary}>
                  <Text style={styles.panelButtonTitle}>
                    {t('placeholders.profile.choose_librray')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.panelButton}
                  // onPress={() => this.bs.current.snapTo(1)}
                  onPress={() => setModalServices(false)}>
                  <Text style={styles.panelButtonTitle}>
                    {t('placeholders.bookingList.cancel')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modallistServices}
          onRequestClose={() => {
            setModalListServices(false);
          }}>
          <View style={styles.modalWrapper2}>
            <View style={styles.modalCont2}>
              <SafeAreaView>
                <View style={styles.panel2}>
                  {/* <View style={styles.container}> */}
                  <View style={styles.headerWrapper}>
                    <View style={styles.headerAligner}>
                      <TouchableOpacity
                        style={{width: wp(10)}}
                        onPress={
                          () => setModalListServices(false)
                          // navigation.goBack()
                        }>
                        <Image
                          source={ARROW_WHITE}
                          style={styles.headerLeftImage}
                        />
                      </TouchableOpacity>
                      <View
                        style={{
                          width: wp(70),
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={styles.headerCenterText}>
                          {'Services'}{' '}
                        </Text>
                      </View>
                      <TouchableOpacity onPress={() => onShowItemSelected()}>
                        <Text
                          style={{
                            fontSize: 13,
                            fontFamily: MONTSERRAT_MEDIUM,
                            color: '#fff',
                          }}>
                          Confirm
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginHorizontal: wp(5),
                      //   paddingVertical: hp(1.5),
                      borderWidth: 1,
                      borderRadius: 4,
                      borderColor: '#9066e6',
                      marginTop: hp(2),
                      paddingRight: wp(2),
                    }}>
                    <Text
                      style={{
                        fontFamily: MONTSERRAT_MEDIUM,
                        fontSize: 13,
                        color: '#6D6D6D',
                        paddingLeft: wp(3),
                      }}>
                      Search Services
                    </Text>

                    <Image
                      source={require('../../../assets/images/search.png')}
                      style={{ height: hp(6), width: wp(6) }}
                    />
                  </View> */}
                  {loading && (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        position: 'absolute',
                        top: '40%',
                        left: '40%',
                      }}>
                      <ActivityIndicator
                        size="large"
                        style={{
                          //  backgroundColor: "rgba(144,102,230,.8)",
                          height: 80,
                          width: 80,
                          zIndex: 999,

                          borderRadius: 15,
                        }}
                        color="rgba(144,102,230,.8)"
                      />
                    </View>
                  )}
                  <View style={{paddingBottom: hp(20)}}>
                    <FlatList
                      data={data}
                      renderItem={renderItem}
                      keyExtractor={item => `key-${item.id}`}
                    />
                  </View>
                  {/* </View> */}
                </View>
              </SafeAreaView>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalListArea}
          onRequestClose={() => {
            setModalListArea(false);
          }}>
          <View style={styles.modalWrapper3}>
            <View style={styles.modalCont3}>
              {/* <SafeAreaView> */}
              {/* <View style={styles.panel2}> */}
              {/* <View style={styles.container}> */}
              <View style={[styles.headerWrapper, {marginTop: hp(3)}]}>
                <View style={styles.headerAligner}>
                  <TouchableOpacity
                    style={{width: wp(10)}}
                    onPress={() => setModalListArea(false)}
                    // navigation.goBack()}
                  >
                    <Image
                      source={ARROW_WHITE}
                      style={styles.headerLeftImage}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      width: wp(70),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.headerCenterText}>{'Area'} </Text>
                  </View>
                  <TouchableOpacity onPress={() => onShowItemSelected2()}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: MONTSERRAT_MEDIUM,
                        color: '#fff',
                      }}>
                      Confirm
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <FlatList
                data={dataArea}
                renderItem={renderItem2}
                keyExtractor={item => `key-${item.id}`}
              />
              {/* </View> */}
              {/* </SafeAreaView> */}
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalServices2}
          onRequestClose={() => {
            setModalServices2(false);
          }}>
          <View style={styles.modalWrapper}>
            <View
              style={[
                styles.modalCont,
                {
                  height: hp(10),
                  width: wp(50),
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <Text style={{fontSize: 16}}>In Process...</Text>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          style={{
            backgroundColor: '#9066e6',
            paddingVertical: hp(1),
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: hp(2),
            marginTop: hp(4),
          }}
          // onPress={() => submitButton()}
          onPress={() => {
            // modalOpen()
            submitRegistration(
              name,
              email,
              password,
              confirmPassword,
              servicesType,
            );
          }}>
          <Text
            style={{color: '#fff', fontSize: 15, fontFamily: MONTSERRAT_BOLD}}>
            Register
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F5F5F5'},
  containerText: {fontSize: 27, color: '#000'},
  pickerStyle: {
    color: 'red',
    fontSize: 12,
  },
  modalCont: {
    width: wp(90),
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 6,
    paddingVertical: hp(1),
  },

  registrationWrapper: {
    height: Platform.OS == 'ios' ? hp(7) : hp(8),
    // paddingVertical: hp(2),
    backgroundColor: '#9066e6',
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
  },
  modalWrapper: {
    flex: 1,
    // backgroundColor: 'red',
    backgroundColor: '#00000040',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCont: {
    width: wp(90),
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 6,
    paddingVertical: hp(1),
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  searchIcon: {
    height: hp(5),
    width: wp(8),
    alignItems: 'center',
    // marginTop:10,
    // height:25,
    // width:25,
    // backgroundColor:'red'
  },
  modalWrapper2: {
    // flex: 1,
    // backgroundColor: 'red',
    backgroundColor: '#00000040',
    alignItems: 'center',
    // height: hp(100),
    // width: wp(100),
    justifyContent: 'center',
  },
  modalCont2: {
    width: wp(100),
    height: hp(100),
    backgroundColor: '#fff',
    // backgroundColor: 'yellow',
    justifyContent: 'center',
    borderRadius: 6,
    paddingVertical: hp(1),
    // marginTop: hp(9),
  },
  modalWrapper3: {
    flex: 1,
    backgroundColor: '#00000040',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  modalCont3: {
    width: wp(100),
    height: hp(100),
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 6,
    paddingVertical: hp(1),
    // marginTop: hp(9),
  },
  panel2: {
    // padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  // container: {flex: 1, backgroundColor: '#F5F5F5'},
  headerWrapper: {
    backgroundColor: '#9066e6',
    paddingVertical: hp(1.5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAligner: {flexDirection: 'row', alignItems: 'center'},
  headerLeftImage: {
    height: hp(4),
    width: wp(8),
    marginRight: wp(3),
    marginLeft: wp(2),
  },
  headerCenterText: {fontSize: 14, color: '#fff', fontFamily: MONTSERRAT_BOLD},
});
