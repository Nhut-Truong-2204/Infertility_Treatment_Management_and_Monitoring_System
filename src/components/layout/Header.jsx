import React from "react";

const Header = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background image */}
      <img
        src="https://ocdn.eu/pulscms-transforms/1/ciVk9kpTURBXy83YjJkNDI5ODc4OWIzMDNmNzQxNjQyOGVkODc4YWUzMy5qcGeRkwLNAxYA3gABoTAF"
        alt="Background"
        className="w-full h-full object-cover absolute inset-0 z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#1b2955] via-[#1b2955cc] to-transparent"></div>

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full space-y-10 px-4 text-center">
        {/* Heading text */}
        <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow-xl leading-snug">
          "Từ những khát khao sâu thẳm <br /> Chúng tôi hiểu và cùng bạn bước tiếp."
        </h1>

        {/* Two buttons under the text */}
        <div className="flex space-x-4 mt-4">
          <button className="bg-pink-500 hover:bg-pink-600 text-white text-base md:text-xl font-bold px-15 py-6 rounded-4xl transition duration-300 shadow-md">
            Đặt lịch ngay
          </button>
          <button className="bg-pink-500 hover:bg-pink-600 text-white text-base md:text-xl font-bold px-15 py-6 rounded-4xl transition duration-300 shadow-md">
            Tìm hiểu thêm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
