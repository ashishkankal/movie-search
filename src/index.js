import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import RootRouter from "./RootRouter";
import ReduxPromise from "redux-promise";
import "babel-polyfill";
import "url-search-params-polyfill";
import reducers from "./reducers";
import thunk from "redux-thunk";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(ReduxPromise, thunk))
);

render(
  <Provider store={store}>
    <RootRouter />
  </Provider>,
  document.getElementById("root")
);
