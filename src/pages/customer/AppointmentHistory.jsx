import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  Stethoscope,
  Filter,
  Search,
  ChevronDown,
  RefreshCw,
  Plus,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
} from "lucide-react";
import { appointmentAPI } from "../../api/customer/appointmentAPI";
import { Delete } from "@/components/ui/Delete";
import Swal from "sweetalert2";
import RescheduleCard from "@/components/ui/RescheduleCard";
import AppointmentDetailModal from "../../components/appointmentHistory/AppointmentDetail";
import { DotsLoading, MinimalLoading } from "@/components/layout/Loading";
import { useNavigate } from "react-router";
const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showReschedule, setShowReschedule] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [appointmentDetail, setAppointmentDetail] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const navigate = useNavigate();

  const handleOpenDetail = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setShowDetailModal(true);
  };
  const handleOpenReschedule = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setShowReschedule(true);
  };

  const handleReschedule = async (appointmentId, newDateTimeISO) => {
    try {
      const res = await appointmentAPI.updateAppointment(
        appointmentId,
        newDateTimeISO
      );
      if (res.data?.success) {
        Swal.fire(
          "Thành công",
          res.data.message || "Đã dời lịch hẹn",
          "success"
        );
        setShowReschedule(false);
        fetchAppointments();
      } else {
        Swal.fire("Lỗi", res.data.message || "Không thể dời lịch", "error");
      }
    } catch (err) {
      Swal.fire(
        "Lỗi",
        err.response?.data?.message || "Đã xảy ra lỗi khi dời lịch",
        "error"
      );
    }
  };
  const [filters, setFilters] = useState({
    page: 0,
    size: 10,
    status: "",
    fromDate: "",
    toDate: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  const statusOptions = [
    { status: "", label: "Tất cả trạng thái" },
    {
      status: "SCHEDULED",
      label: "Đã lên lịch",
      color: "bg-blue-100 text-blue-800",
    },
    {
      status: "CONFIRMED_BY_PATIENT",
      label: "Bệnh nhân xác nhận",
      color: "bg-green-100 text-green-800",
    },
    {
      status: "CONFIRMED_BY_CLINIC",
      label: "Phòng khám xác nhận",
      color: "bg-indigo-100 text-indigo-800",
    },
    {
      status: "CANCELLED_BY_PATIENT",
      label: "Bệnh nhân hủy",
      color: "bg-red-100 text-red-800",
    },
    {
      status: "CANCELLED_BY_CLINIC",
      label: "Phòng khám hủy",
      color: "bg-red-100 text-red-800",
    },
    {
      status: "COMPLETED",
      label: "Đã hoàn thành",
      color: "bg-emerald-100 text-emerald-800",
    },
    {
      status: "NO_SHOW",
      label: "Không có mặt",
      color: "bg-gray-100 text-gray-800",
    },
    {
      status: "RESCHEDULED",
      label: "Đã dời lịch",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      status: "CHECKED_IN",
      label: "Đã check-in",
      color: "bg-purple-100 text-purple-800",
    },
    {
      status: "IN_PROGRESS",
      label: "Đang thực hiện",
      color: "bg-orange-100 text-orange-800",
    },
  ];

  const isEditable = (appointment) => {
    if (!appointment || !appointment.status) return false; // Ensure status object exists

    const { status, appointmentDateTime } = appointment;

    // Correctly access the status string
    if (status.status !== "SCHEDULED") return false;

    const now = new Date();
    const appointmentDate = new Date(appointmentDateTime);
    const diffInMs = appointmentDate - now;
    const diffInHours = diffInMs / (1000 * 60 * 60);

    return diffInHours >= 24;
  };

  const getStatusColor = (statusKey) => {
    // Renamed parameter to avoid conflict
    const statusOption = statusOptions.find((opt) => opt.status === statusKey);
    return statusOption?.color || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (statusKey) => {
    // Renamed parameter
    switch (statusKey) {
      case "COMPLETED":
        return <CheckCircle className="w-4 h-4" />;
      case "CANCELLED_BY_PATIENT":
      case "CANCELLED_BY_CLINIC":
        return <XCircle className="w-4 h-4" />;
      case "SCHEDULED":
        return <Clock className="w-4 h-4" />;
      case "IN_PROGRESS":
        return <RefreshCw className="w-4 h-4 animate-spin" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await appointmentAPI.getAppointments(filters);
      setAppointments(response.data || {});
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Có lỗi xảy ra khi tải dữ liệu"
      );
      setAppointments({});
    }
    setLoading(false);
  };
  const handleCancelAppointment = async (appointmentId) => {
    const confirm = await Swal.fire({
      title: "Xác nhận hủy lịch hẹn?",
      text: "Bạn có chắc muốn hủy cuộc hẹn này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Hủy lịch",
      cancelButtonText: "Không",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await appointmentAPI.cancelAppointment(appointmentId);
        if (res.data?.success) {
          Swal.fire(
            "Đã hủy!",
            res.data.message || "Lịch hẹn đã được hủy.",
            "success"
          );
          fetchAppointments(); // Cập nhật lại danh sách
        } else {
          Swal.fire(
            "Lỗi",
            res.data.message || "Không thể hủy lịch hẹn",
            "error"
          );
        }
      } catch (err) {
        Swal.fire(
          "Lỗi",
          err.response?.data?.message || "Đã xảy ra lỗi khi hủy lịch hẹn",
          "error"
        );
      }
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [filters]);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("vi-VN"),
      time: date.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const handleFilterChange = (key, value) => {
    // Changed 'status' to 'value'
    setFilters((prev) => ({ ...prev, [key]: value, page: 0 }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40 ">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-2xl text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mr-50"
                onClick={() => navigate('/')}
              >
                Quay về trang chính
              </button>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white shadow-lg">
                <Stethoscope className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Quản lý lịch hẹn khám
                </h1>
                <p className="text-gray-600 mt-1">
                  Xem và quản lý các cuộc hẹn với bác sĩ
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Filter className="w-5 h-5" />
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
      {showReschedule && (
        <RescheduleCard
          appointmentId={selectedAppointmentId}
          onClose={() => setShowReschedule(false)}
          onConfirm={handleReschedule}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters Panel */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            showFilters ? "max-h-96 opacity-100 mb-8" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Trạng thái
                </label>
                <select
                  value={filters.status} // Changed 'status' to 'value'
                  onChange={(e) => handleFilterChange("status", e.target.value)} // Changed 'status' to 'value'
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/90"
                >
                  {statusOptions.map((option) => (
                    <option key={option.status} value={option.status}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Từ ngày
                </label>
                <input
                  type="date"
                  value={filters.fromDate} // Changed 'status' to 'value'
                  onChange={(e) =>
                    handleFilterChange("fromDate", e.target.value)
                  } // Changed 'status' to 'value'
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/90"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Đến ngày
                </label>
                <input
                  type="date"
                  value={filters.toDate} // Changed 'status' to 'value'
                  onChange={(e) => handleFilterChange("toDate", e.target.value)} // Changed 'status' to 'value'
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/90"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Số lượng/trang
                </label>
                <select
                  value={filters.size} // Changed 'status' to 'value'
                  onChange={(e) =>
                    handleFilterChange("size", parseInt(e.target.value))
                  } // Changed 'status' to 'value'
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/90"
                >
                  <option value={5}>5</option>{" "}
                  {/* Changed 'status' to 'value' */}
                  <option value={10}>10</option>{" "}
                  {/* Changed 'status' to 'value' */}
                  <option value={20}>20</option>{" "}
                  {/* Changed 'status' to 'value' */}
                  <option value={50}>50</option>{" "}
                  {/* Changed 'status' to 'value' */}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Tổng lịch hẹn</p>
                <p className="text-3xl font-bold">
                  {appointments.totalElements || 0}
                </p>
              </div>
              <Calendar className="w-12 h-12 text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Đã hoàn thành</p>
                <p className="text-3xl font-bold">
                  {appointments.content?.filter(
                    (a) => a.status?.status === "COMPLETED"
                  ).length || 0}
                </p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm">Đã lên lịch</p>
                <p className="text-3xl font-bold">
                  {appointments.content?.filter(
                    (a) => a.status?.status === "SCHEDULED"
                  ).length || 0}
                </p>
              </div>
              <Clock className="w-12 h-12 text-yellow-200" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 animate-fadeIn">
            <div className="flex items-center space-x-3">
              <XCircle className="w-8 h-8 text-red-500" />
              <div>
                <h3 className="text-red-800 font-semibold">Có lỗi xảy ra</h3>
                <p className="text-red-700">{error}</p>
              </div>
              <button
                onClick={fetchAppointments}
                className="ml-auto px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors duration-200"
              >
                Thử lại
              </button>
            </div>
          </div>
        )}

        {/* Appointments List */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">
                Danh sách lịch hẹn
              </h2>
              <button
                onClick={fetchAppointments}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw
                  className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                />
                <span>Làm mới</span>
              </button>
            </div>
          </div>

          {loading ? (
            <DotsLoading />
          ) : appointments.content && appointments.content.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {appointments.content.map((appointment, index) => {
                const { date, time } = formatDateTime(
                  appointment.appointmentDateTime
                );
                return (
                  <div
                    key={appointment.appointmentId}
                    className={`p-6 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 transform hover:scale-[1.02] animate-fadeIn`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl">
                          <Calendar className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-lg font-semibold text-gray-800">
                              #{appointment.appointmentId}
                            </h3>
                            <span
                              className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                appointment.status?.status
                              )}`}
                            >
                              {getStatusIcon(appointment.status?.status)}
                              <span>
                                {statusOptions.find(
                                  (s) => s.status === appointment.status?.status
                                )?.label || appointment.status?.status}
                              </span>
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 italic">
                            {appointment.status?.description}
                          </p>{" "}
                          {/* <- MÔ TẢ TRẠNG THÁI */}
                          <div className="flex items-center space-x-6 text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" />
                              <span>{date}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4" />
                              <span>{time}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <User className="w-4 h-4" />
                              <span>{appointment.doctorName}</span>
                            </div>
                          </div>
                          <p className="text-gray-700 font-medium">
                            {appointment.serviceName}
                          </p>
                          <div className="text-sm text-gray-700 space-y-1">
                            <p className="font-medium">
                              Loại lịch hẹn:{" "}
                              <span className="text-gray-500">
                                {appointment.appointmentType?.typeName ||
                                  "Không rõ"}
                              </span>
                            </p>
                            <p className="text-gray-500 italic">
                              {appointment.appointmentType?.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2">
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                          onClick={() =>
                            handleOpenDetail(appointment.appointmentId)
                          }
                        >
                          <AppointmentDetailModal
                            appointmentId={selectedAppointmentId}
                            appointmentDetail={appointmentDetail}
                            setAppointmentDetail={setAppointmentDetail}
                          />
                        </button>

                        <div className="flex space-x-3 mt-3">
                          {isEditable(appointment) && (
                            <button
                              onClick={() =>
                                handleOpenReschedule(appointment.appointmentId)
                              }
                              className="px-4 py-2 text-sm bg-yellow-100 text-yellow-800 rounded-xl hover:bg-yellow-200 transition"
                            >
                              Dời lịch
                            </button>
                          )}

                          {/* Only allow cancellation if status is SCHEDULED and it's editable (before 24h) */}
                          {isEditable(appointment) &&
                            appointment.status?.status === "SCHEDULED" && (
                              <button
                                onClick={() =>
                                  handleCancelAppointment(
                                    appointment.appointmentId
                                  )
                                }
                                className="px-4 py-2 text-sm bg-red-100 text-red-800 rounded-xl hover:bg-red-200 transition"
                              >
                                Hủy lịch
                              </button>
                            )}
                        </div>

                        {/* Nếu phòng khám hủy thì có thể đặt lại lịch */}
                        {appointment.status?.status ===
                          "CANCELLED_BY_CLINIC" && ( // Correctly access status
                          <button
                            className="px-4 py-2 text-sm bg-blue-100 text-blue-800 rounded-xl hover:bg-blue-200 transition"
                            onClick={() =>
                              handleOpenReschedule(appointment.appointmentId)
                            }
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Đặt lại lịch
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            !loading && (
              <div className="flex flex-col items-center justify-center py-16">
                <Calendar className="w-16 h-16 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Không có lịch hẹn
                </h3>
                <p className="text-gray-500 text-center">
                  {error
                    ? "Có lỗi xảy ra khi tải dữ liệu."
                    : "Chưa có lịch hẹn nào với bộ lọc hiện tại."}
                </p>
              </div>
            )
          )}

          {/* Pagination */}
          {appointments.content && appointments.totalPages > 1 && (
            <div className="p-6 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center justify-between">
                <p className="text-gray-600">
                  Hiển thị {appointments.numberOfElements} trong tổng số{" "}
                  {appointments.totalElements} kết quả
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      handlePageChange(Math.max(0, filters.page - 1))
                    }
                    disabled={appointments.first}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Trước
                  </button>
                  <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg">
                    {filters.page + 1} / {appointments.totalPages}
                  </span>
                  <button
                    onClick={() =>
                      handlePageChange(
                        Math.min(appointments.totalPages - 1, filters.page + 1)
                      )
                    }
                    disabled={appointments.last}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Sau
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Appointment Detail Modal (Conditional Rendering) */}
      {showDetailModal && (
        <AppointmentDetailModal
          appointmentId={selectedAppointmentId}
          onClose={() => setShowDetailModal(false)}
        />
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AppointmentHistory;
