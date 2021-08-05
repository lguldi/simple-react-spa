import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import NavBar from "./components/NavBar";
import ScrollToTop from "./components/ScrollToTop";
import PageRouter from "./pages/PageRouter";
import config from "./config";
import ApplicationContext from "./context/ApplicationContext";
import UserContext from "./context/UserContext";
import Loader from "./components/Loader";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

function App() {
  /**
   * When a user has a local JWT token in their session storage, we must validate the JWT before rendering the navigation
   *  (with or without private routes) and before navigating to an endpoint that requires authentication.
   *
   * The validateToken() function provided by the UserContext is used perform token validation.
   * We are leveraging user context changes to trigger when the useEffect hook fires.
   * A useEffect() hook is used to revalidate the JWT when the UserContext changes.
   * userContext is passed in as a second argument to the useEffect hook so the fires at initial render
   * and whenever userContext changes.
   */

  const applicationContext = useContext(ApplicationContext);
  const userContext = useContext(UserContext);
  useEffect(() => {
    userContext.validateToken();
  }, [userContext]);
  return (
    <Router basename={config.server.siteRoot} history={history}>
      <>
        <ErrorBoundary>
          <NavBar />
        </ErrorBoundary>
        <div className="main" role="main">
          <ErrorBoundary>
            {applicationContext.isReady ? <PageRouter /> : <Loader />}
          </ErrorBoundary>
        </div>
        <ScrollToTop />
      </>
    </Router>
  );
}

export default App;
