import {
  CREATE_BUS,
  DELETE_BUS,
  GET_ALL_BUSES,
  GET_ALL_GPS_TRACKER,
} from "./actionType";

const initialState = {
  buses: [],
  bus: {},
  trackers: [],
};

const busReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BUSES:
      return { ...state, buses: action.payload };
    case CREATE_BUS:
      return { ...state, buses: [...state.buses, action.payload] };
    case GET_ALL_GPS_TRACKER:
      return { ...state, trackers: action.payload };
    case DELETE_BUS:
      return {
        ...state,
        buses: state.buses.filter((data) => data.id !== action.payload),
      };
    default:
      return state;
  }
};

export default busReducer;
