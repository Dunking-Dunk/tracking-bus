const initialState = {
  buses: [],
  bus: {},
};

const busReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_BUSES":
      return { ...state, buses: action.payload };
    default:
      return state;
  }
};

export default busReducer;
