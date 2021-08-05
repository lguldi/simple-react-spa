import React, { createContext, useEffect, useState } from "react";
import { connectLogger } from "../utilities/utilities";

const ApplicationContext = createContext();
ApplicationContext.displayName = "ApplicationContext";
export default ApplicationContext;

export const ApplicationProvider = (props) => {
  // On first mount, fetch data from the API's.
  useEffect(() => {}, []);

  // Setup example state
  const [widgets, setWidgetsState] = useState([]);

  // Wrapping the set state functions used by the context with a simple logging function that will log the context values to the console
  // when the setter functions are called to set state and the application is in debugMode.  The `connectLogger
  const setWidgets = connectLogger(
    setWidgetsState,
    "ApplicationContext::widgets"
  );

  /**
   * If there is any global async setup prior to rendering the app such as retrieving a product list or other global state values,
   *  set `isReady` to false a loading indicator until that work is complete and the app is ready.
   */
  const isReady = true;
  return (
    <ApplicationContext.Provider
      value={{
        isReady, // Indicates whether the app is ready to render. Referenced in App.js
        widgets, // `widgets` can be consumed by components throughout the application with the React useContext hook.
        setWidgets // Provides the `setWidgets()` function to components that can update the `widgets` application context.
      }}
    >
      {props.children}
    </ApplicationContext.Provider>
  );
};
