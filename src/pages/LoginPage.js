import React, { useContext } from "react";

import LogInForm from "./../components/LogInForm";
import UserContext from "../context/UserContext";
import { Redirect } from "react-router-dom";
import config from "../config";

const LoginPage = () => {
  const userContext = useContext(UserContext);
  return !userContext.user.isLoggedIn ? (
    <>
      <h1>Log In</h1>
      <LogInForm />
    </>
  ) : (
    <Redirect to={config.server.siteRoot} />
  );
};

export default LoginPage;
