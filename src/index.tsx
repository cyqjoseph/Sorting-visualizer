import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import SidebarNavigation from "./components/sidebar/SidebarNavigation";
import "./main.css";
import { ContextProvider } from "./store/context";
ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <div className="page">
          <SidebarNavigation />
          <App />
        </div>
      </BrowserRouter>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
