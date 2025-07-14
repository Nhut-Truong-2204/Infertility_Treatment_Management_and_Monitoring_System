import React from "react";
import { useAuth } from "../../hooks/useAuth";

const Services = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="bg-white py-16 sm:py-24 font-onest">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-accent uppercase font-semibold text-sm tracking-widest mb-2">
            DỊCH VỤ
          </h3>
          <h1 className="text-4xl lg:text-5xl font-bold text-primary leading-tight mb-4">
            Dịch Vụ Chăm Sóc Sức Khỏe
          </h1>
          <p className="text-lg text-text-color leading-relaxed max-w-3xl mx-auto">
            Chúng tôi cung cấp các dịch vụ chăm sóc sức khỏe chất lượng cao với
            đội ngũ bác sĩ chuyên nghiệp và trang thiết bị hiện đại.
          </p>
        </div>

        {/* Thông báo cho user đã đăng nhập */}
        {isAuthenticated && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-blue-800">
              Chào mừng {user?.name || "bạn"}! Bạn có thể đặt lịch hẹn trực tiếp
              cho các dịch vụ bên dưới.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Dịch vụ 1 */}
          <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-heartbeat text-white text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">
              Khám Tổng Quát
            </h3>
            <p className="text-text-color mb-4">
              Khám sức khỏe tổng quát định kỳ với các xét nghiệm cơ bản và tư
              vấn từ bác sĩ chuyên khoa.
            </p>
            {isAuthenticated ? (
              <button className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent/90 transition-colors">
                Đặt Lịch Hẹn
              </button>
            ) : (
              <button className="bg-gray-300 text-gray-600 px-6 py-2 rounded-lg cursor-not-allowed">
                Đăng nhập để đặt lịch
              </button>
            )}
          </div>

          {/* Dịch vụ 2 */}
          <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-user-md text-white text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">
              Tư Vấn Chuyên Khoa
            </h3>
            <p className="text-text-color mb-4">
              Tư vấn và khám chữa bệnh với các bác sĩ chuyên khoa có kinh nghiệm
              nhiều năm trong ngành.
            </p>
            {isAuthenticated ? (
              <button className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent/90 transition-colors">
                Đặt Lịch Hẹn
              </button>
            ) : (
              <button className="bg-gray-300 text-gray-600 px-6 py-2 rounded-lg cursor-not-allowed">
                Đăng nhập để đặt lịch
              </button>
            )}
          </div>

          {/* Dịch vụ 3 */}
          <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-flask text-white text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Xét Nghiệm</h3>
            <p className="text-text-color mb-4">
              Thực hiện các xét nghiệm cần thiết với máy móc hiện đại và kết quả
              chính xác, nhanh chóng.
            </p>
            {isAuthenticated ? (
              <button className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent/90 transition-colors">
                Đặt Lịch Hẹn
              </button>
            ) : (
              <button className="bg-gray-300 text-gray-600 px-6 py-2 rounded-lg cursor-not-allowed">
                Đăng nhập để đặt lịch
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
