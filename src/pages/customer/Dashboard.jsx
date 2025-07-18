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

import { Calendar as CalendarIcon } from "lucide-react";

const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) return { date: "Không rõ", time: "" };
  const date = new Date(dateTimeString);
  return {
    date: date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    time: date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};

const getDaysFromToday = (dateTimeString) => {
  if (!dateTimeString) return null;
  const appointmentDate = new Date(dateTimeString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  appointmentDate.setHours(0, 0, 0, 0);
  const diffTime = appointmentDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Hôm nay";
  if (diffDays === 1) return "Ngày mai";
  if (diffDays === -1) return "Hôm qua";
  if (diffDays > 0) return `Sau ${diffDays} ngày`;
  return `${Math.abs(diffDays)} ngày trước`;
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
                    {upcomingAppointments.map((appointment) => {
                      const dateTime = formatDateTime(
                        appointment.appointmentDateTime ||
                          appointment.appointmentDate
                      );
                      return (
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
                                {appointment.appointmentType?.description ||
                                  "Khám tổng quát"}
                              </h3>
                              <p className="text-sm text-text-color">
                                Bác sĩ:{" "}
                                {appointment?.doctorName || "Chưa xác định"}
                              </p>
                              {/* Date & Time style like AppointmentList */}
                              <div className="flex items-center space-x-2 mt-1">
                                <CalendarIcon className="w-4 h-4 text-gray-400" />
                                <div>
                                  <p className="font-medium text-gray-900">
                                    {dateTime.date}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {dateTime.time ||
                                      appointment.timeSlot ||
                                      "Chưa xác định"}
                                  </p>
                                  <p className="text-xs text-blue-600 font-medium">
                                    {getDaysFromToday(
                                      appointment.appointmentDateTime ||
                                        appointment.appointmentDate
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <MedicalStatusBadge
                              status={appointment.status.description}
                              size="small"
                              showIcon
                            />
                          </div>
                        </MedicalCard>
                      );
                    })}
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
