import { GET_ALL_STOPS } from "./actionType";

const initialState = {
  stops: [],
};

const busReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_STOPS:
      return { ...state, stops: action.payload };
    default:
      return state;
  }
};

export default busReducer;
