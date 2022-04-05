import { COUNT, BOOKINGLIST, BOOKING_LIST_ID } from "../Constant/constants";


const initialstate = {
    countData: [],
    bookingListData: [],
    particularList: [],

    loading: false,
}

const COUNTBOOKINGREDUCER = (state = initialstate, action) => {

    console.log('>>>>>>>>>>>>>>>>Token from reducer.', action.type);
    switch (action.type) {


        case COUNT:
            return { ...state, countData: action.countData };

        case BOOKINGLIST:
            return { ...state, bookingListData: action.bookingListData };

        case BOOKING_LIST_ID:
            return { ...state, particularList: action.particularListData };
        case 'LOADING':

            if (action.payload) {
                return {
                    ...state,
                    loading: action.payload,
                    error: null,
                    success: null,
                };
            }

            return { ...state, loading: action.payload };


    }

    return state;

}

export default COUNTBOOKINGREDUCER;

