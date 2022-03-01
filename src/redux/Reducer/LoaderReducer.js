import { LOADER } from '../Constant/constants';

const initialState = {
  loaderData: false,
};

export default function LOADERDATA(state = initialState, action) {
  switch (action.type) {
    case LOADER:
      return { ...state, loaderData: action.loaderData };
    default:
      return state;
  }
}
