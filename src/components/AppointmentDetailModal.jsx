import React, { useEffect } from "react";
import {
  XCircle,
  Calendar,
  User,
  Stethoscope,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  RefreshCw,
  MapPin,
  Phone,
  Mail,
  Award,
  Heart,
  Timer,
} from "lucide-react";
// eslint-disable-next-line
import { motion, AnimatePresence } from "framer-motion";
import useAppointmentTypes from "../hooks/useAppointmentTypes";

const AppointmentDetailModal = ({
  appointment,
  isOpen,
  onClose,
  loading = false,
}) => {
  const { getStatusConfig } = useAppointmentTypes();

  // ESC key handler và body overflow - giống BookingModal và LoginModal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Hàm xử lý click overlay - giống BookingModal và LoginModal
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "Không rõ";
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

  const getStatusBadge = (status) => {
    const config = getStatusConfig(status?.status);

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${config.class}`}
      >
        {config.label}
      </span>
    );
  };

  const getStatusIcon = (status) => {
    const iconMap = {
      SCHEDULED: <Calendar className="w-4 h-4 text-blue-500" />,
      COMPLETED: <CheckCircle className="w-4 h-4 text-green-500" />,
      CANCELLED_BY_PATIENT: <XCircle className="w-4 h-4 text-red-500" />,
      CANCELLED_BY_CLINIC: <XCircle className="w-4 h-4 text-orange-500" />,
      IN_PROGRESS: <Clock className="w-4 h-4 text-yellow-500" />,
      CHECKED_IN: <CheckCircle className="w-4 h-4 text-indigo-500" />,
      RESCHEDULED: <RefreshCw className="w-4 h-4 text-purple-500" />,
      NO_SHOW: <AlertCircle className="w-4 h-4 text-gray-500" />,
    };
    return iconMap[status] || <AlertCircle className="w-4 h-4 text-gray-500" />;
  };

  const dateTime = formatDateTime(appointment.appointmentDateTime);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4 hide-scrollbar"
        style={{ backgroundColor: "rgba(32, 41, 110, 0.3)" }}
        onClick={handleOverlayClick}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] scrollable-hidden modal-container"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="bg-primary px-6 py-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Chi tiết lịch hẹn</h2>
                  <p className="text-white text-opacity-80">
                    #{appointment.appointmentId}
                  </p>
                </div>
              </div>
              <div className="z-10">
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Modal Content */}
          <div
            className="p-6 max-h-[80vh] overflow-y-auto hide-scrollbar"
            style={{ paddingBottom: "80px" }}
          >
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-3 text-gray-600">Đang tải chi tiết...</span>
              </div>
            ) : !appointment ? (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  Không tìm thấy thông tin lịch hẹn
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-600">
                        Ngày & Giờ
                      </span>
                    </div>
                    <p className="font-semibold">
                      {dateTime.date} - {dateTime.time}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-600">
                        Loại lịch hẹn
                      </span>
                    </div>
                    <p className="font-semibold">
                      {appointment.appointmentType?.typeName}
                    </p>
                    {appointment.appointmentType?.description && (
                      <p className="text-sm text-gray-500 mt-1">
                        {appointment.appointmentType.description}
                      </p>
                    )}
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-600">
                        Phòng khám
                      </span>
                    </div>
                    <p className="font-semibold">
                      {appointment.roomName || "Chưa phân công"}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Timer className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-600">
                        Thời gian dự kiến
                      </span>
                    </div>
                    <p className="font-semibold">
                      {appointment.estimatedDurationMinutes || 0} phút
                    </p>
                  </div>
                </div>

                {/* Service Information */}
                {appointment.serviceDefinition && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Stethoscope className="w-5 h-5 text-blue-600" />
                      <span className="text-lg font-semibold text-blue-800">
                        Thông tin dịch vụ
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-blue-600 mb-1">
                          Tên dịch vụ
                        </p>
                        <p className="font-semibold text-blue-900">
                          {appointment.serviceDefinition.serviceName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-blue-600 mb-1">Mã dịch vụ</p>
                        <p className="font-semibold text-blue-900">
                          {appointment.serviceDefinition.serviceCode}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-blue-600 mb-1">
                          Loại dịch vụ
                        </p>
                        <p className="font-semibold text-blue-900">
                          {appointment.serviceDefinition.serviceType?.typeName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-blue-600 mb-1">
                          Giá dịch vụ
                        </p>
                        <p className="font-semibold text-blue-900">
                          {appointment.serviceDefinition.defaultPrice?.toLocaleString(
                            "vi-VN"
                          )}{" "}
                          VND
                        </p>
                      </div>
                    </div>
                    {appointment.serviceDefinition.description && (
                      <div className="mt-3">
                        <p className="text-sm text-blue-600 mb-1">Mô tả</p>
                        <p className="text-blue-800">
                          {appointment.serviceDefinition.description}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Doctor Information */}
                {appointment.doctorUser && (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-3">
                      <User className="w-5 h-5 text-green-600" />
                      <span className="text-lg font-semibold text-green-800">
                        Thông tin bác sĩ
                      </span>
                    </div>

                    <div className="flex items-start space-x-4 mb-4">
                      {appointment.doctorUser.doctorProfilePictureUrl ? (
                        <img
                          src={appointment.doctorUser.doctorProfilePictureUrl}
                          alt={appointment.doctorUser.userAccount?.fullName}
                          className="w-16 h-16 rounded-lg object-cover border-2 border-green-200"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-green-200 rounded-lg flex items-center justify-center">
                          <User className="w-8 h-8 text-green-600" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-green-900 mb-1">
                          {appointment.doctorUser.userAccount?.fullName}
                        </h4>
                        <p className="text-green-700 font-medium mb-2">
                          {
                            appointment.doctorUser.specialization
                              ?.specializationName
                          }
                        </p>
                        {appointment.doctorUser.shortBio && (
                          <p className="text-green-600 text-sm">
                            {appointment.doctorUser.shortBio}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {appointment.doctorUser.experienceYears && (
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-green-700">
                            {appointment.doctorUser.experienceYears} năm kinh
                            nghiệm
                          </span>
                        </div>
                      )}
                      {appointment.doctorUser.userAccount?.phoneNumber && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-green-700">
                            {appointment.doctorUser.userAccount.phoneNumber}
                          </span>
                        </div>
                      )}
                      {appointment.doctorUser.userAccount?.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-green-700">
                            {appointment.doctorUser.userAccount.email}
                          </span>
                        </div>
                      )}
                    </div>

                    {appointment.doctorUser.qualifications && (
                      <div className="mt-3">
                        <p className="text-sm text-green-600 mb-1">Bằng cấp</p>
                        <p className="text-green-800">
                          {appointment.doctorUser.qualifications}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Patient Information */}
                {appointment.patientProfile && (
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Heart className="w-5 h-5 text-purple-600" />
                      <span className="text-lg font-semibold text-purple-800">
                        Thông tin bệnh nhân
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-purple-600 mb-1">
                          Họ và tên
                        </p>
                        <p className="font-semibold text-purple-900">
                          {appointment.patientProfile.fullName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-purple-600 mb-1">
                          Ngày sinh
                        </p>
                        <p className="font-semibold text-purple-900">
                          {appointment.patientProfile.dateOfBirth
                            ? new Date(
                                appointment.patientProfile.dateOfBirth
                              ).toLocaleDateString("vi-VN")
                            : "Chưa cập nhật"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-purple-600 mb-1">
                          Giới tính
                        </p>
                        <p className="font-semibold text-purple-900">
                          {appointment.patientProfile.gender}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-purple-600 mb-1">
                          Số điện thoại
                        </p>
                        <p className="font-semibold text-purple-900">
                          {appointment.patientProfile.phoneNumber}
                        </p>
                      </div>
                      {appointment.patientProfile.occupation && (
                        <div>
                          <p className="text-sm text-purple-600 mb-1">
                            Nghề nghiệp
                          </p>
                          <p className="font-semibold text-purple-900">
                            {appointment.patientProfile.occupation}
                          </p>
                        </div>
                      )}
                      {appointment.patientProfile.maritalStatus && (
                        <div>
                          <p className="text-sm text-purple-600 mb-1">
                            Tình trạng hôn nhân
                          </p>
                          <p className="font-semibold text-purple-900">
                            {
                              appointment.patientProfile.maritalStatus
                                .description
                            }
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Appointment Times */}
                {(appointment.actualStartTime || appointment.actualEndTime) && (
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-5 h-5 text-orange-600" />
                      <span className="text-lg font-semibold text-orange-800">
                        Thời gian thực tế
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {appointment.actualStartTime && (
                        <div>
                          <p className="text-sm text-orange-600 mb-1">
                            Thời gian bắt đầu
                          </p>
                          <p className="font-semibold text-orange-900">
                            {formatDateTime(appointment.actualStartTime).date} -{" "}
                            {formatDateTime(appointment.actualStartTime).time}
                          </p>
                        </div>
                      )}
                      {appointment.actualEndTime && (
                        <div>
                          <p className="text-sm text-orange-600 mb-1">
                            Thời gian kết thúc
                          </p>
                          <p className="font-semibold text-orange-900">
                            {formatDateTime(appointment.actualEndTime).date} -{" "}
                            {formatDateTime(appointment.actualEndTime).time}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Status */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-600">
                      Trạng thái
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(appointment.status?.status)}
                    {getStatusBadge(appointment.status)}
                  </div>
                  {appointment.status?.description && (
                    <p className="text-sm text-gray-500 mt-2">
                      {appointment.status.description}
                    </p>
                  )}
                </div>

                {/* Reason and Notes */}
                <div className="grid grid-cols-1 gap-4">
                  {appointment.reasonForVisit && (
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm font-medium text-yellow-800">
                          Lý do khám
                        </span>
                      </div>
                      <p className="text-yellow-700">
                        {appointment.reasonForVisit}
                      </p>
                    </div>
                  )}

                  {appointment.notes && (
                    <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm font-medium text-indigo-800">
                          Ghi chú
                        </span>
                      </div>
                      <p className="text-indigo-700">{appointment.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 sticky bottom-0 left-0 right-0 z-20">
            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-primary hover:!bg-accent text-white rounded-xl transition-colors duration-200"
                style={{ minWidth: 100 }}
              >
                Đóng
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AppointmentDetailModal;
