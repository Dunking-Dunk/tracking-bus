import {
  GET_ALL_BUSES,
  GET_ALL_STOPS,
  GET_USER_COORDS,
  GET_QUICK_STATS,
  GET_BUS,
  GET_ALL_ANNOUNCEMENT,
  REFRESH_ANNOUNCEMENT,
  REFRESH_BUSES,
} from "./actionType";
import api from "../api/api";

export const getBuses = (search) => async (dispatch) => {
  try {
    const { data } = await api.get(
      search ? `/bus?search=${search}` : "/bus?populate=true"
    );
    dispatch({
      type: GET_ALL_BUSES,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getSortBuses = (query) => async (dispatch) => {
  try {
    const { data } = await api.get(
      query === "all" ? "/bus?populate=true" : `/bus?timing=${query}`
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
    console.log(location);
    dispatch({
      type: GET_USER_COORDS,
      payload: location.coords,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllAnnouncements = () => async (dispatch) => {
  try {
    const { data } = await api.get(`/announcement`);
    dispatch({
      type: GET_ALL_ANNOUNCEMENT,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const refreshAnnouncement = (data) => async (dispatch) => {
  try {
    dispatch({
      type: REFRESH_ANNOUNCEMENT,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const refreshBuses = (data) => async (dispatch) => {
  try {
    dispatch({
      type: REFRESH_BUSES,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};
