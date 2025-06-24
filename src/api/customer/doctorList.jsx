import instance from "../../config/axios"; 

// // Lấy danh sách bác sĩ công khai
// export const getPublicDoctors = () =>
//     instance.get("/api/doctors");

// // Lấy thông tin chi tiết một bác sĩ
// export const getDoctorDetail = (userId) =>
//     instance.get(`/api/doctors/${userId}`);

// api/doctorList.js
export const getDoctors = async (page = 0, limit = 10) => {
  try {
    const response = await fetch(
      `https://infertility-treatment-management-and.onrender.com/api/doctors?page=${page}&size=${limit}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 100)}`);
    }

    const contentType = response.headers['content-type'];
    onsole.log('Content-Type:', contentTypec);
    if (!contentType?.includes('application/json')) {

      
      const content = String(response.data?.data || 'No content');
      throw new Error(`Expected JSON but got ${contentType}: ${content.substring(0, 100)}`);

    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch doctors:', error);
    throw error;
  }
};


//getDoctorDetail 
export const getDoctorDetail = async (userId) => {
  try {
    const response = await fetch(
      `https://infertility-treatment-management-and.onrender.com/api/doctors/${userId}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 100)}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      const text = await response.text();
      throw new Error(`Expected JSON but got ${contentType}: ${text.substring(0, 100)}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch doctor detail for ID ${userId}:`, error);
    throw error;
  }
};
