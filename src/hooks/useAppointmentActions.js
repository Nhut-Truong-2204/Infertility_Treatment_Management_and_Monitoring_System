import { useState } from "react";
import Swal from "sweetalert2";
import {
  cancelAppointment,
  rescheduleAppointment,
} from "../api/appointmentAPI";

/**
 * Custom hook for appointment actions (cancel, reschedule)
 *
 * APIs used:
 * - DELETE /api/appointments/{appointmentId}/cancel
 * - PUT /api/appointments/{appointmentId}/reschedule
 *
 * @param {Function} onSuccess - Callback function to execute on successful action
 * @returns {Object} - Hook utilities and handlers
 */
const useAppointmentActions = (onSuccess) => {
  const [loading, setLoading] = useState(false);

  // Helper function để kiểm tra xem appointment có thể hủy/dời hay không
  const canCancelOrReschedule = (appointment) => {
    const status = appointment.status?.status;
    // Chỉ cho phép hủy/dời lịch khi trạng thái là SCHEDULED hoặc CHECKED_IN
    return status === "SCHEDULED" || status === "CHECKED_IN";
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

  // Handle reschedule appointment
  const handleRescheduleAppointment = async (appointmentId) => {
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
  };
};

export default useAppointmentActions;
