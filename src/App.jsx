// src/App.jsx
import React from "react";
import "react-toastify/dist/ReactToastify.css";

function App({ children }) {
  return (
    <div className="app-layout">
      {children}
    </div>
  );
}

export default App;
