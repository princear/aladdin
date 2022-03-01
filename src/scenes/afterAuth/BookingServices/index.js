import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Modal, TextInput } from 'react-native';
import { MONTSERRAT_BOLD, MONTSERRAT_REGULAR } from '../../styles/typography';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ARROW_WHITE, CLOSE_BUTTON, SEARCH, SERACH_GREY, WHITE_EDIT, DELETE, EYE } from '../../../assets/icon';
import { BLACK, WHITE } from '../../styles/color';

export default function BookingServices(props) {

    const [services, setServices] = useState([
        {
            id: 1,
            name: 'Cleaning',
            location: "New York, USA",
            Category: "Cleaning & Home Maids",
            Price: "$256.00",
            DiscountPrice: "$250.00",
            AssignEmployee: "------",
            Status: "Active",
            image: require('../../../assets/images/serices.jpg')

        }
    ]);
    const [modalServices, setModalServices] = useState(false);


    return (
        <View style={styles.container}>
            <View style={styles.headerWrapper}>
                <View style={styles.headerAligner}>
                    <TouchableOpacity>
                        <Image source={ARROW_WHITE} style={styles.headerLeftImage} />
                    </TouchableOpacity>
                    <Text style={styles.headerCenterText}>Book Service</Text>
                </View>
            </View>

            <View style={styles.searchWrapper}>
                <TextInput
                    style={styles.searchInput}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder={'Search Customer by name, email '}
                    keyboardType="default"
                    returnKeyType="done"
                    autoCapitalize="none"
                //   value={filterData}
                //   onChangeText={(text) => SearchFilterFunction(text)}
                />
                <TouchableOpacity>
                    <Image source={SERACH_GREY} resizeMode='contain' style={styles.searchRightImage} />
                </TouchableOpacity>
            </View>


            <FlatList
                data={services}
                keyExtractor={(item, index) => index}
                // horizontal={false}
                numColumns={1}
                renderItem={({ item, index }) => (
                    <View style={styles.listingWrapper}>
                        <View style={styles.leftWrapper}>
                            <Image source={item.image} resizeMode='contain' style={styles.leftImageWrapper} />
                        </View>
                        <View style={{ width: wp(60) }}>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={styles.rightHeaderTextWrapper}>Name :</Text>
                                <Text style={styles.rightSubHeadingwrapper}>{item.name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={styles.rightHeaderTextWrapper}>Location</Text>
                                <Text style={styles.rightSubHeadingwrapper}>{item.location}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={styles.rightHeaderTextWrapper}>Category</Text>
                                <Text style={[styles.rightSubHeadingwrapper, { width: wp(35) }]}>{item.Category}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={styles.rightHeaderTextWrapper}>Price</Text>
                                <Text style={styles.rightSubHeadingwrapper}>{item.Price}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={styles.rightHeaderTextWrapper}>Discount Price:</Text>
                                <Text style={styles.rightSubHeadingwrapper}>{item.DiscountPrice}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={styles.rightHeaderTextWrapper}>Assign Employee</Text>
                                <Text style={styles.rightSubHeadingwrapper}> {item.AssignEmployee}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.rightHeaderTextWrapper}>Status :</Text>
                                <TouchableOpacity onPress={() => props.navigation.navigate('CustomerServices')} style={styles.statusWrapper}>
                                    <Text style={[styles.rightSubHeadingwrapper, { color: WHITE }]}>{item.Status}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: hp(2) }}>
                                <TouchableOpacity onPress={() => setModalServices(true)} style={styles.editButtonWrapper}>
                                    <Image source={WHITE_EDIT} resizeMode='contain' style={styles.editButtonImage} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.viewButtonWrapper}>
                                    <Image source={EYE} resizeMode='contain' style={styles.editButtonImage} />
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.viewButtonWrapper, { backgroundColor: 'red' }]}>
                                    <Image source={DELETE} resizeMode='contain' style={styles.editButtonImage} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            />

            <Modal animationType="slide"
                transparent={false}
                visible={modalServices}
                onRequestClose={() => {
                    setModalServices(false);
                }}>
                <View style={styles.modalWrapper}>
                    <View style={styles.modalCont}>
                        <View style={styles.headerAligner2}>
                            <View style={{ width: wp(80), }}>
                                <Text style={styles.modalHeadingCenter}>Services</Text>
                            </View>
                            <TouchableOpacity onPress={() => setModalServices(false)}>
                                <Image source={CLOSE_BUTTON} resizeMode='contain' style={styles.closeButtonImage} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.lineWrapper} />
                        <View style={{ flexDirection: 'row', }}>
                            <View style={{ width: wp(25), }}>
                                <Image source={require('../../../assets/images/serices.jpg')} resizeMode='contain' style={styles.modalLeftImage} />
                            </View>
                            <View style={{ width: wp(64), }}>
                                <Text style={styles.servicesHeadingWrapper}>Services Name </Text>
                                <Text style={styles.servicesSubHeadingWrapper}>Miss & Chief Mini Racing 4 Channel radio control RC car(orange )#JustHere </Text>

                                <View style={{ flexDirection: 'row', marginTop: hp(1.5) }}>
                                    <View style={{ width: wp(21.3) }}>
                                        <Text style={styles.servicesHeadingWrapper}>Percentage</Text>
                                        <Text style={styles.servicesSubHeadingWrapper}>0%</Text>
                                    </View>
                                    <View style={{ width: wp(21.3) }}>
                                        <Text style={styles.servicesHeadingWrapper}>Discount</Text>
                                        <Text style={styles.servicesSubHeadingWrapper}>Percent</Text>
                                    </View>
                                    <View style={{ width: wp(21.3) }}>
                                        <Text style={styles.servicesHeadingWrapper}>Location</Text>
                                        <Text style={styles.servicesSubHeadingWrapper}>Jaipur</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: hp(1.5) }}>
                                    <View style={{ width: wp(21.3) }}>
                                        <Text style={styles.servicesHeadingWrapper}>Category</Text>
                                        <Text style={styles.servicesSubHeadingWrapper}>Skin</Text>

                                    </View>
                                    <View style={{ width: wp(21.3) }}>
                                        <Text style={styles.servicesHeadingWrapper}>Tax</Text>
                                        <Text style={styles.servicesSubHeadingWrapper}>GST-18%</Text>

                                    </View>

                                </View>
                            </View>

                        </View>
                        <View style={styles.descriptionHeadingWrapper}>
                            <Text style={styles.servicesHeadingWrapper}>Description </Text>
                            <Text style={styles.servicesSubHeadingWrapper}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled </Text>

                        </View>
                    </View>
                </View>

            </Modal>


        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#c2c2c2' },
    headerWrapper: { backgroundColor: '#9066e6', paddingVertical: hp(1.5), flexDirection: 'row', alignItems: 'center' },
    headerAligner: { flexDirection: 'row', alignItems: 'center' },
    headerLeftImage: { height: hp(4), width: wp(8), marginRight: wp(3), marginLeft: wp(2) },
    headerCenterText: { fontSize: 14, color: '#fff', fontFamily: MONTSERRAT_BOLD },
    searchWrapper: { backgroundColor: WHITE, marginHorizontal: wp(5), alignItems: 'center', marginTop: hp(2), justifyContent: 'center', flexDirection: 'row', },
    searchInput: { width: wp(75), borderRightWidth: 1, borderColor: '#c2c2c2' },
    searchRightImage: { height: hp(5), width: wp(12), marginLeft: wp(2) },
    listingWrapper: { paddingVertical: hp(1), flexDirection: 'row', elevation: 2, backgroundColor: WHITE, marginTop: hp(2), marginHorizontal: wp(5), borderRadius: 4 },
    leftWrapper: { width: wp(30), alignItems: 'center' },
    leftImageWrapper: { height: hp(18), width: wp(25) },
    rightHeaderTextWrapper: { width: wp(25), color: BLACK, fontFamily: MONTSERRAT_BOLD, fontSize: 11 },
    rightSubHeadingwrapper: { color: BLACK, fontFamily: MONTSERRAT_REGULAR, fontSize: 11 },
    statusWrapper: { backgroundColor: '#2ea749', paddingVertical: hp(.8), alignItems: 'center', width: wp(20), borderRadius: 8 },
    editButtonWrapper: { backgroundColor: '#23a2b7', height: hp(3.5), width: wp(7), justifyContent: 'center', alignItems: 'center', borderRadius: 4 },
    editButtonImage: { height: hp(3.5), width: wp(6) },
    viewButtonWrapper: { marginLeft: wp(3), backgroundColor: '#2ea749', height: hp(3.5), width: wp(7), justifyContent: 'center', alignItems: 'center', borderRadius: 4 },
    modalWrapper: {flex: 1,backgroundColor: '#00000040',justifyContent: 'center', alignItems: 'center'},
    modalCont: {width: wp(90),backgroundColor: WHITE,justifyContent: 'center',borderRadius: 6,paddingVertical: hp(1)},
    headerAligner2: { flexDirection: 'row', alignItems: 'center', },
    modalHeadingCenter: { color: BLACK, textAlign: 'center', fontSize: 14, fontFamily: MONTSERRAT_BOLD },
    closeButtonImage: { height: hp(4), width: wp(6) },
    lineWrapper: { width: wp(90), height: hp(.2), backgroundColor: '#c2c2c2', marginVertical: hp(1) },
    modalLeftImage: { marginLeft: wp(1), height: hp(15), width: wp(20) },
    servicesHeadingWrapper: { fontFamily: MONTSERRAT_BOLD, fontSize: 12, color: BLACK },
    servicesSubHeadingWrapper: { fontFamily: MONTSERRAT_REGULAR, fontSize: 12, color: BLACK, },
    descriptionHeadingWrapper:{ marginHorizontal: wp(5), paddingBottom: hp(2), marginTop: hp(1) }

});
