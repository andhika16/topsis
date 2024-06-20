import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AlternatifProvider } from "./context/AlternatifContext";
import { KriteriaProvider } from "./context/KriteriaContext";
import { MatriksProvider } from "./context/MatriksContext";
import "./index.css";
import { NilaiProvider } from "./context/NilaiContext";
import { AuthProvider } from "./context/AuthContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AlternatifProvider>
        <KriteriaProvider>
          <MatriksProvider>
            <NilaiProvider>
              <App />
            </NilaiProvider>
          </MatriksProvider>
        </KriteriaProvider>
      </AlternatifProvider>
    </AuthProvider>
  </React.StrictMode>
);
