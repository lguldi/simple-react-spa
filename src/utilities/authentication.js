import config from "../config";
import { connectLogger } from "./utilities";
/**
 * Returns a boolean whether or not the code is executing in a browser.
 */
export const isBrowser = () => typeof window !== "undefined";

/**
 * Returns the user information from the browser's session storage.
 */
export const getUser = () => {
  return isBrowser() && window.sessionStorage.getItem(config.userStorageKey)
    ? JSON.parse(window.sessionStorage.getItem(config.userStorageKey))
    : {};
};

/**
 * Returns boolean whether or not the user is logged in.
 */
export const isLoggedIn = () => {
  const user = getUser();
  return !!user.name;
};

/**
 * This function is used to retrieve the URL from the browser.
 * This comes in handy when a user hits a page but you need to validate their login and
 * make sure after that you route them to the correct location.
 */
export const getToUrl = () => {
  return window.location.href
    ? window.location.href.pathname
    : config.server.siteRoot;
};

/**
 * This function sets the user information in session storage under a key name from the application config.
 * @param {Object} user user object to store in session storage. This will be converted to a string for storage.
 */
export const setUserSessionStorage = connectLogger((user) => {
  window.sessionStorage.setItem(config.userStorageKey, JSON.stringify(user));
}, "utilites/authentication::setUserSessionStorage");

/**
 * Clears application information from session storage.
 */
export const clearSessionStorage = connectLogger(() => {
  window.sessionStorage.clear();
});

/**
 * A simple function that takes a name/value pair and stores the item in local sesssion storage.
 * @param {String} name Name of the session storage item to store.
 * @param {String} data Value of the session storage item to store
 */
export const storeData = (name, data) => {
  window.sessionStorage.setItem(name, data);
};

/**
 * Returns a session storage value as a string.
 * @param {String} name Name of the key for retrieivng a value out of the browser's session storage.
 */
export const getLocalToken = (name) => {
  const data = window.sessionStorage.getItem(name);
  return data;
};

/**
 * Checks whether or not a user has a JWT token in session storage.
 */
export const tokenExists = () => {
  return getUserSessionStorageItem("jwt") !== undefined ? true : false;
};

/**
 * This function gets a single item from user information in session storage under a key name from the application config.
 * @param {String} name name of the item in the user object from local session storage session storage.
 */
export const getUserSessionStorageItem = (name) => {
  const sessionItem = window.sessionStorage.getItem(config.userStorageKey);
  if (!sessionItem) {
    return undefined;
  } else {
    const userObj = JSON.parse(sessionItem);
    return userObj[name];
  }
};

/**
 * This function sets a single item in the user object in session storage under a key name from the application config.
 * @param {String} name user to be set in the user object. This will be converted to a string for storage.
 * @param {String} value value to be set in the user object. This will be converted to a string for storage.
 */
export const setUserSessionStorageItem = (name, value) => {
  const userObj = JSON.parse(
    window.sessionStorage.getItem(config.userStorageKey)
  );

  userObj[name] = value;
  setUserSessionStorage(userObj);
};

/**
 * Returns an array of users roles from from session storage.
 */
export const getUserRoles = () => {
  const sessionRoles = getUserSessionStorageItem("roles")
    ? JSON.parse(getUserSessionStorageItem("roles"))
    : [];
  return sessionRoles;
};

// Returns a string of roles in a stringified array for session storage.
/**
 *
 * @param {array} roles Array of user roles
 */
export const rolesToString = (roles) => {
  let str = JSON.stringify([]);
  if (typeof roles === "string") {
    str = JSON.stringify(roles.split(","));
  } else if (Array.isArray(roles)) {
    str = JSON.stringify(roles);
  }
  return str;
};

/**
 * Function that checks if the user is a member of any of the roles passed in via the restrictedRoles parameter.
 * If the user is a member of the one of the restrictedRoles the function will return `true` indicating the user
 * is a member of one of the role and should be given access. However, if none of the user's roles match a role passed
 * in from the restrictedRoles parameter, the function will return `false` indicating the user does not belong to any
 * of the roles and therefore access should not be provided.
 * @param {Array|String} restrictedRoles Array or String of roles to restrict
 */
export const userHasAccess = (restrictedRoles) => {
  let roles = restrictedRoles || [];
  if (typeof restrictedRoles === "string") {
    roles = restrictedRoles.split(",");
  } else if (!Array.isArray(restrictedRoles)) {
    roles = [];
  }
  const allowed = [];
  const userRoles = getUserRoles();
  roles.forEach((el1) =>
    userRoles.forEach((el2) => {
      if (el1.trim() === el2.trim()) {
        allowed.push(el1);
      }
    })
  );

  // Return true if the user is a member of the restricted role.
  return allowed.length > 0;
};

/**
 * Returns a session storage value as a string.
 * @param {String} name Name of the key for retrieving a value out of the browser's session storage.
 */
export const getSessionData = (name) => {
  return window.sessionStorage.getItem(name);
};

/**
 * A simple function that takes a name/value pair and stores the item in local sesssion storage.
 * @param {String} name Name of the session storage item to store.
 * @param {String} data Value of the session storage item to store
 */
export const setSessionData = (name, data) => {
  window.sessionStorage.setItem(name, data);
};
