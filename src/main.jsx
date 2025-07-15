// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Import FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPinterestP,
  faXTwitter,
  faFacebookF,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

// Add icons to the library
library.add(faPinterestP, faXTwitter, faFacebookF, faInstagram);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
