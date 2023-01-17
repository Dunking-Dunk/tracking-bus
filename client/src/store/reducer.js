import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import busReducer from "./busReducer";

const rootReducer = combineReducers({
  buses: busReducer,
});

const configureStore = () => {
  return legacy_createStore(rootReducer, applyMiddleware(thunk));
};

export { configureStore };
