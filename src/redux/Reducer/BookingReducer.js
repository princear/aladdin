import { COUNT, BOOKINGLIST, BOOKING_LIST_ID, EDIT_BOOKING, CANCEL_BOOKING, DELETE_BOOKING, RECENT_BOOKINGS } from "../Constant/constants";


const initialstate = {
    countData: [],
    bookingListData: [],
    particularList: [],
    editBookingData: [],
    cancelBookingData: [],
    deleteBookingData: '',
    recentBookingData: [],
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

        case EDIT_BOOKING:
            return { ...state, editBookingData: action.editBookingData };

        case CANCEL_BOOKING:
            return { ...state, cancelBookingData: action.cancelBookingData };
        case DELETE_BOOKING:
            return { ...state, deleteBookingData: action.deleteBookingData };

        case RECENT_BOOKINGS:
            return { ...state, recentBookingData: action.recentBookingData };
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

