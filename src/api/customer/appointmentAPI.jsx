import instance from "../../config/axios";

// 1. Tạo lịch hẹn khám
export const createAppointment = async (data) => {
  try {
    const res = await instance.post("/api/customer/appointments", data);
    return res.data; // ✅ LẤY RA JSON TRẢ VỀ { success, message, data }
  } catch (err) {
    console.error("API Appointment Error:", err.response?.data || err);
    return { success: false, message: "Lỗi server hoặc kết nối" };
  }
};

// 2. Dời lịch hẹn
export const rescheduleAppointment = (appointmentId, data) => {
  return instance.put(`/api/appointments/${appointmentId}/reschedule`, data);
};

// 3. Lấy lịch hẹn của staff
export const getStaffAppointments = () => {
  return instance.get("/api/staff/appointments");
};

// 4. Lấy lịch hẹn của bệnh nhân
export const getPatientAppointments = () => {
  return instance.get("/api/patient/appointments");
};

// 5. Lấy lịch hẹn của bác sĩ
export const getDoctorAppointments = () => {
  return instance.get("/api/doctors/appointments");
};

// 6. Xem chi tiết lịch hẹn
export const getAppointmentDetail = (appointmentId) => {
  return instance.get(`/api/appointments/${appointmentId}`);
};

// 7. Hủy lịch hẹn
export const cancelAppointment = (appointmentId) => {
  return instance.delete(`/api/appointments/${appointmentId}/cancel`);
};

/**
 * API service for managing patient appointments
 */
export const appointmentAPI = {
  /**
   * Get appointments with filters and pagination
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number (starting from 0)
   * @param {number} params.size - Number of items per page
   * @param {string} params.status - Appointment status filter
   * @param {string} params.fromDate - Start date filter (YYYY-MM-DD)
   * @param {string} params.toDate - End date filter (YYYY-MM-DD)
   * @returns {Promise} API response
   */
  getAppointments: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams();

      // Add parameters to query string if they exist
      Object.entries(params).forEach(([key, value]) => {
        if (
          value !== null &&
          value !== undefined &&
          !(typeof value === "string" && value.trim() === "")
        ) {
          queryParams.append(key, value);
        }
      });

      const response = await instance.get(
        `/api/patient/appointments?${queryParams.toString()}`
      );
      console.log("Query string:", queryParams.toString());

      // Validate response structure
      if (response.data && response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data?.message || "Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      throw error;
    }
  },

  /**
   * Get appointment by ID
   * @param {number} appointmentId - The appointment ID
   * @returns {Promise} API response
   */
  getAppointmentById: async (appointmentId) => {
    try {
      const response = await instance.get(
        `/api/appointments/{appointmentId}${appointmentId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching appointment by ID:", error);
      throw error;
    }
  },

  /**
   * Create new appointment
   * @param {Object} appointmentData - Appointment data
   * @returns {Promise} API response
   */
  createAppointment: async (appointmentData) => {
    try {
      const response = await instance.post(
        "/api/appointments",
        appointmentData
      );

      if (response.data?.success) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message,
        };
      } else {
        return {
          success: false,
          message: response.data?.message || "Tạo cuộc hẹn thất bại",
        };
      }
    } catch (error) {
      console.error("Lỗi khi gọi API createAppointment:", error);
      return {
        success: false,
        message: error.message || "Đã xảy ra lỗi khi tạo cuộc hẹn",
      };
    }
  },
  /**
   * Update appointment
   * @param {number} appointmentId - The appointment ID
   * @param {Object} appointmentData - Updated appointment data
   * @returns {Promise} API response
   */

  updateAppointment: (appointmentId, isoDateTime) => {
    return instance.patch(
      `/api/customer/appointments/${appointmentId}/reschedule`,
      {
        newDateTime: isoDateTime,
      }
    );
  },

  /**
   * Cancel appointment
   * @param {number} appointmentId - The appointment ID
   * @returns {Promise} API response
   */
  cancelAppointment: async (appointmentId) => {
    try {
      const response = await instance.delete(
        `/api/appointments/${appointmentId}/cancel`
      );
      return response.data;
    } catch (error) {
      console.error("Lỗi khi huỷ lịch hẹn:", error);
      throw error;
    }
  },
};

export default appointmentAPI;
