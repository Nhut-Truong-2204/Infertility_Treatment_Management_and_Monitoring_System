import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  XCircle,
  Stethoscope,
  Eye,
  Calendar as CalendarIcon,
  X,
  Edit3,
} from "lucide-react";
// eslint-disable-next-line
import { motion, AnimatePresence } from "framer-motion";
import AppointmentDetailModal from "../../components/AppointmentDetailModal";
import RescheduleModal from "../../components/RescheduleModal";
import useAppointments from "../../hooks/useAppointments";
import useAppointmentTypes from "../../hooks/useAppointmentTypes";
import useAppointmentActionsWithModal from "../../hooks/useAppointmentActionsWithModal";
import {
  MedicalLoading,
  MedicalStatusBadge,
  MedicalEmptyState,
  MedicalAlert,
  MedicalCard,
  Button,
} from "../../components/ui";

const AppointmentList = () => {
  const {
    appointments,
    selectedAppointment,
    loading,
    detailLoading,
    error,
    fetchAppointments,
    fetchAppointmentDetail,
    clearSelectedAppointment,
    getStats,
  } = useAppointments();

  const { getStatusOptions, getStatusConfig } = useAppointmentTypes();

  const [showFilters, setShowFilters] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Helper function để tính toán ngày 7 ngày trước và sau
  const getDefaultDateRange = () => {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    const sevenDaysLater = new Date(today);
    sevenDaysLater.setDate(today.getDate() + 7);

    return {
      fromDate: sevenDaysAgo.toISOString().split("T")[0], // Format YYYY-MM-DD
      toDate: sevenDaysLater.toISOString().split("T")[0],
    };
  };

  // Filter states với default range 7 ngày trước/sau
  const [filters, setFilters] = useState(() => {
    const defaultRange = getDefaultDateRange();
    return {
      page: 0,
      size: 10,
      status: "",
      fromDate: defaultRange.fromDate,
      toDate: defaultRange.toDate,
    };
  });

  // Define handleRefresh after filters are available
  const handleRefresh = React.useCallback(() => {
    fetchAppointments(filters);
  }, [fetchAppointments, filters]);

  // Appointment actions hook
  const {
    loading: actionLoading,
    canCancelOrReschedule,
    handleCancelAppointment,
    handleRescheduleAppointment,
    showRescheduleModal,
    selectedAppointment: selectedAppointmentForReschedule,
    handleCloseRescheduleModal,
    handleRescheduleSuccess,
  } = useAppointmentActionsWithModal(handleRefresh);

  // Status options from API
  const statusOptions = getStatusOptions();

  useEffect(() => {
    fetchAppointments(filters);
  }, [fetchAppointments, filters]);

  // Helper functions
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

  // Helper function để tính khoảng cách ngày so với hôm nay
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

  const getStatusIcon = (statusKey) => {
    const config = getStatusConfig(statusKey);
    const iconMap = {
      SCHEDULED: <Calendar className={`w-4 h-4 ${config.iconColor}`} />,
      COMPLETED: <CheckCircle className={`w-4 h-4 ${config.iconColor}`} />,
      CANCELLED_BY_PATIENT: (
        <XCircle className={`w-4 h-4 ${config.iconColor}`} />
      ),
      CANCELLED_BY_CLINIC: (
        <XCircle className={`w-4 h-4 ${config.iconColor}`} />
      ),
      IN_PROGRESS: <Clock className={`w-4 h-4 ${config.iconColor}`} />,
      CHECKED_IN: <CheckCircle className={`w-4 h-4 ${config.iconColor}`} />,
      RESCHEDULED: <RefreshCw className={`w-4 h-4 ${config.iconColor}`} />,
      NO_SHOW: <AlertCircle className={`w-4 h-4 ${config.iconColor}`} />,
    };
    return (
      iconMap[statusKey] || <AlertCircle className="w-4 h-4 text-gray-500" />
    );
  };

  // Event handlers
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 0 }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  // Reset date range về 7 ngày trước/sau
  const handleResetDateRange = () => {
    const defaultRange = getDefaultDateRange();
    setFilters((prev) => ({
      ...prev,
      fromDate: defaultRange.fromDate,
      toDate: defaultRange.toDate,
      page: 0,
    }));
  };

  // Quick filter functions
  const setTodayFilter = () => {
    const today = new Date().toISOString().split("T")[0];
    setFilters((prev) => ({
      ...prev,
      fromDate: today,
      toDate: today,
      page: 0,
    }));
  };

  const setThisWeekFilter = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (6 - today.getDay()));

    setFilters((prev) => ({
      ...prev,
      fromDate: startOfWeek.toISOString().split("T")[0],
      toDate: endOfWeek.toISOString().split("T")[0],
      page: 0,
    }));
  };

  const setThisMonthFilter = () => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    setFilters((prev) => ({
      ...prev,
      fromDate: startOfMonth.toISOString().split("T")[0],
      toDate: endOfMonth.toISOString().split("T")[0],
      page: 0,
    }));
  };

  const handleViewDetail = async (appointmentId) => {
    const detail = await fetchAppointmentDetail(appointmentId);
    if (detail) {
      setShowDetailModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    clearSelectedAppointment();
  };

  // Get stats for display
  const stats = getStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <MedicalLoading
          variant="professional"
          size="large"
          text="Đang tải danh sách lịch hẹn..."
          subText="Vui lòng đợi trong giây lát"
          fullScreen
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="max-w-md mx-auto p-6">
          <MedicalAlert
            type="error"
            title="Có lỗi xảy ra khi tải lịch hẹn"
            message={error}
            size="large"
          >
            <div className="mt-4">
              <Button
                variant="medical"
                onClick={handleRefresh}
                className="w-full"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Thử lại
              </Button>
            </div>
          </MedicalAlert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary rounded-2xl">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Lịch hẹn của tôi
                </h1>
                <p className="text-gray-600">
                  Quản lý và theo dõi các lịch hẹn khám bệnh
                </p>
                <p className="text-sm text-blue-600 mt-1">
                  📅 Hiển thị lịch hẹn trong khoảng 7 ngày trước/sau
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleRefresh}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Làm mới</span>
              </button>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-accent text-white rounded-xl transition-colors duration-200"
              >
                <Filter className="w-4 h-4" />
                <span>Bộ lọc</span>
                <ChevronDown
                  className={`w-4 h-4 transform transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-8"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Bộ lọc lịch hẹn
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={setTodayFilter}
                      className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
                    >
                      Hôm nay
                    </button>
                    <button
                      onClick={setThisWeekFilter}
                      className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full hover:bg-green-200 transition-colors"
                    >
                      Tuần này
                    </button>
                    <button
                      onClick={setThisMonthFilter}
                      className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition-colors"
                    >
                      Tháng này
                    </button>
                    <button
                      onClick={handleResetDateRange}
                      className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full hover:bg-orange-200 transition-colors"
                    >
                      📅 7 ngày ±
                    </button>
                  </div>
                </div>

                {filters.fromDate && filters.toDate && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-700">
                      <span className="font-medium">Khoảng thời gian:</span>{" "}
                      {new Date(filters.fromDate).toLocaleDateString("vi-VN")}{" "}
                      {" - "}
                      {new Date(filters.toDate).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Status Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Trạng thái
                    </label>
                    <select
                      value={filters.status}
                      onChange={(e) =>
                        handleFilterChange("status", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-white/90"
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* From Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Từ ngày
                    </label>
                    <input
                      type="date"
                      value={filters.fromDate}
                      onChange={(e) =>
                        handleFilterChange("fromDate", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-white/90"
                    />
                  </div>

                  {/* To Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Đến ngày
                    </label>
                    <input
                      type="date"
                      value={filters.toDate}
                      onChange={(e) =>
                        handleFilterChange("toDate", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-white/90"
                    />
                  </div>

                  {/* Page Size */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số lượng hiển thị
                    </label>
                    <select
                      value={filters.size}
                      onChange={(e) =>
                        handleFilterChange("size", parseInt(e.target.value))
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-white/90"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-xl mr-4">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Tổng lịch hẹn
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-xl mr-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Hoàn thành</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.completed}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-xl mr-4">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Sắp tới</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.scheduled}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          {appointments.content.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Chưa có lịch hẹn nào
              </h3>
              <p className="text-gray-500">
                Bạn chưa có lịch hẹn nào trong hệ thống.
              </p>
            </div>
          ) : (
            <>
              {/* Table Header */}
              <div className="bg-gray-50 px-6 py-4">
                <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="col-span-3">Thông tin lịch hẹn</div>
                  <div className="col-span-2">Ngày & Giờ</div>
                  <div className="col-span-2">Bác sĩ</div>
                  <div className="col-span-2">Dịch vụ</div>
                  <div className="col-span-1">Trạng thái</div>
                  <div className="col-span-2 text-center">Hành động</div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {appointments.content.map((appointment, index) => {
                  const dateTime = formatDateTime(
                    appointment.appointmentDateTime
                  );
                  return (
                    <motion.div
                      key={appointment.appointmentId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="grid grid-cols-12 gap-4 items-center">
                        {/* Appointment Info */}
                        <div className="col-span-3">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              {getStatusIcon(appointment.status?.status)}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">
                                #{appointment.appointmentId}
                              </p>
                              <p className="text-sm text-gray-500">
                                {appointment.appointmentType?.typeName ||
                                  "Không rõ"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Date & Time */}
                        <div className="col-span-2">
                          <div className="flex items-center space-x-2">
                            <CalendarIcon className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="font-medium text-gray-900">
                                {dateTime.date}
                              </p>
                              <p className="text-sm text-gray-500">
                                {dateTime.time}
                              </p>
                              <p className="text-xs text-blue-600 font-medium">
                                {getDaysFromToday(
                                  appointment.appointmentDateTime
                                )}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Doctor */}
                        <div className="col-span-2">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="font-medium text-gray-900">
                                {appointment.doctorName || "Chưa phân công"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Service */}
                        <div className="col-span-2">
                          <div className="flex items-center space-x-2">
                            <Stethoscope className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="font-medium text-gray-900">
                                {appointment.serviceName || "Không rõ"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Status */}
                        <div className="col-span-1">
                          {getStatusBadge(appointment.status)}
                        </div>

                        {/* Actions */}
                        <div className="col-span-2 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            {/* View Detail Button */}
                            <button
                              onClick={() =>
                                handleViewDetail(appointment.appointmentId)
                              }
                              className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors gap-1"
                              title="Xem chi tiết"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {/* Cancel Button */}
                            {canCancelOrReschedule(appointment) && (
                              <button
                                onClick={() =>
                                  handleCancelAppointment(
                                    appointment.appointmentId
                                  )
                                }
                                disabled={actionLoading}
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Hủy lịch hẹn"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}

                            {/* Reschedule Button */}
                            {canCancelOrReschedule(appointment) && (
                              <button
                                onClick={() =>
                                  handleRescheduleAppointment(appointment)
                                }
                                disabled={actionLoading}
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-yellow-600 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Dời lịch hẹn"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Pagination */}
              {appointments.totalPages > 1 && (
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                      Hiển thị {appointments.number * appointments.size + 1} đến{" "}
                      {Math.min(
                        (appointments.number + 1) * appointments.size,
                        appointments.totalElements
                      )}{" "}
                      trong tổng số {appointments.totalElements} lịch hẹn
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          handlePageChange(Math.max(0, filters.page - 1))
                        }
                        disabled={appointments.first}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <span className="px-4 py-2 bg-primary text-white rounded-lg">
                        {filters.page + 1} / {appointments.totalPages}
                      </span>

                      <button
                        onClick={() =>
                          handlePageChange(
                            Math.min(
                              appointments.totalPages - 1,
                              filters.page + 1
                            )
                          )
                        }
                        disabled={appointments.last}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Appointment Detail Modal */}
      <AppointmentDetailModal
        appointment={selectedAppointment}
        isOpen={showDetailModal}
        onClose={handleCloseModal}
        loading={detailLoading}
      />

      {/* Reschedule Modal */}
      <RescheduleModal
        isOpen={showRescheduleModal}
        onClose={handleCloseRescheduleModal}
        appointment={selectedAppointmentForReschedule}
        onSuccess={handleRescheduleSuccess}
      />
    </div>
  );
};

export default AppointmentList;
