import instance from "../../config/axios";

// 1. Tạo lịch hẹn khám
export const createAppointment = (data) => {
  return instance.post("/api/appointments", data);
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
          !(typeof value === 'string' && value.trim() === '')
        ) {
          queryParams.append(key, value);
        }
      });

      const response = await instance.get(`/api/patient/appointments?${queryParams.toString()}`);
      console.log('Query string:', queryParams.toString());

      // Validate response structure
      if (response.data && response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data?.message || 'Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
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
      const response = await instance.get(`/api/appointments/{appointmentId}${appointmentId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching appointment by ID:', error);
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
      const response = await instance.post('/api/patient/appointments', appointmentData);
      return response.data;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  },

  /**
   * Update appointment
   * @param {number} appointmentId - The appointment ID
   * @param {Object} appointmentData - Updated appointment data
   * @returns {Promise} API response
   */
  updateAppointment: async (appointmentId, appointmentData) => {
    try {
      const response = await instance.put(`/api/patient/appointments/${appointmentId}`, appointmentData);
      return response.data;
    } catch (error) {
      console.error('Error updating appointment:', error);
      throw error;
    }
  },

  /**
   * Cancel appointment
   * @param {number} appointmentId - The appointment ID
   * @returns {Promise} API response
   */
  cancelAppointment: async (appointmentId) => {
    try {
      const response = await instance.delete(`/api/patient/appointments/${appointmentId}`);
      return response.data;
    } catch (error) {
      console.error('Error canceling appointment:', error);
      throw error;
    }
  }
};

export default appointmentAPI;