import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
} from 'react-native';
import {
  MONTSERRAT_BOLD,
  MONTSERRAT_REGULAR,
  MONTSERRAT_MEDIUM,
} from '../../scenes/styles/typography';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ARROW_WHITE, DOWN_ARROW } from '../../assets/icon';
import { useDispatch, useSelector } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import { BLACK, WHITE } from '../../scenes/styles/color';
import {
  editBooking,
  cancelBooking,
  deleteBooking,
} from '../../redux/Action/BookingAction';
import { useTranslation } from 'react-i18next';
import CheckBox from '@react-native-community/checkbox';
export default function SelectServices({ route, navigation }) {
  const [data, setdata] = useState([]);
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Car Services',
      imageServices: require('../../assets/images/carservices.png'),
    },
    {
      id: 2,
      name: 'Stiching',
      imageServices: require('../../assets/images/carservices.png'),
    },
    {
      id: 3,
      name: 'Satellite Technician',
      imageServices: require('../../assets/images/carservices.png'),
    },
    {
      id: 4,
      name: 'Beauty Salons',
      imageServices: require('../../assets/images/carservices.png'),
    },
    {
      id: 5,
      name: 'Painting & Decor',
      imageServices: require('../../assets/images/carservices.png'),
    },
    {
      id: 6,
      name: 'Mobile Maintenance',
      imageServices: require('../../assets/images/carservices.png'),
    },
  ]);
  const { loading } = useSelector(state => state.UserReducers);

  useEffect(() => {
    setdata(servicesShowed);
  }, [servicesShowed]);
  const servicesShowed = useSelector(
    state => state.ServiceReducer.servicesListData,
  );
  const onValueChange = (itemSelected, index) => {
    const newdata = data.map(item => {
      if (item.id == itemSelected.id) {
        return {
          ...item,
          selected: !item.selected,
        };
      }
      return {
        ...item,
        selected: item.selected,
      };
    });
    setdata(newdata);
  };

  const renderItem = ({ item, index }) => {
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
            // value={toggleCheckBox}
            onValueChange={() => onValueChange(item, index)}
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
          source={{ uri: item.category_image_url }}
          resizeMode="contain"
          style={{ height: hp(6), width: wp(14) }}
        />
      </View>
    );
  };

  var headingListId = [];
  const onShowItemSelected = () => {
    const listSelected = data.filter(item => item.selected == true);
    let contentAlert = '';
    listSelected.forEach(item => {
      // contentAlert = contentAlert + `${item.id}`;
      var headingtest = item.id;
      headingListId.push(headingtest);

      navigation.navigate('Registation', {
        serviceslist: headingListId,
      });

    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.headerAligner}>
          <TouchableOpacity
            style={{ width: wp(10) }}
            onPress={() => navigation.goBack()}>
            <Image source={ARROW_WHITE} style={styles.headerLeftImage} />
          </TouchableOpacity>
          <View
            style={{
              width: wp(70),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.headerCenterText}>{'Services'} </Text>
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

      <View
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
          source={require('../../assets/images/search.png')}
          style={{ height: hp(6), width: wp(6) }}
        />
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

      <FlatList
        data={servicesShowed}
        renderItem={renderItem}
        keyExtractor={item => `key-${item.id}`}
      />

      {/* {services.map(item => {
        return (
         
        );
      })} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  headerWrapper: {
    backgroundColor: '#9066e6',
    paddingVertical: hp(1.5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAligner: { flexDirection: 'row', alignItems: 'center' },
  headerLeftImage: {
    height: hp(4),
    width: wp(8),
    marginRight: wp(3),
    marginLeft: wp(2),
  },
  headerCenterText: { fontSize: 14, color: '#fff', fontFamily: MONTSERRAT_BOLD },
});
