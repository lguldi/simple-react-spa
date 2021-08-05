const AUTHENTICATION_SERVER = "http://localhost:3456"; // Mockserver address. Start the mockserver using `yarn mockserver`.
const APP_API_SERVER = "/"; // API server for app data requests.

/**
 * Set the source of the logo.
 * If you do not want a logo to display, either set logoSrc to null,
 * or open /src/components/NavBar.js and remove the logoSrc prop that is passed to the PushyNavBar component.
 */
const logoSrc = require("./images/react-icon.svg").default;

const config = {
  debugMode: true, // When true, logs to the console the context or state values for functions wrapped with connectLogger().
  authenticationType: "example", // Values: "none" will remove the login button and not implement authentication.  "example" will demonstrate a mock authentication.
  useRoles: true, // When true, will request user roles from the roleseService upon successful login.
  siteMetadata: {
    logoSrc: logoSrc,
    title: "Simple React SPA", // Title that appears in the navigation bar.
    description:
      "Provides a simple Single Page Application to quickly build a React application"
  },
  server: {
    siteRoot: "/" // Used by the NavBar, page configurations, authentication functions, etc. to redirect users to the app root (home page).
  },
  services: {
    loginService: `${AUTHENTICATION_SERVER}/login`, // URL to send login request for user authentication.
    rolesService: `${AUTHENTICATION_SERVER}/userroles`,
    tokenValidationService: `${AUTHENTICATION_SERVER}/validate`, // URL of endpoint to validate authentication tokens.
    appAPI: `${APP_API_SERVER}` // API server URL for application API's.
  },
  userStorageKey: "simpleReactSPAUser" // String name of the user object stored in the session storage.
};

export default config;
