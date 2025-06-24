import instance from "../../config/axios";

// // Lấy danh sách bác sĩ công khai
// export const getPublicDoctors = () =>
//     instance.get("/api/doctors");

// // Lấy thông tin chi tiết một bác sĩ
// export const getDoctorDetail = (userId) =>
//     instance.get(`/api/doctors/${userId}`);

// api/doctorList.js
export const getDoctors = async (page = 0, limit = 6) => {
  try {
    const response = await instance.get(`/api/doctors?page=${page}&size=${limit}`);

    // Axios không dùng `ok` như fetch nên đoạn này cần sửa lại:
    if (response.status < 200 || response.status >= 300) {
      const errorText = String(response.data?.data || 'Unknown error');
      throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 100)}`);
    }

    const contentType = response.headers['content-type'];
    if (!contentType?.includes('application/json')) {
      const content = String(response.data?.data || 'No content');
      throw new Error(`Expected JSON but got ${contentType}: ${content.substring(0, 100)}`);
    }

    return response.data;
  } catch (error) {
    console.error('Failed to fetch doctors:', error);
    throw error;
  }
};



//getDoctorDetail 
export const getDoctorDetail = async (userId) => {
  try {
    const response = await instance.get(`/api/doctors/${userId}`);

    const contentType = response.headers['content-type'];
    if (!contentType?.includes('application/json')) {
      const content = String(response.data || 'Không rõ nội dung');
      throw new Error(`Expected JSON but got ${contentType}: ${content.substring(0, 100)}`);
    }

    return response.data;
  } catch (error) {
    console.error(`❌ Failed to fetch doctor detail for ID ${userId}:`, error);
    throw error;
  }
};