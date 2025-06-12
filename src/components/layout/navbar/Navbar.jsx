import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { blue } from "@mui/material/colors";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import InfertilityIcon from "../../../assets/R.png";
import { Syringe } from "phosphor-react";
const gooeyItems = [
  { label: "Trang chủ", onClick: () => navigate("/") },
  { label: "Giới thiệu", onClick: () => navigate("/clinicpage") },
  { label: "Bác sĩ", onClick: () => navigate("/viewDoctorList") },
  { label: "Dịch vụ", onClick: () => navigate("/servicepage") },
];

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Khi scroll xuống 50px thì bật trạng thái
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
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
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#183383]/90 shadow-lg" : "bg-transparent"
      }`}
    >
      <nav className="  py-10 px-40 flex items-center justify-between text-white sticky top-0 z-50 ">
        {/* Logo */}
        <div
          onClick={routes.goHome}
          className="flex items-center space-x-2 font-semibold text-lg cursor-pointer hover:bg-blue-900 hover:rounded-2xl hover:py-2 hover:px-4 transition-all duration-300"
        >
          <img
            src="src/assets/spermatozoon.png"
            alt="CumIcon"
            className="h-10"
          />
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
                  <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer rounded transition">
                    Link 1
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

        {/* Nút Đăng nhập & Đăng ký */}
        <div className="flex space-x-5 gap-2">
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
                  color: "#white",
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
        </div>
      </nav>
    </div>
  );
}
