import { GET_USER_COORDS } from "./actionType";

const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_COORDS:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default userReducer;
