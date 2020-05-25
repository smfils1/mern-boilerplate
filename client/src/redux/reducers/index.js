import { combineReducers } from "redux";
import counter from "./counter";
import auth from "./auth";
import user from "./user";

const reducers = combineReducers({
  counter,
  auth,
  user,
});

export default reducers;
