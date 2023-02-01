import {
  GET_ALL_BUSES,
  GET_ALL_STOPS,
  GET_USER_COORDS,
  GET_QUICK_STATS,
  GET_BUS,
} from "./actionType";
import axios from "axios";
import { userLocation } from "../utils/getUserLocation";

export const getBuses = (query) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      query
        ? `https://9aa6-49-205-80-77.in.ngrok.io/api/bus-routes?search=${query}`
        : "https://9aa6-49-205-80-77.in.ngrok.io/api/bus-routes"
    );
    dispatch({
      type: GET_ALL_BUSES,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getBus = (busId) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `https://9aa6-49-205-80-77.in.ngrok.io/api/bus-routes/${busId}`
    );
    dispatch({
      type: GET_BUS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllStop = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      "https://9aa6-49-205-80-77.in.ngrok.io/api/bus-routes/stop/"
    );
    dispatch({
      type: GET_ALL_STOPS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getQuickStats = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      "https://9aa6-49-205-80-77.in.ngrok.io/api/bus-routes/quick-stats"
    );
    dispatch({
      type: GET_QUICK_STATS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getUserLocation = () => async (dispatch) => {
  try {
    const user = await userLocation.getUserLocation();
    dispatch({
      type: GET_USER_COORDS,
      payload: user,
    });
  } catch (err) {
    console.log(err);
  }
};
