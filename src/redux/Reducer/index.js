import {combineReducers} from 'redux';

import LOADERDATA from './LoaderReducer';
import UserReducers from './LoginReducer';
import COUNTBOOKINGREDUCER from './BookingReducer';
import langugaeReducer from './langugaeReducer';
import notificationReducer from './notificationReducer';
import ServiceReducer from './ServicesReducer';
import sendotp from './otpReducer';

export default combineReducers({
  LOADERDATA,
  UserReducers,
  COUNTBOOKINGREDUCER,
  langugaeReducer,
  notificationReducer,
  ServiceReducer,
  sendotp,
});
