import {
  RESEND_OTP,
  VERIFY_OTP,
  SENDOTP,
  FORGOT_SEND_OTP,
} from '../Constant/constants';

const initialstate = {
  otp: [],
  forgototp: [],
  loading: false,
};

const sendotp = (state = initialstate, action) => {
  switch (action.type) {
    case SENDOTP:
      return { ...state, otp: action.payload };

    case FORGOT_SEND_OTP:
      return { ...state, forgototp: action.payload };
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
};

export default sendotp;
