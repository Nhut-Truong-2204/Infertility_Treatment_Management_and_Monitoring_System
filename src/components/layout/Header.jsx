import React from "react";
import { useNavigate } from "react-router";
import ScanHeart from "../ui/ScanHeart";
import HeartHandshake from "../ui/HeartHandshake";
// Dùng trong inline style hoặc Tailwind CSS

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background image */}
      <img
        src="https://ocdn.eu/pulscms-transforms/1/ciVk9kpTURBXy83YjJkNDI5ODc4OWIzMDNmNzQxNjQyOGVkODc4YWUzMy5qcGeRkwLNAxYA3gABoTAF"
        alt="Background"
        className="w-full h-full object-cover absolute inset-0 z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#16417e] via-[#415185cc] to-transparent"></div>

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full space-y-15 px-4 text-center">
        {/* <h2
          className="text-4xl md:text-8xl font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-300 to-indigo-200 drop-shadow-lg animate-pulse "
          style={{
            fontFamily: "cursive",
            textShadow: "2px 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          Repro Track
        </h2>
        {/* Shiny professional title */}
        {/* <h1 className="text-3xl mt-20 md:text-4xl lg:text-4xl font-extrabold leading-tight tracking-wide text-zinc-800">
          "Từ những khát khao sâu thẳm
          <br />
          <span className="text-3xl  md:text-4xl lg:text-4xl font-extrabold leading-tight tracking-wide text-zinc-800">
            Chúng tôi hiểu và cùng bạn bước tiếp"
          </span>
        </h1> */} 

        {/* Two buttons under the text */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 mt-6">
          <button className="flex flex-col items-center justify-center bg-pink-500 hover:bg-pink-600 text-white text-base md:text-xl font-bold px-10 py-5 rounded-2xl transition duration-300 shadow-md"
          onClick={() => navigate("/bookingAppointment")}>
            <ScanHeart width={50} height={50} stroke="#fff" />
            Đặt lịch ngay
          </button>
          <button className="flex flex-col items-center justify-center bg-pink-500 hover:bg-pink-600 text-white text-base md:text-xl font-bold px-10 py-5 rounded-2xl transition duration-300 shadow-md">
            <HeartHandshake width={50} height={50} stroke="#fff" />
            Tìm hiểu thêm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
