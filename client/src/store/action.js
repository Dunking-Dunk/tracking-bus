import { GET_ALL_BUSES, GET_ALL_STOPS } from "./actionType";
import axios from "axios";

export const getBuses = (query) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      query
        ? `https://gentle-wings-rhyme-49-204-117-163.loca.lt/api/bus-routes?search=${query}`
        : "https://gentle-wings-rhyme-49-204-117-163.loca.lt/api/bus-routes"
    );
    dispatch({
      type: GET_ALL_BUSES,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllStop = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      "https://gentle-wings-rhyme-49-204-117-163.loca.lt/api/bus-routes/stop/"
    );
    dispatch({
      type: GET_ALL_STOPS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};
