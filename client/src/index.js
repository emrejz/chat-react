import React from "react";
import ReactDOM from "react-dom";
import "./stylesheets/index.css";
import App from "./components/App";
import { Provider } from "react-redux";

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
//import logger from "redux-logger";
import promise from "redux-promise-middleware";
import rootReducer from "./reducers";
require("dotenv").config();
const apply = applyMiddleware(promise, thunk);
const all = compose(
  apply,
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
