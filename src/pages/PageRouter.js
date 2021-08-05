import React from "react";
import { Switch, Route } from "react-router-dom";
import { getApplicationRoutes } from "../utilities/navigation";
import NotFound from "./NotFound";

/**
 * Exports a React Router <PageRouter> component that is responsible for rendering the various pages based on the URL route
 * @module PageRouter
 */
const PageRouter = () => (
  <Switch>
    {getApplicationRoutes()}
    <Route>
      <NotFound />
    </Route>
  </Switch>
);

export default PageRouter;
