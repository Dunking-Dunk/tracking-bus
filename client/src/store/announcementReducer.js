import { GET_ALL_ANNOUNCEMENT, REFRESH_ANNOUNCEMENT } from "./actionType";

const initialState = {
  announcements: [],
  refreshing: false,
};

const busReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ANNOUNCEMENT:
      return { ...state, announcements: action.payload };
    case REFRESH_ANNOUNCEMENT:
      return { ...state, refreshing: action.payload };
    default:
      return state;
  }
};

export default busReducer;
