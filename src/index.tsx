import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StoreProvider } from "./stores/helpers/storeContext";
import { createStore } from "./stores/helpers/createStore";
import { InversifyProvider } from "./container/inversify-context";
import { container } from "./container/inversify.config";

const rootStore = createStore();

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider value={rootStore}>
      <InversifyProvider value={container}>
        <App/>
      </InversifyProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
