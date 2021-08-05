import React, { Suspense } from "react";
import ROUTES_PAGES from "./../pages/pages.config";
import { isLoggedIn, userHasAccess } from "./authentication";
import PrivateRoute from "../components/PrivateRoute";
import PublicRoute from "../components/PublicRoute";
import { Route } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";
import Loader from "../components/Loader";
/**
 * PAGE AND ROUTING UTILITY FUNCTIONS
 */

/**
 * Function used by `getMenuItems()` and `getApplicationRoutes()` that returns a Boolean indicating
 * whether or not a configuration item is public (`true`) or private (`false`).
 * @param {Object} item Menu/route object from `./src/pages/pages.config.js`
 */
const isPublic = (item) => {
  return (!item.private || typeof item.private === "undefined") &&
    (!item.roles || (item.roles && item.roles.length < 1))
    ? true
    : false;
};
/**
 * Returns a security trimmed list of menu objects used for building a navigation.
 */

export const getMenuItems = () => {
  const menuItems = [];
  const userHasPermission = (item) => {
    if (item.menu === true) {
      // Menu item is public
      if (isPublic(item)) {
        return true;
      } else if (isLoggedIn() && (!item.roles || userHasAccess(item.roles))) {
        // User has permission to access the item
        return true;
      }
    }
    // User does not have permission
    return false;
  };
  ROUTES_PAGES.forEach((item) => {
    const hasChildren = item.children && item.children.length > 0;
    if (!hasChildren) {
      if (userHasPermission(item)) {
        menuItems.push(item);
      }
    } else {
      let trimmedChildren = [];
      let itemCopy = { ...item };

      item.children.forEach((child) => {
        if (userHasPermission(child)) {
          trimmedChildren.push(child);
        }
      });
      itemCopy.children = trimmedChildren;
      if (userHasPermission(itemCopy)) {
        menuItems.push(itemCopy);
      }
    }
  });
  return menuItems;
};

/**
 * Reads page and route configuration from the pages.config.js file and returns the appropriate Public or Private route setup
 * to embed within React Router.
 */
export const getApplicationRoutes = () => {
  const routes = [];
  const Comps = {};
  const buildRoute = (item, key) => {
    if (item.source) {
      // Define the component using the source property from the configuration.
      let modulePath = item.source.toString();
      Comps[item.component] = React.lazy(() => import(`../${modulePath}`));
    } else if (typeof item.component === "string") {
      // Not source is defined, the path is relative to the pages folder.
      Comps[item.component] = React.lazy(() =>
        import(`../pages/${item.component}`)
      );
    }

    // Define the routes for React Router.
    // Components are defined and lazy loaded when item.component or item. source files are strings.
    // Otherwise, we will assume item.component iss imported within pages.config.js and is a Class or Functional React component.
    if (item.component) {
      const props = item.props || {};
      if (isPublic(item)) {
        routes.push(
          <Route path={item.to} exact key={key}>
            <Suspense fallback={<Loader />}>
              <ErrorBoundary>
                <PublicRoute
                  as={
                    typeof item.component === "string"
                      ? Comps[item.component]
                      : item.component
                  }
                  {...props}
                />
              </ErrorBoundary>
            </Suspense>
          </Route>
        );
      } else {
        routes.push(
          <Route path={item.to} exact key={key}>
            <Suspense fallback={<Loader />}>
              <ErrorBoundary>
                <PrivateRoute
                  as={
                    typeof item.component === "string"
                      ? Comps[item.component]
                      : item.component
                  }
                  roles={item.roles}
                  {...props}
                />
              </ErrorBoundary>
            </Suspense>
          </Route>
        );
      }
    }

    // spin through any children and build route
    if (item.children && item.children.length > 0) {
      item.children.map((child, childkey) =>
        buildRoute(child, `${key}-${childkey}`)
      );
    }
  };
  ROUTES_PAGES.forEach((item, key) => {
    buildRoute(item, key);
  });

  return routes;
};
