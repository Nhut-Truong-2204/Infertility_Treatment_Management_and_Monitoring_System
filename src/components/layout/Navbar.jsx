import React, { useState } from "react";
import { Button } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate } from "react-router-dom";

const navItems = [
  {
    label: "LEARN",
    dropdown: ["Link 1", "Link 2", "Link 3"], // bạn thêm link sau
  },
  {
    label: "GET CARE",
    dropdown: ["Link 1", "Link 2"],
  },
  {
    label: "GET INVOLVED",
    dropdown: ["Link 1", "Link 2", "Link 3", "Link 4"],
  },
];

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();
  const goRegisterPage = () => {
    navigate("/register");
  };
  return (
    <nav className="bg-[#032F6C] px-6 py-4 flex items-center justify-between text-white">
      {/* Logo */}
      <div className="flex items-center space-x-2 font-semibold text-lg cursor-pointer">
        <svg
          className="w-7 h-7"
          fill="white"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Biểu tượng bạn có thể thêm hoặc chỉnh sửa */}
          <path d="M4 4h16v16H4z" />
        </svg>
        <span>ReproTrack</span>
      </div>

      {/* Menu chính */}
      <ul className="flex space-x-8">
        {navItems.map((item, idx) => (
          <li
            key={idx}
            className="relative"
            onMouseEnter={() => setOpenDropdown(idx)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="flex items-center gap-1 font-bold uppercase hover:text-gray-300 transition-colors">
              {item.label}
              <ArrowDropDownIcon />
            </button>

            {/* Dropdown */}
            {openDropdown === idx && (
              <ul className="absolute top-full left-0 mt-2 bg-white text-black rounded shadow-lg min-w-[140px] z-10">
                {item.dropdown.map((link, i) => (
                  <li
                    key={i}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
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
        <Button onClick={goRegisterPage}
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
