import { combineReducers } from 'redux';

import LOADERDATA from './LoaderReducer';
import UserReducers from './LoginReducer';
import COUNTBOOKINGREDUCER from './BookingReducer';
import langugaeReducer from './langugaeReducer';


export default combineReducers({
  LOADERDATA,
  UserReducers,
  COUNTBOOKINGREDUCER,
  langugaeReducer
});
