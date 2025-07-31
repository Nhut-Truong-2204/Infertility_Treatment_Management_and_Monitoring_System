import React, { useState } from "react";
import logo from "../../assets/images/logo.svg";
import NotificationList from "../NotificationList";
import {
  MEDICAL_COLORS,
  MEDICAL_GRADIENTS,
  MEDICAL_SHADOWS,
} from "../../styles/medicalTheme";
// ...existing code...
import { faBell } from "@fortawesome/free-solid-svg-icons";
import useNotifications from "../../hooks/useNotifications";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { openBookingModal } from "../../redux/slices/uiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const CustomerHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { notifications, loading } = useNotifications();
  const unreadCount = Array.isArray(notifications)
    ? notifications.filter((n) => !n.isRead).length
    : 0;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  // Menu items cho customer với routes mới
  const customerMenuItems = [
    { path: "/dashboard", name: "Dashboard", icon: "fa-tachometer-alt" },
    {
      path: "/customer/appointments",
      name: "Lịch Hẹn",
      icon: "fa-calendar-check",
    },
    {
      path: "/customer/treatment-timeline",
      name: "Phác Đồ Điều Trị",
      icon: "fa-procedures",
    },
    {
      path: "/customer/treatment-contracts",
      name: "Hợp Đồng Điều Trị",
      icon: "fa-file-contract",
    },
    {
      path: "/customer/medical-records",
      name: "Hồ Sơ Y Tế",
      icon: "fa-file-medical",
    },
    {
      path: "/customer/invoices",
      name: "Hóa Đơn",
      icon: "fa-file-invoice-dollar",
    },
    { path: "/customer/prescriptions", name: "Đơn Thuốc", icon: "fa-pills" },
    { path: "/services", name: "Dịch Vụ", icon: "fa-stethoscope" },
    { path: "/blog", name: "Bài Viết", icon: "fa-newspaper" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="relative top-0 left-0 w-full z-50 bg-primary shadow-md">
      {/* Header chính */}
      <div className="bg-primary">
        <div className="max-w-[1480px] mx-auto">
          <nav className="flex items-center py-4 px-4">
            {/* Logo lớn hơn và tên trang web reprotrack */}
            <div className="flex items-center space-x-4 mr-8">
              <NavLink to="/" className="flex items-center space-x-3">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-14 w-auto object-contain"
                />
              </NavLink>
              <span className="text-accent text-xs font-medium hidden xl:inline">
                Giải pháp hỗ trợ điều trị vô sinh - hiếm muộn hiện đại
              </span>
            </div>

            {/* Menu cho Desktop - Hiển thị các mục thường dùng */}
            <div className="hidden lg:flex flex-grow justify-center">
              <ul className="flex items-center space-x-6">
                {customerMenuItems
                  .filter((item) =>
                    [
                      "/dashboard",
                      "/customer/appointments",
                      "/customer/medical-records",
                    ].includes(item.path)
                  )
                  .map((item) => (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `relative transition-all duration-300 hover:text-accent flex items-center space-x-2 px-3 py-2 rounded-lg ${
                            isActive
                              ? "text-accent bg-white/10"
                              : "text-white hover:bg-white/10"
                          } font-medium`
                        }
                      >
                        <i className={`fas ${item.icon} text-sm`}></i>
                        <span>{item.name}</span>
                      </NavLink>
                    </li>
                  ))}
              </ul>
            </div>

            {/* User Profile Section */}
            <div className="hidden lg:flex items-center ml-auto space-x-4">
              {/* Đặt Lịch Hẹn Button */}
              <button
                onClick={() => dispatch(openBookingModal())}
                className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors flex items-center space-x-2 font-medium"
              >
                <i className="fas fa-plus text-sm"></i>
                <span>Đặt Lịch Khám</span>
              </button>

              {/* Notifications */}

              <button
                className="relative text-white hover:scale-105 hover:shadow-xl transition-all duration-200 p-0 rounded-full focus:outline-none focus:ring-2 focus:ring-accent shadow-md"
                style={{ minWidth: 52, minHeight: 52 }}
                onClick={() => setShowNotifications(true)}
                aria-label="Xem thông báo"
              >
                <span className="flex items-center justify-center w-12 h-12">
                  <FontAwesomeIcon
                    icon={faBell}
                    className="text-3xl drop-shadow-sm"
                    style={{ color: MEDICAL_COLORS.primary[50] }}
                  />
                </span>
                {!loading && unreadCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center border-2 shadow-lg ring-2 animate__animated animate__fadeIn"
                    style={{
                      background: MEDICAL_GRADIENTS.gentle,
                      color: MEDICAL_COLORS.accent[700],
                      borderColor: MEDICAL_COLORS.primary[50],
                      boxShadow: MEDICAL_SHADOWS.accent,
                    }}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <NotificationList onClose={() => setShowNotifications(false)} />
              )}

              {/* User Dropdown */}
              <div className="group relative">
                <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {user?.profilePictureURL ? (
                      <img
                        src={user.profilePictureURL}
                        alt={user.fullName || "User"}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : user?.fullName ? (
                      user.fullName.charAt(0).toUpperCase()
                    ) : (
                      "U"
                    )}
                  </div>
                  {/* Tên và Icon */}
                  <div className="flex items-center space-x-2">
                    <i className="fa-solid fa-chevron-down text-white text-sm transition-transform group-hover:rotate-180"></i>
                  </div>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="py-2">
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user?.fullName || "User"}
                      </p>
                      <p
                        className="text-sm text-gray-500 truncate"
                        title={user?.email || "user@example.com"}
                      >
                        {user?.email || "user@example.com"}
                      </p>
                    </div>

                    {/* Menu Items: chỉ hiển thị các mục còn lại trong dropdown */}
                    <div className="py-2">
                      {customerMenuItems
                        .filter(
                          (item) =>
                            ![
                              "/dashboard",
                              "/customer/appointments",
                              "/customer/medical-records",
                            ].includes(item.path)
                        )
                        .map((item) => (
                          <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                              `flex items-center px-4 py-2 text-sm transition-colors rounded-lg ${
                                isActive
                                  ? "bg-secondary text-accent"
                                  : "text-gray-700 hover:bg-secondary"
                              }`
                            }
                          >
                            <i
                              className={`fas ${item.icon} w-4 mr-3 text-gray-400`}
                            ></i>
                            {item.name}
                          </NavLink>
                        ))}
                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-100 pt-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <i className="fa-solid fa-sign-out-alt w-4 mr-3"></i>
                        Đăng Xuất
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nút Toggle Menu cho Mobile */}
            <div className="lg:hidden ml-auto">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white text-2xl z-20"
              >
                <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Menu di động */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-primary/95 backdrop-blur-sm transition-transform duration-500 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ paddingTop: "80px" }}
      >
        <div className="flex flex-col h-full">
          {/* User Info Mobile */}
          <div className="flex flex-col items-center py-8 border-b border-white/20">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-white font-bold text-2xl mb-3">
              {user?.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
            </div>
            <p className="text-white text-lg font-medium truncate max-w-xs px-4 text-center">
              {user?.fullName || "User"}
            </p>
            <p
              className="text-white/70 text-sm truncate max-w-xs px-4 text-center"
              title={user?.email || "user@example.com"}
            >
              {user?.email || "user@example.com"}
            </p>
          </div>

          {/* Menu Items */}
          <div className="flex-1 flex flex-col justify-center px-8 -mt-8">
            <ul className="space-y-4">
              {customerMenuItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 text-white hover:text-accent transition-colors text-lg py-3 px-4 rounded-lg ${
                        isActive
                          ? "bg-white/10 text-accent"
                          : "hover:bg-white/10"
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <i className={`fas ${item.icon}`}></i>
                    <span>{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer Actions */}
          <div className="px-8 py-6 border-t border-white/20">
            <div className="space-y-3">
              {/* Đặt Lịch Hẹn Button cho Mobile */}
              <button
                onClick={() => {
                  dispatch(openBookingModal());
                  setIsMenuOpen(false);
                }}
                className="w-full bg-accent text-white py-3 px-6 rounded-lg text-lg font-medium flex items-center justify-center space-x-2"
              >
                <i className="fas fa-plus"></i>
                <span>Đặt Lịch Hẹn</span>
              </button>

              <NavLink
                to="/customer/profile"
                className="flex items-center justify-center bg-white/10 text-white py-3 px-6 rounded-lg text-lg backdrop-blur-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fa-solid fa-user mr-3"></i>
                Thông tin cá nhân
              </NavLink>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full bg-red-500 text-white font-bold py-3 px-6 rounded-lg text-lg flex items-center justify-center"
              >
                <i className="fa-solid fa-sign-out-alt mr-2"></i>
                Đăng Xuất
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CustomerHeader;
