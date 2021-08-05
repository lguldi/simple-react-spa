import React, { createContext, createRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const PushyNavBarContext = createContext();
PushyNavBarContext.displayName = "PushyNavBarContext";
/**
 * Functional component designed to provide responsive generic navbar that is framework independent.  The nav bar currently supports up to a two-level menu.
 
 */
const PushyNavBar = (props) => {
  // Override any default values with supplied props.
  const rootClassName = props.rootClassName || "default";
  const homeLink = props.homeLink || "/"; // Link to the home page of your application
  const title = props.title || null; // Application or site title to display next to the logo.
  const links = props.links || []; // Array of link objects to display. Example: [{ to: "/home", text: "Home Page" }, { to: "/app/reports", text: "View Reports" }]
  const logoAltText = props.logoAltText || ""; // Description of logo used to provide alternative text for accessibility
  const logoSrc = props.logoSrc || ""; // Logo image URL or Base64 encoded image.
  const logoStyles = props.logoStyles || {}; // React style object of CSS styles to apply to the logo.
  const slideFrom = props.slideFrom === "right" ? "right" : "left"; // Choose whether the menu slides in from the left or right. Default is "left".
  const togglePosition = props.togglePosition === "left" ? "left" : "right"; // Position the toggle icon on the left or right side of the screen. Default is "right".
  const toggleLabel = props.toggleLabel || ""; // Optional label to add to the mobile hamburger menu
  const toggleAria = props.toggleAria || "Toggle Navigation Menu"; // Sets the arial-label property of the toggle menu.
  const hasToggleLabel = toggleLabel.length > 0 ? "has-label" : "";
  const showHamburger =
    typeof props.showHamburger === "boolean" && props.showHamburger === false
      ? "hide"
      : "";

  const refCloseButton = createRef();
  const refToggleButton = createRef();

  // Manage state of the menu
  const [open, setOpen] = useState(false);
  const [subOpen, setSubOpen] = useState();
  // const [hasScrollbar, setHasScrollbar] = useState("");
  const menuState = open ? "open" : "";

  const parentRefs = [];
  const location = useLocation();

  // Setup a global listener for route changes that will close any open menus
  // when a user navigates to a new page.
  useEffect(() => {
    parentRefs.forEach((parent) => {
      if (
        parent &&
        parent.current &&
        parent.current.className.includes("expanded")
      ) {
        setSubOpen(null);
      }
    });
  }, [location]);

  /**
   *   Close the menu
   */
  const closeMenu = () => {
    refToggleButton.current.focus();
    setOpen(false);
  };

  // Generate a title link if a title has been passed to the pushy navbar.
  const TitleLink = () => {
    return typeof title === "string" ? (
      <div className="title">
        <Link to={homeLink}>{title}</Link>
      </div>
    ) : (
      <></>
    );
  };

  /**
   * Utility function to that is used to generate links with or without children.
   * @param {object} link Link object used to create the link. e.g. { to: "/home", text: "Home Page" }
   * @param {} key key used by React for diff tracking
   */
  const makeLink = (link, key) => {
    const hasChildren = link.children && link.children.length > 0;
    const css = hasChildren ? "has-children" : "";
    const isActive = location.pathname === link.to ? "active" : "";

    if (hasChildren) {
      let parentRef = createRef();
      const isOpen = subOpen === link.text ? "expanded" : "";
      parentRefs.push(parentRef);
      // To provide the user with a scent of where they are we want highlight the parent element of the active link.
      let isParentActive =
        link.children.filter((parent) => parent.to === location.pathname)
          .length > 0
          ? "active"
          : "";

      return (
        <li
          key={`menu-item${key}`}
          className={`${css} ${isOpen}`}
          aria-haspopup="true"
          role="menuitem"
          ref={parentRef}
        >
          <button
            onClick={() => {
              if (parentRef.current.className.includes("expanded")) {
                setSubOpen(null);
              } else {
                setSubOpen(link.text);
              }
            }}
            className={`${isActive} ${isParentActive}`}
          >
            {link.text}
            <span className="child-indicator"></span>
          </button>
          {hasChildren && (
            <ul aria-hidden="true" aria-label="submenu" className="submenu ">
              {link.children.map((child, i) =>
                makeLink(child, `menu-item${key}-child-${i}`)
              )}
            </ul>
          )}
        </li>
      );
    } else if (link.to && link.text) {
      return (
        <li
          key={`menu-item${key}`}
          className={`${css} ${isActive}`}
          role="menuitem"
          aria-haspopup="false"
        >
          <Link
            to={link.to}
            onClick={() => {
              closeMenu();
            }}
            className={isActive}
            {...link.props} // spread any additional props supported by React Router on the <Link> component.
          >
            {link.text}
          </Link>
        </li>
      );
    } else {
      return null;
    }
  };

  /**
   * Toggle the menu open or close
   */

  const toggle = () => {
    let menuState = !open;
    setOpen(menuState);

    if (menuState === true) {
      // Menu is open, set focus on the close button
      refCloseButton.current.focus();
    } else {
      // Menu is closed, set focus on the menu toggle button
      refToggleButton.current.focus();
    }
  };

  return (
    <>
      {/*
      To properly calculate off canvas menus positioned on the right, we need to factor the width of the scrollbar in our menu positioning. 
      When the scrollbar is present, the class name "hasScrollbar" is appended to the menu wrapper div for CSS positioning 
   */}
      <div
        className={`pushy-navbar ${rootClassName} ${slideFrom} ${menuState} ${
          window.innerWidth > document.documentElement.clientWidth
            ? "hasScrollbar"
            : ""
        }`}
      >
        <div className="cover" onClick={closeMenu} />
        <div className="pushy-main-grid">
          <div className="branding">
            <div className="logo">
              <Link to={homeLink} alt={logoAltText}>
                <img src={logoSrc} alt={logoAltText} style={logoStyles} />
              </Link>
            </div>
            <TitleLink />
          </div>
          <div className="push-menu">
            <nav role="navigation">
              <div className="close-container">
                <button
                  aria-label="Close Menu"
                  className={`close`}
                  tabIndex="0"
                  onClick={closeMenu}
                  ref={refCloseButton}
                />
              </div>
              <div className="primary-links">
                <ul>{links.map((link, key) => makeLink(link, key))}</ul>
              </div>
              <div className="features">
                <PushyNavBarContext.Provider value={{ closeMenu }}>
                  {props.children}
                </PushyNavBarContext.Provider>
              </div>
            </nav>
          </div>
        </div>
        <button
          className={`pushy-navbar-toggle ${togglePosition}`}
          aria-label={toggleAria}
          tabIndex="1"
          onClick={toggle}
          ref={refToggleButton}
        >
          <div className={`hamburger ${showHamburger}`}>
            <span />
            <span />
            <span />
          </div>
          <label className={`toggle-label ${hasToggleLabel}`}>
            {toggleLabel}
          </label>
        </button>
      </div>
    </>
  );
};

export default PushyNavBar;

// TODO: Add support for menu icons.
// TODO: Add option to make menu sticky.
// TODO: Add support for infinite sub menu rendering and mega menu options.
