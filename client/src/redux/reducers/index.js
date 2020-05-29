import { combineReducers } from "redux";
import counter from "./counter";
import auth from "./auth";
import user from "./user";
import history from "./history";
import notification from "./notification";

const reducers = combineReducers({
  counter,
  auth,
  user,
  history,
  notification,
});

export default reducers;
