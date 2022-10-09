import "./public/css/user-styles.css";
import "./public/css/spinner.css";
import "./public/css/dx/dx.light.css";

import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import { BrowserRouter } from "react-router-dom";
import {createAxiosResponseInterceptor, createAuthAxiosUse} from "./base/authorization"

createAuthAxiosUse()
createAxiosResponseInterceptor()

const root = ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root"));