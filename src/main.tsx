import React from "react";
import ReactDOM from "react-dom";
import "./main.css";
import "simplebar/dist/simplebar.min.css";
import App from "./App";
import { UserContextProvider } from "./context/userContext";
import { Scrollbar } from "@deskpro/deskpro-ui";

ReactDOM.render(
  <React.StrictMode>
    <Scrollbar style={{ height: "100%", width: "100%" }}>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </Scrollbar>
  </React.StrictMode>,
  document.getElementById("root")
);
