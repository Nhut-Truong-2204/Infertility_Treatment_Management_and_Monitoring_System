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

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  const routes = {
    goHome: () => navigate("/"),
    goRegister: () => navigate("/register"),

    // Học
    goBarrenMale: () => navigate("/barrenMale"),
    goBarrenFeMale: () => navigate("/barrenFemale"),
    goInfertility: () => navigate("/infertility"),

    //chăm sóc
    goTestingList: () => navigate("/viewTestingList"),
  };

  return (
    <nav className="bg-[#032F6C] px-6 py-4 flex items-center justify-between text-white sticky top-0 z-10">
      {/* Logo */}
      <div className="flex items-center space-x-2 font-semibold text-lg cursor-pointer">
        <Stack direction="row" spacing={2}>
          <Avatar sx={{ bgcolor: blue[700] }}>R</Avatar>
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
            className="flex p-3 items-center gap-1 font-bold uppercase 
                       transition-all duration-300 
                       group-hover:text-blue-900 
                       group-hover:bg-white 
                       group-hover:shadow-md"
          >
            Học
            <ArrowDropDownIcon />
          </button>

          {openDropdown === 0 && (
            <ul className="absolute -left-120 w-300 px-20 py-6 bg-white text-black z-10 shadow-lg">
              <p className="text-[#132b6c] font-bold ml-3">TÌM HIỂU THÊM</p>
              <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto">
                <li
                  onClick={routes.goBarrenMale}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer rounded transition"
                >
                  Hiếm muộn Nam <MaleIcon fontSize="large" />
                </li>
                <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer rounded transition">
                  Link 2
                </li>
                <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer rounded transition">
                  Link 3
                </li>
                <li
                  onClick={routes.goBarrenFeMale}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer rounded transition"
                >
                  Hiếm muộn Nữ <FemaleIcon fontSize="large" />
                </li>
                <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer rounded transition">
                  Link 5
                </li>
                <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer rounded transition">
                  Link 6
                </li>
                <li
                  onClick={routes.goInfertility}
                  className="px-4 py-2 relative hover:bg-blue-100 cursor-pointer rounded transition"
                >
                  Vô Sinh
                  <img
                    src={InfertilityIcon}
                    className="w-[30px] absolute bottom-[8px] left-20"
                  />
                </li>
              </div>
            </ul>
          )}
        </li>

        {/* GET CARE */}
        <li
          className="relative group"
          onMouseEnter={() => setOpenDropdown(1)}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <button
            className="flex p-3 items-center gap-1 font-bold uppercase 
               transition-all duration-300 
               group-hover:text-blue-900 
               group-hover:bg-white 
               group-hover:shadow-md"
          >
            CHĂM SÓC
            <ArrowDropDownIcon />
          </button>

          {openDropdown === 1 && (
            <ul className="absolute  -left-150 w-300 px-20 py-6 bg-white text-black z-10 shadow-lg">
              <div className="grid grid-cols-3 gap-8 mx-auto">
                <li
                  onClick={routes.goTestingList}
                  className=" px-4 py-2 hover:bg-blue-100 cursor-pointer rounded transition"
                >
                  Dịch vụ của chúng tôi
                </li>
                <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer rounded transition">
                  Link 2
                </li>
                <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer rounded transition">
                  Link 3
                </li>
                <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer rounded transition">
                  Link 3
                </li>
                <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer rounded transition">
                  Link 3
                </li>
                <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer rounded transition">
                  Link 3
                </li>
              </div>
            </ul>
          )}
        </li>

        {/* GET INVOLCE */}
        <li
          className="relative group"
          onMouseEnter={() => setOpenDropdown(2)}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <button
            className="flex p-3 items-center gap-1 font-bold uppercase 
                       transition-all duration-300 
                       group-hover:text-blue-900 
                       group-hover:bg-white 
                       group-hover:shadow-md"
          >
            THAM GIA
            <ArrowDropDownIcon />
          </button>

          {openDropdown === 2 && (
            <ul className="absolute -left-150 w-300 px-20 py-6 bg-white text-black z-10 shadow-lg">
              <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer rounded transition">
                  Link 3
                </li>
                <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer rounded transition">
                  Link 3
                </li>
                <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer rounded transition">
                  Link 3
                </li>
              </div>
            </ul>
          )}
        </li>
      </ul>

      {/* Nút Đăng nhập và Đăng ký */}
      <div className="flex space-x-4">
        <Button
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "white",
            textTransform: "none",
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
            textTransform: "none",
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
