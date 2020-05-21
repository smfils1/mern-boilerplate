import { applyMiddleware, createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import reducers from "./reducers";
import promiseMiddleware from "redux-promise";

const middlewareEnhancer = applyMiddleware(promiseMiddleware, thunkMiddleware);
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) || compose;
const store = createStore(reducers, composeEnhancers(middlewareEnhancer));

export default store;
