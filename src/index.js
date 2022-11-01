import * as ReactDOM from "react-dom/client";
import App from "./App";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(<BrowserRouter><App /></BrowserRouter>);

if (module.hot) {
  module.hot.accept();
}
