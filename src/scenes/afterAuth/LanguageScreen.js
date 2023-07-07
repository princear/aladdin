import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import {
  AllLangugae,
  ParticularLangugae,
} from '../../redux/Action/langugaeAction';
import { onCountBooking, RecentBookings } from '../../redux/Action/BookingAction';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LanguageScreen({ props, navigation }) {
  const [radioSelected, setradioSelected] = useState('1');
  const [currentLanguage, setLanguage] = useState('en');
  const [checkstatus, setCheckstatus] = useState('false');
  const { loading } = useSelector(state => state.UserReducers);

  const [type, setType] = useState();
  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => {
        setLanguage(value);
        if (value === 'en') {
          AsyncStorage.setItem('long', 'en');
          i18n.changeLanguage('en');
        } else if (value === 'ku') {
          AsyncStorage.setItem('long', 'ku');
          i18n.changeLanguage('ku');
        } else if (value === 'ar') {
          AsyncStorage.setItem('long', 'ar');
          i18n.changeLanguage('ar');
        } else {
          AsyncStorage.setItem('long', 'en');
          i18n.changeLanguage('en');
        }
      })
      .catch(err => console.log(err));
  };

  const radioClick = (id, code) => {
    setradioSelected(id);
    setType(id);
    changeLanguage(code);
    dispatch(ParticularLangugae({ language_id: id }, navigation));

    dispatch(onCountBooking(navigation));

    // RNRestart.Restart();
  };
  const [t, i18n] = useTranslation();

  const dispatch = useDispatch();

  const showLangugae = useSelector(state => state.langugaeReducer.langData);

  useEffect(() => {
    dispatch(AllLangugae(navigation));
  }, []);

  useEffect(() => {
    dispatch(onCountBooking(navigation));
  }, []);

  async function updatecheckstatus() {
    const status = await AsyncStorage.getItem('long');

    setCheckstatus(status);

    if (status) {
      i18n.changeLanguage(status);
    }
  }


  useEffect(() => {
    updatecheckstatus();
  }, [currentLanguage]);

  const languageList = [
    {
      id: 1,
      heading: 'Engish',
      language: 'en',
    },
    {
      id: 2,
      heading: 'Arabic',
      language: 'Ar',
    },
    {
      id: 3,
      heading: 'Kurd',
      language: 'Kn',
    },
  ];

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: '#9066e6',
          paddingVertical: hp(2),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              resizeMode="contain"
              source={require('../../assets/images/left-arrow.png')}
              style={{
                height: hp(3),
                width: wp(8),
                marginRight: wp(6),
                marginLeft: wp(2),
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 14,
              color: '#fff',
              fontFamily: 'Montserrat-Bold',
            }}>
            {t('placeholders.language.chose_language')}
          </Text>
        </View>
      </View>

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

      <View style={{ marginHorizontal: wp(5) }}>
        <Image
          source={require('../../assets/images/translate.png')}
          style={styles.translateImage}
          resizeMode="contain"
        />
        <View>
          <Text style={styles.headinglanguage}>
            {t('placeholders.language.prefered_language')}
          </Text>
          <Text style={styles.subheadinglanugauge}>
            {t('placeholders.language.select_language')}
          </Text>

          {showLangugae?.map(item => {
            return (
              <View style={styles.langugaeWrapper}>
                <Text style={styles.languageText}>
                  {item.language_name}({item.language_code})
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    key={item.id}
                    onPress={radioClick.bind(
                      this,
                      item.id,
                      item.language_code,
                    )}>
                    <View
                      style={{
                        height: 24,
                        width: 24,
                        borderRadius: 12,
                        borderWidth: 2,
                        borderColor: '#9066e6',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {checkstatus === item.language_code ? (
                        <View
                          style={{
                            height: 12,
                            width: 12,
                            borderRadius: 6,
                            backgroundColor: '#9066e6',
                          }}
                        />
                      ) : null}
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingHorizontal:wp(5)
  },
  translateImage: {
    height: hp(26),
    width: wp(45),
    marginTop: hp(2),
  },
  headinglanguage: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    color: '#000',
    paddingTop: hp(2),
  },
  subheadinglanugauge: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#000',
    paddingTop: hp(1),
  },
  langugaeWrapper: {
    paddingVertical: hp(2),
    borderRadius: 10,
    borderWidth: 1,
    marginTop: hp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
  },
  languageText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#000',
  },
});
