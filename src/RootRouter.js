import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import App from "./App";
import MoviePage from "./MoviePage";
const RootRouter = () => (
  <App>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MoviePage} />
      </Switch>
    </BrowserRouter>
  </App>
);

export default RootRouter;
