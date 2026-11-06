import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "leaflet/dist/leaflet.css";
import App from "./App";
import "./index.css";

const root = document.getElementById("root");
if (!root) throw new Error("找不到 #root");

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
