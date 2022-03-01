import { LOGIN } from '../Constant/constants';

const initialState = {
    loginData: '',

};

export default function USERLOGIN(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return { ...state, loginData: action.loginData };

        default:
            return state;
    }
}
