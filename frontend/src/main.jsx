// frontend\src\main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEyeSlash,
  faBowlFood,
  faCar,
  faHome,
  faFilm,
  faLightbulb,
  faHeartbeat,
  faPlane,
  faGraduationCap,
  faCartShopping,
  faShieldHalved,
  faPiggyBank,
  faChartLine,
  faGift,
  faShield,
  faEllipsis,
  faXmark,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faEyeSlash,
  faBowlFood,
  faCar,
  faHome,
  faFilm,
  faLightbulb,
  faHeartbeat,
  faPlane,
  faGraduationCap,
  faCartShopping,
  faShieldHalved,
  faPiggyBank,
  faChartLine,
  faGift,
  faShield,
  faEllipsis,
  faXmark,
  faEye
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
