import React, { createContext, useState } from "react";
import axios from "axios";
import config from "../config";
import { createBrowserHistory } from "history";
import { connectLogger } from "./../utilities/utilities";
import {
  clearSessionStorage,
  getToUrl,
  getUser,
  getUserSessionStorageItem,
  rolesToString,
  setUserSessionStorage,
  tokenExists
} from "./../utilities/authentication";

import { rolesAPI } from "../services/api";

const UserContext = createContext();
UserContext.displayName = "UserContext";
export default UserContext;

/**
 * The GUEST_USER object defines the initial state of the user that is passed down to React components from the UserProvider.
 */
const GUEST_USER = {
  user: {},
  isLoggedIn: false, // (boolean) Is the user logged in or not?
  displayName: "" // User name to show in the navbar message after login
};

export const UserProvider = (props) => {
  const [user, setUserState] = useState(GUEST_USER);
  let [userError, setUserError] = useState({
    error: false,
    title: "",
    message: ""
  });

  // Wrapping the set state functions used by the context with a simple logging function that will log the context values to the console
  // when the setter functions are called to set state and the application is in debugMode.
  const setUser = connectLogger(setUserState, "UserContext::user");
  setUserError = connectLogger(setUserError, "UserContext::userError");
  /**
   * Login function used by the application to authenticate users.
   * @param {String} username username of the user logging in.
   * @param {*} password username of the user logging in.
   */
  const handleLogin = (username, password) => {
    let creds = { name: username, password: password };

    // Clear out any existing errors
    setUserError({
      error: false,
      title: "",
      message: ""
    });
    axios
      .post(config.services.loginService, creds)
      .then((res) => {
        // Handle authentication service response.
        if (res.data.jwt) {
          let user = {
            user: res.data.user,
            name: `${res.data.GivenName} ${res.data.Surname}`,
            displayName: `${res.data.GivenName} ${res.data.Surname}`,
            mail: res.data.Email,
            jwt: res.data.jwt
          };
          setUserSessionStorage(user);
          setUserError({
            error: false,
            title: "",
            message: ""
          });
          setUser({
            isLoggedIn: true,
            displayName: user.displayName,
            roles: []
          });
          if (config.useRoles === true) {
            rolesAPI
              .get(config.services.rolesService)
              .then((res) => {
                if (Array.isArray(res.data.data.roles)) {
                  const userObj = getUser();
                  const strRoles = rolesToString(res.data.data.roles);
                  setUserSessionStorage({
                    ...userObj,
                    // Append roles to the User object in session storage.
                    roles: strRoles
                  });

                  setUser({
                    isLoggedIn: true,
                    displayName: user.displayName,
                    roles: strRoles
                  });
                }
              })
              .catch((err) => {
                console.log(
                  `Failed to retrieve roles from ${config.services.rolesService}`,
                  err
                );
              });
          }
        } else {
          // LOGIN FAILED. set error state.
          const message =
            res.config && res.config.url && res.config.method
              ? `${res.message}. ${res.config.method.toUpperCase()} ${
                  res.config.url
                }`
              : res.message;
          setUserError({
            error: true,
            title: res.error,
            message: message
          });
        }
      })
      .catch(function (error) {
        if (error && error.response && error.response.status === 401) {
          setUserError({
            error: true,
            title: "Invalid login",
            message: "The user name or password were incorrect."
          });
        } else {
          let message = "";
          if (error.config?.url && error.config?.method) {
            message = `${error.message}. ${error.config.method.toUpperCase()} ${
              error.config.url
            }`;
          } else if (error && error.message) {
            message = error.message;
          } else {
            message = error;
          }

          setUserError({
            error: true,
            title: "Error",
            message: message
          });
        }
      });
  };

  /**
   * Logout function to log a user out of the application and clear session storage.
   */
  const logOut = () => {
    sessionStorage.clear();
    setUser(GUEST_USER);
  };

  /**
   * Performs a validation of the user token found in the broser's session storage by sending a validation request to an authentication endpoint with the JWT token.
   * If they JWT is successfully validated, the user is set to logged in and directed to their original target URL.
   */
  const validateToken = () => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const history = createBrowserHistory();
    if (!user.isLoggedIn && tokenExists()) {
      const checkToken = async () => {
        let token = getUserSessionStorageItem("jwt");
        const options = {
          method: "HEAD",
          headers: { Authorization: "Bearer " + token },
          url: config.services.tokenValidationService,
          cancelToken: source.token
        };
        await axios(options)
          .then((res) => {
            if (res.status && (res.status === 200 || res.status === 204)) {
              // update the user login status and populate the displayName from the localSession token.

              setUser({
                isLoggedIn: true,
                displayName: getUserSessionStorageItem("displayName")
              });

              // Grab the URL the user is trying to reach before performing validating the authentication token.
              // This will be used to redirect the user to that page if the token is successfully validated.
              history.push(getToUrl());
              return res;
            } else {
              history.push(config.server.siteRoot);
              clearSessionStorage();
              setUserError({
                error: true,
                title: "Unauthorized",
                message:
                  "You are not authorized to access this page. Please login."
              });
            }
          })
          .catch((error) => {
            clearSessionStorage();
            history.push(config.server.siteRoot);
            setUserError({
              error: true,
              title: "Error",
              message: `A problem occurred while validating the authentication token. ${error}`
            });
          });
      };
      checkToken();
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        userError,
        handleLogin,
        logOut,
        setUser,
        setUserError,
        validateToken
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
