import React from "react";
import { Route } from "react-router-dom";

/**
 * Renders a public route with no security restraints.  Critical props are listed below.
 * @param {object} props Standard React props that get passed down from the route to the component to display.
 * @param {Component} as React component to display when the route matches.
 * @param {String} path URL path to match is passed to the Router by spreading props {...props}
 */
const PublicRoute = (props) => {
  let { as: Comp } = props;
  return (
    <Route path={props.path}>
      <Comp {...props} />
    </Route>
  );
};

export default PublicRoute;
