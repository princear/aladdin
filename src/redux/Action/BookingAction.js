import { Alert, } from 'react-native';
import { COUNT, BOOKINGLIST, BOOKING_LIST_ID } from '../Constant/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logistical } from '../../logistical';



export const onCountBooking = (data, navigation) => dispatch => {

    dispatch({
        type: 'LOADING',
        payload: true
    });
    return new Promise(async (resolve, reject) => {

        const response = await logistical.get('/get-count-provider-bookings', data);

        if (response.status == '1') {
            dispatch({
                type: COUNT,
                countData: response.data.data,
            });

            resolve(response);
            dispatch({
                type: 'LOADING',
                payload: false

            });
        }

        else if (response.status == '0') {

            Alert.alert(response.response[0])
            dispatch({

                type: 'LOADING',
                payload: false

            });
        }

        else {
            // Alert.alert(response.message)
            Alert.alert(response.response[0])
            dispatch({

                type: 'LOADING',
                payload: false

            });
            console.log('errrrrrrrrrrrrrrr>>>>>>>>>>>>>>>')
            reject(response);
        }
    });
};



export const onALlBooking = (data, navigation) => dispatch => {

    dispatch({
        type: 'LOADING',
        payload: true
    });
    return new Promise(async (resolve, reject) => {

        const response = await logistical.get('/get-provider-booking-details', data);

        if (response.status == '1') {
            dispatch({
                type: BOOKINGLIST,
                bookingListData: response.data.bookings,
            });

            resolve(response);
            dispatch({
                type: 'LOADING',
                payload: false

            });
        }

        else if (response.status == '0') {

            Alert.alert(response.response[0])
            dispatch({

                type: 'LOADING',
                payload: false

            });
        }

        else {
            // Alert.alert(response.message)
            Alert.alert(response.response[0])
            dispatch({

                type: 'LOADING',
                payload: false

            });
            console.log('errrrrrrrrrrrrrrr>>>>>>>>>>>>>>>')
            reject(response);
        }
    });
};

export const particularBookingId = (b_id, data, navigation) => dispatch => {

    dispatch({
        type: 'LOADING',
        payload: true
    });
    return new Promise(async (resolve, reject) => {

        // console.log('b_Id', b_id)

        const response = await logistical.get('/get-provider-product-booking-details/' + b_id);
        // console.log('respomsne=%%%%%%%%%%%%%%%%%%%%%%=====>', response)

        if (response.status == '1') {

            //  console.log('respomsne======>', response.data)

            dispatch({
                type: BOOKING_LIST_ID,
                particularListData: response.data,
            });

            resolve(response);
            dispatch({
                type: 'LOADING',
                payload: false

            });
        }

        else if (response.status == '0') {

            Alert.alert(response.response[0])
            dispatch({

                type: 'LOADING',
                payload: false

            });
        }

        else {
            // Alert.alert(response.message)
            Alert.alert(response.response[0])
            dispatch({

                type: 'LOADING',
                payload: false

            });
            console.log('errrrrrrrrrrrrrrr>>>>>>>>>>>>>>>')
            reject(response);
        }
    });
};

