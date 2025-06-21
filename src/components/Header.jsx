import React from "react";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { i18n } = useTranslation();
  return (
    <header style={{ display: "flex", justifyContent: "flex-end", gap: 8, padding: 16 }}>
      <button onClick={() => i18n.changeLanguage("en")}>English</button>
      <button onClick={() => i18n.changeLanguage("vi")}>Tiếng Việt</button>
    </header>
  );
};

export default Header;
