import {
  GET_ALL_BUSES,
  GET_QUICK_STATS,
  GET_BUS,
  REFRESH_BUSES,
} from "./actionType";

const initialState = {
  buses: [],
  bus: {},
  quickStats: {},
  refreshing: false,
};

const busReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BUSES:
      return { ...state, buses: action.payload };
    case GET_BUS:
      return { ...state, bus: action.payload };
    case GET_QUICK_STATS:
      return { ...state, quickStats: action.payload };
    case REFRESH_BUSES:
      return { ...state, refreshing: action.payload };
    default:
      return state;
  }
};

export default busReducer;
