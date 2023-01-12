import {NOTIFY, CREATE_NOTIFY, RATING} from '../Constant/constants';

const initialstate = {
  notiData: [],
  countData: [],
  loading: false,
  selectnotifyData: [],
  ratingBooking: [],
};

const notificationReducer = (state = initialstate, action) => {
  switch (action.type) {
    case NOTIFY:
      return {...state, notiData: action.notiData};
    case CREATE_NOTIFY:
      return {...state, selectnotifyData: action.selectnotifyData};
    case RATING:
      return {...state, ratingBooking: action.ratingBooking};
    // case COUNT_NOTI:
    //   return {
    //     ...state,
    //     countData: action.countData,
    //   };

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

export default notificationReducer;
