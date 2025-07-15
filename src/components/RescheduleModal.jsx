import React, { useState, useEffect } from "react";
import { Calendar, Clock, X, CheckCircle, AlertTriangle } from "lucide-react";
import Swal from "sweetalert2";
import useWorkingShifts from "../hooks/useWorkingShifts";
import { rescheduleAppointment } from "../api/appointmentAPI";
import GlobalLoading from "./ui/GlobalLoading";

const RescheduleModal = ({ isOpen, onClose, appointment, onSuccess }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedShift, setSelectedShift] = useState(null);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [rescheduleReason, setRescheduleReason] = useState("");

  const { shifts: allShifts, loading: shiftsLoading } = useWorkingShifts();

  // Reset state khi modal đóng/mở
  useEffect(() => {
    if (isOpen) {
      setSelectedDate("");
      setSelectedShift(null);
      setValidationError("");
      setRescheduleReason("");
    }
  }, [isOpen]);

  // Lấy ngày hiện tại theo định dạng YYYY-MM-DD
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Kiểm tra ca khám có trong tương lai không (giống Step4DateTime)
  const isShiftInFuture = (shift, selectedDate) => {
    if (!selectedDate) return true;

    const today = new Date();
    const selected = new Date(selectedDate);

    // Nếu ngày được chọn là trong tương lai, cho phép tất cả ca
    if (selected.toDateString() !== today.toDateString()) {
      return selected > today;
    }

    // Nếu là ngày hôm nay, chỉ hiển thị ca chưa qua
    const currentTime = today.getHours() * 60 + today.getMinutes();

    let shiftStartMinutes;
    if (typeof shift.startTime === "string" && shift.startTime.includes(":")) {
      const [hours, minutes] = shift.startTime.split(":").map(Number);
      shiftStartMinutes = hours * 60 + minutes;
    } else {
      shiftStartMinutes = parseInt(shift.startTime);
    }

    return shiftStartMinutes > currentTime;
  };

  // Lọc ca khám trong tương lai (giống Step4DateTime)
  const futureShifts = allShifts.filter((shift) =>
    isShiftInFuture(shift, selectedDate)
  );

  // Format time display
  const formatTime = (timeString) => {
    if (!timeString) return "";

    if (typeof timeString === "string" && timeString.includes(":")) {
      return timeString;
    }

    if (typeof timeString === "number") {
      const hours = Math.floor(timeString / 60);
      const minutes = timeString % 60;
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}`;
    }

    const timeNum = parseInt(timeString);
    if (!isNaN(timeNum)) {
      const hours = Math.floor(timeNum / 60);
      const minutes = timeNum % 60;
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}`;
    }

    return timeString;
  };

  // Validate selection
  const validateSelection = () => {
    if (!selectedDate) {
      setValidationError("Vui lòng chọn ngày khám mới");
      return false;
    }

    if (!selectedShift) {
      setValidationError("Vui lòng chọn giờ khám mới");
      return false;
    }

    // Kiểm tra ngày giờ mới phải khác với ngày giờ hiện tại
    const currentDateTime = new Date(appointment.appointmentDateTime);
    const newDateTime = new Date(
      `${selectedDate}T${selectedShift.startTime}:00`
    );

    if (newDateTime.getTime() === currentDateTime.getTime()) {
      setValidationError("Ngày giờ mới phải khác với ngày giờ hiện tại");
      return false;
    }

    setValidationError("");
    return true;
  };

  // Handle reschedule submission
  const handleReschedule = async () => {
    if (!validateSelection()) return;

    const newDateTime = new Date(
      `${selectedDate}T${selectedShift.startTime}:00`
    );

    try {
      setLoading(true);

      const response = await rescheduleAppointment(appointment.appointmentId, {
        newAppointmentDateTime: newDateTime.toISOString(),
        reasonForReschedule: rescheduleReason || "",
      });

      await Swal.fire({
        title: "Thành công!",
        html: `
          <div class="text-left">
            <p class="mb-2">${
              response.data?.message || "Lịch hẹn đã được dời thành công."
            }</p>
            <p class="text-sm text-gray-600">
              <strong>Thời gian mới:</strong> ${newDateTime.toLocaleString(
                "vi-VN"
              )}
            </p>
          </div>
        `,
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      });

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Error rescheduling appointment:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Có lỗi xảy ra khi dời lịch hẹn.";

      Swal.fire({
        title: "Lỗi!",
        text: errorMessage,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle close
  const handleClose = () => {
    setSelectedDate("");
    setSelectedShift(null);
    setValidationError("");
    setRescheduleReason("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50 p-4 hide-scrollbar"
      style={{ backgroundColor: "rgba(32, 41, 110, 0.3)" }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] scrollable-hidden modal-container">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Dời Lịch Hẹn
                </h2>
                <p className="text-gray-600">Chọn ngày giờ mới cho cuộc hẹn</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto hide-scrollbar">
          {/* Current Appointment Info */}
          {appointment && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Thông tin lịch hẹn hiện tại
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
                <div>
                  <span className="font-medium">Ngày giờ:</span>{" "}
                  {new Date(appointment.appointmentDateTime).toLocaleString(
                    "vi-VN"
                  )}
                </div>
                <div>
                  <span className="font-medium">Bác sĩ:</span>{" "}
                  {appointment.doctorUser?.userFullName || "Không rõ"}
                </div>
                <div className="md:col-span-2">
                  <span className="font-medium">Dịch vụ:</span>{" "}
                  {appointment.serviceDefinition?.serviceName || "Không rõ"}
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Date Selection */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2 text-blue-500" />
                  Chọn Ngày Khám Mới
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min={getTodayDate()}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setSelectedShift(null); // Reset shift when date changes
                    setValidationError("");
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Chỉ có thể đặt lịch từ hôm nay trở đi
                </p>
              </div>

              {/* Reason for reschedule */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lý do dời lịch (tùy chọn)
                </label>
                <textarea
                  value={rescheduleReason}
                  onChange={(e) => setRescheduleReason(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  rows="3"
                  placeholder="Nhập lý do dời lịch..."
                />
              </div>
            </div>

            {/* Time Selection */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-2 text-blue-500" />
                  Chọn Ca Khám Mới
                </label>

                {!selectedDate ? (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>Vui lòng chọn ngày trước</p>
                  </div>
                ) : shiftsLoading ? (
                  <div className="py-8">
                    <GlobalLoading isLoading={true} />
                  </div>
                ) : futureShifts.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertTriangle className="w-12 h-12 mx-auto mb-2 text-orange-400" />
                    <p className="text-orange-600 font-medium">
                      Không có ca khám khả dụng cho ngày này
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      Vui lòng chọn ngày khác
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {futureShifts.map((shift, index) => {
                      const isSelected =
                        selectedShift &&
                        selectedShift.startTime === shift.startTime &&
                        selectedShift.endTime === shift.endTime;

                      return (
                        <label
                          key={index}
                          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-500 hover:bg-blue-50 ${
                            isSelected
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200"
                          }`}
                        >
                          <input
                            type="radio"
                            name="reschedule-shift"
                            checked={isSelected}
                            onChange={() => {
                              setSelectedShift(shift);
                              setValidationError("");
                            }}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <div className="ml-3 flex-1">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-blue-500" />
                              <span className="font-medium text-gray-800">
                                {formatTime(shift.startTime)} -{" "}
                                {formatTime(shift.endTime)}
                              </span>
                            </div>
                            {shift.maxPatients && (
                              <div className="text-xs text-gray-500 mt-1">
                                Tối đa: {shift.maxPatients} bệnh nhân
                              </div>
                            )}
                          </div>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Selected Info Summary */}
          {selectedDate && selectedShift && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-green-800 mb-1">
                    Thông tin lịch hẹn mới
                  </h3>
                  <p className="text-sm text-green-700">
                    <strong>Ngày:</strong>{" "}
                    {new Date(selectedDate).toLocaleDateString("vi-VN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-green-700">
                    <strong>Giờ:</strong> {formatTime(selectedShift.startTime)}{" "}
                    - {formatTime(selectedShift.endTime)}
                  </p>
                  <p className="text-sm text-green-700">
                    <strong>Bác sĩ:</strong>{" "}
                    {appointment?.doctorUser?.userFullName || "Không rõ"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Validation Error */}
          {validationError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-red-700 text-sm">{validationError}</span>
              </div>
            </div>
          )}

          {/* Important Notes */}
          {futureShifts.length > 0 && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium mb-1">Lưu ý quan trọng:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Vui lòng đến trước giờ hẹn 15 phút để làm thủ tục</li>
                    <li>
                      • Mang theo giấy tờ tùy thân và thẻ bảo hiểm (nếu có)
                    </li>
                    <li>• Liên hệ phòng khám nếu cần thay đổi lịch hẹn</li>
                    <li>
                      • Việc dời lịch có thể ảnh hưởng đến lịch trình điều trị
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-200">
            <button
              onClick={handleClose}
              disabled={loading}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Hủy bỏ
            </button>
            <button
              onClick={handleReschedule}
              disabled={!selectedDate || !selectedShift || loading}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Đang xử lý..." : "Xác nhận dời lịch"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RescheduleModal;
