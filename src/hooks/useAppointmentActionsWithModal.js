import { useState } from "react";
import Swal from "sweetalert2";
import {
  cancelAppointment,
  rescheduleAppointment,
} from "../api/appointmentAPI";

/**
 * Enhanced hook for appointment actions with modal support
 */
const useAppointmentActionsWithModal = (onSuccess) => {
  const [loading, setLoading] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  // Helper function để kiểm tra xem appointment có thể hủy/dời hay không
  const canCancelOrReschedule = (appointment) => {
    console.log("🔍 Checking appointment:", appointment);
    console.log("🔍 Appointment status:", appointment.status);
    console.log("🔍 Appointment status.status:", appointment.status?.status);

    const status = appointment.status?.status;
    // Chỉ cho phép hủy/dời lịch khi trạng thái là SCHEDULED hoặc CHECKED_IN
    const allowedStatuses = ["SCHEDULED", "CHECKED_IN"];

    const isAllowed = allowedStatuses.includes(status);
    console.log("🔍 Status check result:", isAllowed);

    if (!isAllowed) {
      return false;
    }

    // Tạm thời cho phép tất cả để test - có thể thêm logic thời gian sau
    console.log("✅ Appointment can be cancelled/rescheduled");
    return true;

    // Logic thời gian có thể dùng sau:
    // if (appointment.appointmentDateTime) {
    //   const appointmentTime = new Date(appointment.appointmentDateTime);
    //   const now = new Date();
    //   const timeDifference = appointmentTime - now;
    //   const hoursDifference = timeDifference / (1000 * 60 * 60);
    //   return hoursDifference >= 24; // Phải trước 24 giờ
    // }
  };

  // Handle cancel appointment
  const handleCancelAppointment = async (appointmentId) => {
    // Hiển thị confirm dialog với option để nhập lý do
    const { value: cancelData } = await Swal.fire({
      title: "Xác nhận hủy lịch hẹn",
      html: `
        <div class="text-left space-y-4">
          <p class="text-gray-700 mb-4">Bạn có chắc chắn muốn hủy lịch hẹn này không?</p>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Lý do hủy lịch (tùy chọn):</label>
            <textarea id="cancelReason" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" rows="3" placeholder="Nhập lý do hủy lịch..."></textarea>
          </div>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Hủy lịch hẹn",
      cancelButtonText: "Không",
      focusConfirm: false,
      preConfirm: () => {
        const reason = document.getElementById("cancelReason").value;
        return { reason: reason || "" };
      },
    });

    if (cancelData) {
      setLoading(true);
      try {
        // Gọi API hủy lịch hẹn với reason trong request body
        const response = await cancelAppointment(
          appointmentId,
          cancelData.reason
        );

        Swal.fire({
          title: "Thành công!",
          text: response.data?.message || "Lịch hẹn đã được hủy thành công.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        // Callback để refresh danh sách
        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        console.error("Error cancelling appointment:", error);

        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Có lỗi xảy ra khi hủy lịch hẹn.";

        Swal.fire({
          title: "Lỗi!",
          text: errorMessage,
          icon: "error",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle reschedule appointment - show modal
  const handleRescheduleAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowRescheduleModal(true);
  };

  // Handle reschedule modal close
  const handleCloseRescheduleModal = () => {
    setShowRescheduleModal(false);
    setSelectedAppointment(null);
  };

  // Handle reschedule success
  const handleRescheduleSuccess = () => {
    setShowRescheduleModal(false);
    setSelectedAppointment(null);
    if (onSuccess) {
      onSuccess();
    }
  };

  // Legacy reschedule method using SweetAlert (for backward compatibility)
  const handleRescheduleAppointmentLegacy = async (appointmentId) => {
    // Get current datetime for minimum value
    const now = new Date();
    const minDateTime = new Date(now.getTime() + 60 * 60 * 1000) // Add 1 hour to current time
      .toISOString()
      .slice(0, 16); // Format for datetime-local input

    // Hiển thị form để chọn ngày mới
    const { value: newDateTime } = await Swal.fire({
      title: "Dời lịch hẹn",
      html: `
        <div class="text-left space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Chọn ngày và giờ mới:</label>
            <input type="datetime-local" id="newDateTime" min="${minDateTime}" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Lý do dời lịch (tùy chọn):</label>
            <textarea id="rescheduleReason" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3" placeholder="Nhập lý do dời lịch..."></textarea>
          </div>
        </div>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Xác nhận dời lịch",
      cancelButtonText: "Hủy bỏ",
      focusConfirm: false,
      preConfirm: () => {
        const newDateTime = document.getElementById("newDateTime").value;
        const reason = document.getElementById("rescheduleReason").value;

        if (!newDateTime) {
          Swal.showValidationMessage("Vui lòng chọn ngày và giờ mới");
          return false;
        }

        // Kiểm tra ngày mới phải trong tương lai
        const selectedDate = new Date(newDateTime);
        const now = new Date();
        if (selectedDate <= now) {
          Swal.showValidationMessage("Ngày giờ mới phải trong tương lai");
          return false;
        }

        // Format datetime theo ISO 8601 để gửi về API
        const formattedDateTime = selectedDate.toISOString().slice(0, 19);

        return { newDateTime: formattedDateTime, reason };
      },
    });

    if (newDateTime) {
      setLoading(true);
      try {
        // Gọi API dời lịch hẹn
        const response = await rescheduleAppointment(appointmentId, {
          newAppointmentDateTime: newDateTime.newDateTime,
          reasonForReschedule: newDateTime.reason || "",
        });

        const appointmentData = response.data?.data;
        const newDate = appointmentData?.appointmentDateTime
          ? new Date(appointmentData.appointmentDateTime).toLocaleString(
              "vi-VN"
            )
          : "Ngày mới";

        Swal.fire({
          title: "Thành công!",
          html: `
            <div class="text-left">
              <p class="mb-2">${
                response.data?.message || "Lịch hẹn đã được dời thành công."
              }</p>
              <p class="text-sm text-gray-600"><strong>Thời gian mới:</strong> ${newDate}</p>
            </div>
          `,
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        });

        // Callback để refresh danh sách
        if (onSuccess) {
          onSuccess();
        }
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
    }
  };

  return {
    loading,
    canCancelOrReschedule,
    handleCancelAppointment,
    handleRescheduleAppointment,
    handleRescheduleAppointmentLegacy,
    showRescheduleModal,
    selectedAppointment,
    handleCloseRescheduleModal,
    handleRescheduleSuccess,
  };
};

export default useAppointmentActionsWithModal;
