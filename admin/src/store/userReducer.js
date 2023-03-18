import { SIGN_IN, SIGN_OUT } from "./actionType";

const initialState = {
  user: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, user: action.payload };
    case SIGN_OUT:
      return { ...state, user: {} };
    default:
      return state;
  }
};

export default userReducer;
