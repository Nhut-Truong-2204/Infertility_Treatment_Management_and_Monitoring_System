// src/main.jsx (Nếu App.jsx là layout component)
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx"; // Vẫn import App
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";
import router from "./router/router";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider> {/* AuthProvider bao bọc App */}
        <App> {/* App component làm layout */}
          <RouterProvider router={router} /> {/* RouterProvider nằm trong App (và AuthProvider) */}
        </App>
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);