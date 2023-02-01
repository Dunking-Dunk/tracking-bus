import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import busReducer from "./busReducer";
import stopReducer from "./stopReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  buses: busReducer,
  stops: stopReducer,
  user: userReducer,
});

const configureStore = () => {
  return legacy_createStore(rootReducer, applyMiddleware(thunk));
};

export { configureStore };
