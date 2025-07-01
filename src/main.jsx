// ✅ main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import router from "./router/router";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} /> {/* ✅ RouterProvider chạy đầu tiên */}
    </GoogleOAuthProvider>
  </StrictMode>
);
