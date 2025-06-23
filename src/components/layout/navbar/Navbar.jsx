import { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { blue } from "@mui/material/colors";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import InfertilityIcon from "../../../assets/R.png";
import { useAuth } from "../../../context/AuthContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EventNoteIcon from "@mui/icons-material/EventNote";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import Swal from "sweetalert2";
import ChecklistIcon from '@mui/icons-material/Checklist';
import logo from "../../../../public/LogoWithoutText.png";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  ///avatar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
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
  const routes = {
    goHome: () => navigate("/"),
    goRegister: () => navigate("/register"),
    goLogin: () => navigate("/login"),
    goBarrenMale: () => navigate("/barrenMale"),
    goBarrenFeMale: () => navigate("/barrenFemale"),
    goInfertility: () => navigate("/infertility"),
    goTestingList: () => navigate("/viewTestingList"),
    goDoctorList: () => navigate("/viewDoctorList"),
    goClinicIntro: () => navigate("/clinicpage"),
    goService: () => navigate("/servicepage"),
    goHistory: () => navigate("/history"),
    goPayment: () => navigate("/payment"),
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-[#183383]/90 shadow-lg" : "bg-transparent"
        }`}
    >
      <nav className="py-10 px-40 flex items-center justify-between text-white sticky top-0 z-50">
        {/* Logo */}
        <div onClick={routes.goHome} className="flex items-center space-x-2 font-semibold text-lg cursor-pointer hover:bg-blue-900 hover:rounded-2xl hover:py-2 hover:px-4 transition-all duration-300">
          <img src={logo} alt="CumIcon" className="h-12" />
          <span>ReproTrack</span>
        </div>

        {/* Menu chính */}
        <ul className="flex space-x-10">
          {/* Học */}
          <li
            className="relative group"
            onMouseEnter={() => setOpenDropdown(0)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              className="flex px-4 py-2 items-center gap-1 font-semibold uppercase 
                       transition-all duration-300 
                       group-hover:text-[#032F6C] 
                       group-hover:bg-white 
                       group-hover:shadow
                       rounded-md"
            >
              Tìm hiểu thêm
              <ArrowDropDownIcon />
            </button>

            {openDropdown === 0 && (
              <ul className="absolute -left-20 min-w-[350px] px-6 py-4 bg-white text-black z-20 rounded-lg shadow-xl border border-gray-200 transition-all duration-200">
                <p className="text-[#132b6c] font-bold ml-3 mb-3">
                  TÌM HIỂU THÊM
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <li
                    onClick={routes.goBarrenMale}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-blue-100 cursor-pointer rounded transition"
                  >
                    Hiếm muộn Nam <MaleIcon fontSize="small" />
                  </li>
                  <li
                    onClick={routes.goBarrenFeMale}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-blue-100 cursor-pointer rounded transition"
                  >
                    Hiếm muộn Nữ <FemaleIcon fontSize="small" />
                  </li>
                  <li
                    onClick={routes.goInfertility}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-blue-100 cursor-pointer rounded transition relative"
                  >
                    Vô sinh
                    <img
                      src={InfertilityIcon}
                      alt="infertility"
                      className="w-[26px] absolute right-4 top-1/2 -translate-y-1/2"
                    />
                  </li>
                  <li
                    onClick={routes.goClinicIntro}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer rounded transition"
                  >
                    Clinic Information
                  </li>
                  <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer rounded transition">
                    Link 3
                  </li>
                </div>
              </ul>
            )}
          </li>

          {/* Chăm sóc */}
          <li
            className="relative group"
            onMouseEnter={() => setOpenDropdown(1)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              className="flex px-4 py-2 items-center gap-1 font-semibold uppercase 
                       transition-all duration-300 
                       group-hover:text-[#032F6C] 
                       group-hover:bg-white 
                       group-hover:shadow 
                       rounded-md"
            >
              Chăm sóc
              <ArrowDropDownIcon />
            </button>

            {openDropdown === 1 && (
              <ul className="absolute -left-20 min-w-[350px] px-6 py-4 bg-white text-black z-20 rounded-lg shadow-xl border border-gray-200 transition-all duration-200">
                <div className="grid grid-cols-2 gap-4">
                  <li
                    onClick={routes.goTestingList}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer rounded transition"
                  >
                    Dịch vụ của chúng tôi
                  </li>
                  <li
                    onClick={routes.goDoctorList}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer rounded transition"
                  >
                    Danh sách bác sĩ
                  </li>
                  <li
                    onClick={routes.goService}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer rounded transition"
                  >
                    Dịch vụ bệnh viện
                  </li>
                </div>
              </ul>
            )}
          </li>

          {/* Tham gia */}
          <li
            className="relative group"
            onMouseEnter={() => setOpenDropdown(2)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              className="flex px-4 py-2 items-center gap-1 font-semibold uppercase 
                       transition-all duration-300 
                       group-hover:text-[#032F6C] 
                       group-hover:bg-white 
                       group-hover:shadow 
                       rounded-md"
            >
              Tham gia
              <ArrowDropDownIcon />
            </button>

            {openDropdown === 2 && (
              <ul className="absolute -left-20 min-w-[350px] px-6 py-4 bg-white text-black z-20 rounded-lg shadow-xl border border-gray-200 transition-all duration-200">
                <div className="grid grid-cols-2 gap-4">
                  <li
                    onClick={routes.goHistory}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer rounded transition"
                  >
                    Lịch sử điều trị
                  </li>
                  <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer rounded transition">
                    Link 2
                  </li>
                  <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer rounded transition">
                    Link 3
                  </li>
                  <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer rounded transition">
                    Link 4
                  </li>
                </div>
              </ul>
            )}
          </li>
        </ul>

        {/* Nút Đăng nhập & Đăng ký hoặc thông tin tài khoản */}
        <div className="flex space-x-5 gap-2">
          {user ? (
            // Nếu đã đăng nhập, hiển thị thông tin tài khoản và nút Đăng xuất
            <div className="flex items-center space-x-4 relative" ref={menuRef}>
              <span className="text-white font-semibold">{user.fullName || "Người dùng"}</span>

              <div className="relative">
                <Avatar
                  sx={{ bgcolor: blue[600], cursor: "pointer" }}
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <MedicalServicesIcon sx={{ color: "white", fontSize: 20 }} />
                </Avatar>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-[#2e6fd8] rounded-md shadow-lg z-20 py-2">
                    <button
                      onClick={() => navigate("/profile")}
                      className="flex items-center w-full px-4 py-2 text-sm hover:bg-[#1c398e]"
                    >
                      <AccountCircleIcon color="action" className="mr-2 text-blue-600" />
                      Hồ sơ cá nhân
                    </button>
                    <button
                      onClick={() => navigate("/viewAppointment")}
                      className="flex items-center w-full px-4 py-2 text-sm hover:bg-[#1c398e]"
                    >
                      <EventNoteIcon className="mr-2 text-green-600" />
                      Lịch hẹn
                    </button>
                    <button
                      onClick={() => navigate("/")}
                      className="flex items-center w-full px-4 py-2 text-sm hover:bg-[#1c398e]"
                    >
                      <ChecklistIcon className="mr-2 text-green-600" />
                      Kết quả xét nghiệm
                    </button>
                    <button
                      onClick={() => navigate("/payment")}
                      className="flex items-center w-full px-4 py-2 text-sm hover:bg-[#1c398e]"
                    >
                      <AccountBalanceWalletIcon className="mr-2 text-green-600" />
                      Quản lý thanh toán
                    </button>
                    <button
                      onClick={() => navigate("/settings")}
                      className="flex items-center w-full px-4 py-2 text-sm hover:bg-[#1c398e]"
                    >
                      <SettingsIcon className="mr-2 text-yellow-600" />
                      Cài đặt
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm hover:bg-[#1c398e]"
                    >
                      <LogoutIcon className="mr-2 text-red-600" />
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Nếu chưa đăng nhập, hiển thị nút Đăng nhập và Đăng ký
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
                  <span className="relative z-10 text-[20px] text-base md:text-sm font-bold">Đăng nhập</span>
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
                  <span className="relative z-10 text-[20px] text-base md:text-sm font-bold">Đăng ký</span>
                  <span className="absolute top-0 left-[-100%] w-full h-full bg-white/20 skew-x-[-20deg] group-hover:left-[100%] transition-all duration-500 ease-in-out"></span>
                </Button>
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}