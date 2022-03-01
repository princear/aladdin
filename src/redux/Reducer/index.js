import { combineReducers } from 'redux';

import LOADERDATA from './LoaderReducer';
import USERLOGIN from './LoginReducer';


export default combineReducers({
  LOADERDATA,
  USERLOGIN,
});
