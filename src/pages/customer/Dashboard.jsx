import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-gray-50 py-8 font-onest">
      <div className="container mx-auto px-4">
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
              <i className="fas fa-user text-white text-2xl"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">
                Chào mừng trở lại, {user?.name}!
              </h1>
              <p className="text-text-color">
                Quản lý lịch hẹn và theo dõi sức khỏe của bạn
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <i className="fas fa-calendar-check text-blue-600"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary">5</h3>
                <p className="text-text-color text-sm">Lịch hẹn sắp tới</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <i className="fas fa-file-medical text-green-600"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary">12</h3>
                <p className="text-text-color text-sm">Kết quả xét nghiệm</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <i className="fas fa-pills text-orange-600"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary">3</h3>
                <p className="text-text-color text-sm">Đơn thuốc đang dùng</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <i className="fas fa-heart text-purple-600"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary">98%</h3>
                <p className="text-text-color text-sm">Chỉ số sức khỏe</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Appointments */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-primary mb-6">
              Lịch Hẹn Gần Đây
            </h2>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <i className="fas fa-user-md text-white"></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-primary">
                      Khám tổng quát với BS. Nguyễn Văn A
                    </h3>
                    <p className="text-sm text-text-color">
                      15/07/2024 - 09:00 AM
                    </p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Đã xác nhận
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-accent text-white py-3 rounded-lg hover:bg-accent/90 transition-colors">
              Xem Tất Cả Lịch Hẹn
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-primary mb-6">
              Thao Tác Nhanh
            </h2>
            <div className="space-y-3">
              <button className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-3">
                <i className="fas fa-plus"></i>
                Đặt Lịch Hẹn Mới
              </button>
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-3">
                <i className="fas fa-file-medical"></i>
                Xem Kết Quả Xét Nghiệm
              </button>
              <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-3">
                <i className="fas fa-pills"></i>
                Quản Lý Đơn Thuốc
              </button>
              <button className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-3">
                <i className="fas fa-user-edit"></i>
                Cập Nhật Hồ Sơ
              </button>
            </div>
          </div>
        </div>

        {/* Health Summary */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-primary mb-6">
            Tổng Quan Sức Khỏe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-heartbeat text-red-600 text-2xl"></i>
              </div>
              <h3 className="font-semibold text-primary">Huyết áp</h3>
              <p className="text-2xl font-bold text-red-600">120/80</p>
              <p className="text-sm text-text-color">Bình thường</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-weight text-blue-600 text-2xl"></i>
              </div>
              <h3 className="font-semibold text-primary">Cân nặng</h3>
              <p className="text-2xl font-bold text-blue-600">65kg</p>
              <p className="text-sm text-text-color">BMI: 22.5</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="fas fa-thermometer-half text-green-600 text-2xl"></i>
              </div>
              <h3 className="font-semibold text-primary">Thân nhiệt</h3>
              <p className="text-2xl font-bold text-green-600">36.5°C</p>
              <p className="text-sm text-text-color">Bình thường</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
