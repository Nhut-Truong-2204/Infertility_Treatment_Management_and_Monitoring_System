import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { MedicalCard, MedicalAlert, Button } from "../../components/ui";

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
          <MedicalAlert
            type="info"
            title={`Chào mừng ${user?.name || "bạn"}!`}
            message="Bạn có thể đặt lịch hẹn trực tiếp cho các dịch vụ bên dưới."
            variant="outline"
            className="mb-8"
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Dịch vụ 1 */}
          <MedicalCard variant="medical" size="medium" hover>
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-heartbeat text-white text-2xl"></i>
            </div>
            <MedicalCard.Title>Khám Tổng Quát</MedicalCard.Title>
            <MedicalCard.Description>
              Khám sức khỏe tổng quát định kỳ với các xét nghiệm cơ bản và tư
              vấn từ bác sĩ chuyên khoa.
            </MedicalCard.Description>
            <div className="mt-4">
              {isAuthenticated ? (
                <Button variant="medical" className="w-full">
                  <i className="fas fa-calendar-plus mr-2"></i>
                  Đặt Lịch Hẹn
                </Button>
              ) : (
                <Button variant="secondary" disabled className="w-full">
                  Đăng nhập để đặt lịch
                </Button>
              )}
            </div>
          </MedicalCard>

          {/* Dịch vụ 2 */}
          <MedicalCard variant="medical" size="medium" hover>
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-user-md text-white text-2xl"></i>
            </div>
            <MedicalCard.Title>Tư Vấn Chuyên Khoa</MedicalCard.Title>
            <MedicalCard.Description>
              Tư vấn và khám chữa bệnh với các bác sĩ chuyên khoa có kinh nghiệm
              nhiều năm trong ngành.
            </MedicalCard.Description>
            <div className="mt-4">
              {isAuthenticated ? (
                <Button variant="medical" className="w-full">
                  <i className="fas fa-calendar-plus mr-2"></i>
                  Đặt Lịch Hẹn
                </Button>
              ) : (
                <Button variant="secondary" disabled className="w-full">
                  Đăng nhập để đặt lịch
                </Button>
              )}
            </div>
          </MedicalCard>

          {/* Dịch vụ 3 */}
          <MedicalCard variant="medical" size="medium" hover>
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-flask text-white text-2xl"></i>
            </div>
            <MedicalCard.Title>Xét Nghiệm</MedicalCard.Title>
            <MedicalCard.Description>
              Thực hiện các xét nghiệm cần thiết với máy móc hiện đại và kết quả
              chính xác, nhanh chóng.
            </MedicalCard.Description>
            <div className="mt-4">
              {isAuthenticated ? (
                <Button variant="medical" className="w-full">
                  <i className="fas fa-calendar-plus mr-2"></i>
                  Đặt Lịch Hẹn
                </Button>
              ) : (
                <Button variant="secondary" disabled className="w-full">
                  Đăng nhập để đặt lịch
                </Button>
              )}
            </div>
          </MedicalCard>
        </div>
      </div>
    </div>
  );
};

export default Services;
