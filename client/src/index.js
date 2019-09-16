import dotenv from "dotenv";
import React from "react";
import ReactDOM from "react-dom";
import "./stylesheets/index.css";
import App from "./components/App";
import { Provider } from "react-redux";

import { createStore, compose } from "redux";
//import thunk from "redux-thunk";
//import logger from "redux-logger";
//import promise from "redux-promise-middleware";
import rootReducer from "./reducers";
require("dotenv").config();
const all = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f
);
const store = createStore(rootReducer, all);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
