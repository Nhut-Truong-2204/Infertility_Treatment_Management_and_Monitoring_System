import React, { useEffect, useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (headerRef.current) {
        headerRef.current.style.backgroundPositionY = `${offset * 0.5}px`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div
      ref={headerRef}
      className="relative w-full h-screen overflow-hidden font-sans bg-[#E3F2FD] text-[#37474F] dark:bg-[#121212] dark:text-gray-100 transition-all duration-500 bg-fixed bg-cover"
    >
      {/* Background image */}
      <img
        src="https://ocdn.eu/pulscms-transforms/1/ciVk9kpTURBXy83YjJkNDI5ODc4OWIzMDNmNzQxNjQyOGVkODc4YWUzMy5qcGeRkwLNAxYA3gABoTAF"
        alt="Background"
        className="w-full h-full object-cover absolute inset-0 z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#16417e] via-[#415185cc] to-transparent"></div>

      {/* Dark mode toggle */}<div className="absolute inset-0 bg-gradient-to-t from-[#121212]/90 to-transparent via-[#415185cc]/60 bg-fixed z-10">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-white/70 dark:bg-black/40 backdrop-blur-md p-2 rounded-full shadow-md hover:scale-110 transition"
          title="Toggle Dark Mode"
        >
          {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-800" />}
        </button>
      </div>

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full space-y-10 px-4 text-center">
        {/* Heading text */}
        <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow-xl leading-snug">
          <TypeAnimation
            sequence={[
              "Từ những khát khao sâu thẳm", 2000,
              "Chúng tôi hiểu và cùng bạn bước tiếp.", 2000,
              "Nơi bắt đầu của hy vọng", 2000,
              "Chăm sóc bằng trái tim", 2000
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="block"
          />
        </h1>

        {/* Two buttons under the text */}
        <div className="flex space-x-4 mt-4">
          <button
            onClick={() => navigate("/bookingAppointment")}
            className="bg-[#F8BBD0] hover:bg-pink-400 text-white text-base md:text-xl font-bold px-8 py-4 rounded-full transition duration-300 shadow-md"
          >
            Đặt lịch ngay
          </button>
          <button
            className="bg-[#CE93D8] hover:bg-purple-500 text-white text-base md:text-xl font-bold px-8 py-4 rounded-full transition duration-300 shadow-md"
          >
            Tìm hiểu thêm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
