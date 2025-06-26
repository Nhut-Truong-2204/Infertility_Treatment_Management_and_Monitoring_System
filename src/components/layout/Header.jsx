import React, { useEffect, useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import ScanHeart from "../ui/ScanHeart";
import HeartHandshake from "../ui/HeartHandshake";

const Header = () => {
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);

  // Scroll effect for parallax
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

  // Toggle dark mode
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

      {/* Dark mode toggle */}
      <div className="absolute top-6 right-6 z-30">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-white/70 dark:bg-black/40 backdrop-blur-md p-2 rounded-full shadow-md hover:scale-110 transition"
          title="Toggle Dark Mode"
        >
          {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-800" />}
        </button>
      </div>

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full space-y-10 px-4 text-center animate-fade-in-up">
        {/* Heading text */}
        <h1 className="text-white text-2xl md:text-4xl font-semibold drop-shadow-xl leading-snug animate-pulse">
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

   
        
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 mt-6">
          <div className="group flex flex-col items-center">
            <button
              className="group bg-pink-500 hover:bg-pink-600 text-white font-bold 
             rounded-2xl transition-all duration-500 shadow-md 
             flex flex-col items-center justify-start 
             w-[180px] h-[120px] group-hover:h-[160px]
             relative overflow-hidden"
            onClick={() => navigate("/bookingAppointment")}
            >
              {/* ICON */}
              <ScanHeart
                className="w-12 h-12 transition-all duration-500 transform mt-6
               group-hover:-translate-y-2"
                strokeWidth={2}
              />

              {/* TEXT */}
              <span
                className="text-lg font-semibold opacity-0 translate-y-2
               group-hover:opacity-100 group-hover:translate-y-4
               transition-all duration-500 mt-4"
              >
                Đặt lịch hẹn
              </span>
            </button>

          </div>

          {/* Button 2 */}
          <div className="group flex flex-col items-center">
            <button
              className="group bg-pink-500 hover:bg-pink-600 text-white font-bold 
             rounded-2xl transition-all duration-500 shadow-md 
             flex flex-col items-center justify-start 
             w-[180px] h-[120px] group-hover:h-[160px]
             relative overflow-hidden"
            >
              {/* ICON */}
              <HeartHandshake
                className="w-12 h-12 transition-all duration-500 transform mt-6
               group-hover:-translate-y-2"
                strokeWidth={2}
              />

              {/* TEXT */}
              <span
                className="text-lg font-semibold opacity-0 translate-y-2
               group-hover:opacity-100 group-hover:translate-y-4
               transition-all duration-500 mt-4"
              >
                Tìm hiểu thêm
              </span>
            </button>

          </div>


        </div>
      </div>
    </div>
  );
};

export default Header;
