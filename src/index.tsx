import React from "react";
import ReactDOM from "react-dom";

import { StoreProvider } from "./Store/Store";

import App from "./App";

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById("root")
);
