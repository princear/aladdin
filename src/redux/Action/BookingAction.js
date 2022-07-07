import { Alert, } from 'react-native';
import { COUNT, BOOKINGLIST, BOOKING_LIST_ID, EDIT_BOOKING, CANCEL_BOOKING, DELETE_BOOKING, RECENT_BOOKINGS } from '../Constant/constants';
import { logistical } from '../../logistical';



export const onCountBooking = ( data, navigation ) => dispatch => {

    dispatch( {
        type: 'LOADING',
        payload: true
    } );
    return new Promise( async ( resolve, reject ) => {

        const response = await logistical.get( '/get-count-provider-bookings', data );

        if ( response.status == '1' ) {
            dispatch( onALlBooking() )
            dispatch( {
                type: COUNT,
                countData: response.data.data,
            } );
            // dispatch( {
            //     type: BOOKINGLIST,
            //     bookingListData: response.data.bookings,
            // } );

            resolve( response );
            dispatch( {
                type: 'LOADING',
                payload: false

            } );
        }

        else if ( response.status == '0' ) {

            Alert.alert( response.response[0] )
            dispatch( {

                type: 'LOADING',
                payload: false

            } );
        }

        else {
            // Alert.alert(response.message)
            Alert.alert( response.response[0] )
            dispatch( {

                type: 'LOADING',
                payload: false

            } );
            console.log( 'errrrrrrrrrrrrrrr>>>>>>>>>>>>>>>' )
            reject( response );
        }
    } );
};



export const onALlBooking = ( data, navigation ) => dispatch => {

    dispatch( {
        type: 'LOADING',
        payload: true
    } );
    return new Promise( async ( resolve, reject ) => {

        const response = await logistical.get( '/get-provider-booking-details', data );

        if ( response.status == '1' ) {
            dispatch( {
                type: BOOKINGLIST,
                bookingListData: response.data.bookings,
            } );

            resolve( response );
            dispatch( {
                type: 'LOADING',
                payload: false

            } );
        }

        else if ( response.status == '0' ) {

            Alert.alert( response.response[0] )
            dispatch( {

                type: 'LOADING',
                payload: false

            } );
        }

        else {
            // Alert.alert(response.message)
            Alert.alert( response.response[0] )
            dispatch( {

                type: 'LOADING',
                payload: false

            } );
            console.log( 'errrrrrrrrrrrrrrr>>>>>>>>>>>>>>>' )
            reject( response );
        }
    } );
};

export const particularBookingId = ( data, navigation ) => dispatch => {

    dispatch( {
        type: 'LOADING',
        payload: true
    } );
    return new Promise( async ( resolve, reject ) => {

        const response = await logistical.get( '/get-provider-product-booking-details/' + data );

        if ( response.status == '1' ) {


            dispatch( {
                type: BOOKING_LIST_ID,
                particularListData: response.data,
            } );

            resolve( response );
            dispatch( {
                type: 'LOADING',
                payload: false

            } );
        }

        else if ( response.status == '0' ) {

            Alert.alert( response.response[0] )
            dispatch( {

                type: 'LOADING',
                payload: false

            } );
        }

        else {
            // Alert.alert(response.message)
            Alert.alert( response.response[0] )
            dispatch( {

                type: 'LOADING',
                payload: false

            } );
            console.log( 'errrrrrrrrrrrrrrr>>>>>>>>>>>>>>>' )
            reject( response );
        }
    } );
};

export const editBooking = ( data, navigation ) => dispatch => {

    dispatch( {
        type: 'LOADING',
        payload: true
    } );
    return new Promise( async ( resolve, reject ) => {

        const response = await logistical.post( '/get-provider-status-change', data );
        console.log( 'response', response )

        if ( response.status == '1' && response.message == 'Your Booking Status is Successfully Changed' ) {

            dispatch( onALlBooking( response.data ) )
            dispatch( {
                type: EDIT_BOOKING,
                editBookingData: response.data,
            } );
            dispatch( onCountBooking() )


            resolve( response );

            navigation.navigate( 'Home' )

            // Alert.alert(
            //     'Status Changed',
            //     'Press ok to confirm change status', [{
            //         text: 'Cancel',
            //         onPress: () => console.log( 'Cancel Pressed' ),
            //         style: 'cancel'
            //     }, {
            //         text: 'OK',
            //         onPress: () => navigation.navigate( 'Home' )
            //     },], {
            //     cancelable: false
            // }
            // )
            // navigation.navigate('Home');

            dispatch( {

                type: 'LOADING',
                payload: false

            } );
        }

        else if ( response.status == '0' && response.message == 'invalid_credentials' ) {

            Alert.alert( response.response[0] )
            dispatch( {

                type: 'LOADING',
                payload: false

            } );
        }

        else {
            // Alert.alert(response.message)
            Alert.alert( response.response[0] )
            dispatch( {

                type: 'LOADING',
                payload: false

            } );
            console.log( 'errrrrrrrrrrrrrrr>>>>>>>>>>>>>>>' )
            reject( response );
        }
    } );
};


export const cancelBooking = ( data, navigation ) => dispatch => {

    dispatch( {
        type: 'LOADING',
        payload: true
    } );

    console.log( "cancellll booking >>>>>>>>>>", data );
    return new Promise( async ( resolve, reject ) => {

        const response = await logistical.post( '/get-provider-booking-canceled', data );
        console.log( 'response', response )

        if ( response.status == '1' ) {

            dispatch( onALlBooking() )

            dispatch( {
                type: CANCEL_BOOKING,
                cancelBookingData: response.data,
            } );

            dispatch( onCountBooking() )


            Alert.alert(
                'Cancel Booking',
                'Press ok to confirm', [{
                    text: 'Cancel',
                    onPress: () => console.log( 'Cancel Pressed' ),
                    style: 'cancel'
                }, {
                    text: 'OK',
                    onPress: () => navigation.navigate( 'Home' )
                },], {
                cancelable: false
            }
            )
            resolve( response );
            // navigation.navigate('Home');

            dispatch( {

                type: 'LOADING',
                payload: false

            } );
        }

        else if ( response.status == '0' && response.message == 'invalid_credentials' ) {

            Alert.alert( response.response[0] )
            dispatch( {

                type: 'LOADING',
                payload: false

            } );
        }

        else {
            // Alert.alert(response.message)
            Alert.alert( response.response[0] )
            dispatch( {

                type: 'LOADING',
                payload: false

            } );
            console.log( 'errrrrrrrrrrrrrrr>>>>>>>>>>>>>>>' )
            reject( response );
        }
    } );
};
export const deleteBooking = ( data, navigation ) => dispatch => {

    dispatch( {
        type: 'LOADING',
        payload: true
    } );

    console.log( "cancellll booking >>>>>>>>>>", data );
    return new Promise( async ( resolve, reject ) => {

        const response = await logistical.get( '/booking-delete/' + data );
        console.log( 'response', response )

        if ( response.status == '1' ) {

            // const abvc = () => {
            dispatch( {
                type: DELETE_BOOKING,
                deleteBookingData: response.data,
            } );
            navigation.navigate( 'Home' )
            // }



            // Alert.alert(
            //     'Delete Booking',
            //     'Are you sure you want to delete booking', [{
            //         text: 'Cancel',
            //         onPress: () => console.log( 'Cancel Pressed' ),
            //         style: 'cancel'
            //     }, {
            //         text: 'OK',
            //         onPress: () => abvc()
            //     },], {
            //     cancelable: false
            // }
            // )
            resolve( response );
            // navigation.navigate('Home');

            dispatch( {

                type: 'LOADING',
                payload: false

            } );
        }

        else {
            // Alert.alert(response.message)
            Alert.alert( response.response[0] )
            dispatch( {

                type: 'LOADING',
                payload: false

            } );
            console.log( 'errrrrrrrrrrrrrrr>>>>>>>>>>>>>>>' )
            reject( response );
        }
    } );
};


export const RecentBookings = ( data, navigation ) => dispatch => {

    dispatch( {
        type: 'LOADING',
        payload: true
    } );

    console.log( "recenttt booking >>>>>>>>>>", data );
    return new Promise( async ( resolve, reject ) => {

        const response = await logistical.post( '/get-filter-bookings', data );
        console.log( 'response', response )

        if ( response.status == '1' ) {

            console.log( 'hjhjeshjshjsjs' )
            dispatch( {
                type: RECENT_BOOKINGS,
                recentBookingData: response.data.bookings,
            } );

            resolve( response );
            // navigation.navigate('Home');

            dispatch( {

                type: 'LOADING',
                payload: false

            } );
        }

        else if ( response.status == '0' ) {

            Alert.alert( response.response[0] )
            dispatch( {

                type: 'LOADING',
                payload: false

            } );
        }

        else {
            // Alert.alert(response.message)
            Alert.alert( response.response[0] )
            dispatch( {

                type: 'LOADING',
                payload: false

            } );
            console.log( 'errrrrrrrrrrrrrrr>>>>>>>>>>>>>>>' )
            reject( response );
        }
    } );
};