import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import config from "../config";
import { PushyNavBarContext } from "./PushyNavBar";

const LoginButton = (props) => {
  const history = useHistory();
  const pushyContext = useContext(PushyNavBarContext);
  return (
    <button
      style={{ background: "white", color: "black" }}
      onClick={() => {
        history.push(`${config.server.siteRoot}login`);
        if (pushyContext.closeMenu) {
          pushyContext.closeMenu();
        }
      }}
    >
      Login
    </button>
  );
};

export default LoginButton;
