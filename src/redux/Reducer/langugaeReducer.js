

import { LANGUGAE ,SET_LANGUGAE} from "../Constant/constants";


const initialstate = {


    langData: [],
    loading: false,
    selectlangData:[],
}

const langugaeReducer = (state = initialstate, action) => {
    switch (action.type) {

        case LANGUGAE:

            return { ...state, langData: action.langData };
            case SET_LANGUGAE:

                return { ...state, selectlangData: action.selectlangData };

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

export default langugaeReducer;
