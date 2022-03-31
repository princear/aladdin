
import { GET_TOKEN, USER_LOGIN, REMOVE_TOKEN, PROFILE_LOGIN, UPDATE_PROFILE_LOGIN } from "../Constant/constants";


const initialstate = {

    Token: '',
    loading: false,
    profile: [],
    updateProfile: ''
}

const UserReducers = (state = initialstate, action) => {

    console.log('>>>>>>>>>>>>>>>>Token from reducer.', action.type, action.payload);
    switch (action.type) {

        case GET_TOKEN:

            return { ...state, Token: action.Token }

        case REMOVE_TOKEN:

            return { ...state, Token: action.Token }


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

export default UserReducers;