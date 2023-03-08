import { GET_ALL_ANNOUNCEMENT } from "./actionType";

const initialState = {
  announcements: [],
};

const busReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ANNOUNCEMENT:
      return { ...state, announcements: action.payload };
    default:
      return state;
  }
};

export default busReducer;
