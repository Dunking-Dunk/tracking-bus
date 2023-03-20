import { GET_ALL_NOTIFICATIONS } from "./actionType";

const initialState = {
  notifications: [],
};

const busReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };
    default:
      return state;
  }
};

export default busReducer;
