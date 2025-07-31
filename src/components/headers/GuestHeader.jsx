import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/images/logo.svg";
import Topbar from "../Topbar";

const GuestHeader = ({
  onLoginClick,
  onRegisterClick,
  hasBackground = false,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const location = useLocation();

  // Kiểm tra nếu không phải trang chủ thì tự động thêm background
  const shouldHaveBackground = hasBackground || location.pathname !== "/";

  // Hook để xử lý hiệu ứng sticky header khi cuộn trang
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Menu items cho guest
  const guestMenuItems = [
    { path: "/", name: "Trang Chủ" },
    { path: "/about", name: "Về Chúng Tôi" },
    { path: "/services", name: "Dịch Vụ" },
    { path: "/blog", name: "Bài Viết" },
    { path: "/contact", name: "Liên Hệ" },
  ];

  return (
    <header
      className={`${
        shouldHaveBackground ? "relative" : "absolute"
      } top-0 left-0 w-full z-50 ${
        shouldHaveBackground
          ? "bg-primary shadow-md rounded-t-2xl rounded-b-2xl mt-12"
          : ""
      }`}
    >
      <div
        className={`transition-all duration-300 ${
          isSticky ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        {/* Hiện Topbar ở trang chủ (không có background) hoặc các trang khác (có background) */}
        {(!shouldHaveBackground || location.pathname !== "/") && <Topbar />}
      </div>

      {/* Header chính */}
      <div
        className={`transition-all duration-300 ${
          isSticky
            ? "fixed top-0 left-0 right-0 bg-primary shadow-lg rounded-b-2xl animate__animated animate__fadeInDown"
            : "relative"
        } ${
          shouldHaveBackground ? "bg-primary rounded-t-2xl rounded-b-2xl" : ""
        }`}
      >
        <div className="max-w-[1480px] mx-auto">
          <nav className="flex items-center py-4 px-4">
            <NavLink className="navbar-brand" to="/">
              <img
                src={logo}
                alt="Logo Repro Track"
                className="h-12 w-auto object-contain"
              />
            </NavLink>
            {/* Menu cho Desktop */}
            <div className="hidden lg:flex flex-grow justify-center">
              <ul className="flex items-center space-x-8">
                {guestMenuItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `relative transition-all duration-300 hover:text-accent ${
                          shouldHaveBackground
                            ? "text-white"
                            : isActive
                            ? "text-accent"
                            : "text-white"
                        } font-medium`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nút Đăng Nhập và Đăng Ký */}
            <div className="hidden lg:flex items-center ml-auto space-x-4">
              <button
                onClick={onLoginClick}
                className="bg-transparent border border-white text-white font-bold capitalize rounded-lg px-6 py-3 hover:bg-white hover:text-primary transition-all duration-300"
              >
                Đăng Nhập
              </button>
              <button
                onClick={onRegisterClick}
                className="bg-white text-primary font-bold capitalize rounded-lg px-6 py-3 hover:bg-accent hover:text-white transition-all duration-300"
              >
                Đăng Ký
              </button>
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
        className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-primary/95 backdrop-blur-sm transition-transform duration-500 ease-in-out rounded-b-2xl ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ paddingTop: "80px" }}
      >
        <ul className="flex flex-col items-center justify-center h-full space-y-6 -mt-20">
          {guestMenuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className="text-white text-2xl hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
          <li className="pt-8 space-y-4">
            <button
              onClick={() => {
                onLoginClick();
                setIsMenuOpen(false);
              }}
              className="bg-transparent border border-white text-white font-bold py-3 px-8 rounded-lg text-lg block w-full mb-4"
            >
              Đăng Nhập
            </button>
            <button
              onClick={() => {
                onRegisterClick();
                setIsMenuOpen(false);
              }}
              className="bg-accent text-white font-bold py-3 px-8 rounded-lg text-lg block w-full"
            >
              Đăng Ký
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default GuestHeader;
