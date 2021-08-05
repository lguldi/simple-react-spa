import React, { useContext } from "react";
import { getMenuItems } from "../utilities/navigation";
import { isLoggedIn } from "../utilities/authentication";
import config from "../config";
import GithubIcon from "./GithubIcon";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import PushyNavBar from "./PushyNavBar";
import UserContext from "../context/UserContext";

const NavBar = () => {
  const userContext = useContext(UserContext);
  return (
    <PushyNavBar
      homeLink="/"
      links={getMenuItems()}
      logoSrc={config.siteMetadata.logoSrc}
      logoAltText={config.siteMetadata.title}
      title={config.siteMetadata.title}
      // toggleLabel="Menu"
    >
      <div className="features-content">
        {config.authenticationType === "example" && isLoggedIn() && (
          <div className="login-logout">
            <div className="welcome-message">
              Welcome {userContext.user.displayName}
            </div>
            <div>
              <LogoutButton />
            </div>
          </div>
        )}
        {config.authenticationType === "example" && !isLoggedIn() && (
          <div className="login-logout">
            <LoginButton />
          </div>
        )}

        <div className="github">
          <a href="https://github.com/lguldi/simple-react-spa">
            <GithubIcon />
          </a>
        </div>
      </div>
    </PushyNavBar>
  );
};

export default NavBar;
