import api from "../api/api";

export const getAllBuses = () => async (dispatch) => {
  try {
    const { data } = await api.get("/bus");
    dispatch({
      type: "GET_ALL_BUSES",
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllStop = () => async (dispatch) => {
  try {
    const { data } = await api.get("/stop");
    dispatch({
      type: "GET_ALL_STOPS",
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};
