import { COUNT } from "../Constant/constants";


const initialstate = {
    countData: [],
    loading: false,
}

const COUNTBOOKINGREDUCER = (state = initialstate, action) => {

    console.log('>>>>>>>>>>>>>>>>Token from reducer.', action.type);
    switch (action.type) {


        case COUNT:
            return { ...state, countData: action.countData };
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

