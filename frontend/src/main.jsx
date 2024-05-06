import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AlternatifProvider } from "./context/AlternatifContext";
import "./index.css";
import { KriteriaProvider } from "./context/KriteriaContext";
import { MatriksProvider } from "./context/MatriksContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AlternatifProvider>
      <KriteriaProvider>
        <App />
      </KriteriaProvider>
    </AlternatifProvider>
  </React.StrictMode>
);
