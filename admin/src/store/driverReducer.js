import { CREATE_DRIVER, GET_ALL_DRIVER } from "./actionType";

const initialState = {
  drivers: [],
};

const driverReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_DRIVER:
      return {
        ...state,
        drivers: [...state.drivers, action.payload],
      };
    case GET_ALL_DRIVER:
      return {
        ...state,
        drivers: action.payload,
      };
    default:
      return state;
  }
};

export default driverReducer;
