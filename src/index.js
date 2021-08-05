import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import { ApplicationProvider } from "./context/ApplicationContext";
import { UserProvider } from "./context/UserContext";
import App from "./App";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import "./styles/index.scss";

ReactDOM.render(
  <UserProvider>
    <ApplicationProvider>
      <App />
    </ApplicationProvider>
  </UserProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
