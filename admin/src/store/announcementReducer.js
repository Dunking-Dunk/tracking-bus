import {
  CREATE_ANNOUNCEMENT,
  DELETE_ANNOUNCEMENT,
  GET_ALL_ANNOUNCEMENT,
  GET_ALL_FEEDBACK,
} from "./actionType";

const initialState = {
  announcements: [],
  feedbacks: [],
};

const announcementReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ANNOUNCEMENT:
      return {
        ...state,
        announcements: [...state.announcements, action.payload],
      };
    case GET_ALL_ANNOUNCEMENT:
      return {
        ...state,
        announcements: action.payload,
      };
    case DELETE_ANNOUNCEMENT:
      return {
        ...state,
        announcements: state.announcements.filter(
          (data) => data.id !== action.payload
        ),
      };
    case GET_ALL_FEEDBACK:
      return {
        ...state,
        feedbacks: action.payload,
      };
    default:
      return state;
  }
};

export default announcementReducer;
