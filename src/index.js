import React from "react";
import "./index.css";
import App from "./App";
import ReactDOM from "react-dom/client"
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store from "./redux/store";
import persistStore from "redux-persist/es/persistStore";

let persistor=persistStore(store)
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <App />

      </PersistGate>
    </Provider>
);
