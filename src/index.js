import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "@fortawesome/fontawesome-free/js/all";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import configureStore from "./redux/configureStore";

const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
