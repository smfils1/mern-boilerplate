import { combineReducers } from "redux";
import counter from "./counter";
import auth from "./auth";

const reducers = combineReducers({
  counter,
  auth,
});

export default reducers;
