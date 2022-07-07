
import { LANGUGAE, SET_LANGUGAE } from "../Constant/constants";
import { logistical } from '../../logistical'
import { Alert } from "react-native";
// import { GetServices } from "./ServiceAction";
// import { DashboardBooking, GetBookingList } from "./bookingAction";

export const AllLangugae = (data, navigation) => dispatch => {  
  dispatch( {
    type: 'LOADING',
    payload: true

  } ); 
  return new Promise(async (resolve, reject) => {

        const response = await logistical.get('/all-language', data);

        if (response.status == '1') {

            dispatch({
                type: LANGUGAE,
                langData: response.data.lang,
            });

            resolve(response);
            dispatch( {
              type: 'LOADING',
              payload: false
          
            } ); 
        }

        else {
            console.log('errrrrrrrrrrrrrrr>>>>>>>>>>>>>>>')
            reject(response);
        }
    });
};

export const ParticularLangugae = (  data, navigation ) => dispatch => {
    dispatch( {
        type: 'LOADING',
        payload: true

      } );
    return new Promise( async ( resolve, reject ) => {
  
      const response = await logistical.post( '/set-local/',data );
  
      console.log( '>>>>>>>>>>>>>>>>>>>>>>>>>>>ddddddddddddd', response.data.user )
  
      if ( response.status == '1' ) {
        
        dispatch({
            type: SET_LANGUGAE,
            selectlangData: response.data.user,
        });
        // dispatch(GetServices())
        // dispatch(GetBookingList())
        // dispatch(DashboardBooking())
      
        
        resolve( response );
        dispatch( {
            type: 'LOADING',
            payload: false
    
          } );
        // navigation.navigate("MainHome")
      }
  
      else {
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


