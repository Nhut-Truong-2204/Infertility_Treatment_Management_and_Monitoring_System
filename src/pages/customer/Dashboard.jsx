import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Navigate, Link } from "react-router-dom";
import useDashboard from "../../hooks/useDashboard";
import {
  Loading,
  MedicalStatusBadge,
  MedicalEmptyState,
  MedicalAlert,
  MedicalCard,
  Button,
} from "../../components/ui";
import BookingModal from "../../components/BookingModal";
import TreatmentSummary from "../../components/TreatmentSummary";

// Utility functions
const formatDate = (dateString) => {
  if (!dateString) return "Chưa xác định";
  return new Date(dateString).toLocaleDateString("vi-VN");
};

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const { dashboardData, loading, error, refreshData } = useDashboard();
  const [showBookingModal, setShowBookingModal] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <div className="bg-gray-50 py-8 font-onest min-h-screen">
        <Loading
          size="large"
          variant="medical"
          text="Đang tải thông tin bảng điều khiển..."
          subText="Vui lòng đợi trong giây lát"
          fullScreen
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 py-8 font-onest min-h-screen">
        <div className="container mx-auto px-4 max-w-2xl pt-20">
          <MedicalAlert
            type="error"
            title="Có lỗi xảy ra khi tải dữ liệu"
            message={error}
            size="large"
          >
            <div className="mt-4">
              <Button
                variant="medical"
                onClick={refreshData}
                className="w-full"
              >
                <i className="fas fa-sync-alt mr-2"></i>
                Thử lại
              </Button>
            </div>
          </MedicalAlert>
        </div>
      </div>
    );
  }

  const { upcomingAppointments } = dashboardData;

  return (
    <div className="bg-gray-50 py-8 font-onest">
      <div className="container mx-auto px-4">
        {/* Welcome Section */}
        <MedicalCard variant="medical" size="medium" className="mb-8">
          <MedicalCard.Header>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                <i className="fas fa-user text-white text-2xl"></i>
              </div>
              <div>
                <MedicalCard.Title className="text-2xl">
                  Chào mừng trở lại, {user?.fullName}!
                </MedicalCard.Title>
                <MedicalCard.Description>
                  Quản lý lịch hẹn và theo dõi sức khỏe của bạn
                </MedicalCard.Description>
              </div>
            </div>
          </MedicalCard.Header>
        </MedicalCard>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Appointments */}
          <div className="lg:col-span-2">
            <MedicalCard variant="default" size="medium">
              <MedicalCard.Header>
                <MedicalCard.Title>Lịch Hẹn Sắp Tới</MedicalCard.Title>
                <button
                  onClick={refreshData}
                  className="text-primary hover:text-primary/80 transition-colors"
                  title="Làm mới dữ liệu"
                >
                  <i className="fas fa-sync-alt"></i>
                </button>
              </MedicalCard.Header>

              <MedicalCard.Content>
                {upcomingAppointments.length === 0 ? (
                  <MedicalEmptyState
                    type="appointments"
                    actionButton={
                      <Button
                        variant="medical"
                        onClick={() => setShowBookingModal(true)}
                      >
                        <i className="fas fa-plus mr-2"></i>
                        Đặt lịch hẹn ngay
                      </Button>
                    }
                  />
                ) : (
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <MedicalCard
                        key={appointment.id}
                        variant="gentle"
                        size="small"
                        hover
                        className="medical-card-hover"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                            <i className="fas fa-user-md text-white"></i>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-primary">
                              {appointment.appointmentType?.name ||
                                "Khám tổng quát"}
                            </h3>
                            <p className="text-sm text-text-color">
                              Bác sĩ:{" "}
                              {appointment.doctor?.name || "Chưa xác định"}
                            </p>
                            <p className="text-sm text-text-color">
                              {formatDate(appointment.appointmentDate)} -{" "}
                              {appointment.timeSlot || "Chưa xác định"}
                            </p>
                          </div>
                          <MedicalStatusBadge
                            status={appointment.status}
                            size="small"
                            showIcon
                          />
                        </div>
                      </MedicalCard>
                    ))}
                  </div>
                )}
              </MedicalCard.Content>

              <MedicalCard.Footer>
                <Link to="/customer/appointments" className="w-full">
                  <Button variant="outline" className="w-full">
                    <i className="fas fa-calendar-alt mr-2"></i>
                    Xem Tất Cả Lịch Hẹn
                  </Button>
                </Link>
              </MedicalCard.Footer>
            </MedicalCard>
          </div>
          {/* Quick Actions */}
          <div>
            <MedicalCard variant="primary" size="medium">
              <MedicalCard.Header>
                <MedicalCard.Title>Thao Tác Nhanh</MedicalCard.Title>
              </MedicalCard.Header>

              <MedicalCard.Content className="space-y-3">
                <Button
                  variant="medical"
                  onClick={() => setShowBookingModal(true)}
                  className="w-full justify-start"
                  size="lg"
                >
                  <i className="fas fa-plus mr-3"></i>
                  Đặt Lịch Hẹn Mới
                </Button>

                <Link to="/customer/treatment-timeline" className="block">
                  <Button
                    variant="professional"
                    className="w-full justify-start"
                    size="lg"
                  >
                    <i className="fas fa-procedures mr-3"></i>
                    Xem Phác Đồ Điều Trị
                  </Button>
                </Link>

                <Link to="/customer/profile" className="block">
                  <Button
                    variant="warning"
                    className="w-full justify-start"
                    size="lg"
                  >
                    <i className="fas fa-user-edit mr-3"></i>
                    Cập Nhật Hồ Sơ
                  </Button>
                </Link>

                <Link to="/customer/settings" className="block">
                  <Button
                    variant="secondary"
                    className="w-full justify-start"
                    size="lg"
                  >
                    <i className="fas fa-cog mr-3"></i>
                    Cài Đặt Tài Khoản
                  </Button>
                </Link>
              </MedicalCard.Content>
            </MedicalCard>
          </div>
        </div>

        <TreatmentSummary treatmentData={dashboardData.treatmentProtocols} />
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => {
          setShowBookingModal(false);
          refreshData(); // Refresh data after successful booking
        }}
      />
    </div>
  );
};

export default Dashboard;
