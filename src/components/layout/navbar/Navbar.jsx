import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import { blue } from "@mui/material/colors";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Swal from "sweetalert2";
import { useAuth } from "../../../context/AuthContext";
import Earth from "../../ui/Earth";
import NotificationSystem from "@/pages/customer/NotificationSystem";
import logo from "../../../../public/LogoWithoutText.png";
import Calendar1 from "@/components/ui/Calendar";
import { BadgeDollarSign } from "@/components/ui/BadgeDollarSign ";
import { ClipboardCopy } from "@/components/ui/ClipboardCopy";
import { Bolt } from "@/components/ui/Bolt";
import { ToggleLeft } from "@/components/ui/ToggleLeft ";
import { Clock8 } from "@/components/ui/Clock8";
import UserDropdown from "@/components/ui/UserDropdown";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  // 👇 Các route chuyển hướng
  const routes = {
    goHome: () => navigate("/"),
    goLogin: () => navigate("/login"),
    goRegister: () => navigate("/register"),
  };

  // 👇 Xử lý scroll navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 👇 Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 👇 Xử lý đăng xuất
  const handleLogout = () => {
    Swal.fire({
      title: "Xác nhận đăng xuất?",
      text: "Bạn sẽ cần đăng nhập lại để tiếp tục.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Đăng xuất",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/login");
        Swal.fire("Đã đăng xuất!", "", "success");
      }
    });
  };

  return (
    <AnimatePresence mode="wait">
      <motion.header
        key={isScrolled ? "scrolled" : "top"}
        initial={isScrolled ? { y: -80, opacity: 0 } : { y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        exit={isScrolled ? { y: -80, opacity: 0 } : { y: 0, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`z-50 w-full ${
          isScrolled
            ? "sticky top-0 left-0 bg-[#252e6c]/90 shadow-lg backdrop-blur-xl flex items-center justify-between px-40"
            : "relative max-w-[1440px] h-30 mx-auto flex justify-center rounded-t-[32px] border-x-2 border-t-2 border-gray-200 shadow-xl"
        }`}
        style={
          isScrolled
            ? {
                border: "none",
                borderRadius: 0,
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
                maxWidth: "100vw",
              }
            : {
                background: "url('/hero-bg-2.jpg') center top/cover no-repeat",
                borderTopLeftRadius: "32px",
                borderTopRightRadius: "32px",
                borderLeft: "2px solid #e5e7eb",
                borderRight: "2px solid #e5e7eb",
                borderTop: "2px solid #e5e7eb",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
                maxWidth: "1440px",
              }
        }
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br from-[#252e6c] via-[#252e6c] to-[#252e6c] opacity-90 pointer-events-none z-0 ${
            isScrolled ? "" : "rounded-t-[32px]"
          }`}
        />
        <div className="max-w-[1440px] w-full flex justify-between items-center py-6 px-8 lg:px-16 relative z-10">
          {/* Logo */}
          <div
            onClick={routes.goHome}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <div
              onClick={routes.goHome}
              className="flex items-center space-x-2 font-semibold text-lg cursor-pointer hover:bg-blue-900 hover:rounded-2xl hover:py-2 hover:px-4 transition-all duration-300"
            >
              <img src={logo} alt="CumIcon" className="h-12" />
              <span className="ml-2 text-white text-2xl font-bold tracking-tight">
                ReproTrack<span className="text-[#f41574]">.</span>
              </span>
            </div>
          </div>

          {/* Menu */}
          <nav className="hidden lg:flex gap-12 font-semibold text-white text-base">
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-[#f41574] transition-all duration-200 pb-1 border-b-2 border-transparent group-hover:border-[#f41574]">
                Home
                <ArrowDropDownIcon className="text-[#f41574]" />
              </button>
              <div className="absolute top-full left-0 w-44 bg-white text-gray-700 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 mt-2">
                <a
                  href="#"
                  className="block px-5 py-3 hover:bg-gray-100 rounded-t-xl font-medium"
                >
                  Home Main
                </a>
                <a
                  href="#"
                  className="block px-5 py-3 hover:bg-gray-100 rounded-b-xl font-medium"
                >
                  Home Video
                </a>
              </div>
            </div>
            <a href="#" className="hover:text-[#f41574]">
              About Us
            </a>
            <a href="#" className="hover:text-[#f41574]">
              Services
            </a>
            <a href="#" className="hover:text-[#f41574]">
              Blog
            </a>
            <a href="#" className="hover:text-[#f41574]">
              Contact Us
            </a>
          </nav>

          {/* Avatar / Buttons */}
          <div className="flex items-center gap-4" ref={menuRef}>
            {user ? (
              <div className="flex items-center space-x-4 relative" ref={menuRef}>
              <span className="text-white font-semibold">
                {user.fullName || "Người dùng"}
              </span>

              <div className="relative">
                <Avatar
                  sx={{ bgcolor: blue[600], cursor: "pointer" }}
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <Earth sx={{ color: "white", fontSize: 20 }} />
                </Avatar>

                {menuOpen && <UserDropdown onLogout={handleLogout} />}
              </div>
              <NotificationSystem />
            </div>
            ) : (
              <>
                <div className="relative group w-[140px] h-[50px]">
                  <Button
                    onClick={routes.goLogin}
                    variant="outlined"
                    sx={{
                      color: "white",
                      borderColor: "white",
                      borderRadius: "8px",
                      textTransform: "none",
                      backgroundColor: "#1B7ACD",
                      px: 3,
                      "&:hover": {
                        backgroundColor: "#20296e",
                        color: "white",
                        borderColor: "white",
                      },
                    }}
                    className="w-full h-full flex items-center justify-center relative overflow-hidden"
                  >
                    <span className="relative z-10 text-[20px] text-base md:text-sm font-bold">
                      Đăng nhập
                    </span>
                    <span className="absolute top-0 left-[-100%] w-full h-full bg-white/20 skew-x-[-20deg] group-hover:left-[100%] transition-all duration-500 ease-in-out"></span>
                  </Button>
                </div>
                <div className="relative group w-[140px] h-[50px]">
                  <Button
                    onClick={routes.goRegister}
                    variant="contained"
                    sx={{
                      backgroundColor: "#f41574",
                      borderRadius: "8px",
                      textTransform: "none",
                      px: 3,
                      "&:hover": {
                        backgroundColor: "#20296e",
                      },
                    }}
                    className="w-full h-full flex items-center justify-center relative overflow-hidden"
                  >
                    <span className="relative z-10 text-[20px] text-base md:text-sm font-bold">
                      Đăng ký
                    </span>
                    <span className="absolute top-0 left-[-100%] w-full h-full bg-white/20 skew-x-[-20deg] group-hover:left-[100%] transition-all duration-500 ease-in-out"></span>
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.header>
    </AnimatePresence>
  );
}
