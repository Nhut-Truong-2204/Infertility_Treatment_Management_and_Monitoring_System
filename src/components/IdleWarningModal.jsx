import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const IdleWarningModal = ({ isOpen, onContinue, onLogout, countdown }) => {
  if (!isOpen) return null;

  return (
    // Lớp phủ (Overlay)
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-60">
      {/* Vùng chứa Modal */}
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 animate__animated animate__fadeInUp">
        {/* Phần Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            className="text-yellow-400 text-5xl mb-4"
          />
          <h3 className="text-2xl font-bold text-primary">
            Cảnh Báo Không Hoạt Động
          </h3>
        </div>

        {/* Phần Nội Dung */}
        <div className="text-center">
          <p className="text-base text-text-color mb-3">
            Bạn đã không hoạt động trong một thời gian. Phiên đăng nhập sẽ tự
            động kết thúc sau:
          </p>
          <div className="my-4">
            <span className="text-5xl font-bold text-red-500 tracking-wider">
              {/* Định dạng thời gian MM:SS */}
              {Math.floor(countdown / 60)
                .toString()
                .padStart(2, "0")}
              :{(countdown % 60).toString().padStart(2, "0")}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Nhấn "Tiếp tục" để duy trì phiên đăng nhập của bạn.
          </p>
        </div>

        {/* Phần Nút Bấm */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-8">
          <button
            onClick={onContinue}
            className="w-full bg-accent text-white font-bold px-4 py-3 rounded-lg hover:bg-primary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-colors duration-300"
          >
            Tiếp Tục Làm Việc
          </button>
          <button
            onClick={onLogout}
            className="w-full bg-gray-200 text-gray-800 font-bold px-4 py-3 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors duration-300"
          >
            Đăng Xuất Ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdleWarningModal;
