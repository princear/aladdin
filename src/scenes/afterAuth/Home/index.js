import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, BackHandler, FlatList, Button, ScrollView, } from 'react-native';
import { BLACK, GREY_6C, LIGHT_BLUE, WHITE } from '../../styles/color';
import { HOME_HEADING, SPLASH, BLUE_BOX_ARROW, BAR, SEARCH,CLOCK,DATE } from '../../../assets/icon';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MONTSERRAT_BLACK, MONTSERRAT_BOLD, MONTSERRAT_REGULAR } from '../../styles/typography';
import { SafeAreaView } from 'react-native-safe-area-context';
import DatePicker from 'react-native-date-picker'
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";


export default function Home(props) {

  const [bookings, setBookings] = useState([
    {
      id: 1,
      color: '#2ea749',
      image: require('../../../assets/images/Booking.png'),
      title: 'Completed Booking',
      number: '100',
    },
    {
      id: 2,
      color: '#f2ac00',
      image: require('../../../assets/images/Booking.png'),
      title: 'Pending Booking',
      number: '50',
    },
    {
      id: 3,
      color: '#23a2b7',
      image: require('../../../assets/images/Booking.png'),
      title: 'Approved Booking',
      number: '5',
    },
    {
      id: 4,
      color: '#157dfc',
      image: require('../../../assets/images/Booking.png'),
      title: 'In Progress Booking',
      number: '140',
    },
    {
      id: 5,
      color: '#da3348',
      image: require('../../../assets/images/Booking.png'),
      title: 'Cancelled Booking',
      number: '21',
    },
    {
      id: 6,
      color: '#6c757d',
      image: require('../../../assets/images/WalkInBookings.png'),
      title: 'Walk-In Booking',
      number: '1',
    },
    {
      id: 7,
      color: '#23a2b7',
      image: require('../../../assets/images/Booking.png'),
      title: 'Online Booking',
      number: '32',
    },
    {
      id: 8,
      color: '#343a40',
      image: require('../../../assets/images/TotalCustomers.png'),
      title: 'Total Customers',
      number: '425',
    },
    {
      id: 9,
      color: '#2ea749',
      image: require('../../../assets/images/TotalEarnings.png'),
      title: 'Total Earings',
      number: '1200',
    }
  ]);
  const [listing, setListing] = useState([
    {
      id: 1,
      image: require('../../../assets/images/user.jpg'),
      number: '+91-9874563210',
      email: 'nitika@delimp.com',
      content: 'IF8 6Kg 5 Star Aqua Energie , Laundry Add, Tub Clean, Fully Automatic Front Load With in-built Heater White (Diva Aqua VX)#JustHere x 1',
      date: "2022-02-04",
      time:"11:30 Pm"
    },
    {
      id: 2,
      image: require('../../../assets/images/user.jpg'),
      number: '+91-9874563210',
      email: 'abc@delimp.com',
      content: 'IF8 6Kg 5 Star Aqua Energie , Laundry Add, Tub Clean, Fully Automatic Front Load With in-built Heater White (Diva Aqua VX)#JustHere x 1',
      date: "2022-02-04",
      time:"11:30 Pm"
    },
 

  ]);
  const [date, setDate] = useState(new Date(1598051730000));
  const [date2, setDate2] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);
  const [showfix, setShowFix] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
  const onChange2 = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowFix(Platform.OS === 'ios');
    setDate2(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setShowFix(false);
  };
  const showMode2 = (currentMode) => {
    setShow(false);
    setShowFix(true);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showDatepicker2 = () => {
    showMode2('date');
  };

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#9066e6', paddingVertical: hp(1), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity>
            <Image source={BAR} style={{ height: hp(5), width: wp(10), marginRight: wp(6), marginLeft: wp(2) }} />
          </TouchableOpacity>
          <Text style={{ fontSize: 14, color: '#fff', fontFamily: MONTSERRAT_BOLD }}>DashBoard</Text>
        </View>
        <TouchableOpacity>
          <Image source={SEARCH} resizeMode='contain' style={{ height: hp(4), width: wp(12) }} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{paddingBottom:hp(2)}}>
      <View style={{marginTop:hp(2),marginHorizontal:wp(5)}}>
      <Text  style={{fontFamily: MONTSERRAT_BOLD, fontSize:13,color: BLACK}}>Date Rag</Text>

      </View>
      <TouchableOpacity onPress={showDatepicker} style={{ marginTop: hp(2), backgroundColor: WHITE, marginHorizontal: wp(5), paddingVertical: hp(1.5), elevation: 2 }}>
        <Text style={{ fontFamily: MONTSERRAT_REGULAR, fontSize: 14, paddingLeft: wp(3), color: '#c2c2c2' }}>{moment(date).format("DD-MM-YYYY ")}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={showDatepicker2} style={{ marginTop: hp(3), backgroundColor: WHITE, marginHorizontal: wp(5), paddingVertical: hp(1.5), elevation: 2 }}>
        <Text style={{ fontFamily: MONTSERRAT_REGULAR, fontSize: 14, paddingLeft: wp(3), color: '#c2c2c2' }}>{moment(date2).format("DD-MM-YYYY ")}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{justifyContent:'center', alignItems:'center', backgroundColor:'#9066e6',width:wp(50), borderRadius:20, paddingVertical:hp(1.2),marginVertical:hp(2),alignSelf:'center'}}>
        <Text style={{fontFamily: MONTSERRAT_BOLD, fontSize:13,color: WHITE}}>Apply</Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode='date'
          display="default"
          onChange={onChange}
        />
      )}
      {showfix && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode='date'
          display="default"
          onChange={onChange2}
        />
      )}

      <View style={{ marginLeft: wp(1) }}>
        <Text style={{ fontSize: 14, marginLeft: wp(3), fontFamily: MONTSERRAT_BOLD, color: '#000', marginVertical: hp(2) }}>Total Booking : 0</Text>
        <FlatList
          data={bookings}
          keyExtractor={(item, index) => index}
          // horizontal={false}
          numColumns={3}
          renderItem={({ item, index }) => (
            <View style={{ justifyContent: 'center', marginLeft: wp(2), marginTop: hp(1) }}>
              <TouchableOpacity onPress={() => props.navigation.navigate('BookingServices')} style={{ height: hp(16), width: wp(30), backgroundColor: item.color, alignItems: 'center', borderRadius: 4, justifyContent: 'center' }}>
                <Image source={item.image} resizeMode='contain' style={{ height: hp(5), width: wp(10), }} />
                <Text style={{ color: '#fff', fontSize: 15, fontFamily: MONTSERRAT_BOLD, marginTop: hp(2) }}>{item.number}</Text>
              </TouchableOpacity>
              <Text style={{ fontFamily: MONTSERRAT_BOLD, fontSize: 10, color: '#000', textAlign: 'center' }}>{item.title}</Text>
            </View>
          )}
        />
      </View>

        <View>
          <View style={{marginBottom:hp(2)}}>

        
        <Text style={{ fontSize: 14, marginLeft: wp(3), fontFamily: MONTSERRAT_BOLD, color: '#000', marginTop: hp(4) }}>Recent Booking</Text>

      <FlatList
          data={listing}
          keyExtractor={(item, index) => index}
          // horizontal={false}
          numColumns={1}
          renderItem={({ item, index }) => (
            <View style={{flexDirection:'row',elevation:2,backgroundColor:WHITE,width:wp(94),paddingVertical:hp(2),marginTop:hp(2),marginHorizontal:wp(3),borderRadius:4}}>
            <View style={{width:wp(35),alignItems:'center',justifyContent:'center', borderRightWidth:1,borderRightColor: '#c2c2c2'}}>
                <Image source={item.image} resizeMode='contain' style={{width:wp(30),height:wp(15)}}/>
                <Text style={{fontFamily: MONTSERRAT_REGULAR, fontSize:12,color: BLACK}}>{item.email}</Text>
                <Text style={{fontFamily: MONTSERRAT_REGULAR, fontSize:12,color: BLACK}}>{item.number}</Text>
            </View>
            <View style={{width:wp(58),paddingHorizontal:wp(1)}}>
            <Text style={{fontFamily: MONTSERRAT_REGULAR, fontSize:10,color: BLACK,paddingLeft:wp(1),lineHeight:15}}>{item.content}</Text>
              <View style={{marginTop:hp(1), flexDirection:'row', alignItems:'center'}}>
                <Image source={CLOCK} resizeMode='contain' style={{height:hp(3), width:wp(6)}}/>
                <Text style={{fontFamily: MONTSERRAT_REGULAR, fontSize:10,color: '#c2c2c2',}}> {item.date}</Text>
                <Image source={DATE} resizeMode='contain' style={{height:hp(3), width:wp(6),marginLeft:wp(1)}}/>
                <Text style={{fontFamily: MONTSERRAT_REGULAR, fontSize:10,color: '#c2c2c2',}}> {item.time}</Text>

                </View>
                <View style={{flexDirection:'row', alignItems:'flex-end',marginTop:hp(1)}}>

                <TouchableOpacity onPress={() => props.navigation.navigate('Booking')} style={{backgroundColor:'#9066e6',marginLeft:wp(2.5),borderRadius:2,paddingVertical:wp(1),width:wp(25),justifyContent:'center',alignItems:'center'}}>
                  <Text style={{color: WHITE, fontSize:11,fontFamily:MONTSERRAT_BOLD}}>Approved</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:WHITE ,marginLeft:wp(1),borderRadius:2,borderColor:'#c2c2c2', borderWidth:1,paddingVertical:wp(1),width:wp(28),justifyContent:'center',alignItems:'center'}}>
                  <Text style={{color: '#000', fontSize:11,fontFamily:MONTSERRAT_BOLD}}>Send Reminder</Text>
                </TouchableOpacity>
                </View>
            </View>
        </View>
          )}
        />
          </View>
      </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f5f1',},
  containerText: { fontSize: 27, color: '#000' },
});
