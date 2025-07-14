import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useLocation } from "react-router-dom";

const NavigationHelper = ({ isDarkBackground = false }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Lấy path hiện tại để xác định trang nào đang active
  const currentPath =
    location.pathname.replace(/^\/customer/, "").replace(/^\//, "") || "/";

  const navItems = [
    { path: "", label: "Trang chủ", icon: "fas fa-home" },
    { path: "about", label: "Giới thiệu", icon: "fas fa-info-circle" },
    { path: "services", label: "Dịch vụ", icon: "fas fa-stethoscope" },
    { path: "blog", label: "Blog", icon: "fas fa-blog" },
    { path: "contact", label: "Liên hệ", icon: "fas fa-envelope" },
  ];

  const getNavLink = (path) => {
    if (isAuthenticated && path !== "") {
      return `/customer/${path}`;
    }
    return path === "" ? "/" : `/${path}`;
  };

  const isActivePath = (path) => {
    const normalizedPath = path === "" ? "/" : `/${path}`;
    const normalizedCurrent = currentPath === "/" ? "/" : `/${currentPath}`;
    return normalizedPath === normalizedCurrent;
  };

  // Xác định màu chữ dựa trên background
  const getTextColor = (isActive) => {
    if (isDarkBackground) {
      return isActive
        ? "text-accent font-semibold"
        : "text-white hover:text-accent";
    }
    return isActive
      ? "text-accent font-semibold"
      : "text-gray-700 hover:text-accent";
  };

  return (
    <nav className="hidden lg:flex items-center space-x-8">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={getNavLink(item.path)}
          className={`relative px-3 py-2 rounded-lg transition-all duration-300 group ${getTextColor(
            isActivePath(item.path)
          )}`}
        >
          <i className={`${item.icon} mr-2`}></i>
          {item.label}
          {isActivePath(item.path) && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent transform origin-left"></span>
          )}
        </Link>
      ))}

      {/* Customer Dashboard Link - chỉ hiện khi đã đăng nhập */}
      {isAuthenticated && (
        <Link
          to="/customer"
          className={`relative px-3 py-2 rounded-lg transition-all duration-300 group ${getTextColor(
            location.pathname === "/customer"
          )}`}
        >
          <i className="fas fa-tachometer-alt mr-2"></i>
          Dashboard
          {location.pathname === "/customer" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent transform origin-left"></span>
          )}
        </Link>
      )}
    </nav>
  );
};

export default NavigationHelper;
