import {SERVICES, LOCATIONS} from '../Constant/constants';

const initialstate = {
  servicesListData: [],
  locationListData: [],
  loading: false,
};

const ServiceReducer = (state = initialstate, action) => {
  console.log('>>>>>>>>>>>>>>>>Token from reducer.', action.type);
  switch (action.type) {
    case SERVICES:
      return {...state, servicesListData: action.servicesListData};
    case LOCATIONS:
      return {...state, locationListData: action.locationListData};

    case 'LOADING':
      if (action.payload) {
        return {
          ...state,
          loading: action.payload,
          error: null,
          success: null,
        };
      }

      return {...state, loading: action.payload};
  }

  return state;
};

export default ServiceReducer;
