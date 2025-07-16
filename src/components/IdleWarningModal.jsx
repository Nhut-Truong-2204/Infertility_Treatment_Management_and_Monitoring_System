import React from "react";
import MedicalCard from "./ui/MedicalCard";
import MedicalAlert from "./ui/MedicalAlert";

const IdleWarningModal = ({ isOpen, onContinue, onLogout, countdown }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-60">
      <MedicalCard className="max-w-md w-full mx-4 animate__animated animate__fadeInUp relative">
        <MedicalCard.Content>
          <div className="flex flex-col items-center text-center mb-6">
            <MedicalAlert
              type="warning"
              title="Cảnh Báo Không Hoạt Động"
              message="Bạn đã không hoạt động trong một thời gian. Phiên đăng nhập sẽ tự động kết thúc sau:"
              showIcon
              className="mb-4"
              dismissible={false}
            />
            <span className="text-5xl font-bold text-red-500 tracking-wider mb-2">
              {Math.floor(countdown / 60)
                .toString()
                .padStart(2, "0")}
              :{(countdown % 60).toString().padStart(2, "0")}
            </span>
            <p className="text-sm text-gray-500">
              Nhấn "Tiếp tục" để duy trì phiên đăng nhập của bạn.
            </p>
          </div>
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
        </MedicalCard.Content>
      </MedicalCard>
    </div>
  );
};

export default IdleWarningModal;
