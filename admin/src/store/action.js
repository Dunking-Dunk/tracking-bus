import api from "../api/api";
import {
  GET_ALL_BUSES,
  GET_ALL_STOPS,
  CREATE_STOP,
  CREATE_BUS,
  GET_ALL_GPS_TRACKER,
  DELETE_STOP,
  DELETE_BUS,
  GET_BUS,
  UPDATE_BUS,
  CREATE_ANNOUNCEMENT,
  GET_ALL_ANNOUNCEMENT,
  DELETE_ANNOUNCEMENT,
} from "./actionType";

export const getAllBuses = () => async (dispatch) => {
  try {
    const { data } = await api.get("/bus");
    dispatch({
      type: GET_ALL_BUSES,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getBus = (id) => async (dispatch) => {
  try {
    const { data } = await api.get(`/bus/${id}`);
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
    const { data } = await api.get("/stop");
    dispatch({
      type: GET_ALL_STOPS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const createStop = (stop) => async (dispatch) => {
  try {
    const { data } = await api.post("/stop", stop);
    dispatch({
      type: CREATE_STOP,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const createBus = (bus) => async (dispatch) => {
  try {
    const { data } = await api.post("/bus", bus);
    dispatch({
      type: CREATE_BUS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllGpsTracker = () => async (dispatch) => {
  try {
    const { data } = await api.get("/gps-tracking");
    dispatch({
      type: GET_ALL_GPS_TRACKER,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteStop = (id) => async (dispatch) => {
  try {
    await api.delete(`/stop/${id}`);
    dispatch({
      type: DELETE_STOP,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteBus = (id) => async (dispatch) => {
  try {
    await api.delete(`/bus/${id}`);
    dispatch({
      type: DELETE_BUS,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateBus = (id, bus) => async (dispatch) => {
  try {
    bus.stops = bus.stops.map((data) => data.id);
    const { data } = await api.put(`/bus/${id}`, bus);

    dispatch({
      type: UPDATE_BUS,
      payload: { data, id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const createAnnouncement = (content) => async (dispatch) => {
  try {
    const { data } = await api.post("/announcement", { content });
    dispatch({
      type: CREATE_ANNOUNCEMENT,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAnnouncement = (id) => async (dispatch) => {
  try {
    await api.delete(`/announcement/${id}`);
    dispatch({
      type: DELETE_ANNOUNCEMENT,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllAnnouncement = () => async (dispatch) => {
  try {
    const { data } = await api.get("/announcement");
    dispatch({
      type: GET_ALL_ANNOUNCEMENT,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};
