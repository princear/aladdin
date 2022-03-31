import { Alert, } from 'react-native';
import { COUNT } from '../Constant/constants';
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


