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
