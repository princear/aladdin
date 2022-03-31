import { combineReducers } from 'redux';

import LOADERDATA from './LoaderReducer';
import UserReducers from './LoginReducer';
import COUNTBOOKINGREDUCER from './BookingReducer';



export default combineReducers({
  LOADERDATA,
  UserReducers,
  COUNTBOOKINGREDUCER
});
