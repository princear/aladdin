import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ToastAndroid, TouchableOpacity, Platform, ActivityIndicator, Modal, ScrollView, TextInput, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';
import { ProfileData, UpdateProfileData } from '../../../redux/Action/LoginAction';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export default function ProfileScreen(props) {

    const navigation = useNavigation()
    const dispatch = useDispatch();



    const { loading } = useSelector(state => state.UserReducers);

    const fetchProfile = useSelector((state) => state.UserReducers.profile);


    const [error, seterror] = useState("");
    const [error1, seterror1] = useState("");
    const [error2, seterror2] = useState("");

    const [modalServices, setModalServices] = useState(false);
    const [showpassword, setShowpassword] = useState(true)
    const [imagePath, setImagePath] = useState(null);
    const [t] = useTranslation()

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
    const [signin, setSignIn] = useState({

        mobileNumber: fetchProfile ?.mobile ? fetchProfile ?.mobile : '',
        password: '',
        name: fetchProfile ?.name ? fetchProfile ?.name : '',
        email: fetchProfile ?.email ? fetchProfile ?.email : '',

    });





    const updateProfileFunction = async () => {
        dispatch({
            type: 'LOADING',
            payload: true

        });
        const login = await AsyncStorage.getItem('login');

        let token = JSON.parse(login);

        var formdata = new FormData();
        formdata.append("name", signin.name);
        formdata.append("calling_code", state);
        formdata.append("mobile", signin.mobileNumber);
        formdata.append("id", fetchProfile.id);
        formdata.append("password", signin.password);


        imagePath && imagePath.forEach((item, i) => {
            formdata.append("image", {
                // uri: item.path,
                uri: Platform.OS === 'ios' ? `file:///${item.path}` : item.path,
                name: item.filename || item.path.split('/').pop(),

                type: item.type,
                // name: item.filename || `filename${i}.jpg`,
            });
        });

        axios.defaults.baseURL = 'https://aladdin.com.iq/api/';

        const api = axios.defaults.baseURL + 'update-provider-profile'

        console.log(api)
        console.log(formdata._parts)
        return fetch(api,
            {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + token,

                    "Content-Type": "multipart/form-data",
                    'Accept': 'application/json',
                },
                body: formdata,

            }).then(response => response.json())
            .then((responseJson) => {

                if (responseJson.status == '1') {

                    Alert.alert(responseJson.response[0])

                    ToastAndroid.showWithGravity(
                        'updated successfully!',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                    );
                    navigation.navigate('Home');
                    dispatch({
                        type: 'LOADING',
                        payload: false

                    });
                }
                else if (responseJson.status == '0') {
                    Alert.alert(responseJson.response[0])
                }
                // console.log('respon', responseJson)
            }).catch(function (error) {
                console.log(error)
            })

    }
    useEffect(() => {

        dispatch(ProfileData())
    }, [])

    useEffect(() => {

    }, [fetchProfile])



    const choosePhotoFromLibrary = () => {
        // setModalServices(false)
        var imagelist = [];

        ImagePicker.openPicker({
            isCamera: true,
            multipleShot: true,
            multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
            compressImageQuality: 0.8,
            maxFiles: 1,
            mediaType: 'any',
            // includeBase64: true,
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            image.map(item => {

                imagelist.push({
                    filename: 'image/jpeg',
                    path: item.path,
                    type: 'image/jpeg',
                })

            });

            imageUpload(imagelist)
        })
            .catch(e => console.log('error', e))
    }

    const imageUpload = (imagePath) => {
        setModalServices(false)

        console.log('imagePath', imagePath)
        setImagePath(imagePath)

    }



    const takePhotoFromCamera = () => {

        var imagelist = []
        ImagePicker.openCamera({
            multiple: true,
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {

            imagelist.push({
                filename: 'image/jpeg',
                path: image.path,
                type: 'image/jpeg',
            })
            imageUpload(imagelist)
        });
    }

    // ImgToBase64.getBase64String( image )
    //     .then( ( base64String ) => {
    //         setShowImage( base64String )
    //     } )
    //     .catch( err => console.log( err ) );

    const [state, setState] = useState('+964');

    const state_list = [
        { label: '+964', value: '+964' },
        { label: '+91', value: '+91' },
        { label: '+971', value: '+971' },

    ];


    return (
        <SafeAreaView style={styles.container}>
            {/* <SafeAreaView> */}
            <View style={styles.headerWrapper}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image resizeMode='contain' source={require('../../../assets/images/backwhitecolour.png')} style={styles.headerImage} />
                    </TouchableOpacity>
                    <Text style={styles.headerHeading}>{t('placeholders.profile.profileHeading')}</Text>
                </View>
            </View>
            <ScrollView style={{ paddingBottom: hp(10) }}>

                {(loading) &&
                    <View style={{ flex: 1, justifyContent: 'center', position: 'absolute', top: '35%', left: '40%' }}>

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
                <View style={styles.centerImageWrapper}>



                    {
                        imagePath ?
                            <Image source={{ uri: imagePath[0].path }} resizeMode='contain' style={styles.centerImage} />
                            : <Image source={{ uri: fetchProfile.user_image_url }} style={styles.centerImage2} />

                    }

                    <TouchableOpacity style={styles.cameraButtonWrapper} onPress={() => setModalServices(true)}>
                        <Image source={require('../../../assets/images/camera.png')} resizeMode='contain' style={styles.cameraImage} />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputHeadingWrapper}>
                    <Image source={require('../../../assets/images/userProfile.png')} resizeMode='contain' style={styles.headingImage} />
                    <Text style={styles.headingTextInput}>{t('placeholders.cart.Name')}</Text>

                </View>
                <View style={styles.inputWrapper}>
                    <TextInput
                        placeholder={'Enter your name  '}
                        placeholderTextColor={'#c2c2c2'}
                        value={signin.name}
                        onChangeText={(text) => { setSignIn({ ...signin, name: text }); seterror1('') }}
                        errortext={inbuiltstate.nameError}
                        style={styles.input}
                    />
                </View>
                {error1 !== "" ? <Text style={styles.errorHeading}>{error1}</Text> : null}

                <View style={styles.inputHeadingWrapper}>
                    <Image source={require('../../../assets/images/mail.png')} resizeMode='contain' style={styles.headingImage} />
                    <Text style={styles.headingTextInput}> {t('placeholders.cart.email')}</Text>

                </View>
                <View style={styles.inputWrapper}>
                    <TextInput
                        placeholder={t('placeholders.auth.enter_email')}
                        placeholderTextColor={'#c2c2c2'}
                        value={signin.email}
                        onChangeText={(text) => { setSignIn({ ...signin, email: text }); seterror1('') }}
                        editable={false}
                        // value={inbuiltstate.name}
                        // onChangeText={(text) => handlevalidate(text, 'name')}
                        errortext={inbuiltstate.nameError}
                        style={styles.input}
                    />
                </View>
                {error1 !== "" ? <Text style={styles.errorHeading}>{error1}</Text> : null}


                <View style={styles.inputHeadingWrapper}>
                    <Image source={require('../../../assets/images/lock.png')} resizeMode='contain' style={styles.headingImage} />
                    <Text style={styles.headingTextInput}> {t('placeholders.auth.password')}</Text>

                </View>
                <View style={styles.inputWrapper}>
                    <TextInput
                        placeholder={'*********'}
                        placeholderTextColor={'#c2c2c2'}
                        secureTextEntry={showpassword}
                        // secureTextEntry={true}
                        value={signin.password}
                        onChangeText={(text) => { setSignIn({ ...signin, password: text }); seterror2('') }}

                        errortext={inbuiltstate.passwordError}
                        style={{ width: wp(70), marginLeft: wp(4), paddingVertical: Platform.OS === 'ios' ? hp(2) : hp(2) }}
                    />

                    <TouchableOpacity onPress={() => setShowpassword(!showpassword)} style={{ alignItems: 'center', justifyContent: 'center', }}>

                        <Image style={styles.searchIcon} source={showpassword ? require('../../../assets/images/HidePassword.png') : require('../../../assets/images/show_Password_copy.png')} />

                    </TouchableOpacity>
                </View>
                {error2 !== "" ? <Text style={styles.errorHeading}>{error2}</Text> : null}

                <View style={styles.inputHeadingWrapper}>
                    <Image source={require('../../../assets/images/mobile.png')} resizeMode='contain' style={styles.mobileImage} />
                    <Text style={styles.headingTextInput}> {t('placeholders.auth.number')}</Text>

                </View>
                <View style={styles.inputWrapper}>
                    <TouchableOpacity style={{
                        borderColor: '#7c8791',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: wp(20),
                        paddingLeft: wp(1),
                        borderRightWidth: 1
                    }}>
                        <RNPickerSelect
                            onValueChange={(value) => setState(value)}
                            items={state_list}
                            value={state}
                            placeholder={{}}
                        >
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingHorizontal: wp(4)
                            }}>
                                {state_list.map(
                                    (item) =>
                                        item.value === state && (
                                            <Text
                                                key={item.value}
                                                style={{ fontSize: 12, color: '#000', fontFamily: 'Montserrat-Regular' }}>
                                                {item.label}
                                            </Text>
                                        )
                                )}
                                <Image source={require('../../../assets/images/Downarrow.png')} resizeMode='contain' style={{ height: hp(3), width: wp(8) }} />

                            </View>
                        </RNPickerSelect>

                    </TouchableOpacity>
                    <TextInput
                        placeholder={t('placeholders.auth.number_add')}
                        placeholderTextColor={'#c2c2c2'}
                        keyboardType='numeric'
                        // maxLength={15}
                        value={signin.mobileNumber}
                        onChangeText={(text) => { setSignIn({ ...signin, mobileNumber: text }); seterror('') }}

                        // value={inbuiltstate.mobNo}
                        // onChangeText={(text) => handlevalidate(text, 'mobNo')}
                        errortext={inbuiltstate.mobNoError}
                        style={{ width: wp(80), marginLeft: wp(3), color: '#000', paddingVertical: Platform.OS === 'ios' ? hp(2) : hp(2) }}
                    />
                </View>
                {error !== "" ? <Text style={styles.errorHeading}>{error}</Text> : null}



                <TouchableOpacity onPress={() => updateProfileFunction()}
                    style={styles.updateWrapper}>
                    <Text style={styles.headerHeading}> {t('placeholders.auth.update')}</Text>
                </TouchableOpacity>

            </ScrollView>
            <Modal animationType="slide"
                transparent={true}
                visible={modalServices}
                onRequestClose={() => {
                    setModalServices(false);
                }}>
                <View style={styles.modalWrapper}>
                    <View style={styles.modalCont}>
                        <View style={styles.panel}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={styles.panelTitle}>{t('placeholders.profile.upload')}</Text>
                                <Text style={styles.panelSubtitle}>{t('placeholders.profile.choose_picture')}</Text>
                            </View>
                            <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
                                <Text style={styles.panelButtonTitle}>{t('placeholders.profile.take_photo')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
                                <Text style={styles.panelButtonTitle}>{t('placeholders.profile.choose_librray')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.panelButton}
                                // onPress={() => this.bs.current.snapTo(1)}
                                onPress={() => setModalServices(false)}
                            >
                                <Text style={styles.panelButtonTitle}>{t('placeholders.bookingList.cancel')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </Modal>

        </SafeAreaView>
        // </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f7f5f1', },
    headerWrapper: { backgroundColor: '#9066e6', marginTop: Platform.OS == 'ios' ? -hp(5) : hp(0), paddingVertical: hp(2), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    headerRow: { flexDirection: 'row', alignItems: 'center' },
    headerImage: { height: hp(3), width: wp(8), marginRight: wp(6), marginLeft: wp(2) },
    headerHeading: { fontSize: 14, color: '#fff', fontFamily: "Montserrat-Bold" },
    centerImageWrapper: { height: hp(12), zIndex: 99999, position: 'relative', marginTop: hp('5'), justifyContent: 'center', alignSelf: 'center', width: wp(27), borderRadius: hp(50), borderWidth: 3, borderColor: '#9066e6' },
    centerImage: { height: hp(12), width: wp(26), borderRadius: hp(50) },
    centerImage2: { height: hp(10.6), width: wp(25), borderRadius: hp(50) },
    cameraButtonWrapper: { backgroundColor: '#9066e6', position: 'absolute', right: -7, top: 0, height: hp(5), width: wp(10), borderRadius: 50, borderWidth: 2, borderColor: '#fff', alignContent: 'center', justifyContent: 'center' },
    cameraImage: { height: hp(4), width: wp(8) },
    inputHeadingWrapper: { marginTop: hp(3), marginHorizontal: wp(5), flexDirection: 'row', alignItems: 'center' },
    headingImage: { height: hp(3), width: wp(8) },
    headingTextInput: { fontSize: 14, fontFamily: 'Montserrat-Bold', color: '#000' },
    inputWrapper: { marginHorizontal: wp(6), flexDirection: 'row', alignItems: 'center', elevation: 2, width: wp(90), marginTop: hp(1.5), backgroundColor: '#fff' },
    input: { width: wp(80), marginLeft: wp(4), fontFamily: 'Montserrat-Medium', paddingVertical: Platform.OS === 'ios' ? hp(2) : hp(2) },
    errorHeading: { marginLeft: wp(6), color: "red", textAlign: 'left', fontFamily: 'Montserrat-Medium' },
    mobileImage: { height: hp(3.5), width: wp(7.5) },
    updateWrapper: { marginHorizontal: wp(5), marginTop: hp(3), paddingVertical: hp(2), backgroundColor: '#9066e6', justifyContent: 'center', alignItems: 'center', marginBottom: hp(12) },
    modalWrapper: { flex: 1, backgroundColor: '#00000040', alignItems: 'center', justifyContent: 'center' },
    modalCont: { width: wp(90), backgroundColor: '#fff', justifyContent: 'center', borderRadius: 6, paddingVertical: hp(1) },
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
        shadowOffset: { width: -1, height: -3 },
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
});
