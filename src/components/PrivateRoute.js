import React, { useContext } from "react";

import { Route } from "react-router-dom";
import { userHasAccess } from "../utilities/authentication";
import LoginPage from "../pages/LoginPage";
import NotAuthorizedPage from "../pages/NotAuthorizedPage";
import UserContext from "../context/UserContext";
import LogInForm from "./LogInForm";

/**
 * PrivateRoute accepts a few react props and will apply permissions to a given route matched against the user's roles.
 * @param {Component} as React component to display when the route matches.
 * @param {String} path URL path to match
 * @param {Array} roles An array of roles that are allowed to view the route.
 */
const PrivateRoute = (props) => {
  const userContext = useContext(UserContext);
  const isLoggedIn = userContext.user.isLoggedIn;
  const isRestricted = props.roles || [];
  const allowed =
    isRestricted.length === 0 ? true : userHasAccess(isRestricted);

  let { as: Comp } = props;
  if (!isLoggedIn) {
    return (
      <Route>
        <NotAuthorizedPage />
        <LogInForm />
      </Route>
    );
  } else if (allowed === true) {
    return (
      <Route>
        <Comp {...props} />
      </Route>
    );
  } else {
    return (
      <Route>
        <NotAuthorizedPage />
      </Route>
    );
  }
};

export default PrivateRoute;
