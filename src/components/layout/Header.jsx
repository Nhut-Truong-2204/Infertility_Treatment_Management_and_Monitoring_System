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

        {/* Two buttons under the text */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-6">
<button
  onClick={() => navigate("/BookingAppointment")}
  className="flex items-center gap-2 justify-center bg-gradient-to-br from-[#FEC8D8] to-[#FF9AA2] hover:brightness-110 text-white text-xs md:text-sm font-semibold px-4 py-2 rounded-full transition duration-500 shadow-md hover:shadow-xl hover:scale-105"
>
  <ScanHeart width={20} height={20} stroke="#fff" />
  Đặt lịch ngay
</button>

<button
  onClick={() => navigate("/learnMore")} // <-- Thêm dòng này
  className="flex items-center gap-2 justify-center bg-gradient-to-br from-[#A1C4FD] via-[#C2E9FB] to-[#A1C4FD] hover:brightness-110 text-white text-xs md:text-sm font-semibold px-4 py-2 rounded-full transition duration-500 shadow-md hover:shadow-xl hover:scale-105"
>
  <HeartHandshake width={20} height={20} stroke="#fff" />
  Tìm hiểu thêm
</button>

        </div>
      </div>
    </div>
  );
};

export default Header;
