import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import SidebarNavigation from "./components/sidebar/SidebarNavigation";
import "./main.css";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div>
        <SidebarNavigation />
        <App />
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
