import {
  GET_ALL_BUSES,
  GET_ALL_STOPS,
  GET_USER_COORDS,
  GET_QUICK_STATS,
  GET_BUS,
} from "./actionType";
import api from "../api/api";

export const getBuses = (query) => async (dispatch) => {
  try {
    const { data } = await api.get(
      query ? `/bus?search=${query}` : "/bus?populate=true"
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
    const { data } = await api.get(`/bus/${busId}`);
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
    const { data } = await api.get("/stop?populate=true");
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
    const { data } = await api.get("/bus/quick-stats");
    dispatch({
      type: GET_QUICK_STATS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getUserLocation = (location) => async (dispatch) => {
  try {
    dispatch({
      type: GET_USER_COORDS,
      payload: location.coords,
    });
  } catch (err) {
    console.log(err);
  }
};
