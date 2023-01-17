import { GET_ALL_BUSES } from "./actionType";
import axios from "axios";

export const getBuses = (query) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      query
        ? `http://10.0.2.2:4000/api/bus-routes?search=${query}`
        : "http://10.0.2.2:4000/api/bus-routes"
    );
    dispatch({
      type: GET_ALL_BUSES,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};
