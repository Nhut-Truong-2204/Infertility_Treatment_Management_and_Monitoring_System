// src/App.jsx
import React, { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import router from "./router/router";
import "./index.css";
import SimpleLoadingSpinner from "./components/layout/Loading";
// Tạo Context theme
const ThemeContext = React.createContext();

// Hook riêng để sử dụng theme
export const useTheme = () => {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const shouldUseDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    setIsDarkMode(shouldUseDark);
    updateTheme(shouldUseDark);
  }, []);

  const updateTheme = (isDark) => {
    if (isDark) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    updateTheme(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const themeValue = {
    isDarkMode,
    toggleTheme,
    theme: isDarkMode ? "dark" : "light",
  };

  useEffect(() => {
    // Simulate any initial app setup or data fetching that needs to happen
    // before the router is ready to display content.
    const initializeApp = async () => {
      try {
        // For example, you might fetch user authentication status,
        // global settings, or perform some initial data hydration.
        // Replace this with your actual async setup logic.
        await new Promise((resolve) => setTimeout(resolve, 2500)); // Simulate 2.5 seconds loading
      } catch (error) {
        console.error("Lỗi khi khởi tạo ứng dụng:", error);
        // Handle error, maybe show an error message instead of the app
      } finally {
        setIsLoading(false); // Once setup is complete, hide the loading screen
      }
    };

    initializeApp();
  }, []); // E
  if (isLoading) {
    return <SimpleLoadingSpinner />;
  }
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ThemeContext.Provider value={themeValue}>
        <RouterProvider router={router} fallbackElement={<p>Đang tải...</p>} />
      </ThemeContext.Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
