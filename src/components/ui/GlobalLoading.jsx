import React from "react";
import loaderIcon from "../../assets/images/loader.svg"; // Đường dẫn từ ui folder

const GlobalLoading = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-primary bg-opacity-90">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-transparent border-t-white border-l-white rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={loaderIcon} alt="Đang tải..." className="w-16 h-16" />
        </div>
      </div>
    </div>
  );
};

export default GlobalLoading;
