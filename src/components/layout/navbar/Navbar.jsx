import { useState } from "react";
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

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  const routes = {
    goHome: () => navigate("/"),
    goRegister: () => navigate("/register"),
    goLogin: () => navigate("/login"),
    goBarrenMale: () => navigate("/barrenMale"),
    goBarrenFeMale: () => navigate("/barrenFemale"),
    goInfertility: () => navigate("/infertility"),
    goTestingList: () => navigate("/viewTestingList"),
    goDoctorList: () => navigate("/viewDoctorList"),

  };

  return (
    <nav className="bg-[#032F6C] px-8 py-3 flex items-center justify-between text-white sticky top-0 z-50 shadow-md border-b border-blue-900">
      {/* Logo */}
      <div className="flex items-center space-x-2 font-semibold text-lg cursor-pointer">
        <Stack direction="row" spacing={2}>
          <Avatar sx={{ bgcolor: "#23A0FF" }}>
            <Syringe size={20} weight="fill" color="white" />
          </Avatar>
        </Stack>
        <span onClick={routes.goHome}>ReproTrack</span>
      </div>

      {/* Menu chính */}
      <ul className="flex space-x-8">
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
              <p className="text-[#132b6c] font-bold ml-3 mb-3">TÌM HIỂU THÊM</p>
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
                <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer rounded transition">
                  Link 2
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
                <li onClick={routes.goDoctorList}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer rounded transition">
                  Danh sách bác sĩ 
                </li>
                <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer rounded transition">
                  Link 3
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
      <div className="flex space-x-4">
        <Button
          onClick={routes.goLogin}
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "white",
            borderRadius: "8px",
            textTransform: "none",
            px: 3,
            "&:hover": {
              backgroundColor: "white",
              color: "#032F6C",
              borderColor: "white",
            },
          }}
        >
          Đăng nhập
        </Button>
        <Button
          onClick={routes.goRegister}
          variant="contained"
          sx={{
            backgroundColor: "#23A0FF",
            borderRadius: "8px",
            textTransform: "none",
            px: 3,
            "&:hover": {
              backgroundColor: "#1B7ACD",
            },
          }}
        >
          Đăng ký
        </Button>
      </div>
    </nav>
  );
}
