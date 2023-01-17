import { GET_ALL_BUSES } from "./actionType";

const initialState = {
  buses: [],
};

const busReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BUSES:
      return { ...state, buses: action.payload };
    default:
      return state;
  }
};

export default busReducer;
