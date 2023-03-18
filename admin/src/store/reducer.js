import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import stopsReducer from "./stopReducer";
import busReducer from "./busReducer";
import announcementReducer from "./announcementReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  buses: busReducer,
  stops: stopsReducer,
  announcements: announcementReducer,
  users: userReducer,
});

const configureStore = () => {
  return legacy_createStore(rootReducer, applyMiddleware(thunk));
};

export { configureStore };
