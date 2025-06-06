import React from "react";

const Header = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* pic */}
      <img
        src="https://ocdn.eu/pulscms-transforms/1/ciVk9kpTURBXy83YjJkNDI5ODc4OWIzMDNmNzQxNjQyOGVkODc4YWUzMy5qcGeRkwLNAxYA3gABoTAF"
        alt="Background"
        className="w-full h-full object-cover absolute inset-0 z-0"
      />
            {/* overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#1b2955] via-[#1b2955cc] to-transparent"></div>
        {/* text */}
      <div className="relative z-20 flex items-center justify-center h-full">
        <h1 className="text-white text-4xl md:text-6xl font-bold text-center drop-shadow-xl">
            Welcome to Our Clinic
            <br />
            Your Health, Our Priority
        </h1>
      </div>
    </div>
  );
};

export default Header;
