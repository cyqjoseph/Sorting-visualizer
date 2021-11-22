import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import SidebarNavigation from "./components/sidebar/SidebarNavigation";
import "./main.css";
import { Provider } from "react-redux";
import { store } from "./state";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <div className="page">
          <SidebarNavigation />
          <App />
        </div>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
