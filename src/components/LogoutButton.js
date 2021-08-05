import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import config from "../config";
import UserContext from "../context/UserContext";
import { PushyNavBarContext } from "./PushyNavBar";

const LogoutButton = (props) => {
  const pushyContext = useContext(PushyNavBarContext);
  const userContext = useContext(UserContext);
  const history = useHistory();
  return (
    <button
      style={{ background: "white", color: "black" }}
      onClick={() => {
        history.push(`${config.server.siteRoot}login`);
        if (pushyContext.closeMenu) {
          pushyContext.closeMenu();
        }
        userContext.logOut();
      }}
    >
      Log out
    </button>
  );
};

export default LogoutButton;
