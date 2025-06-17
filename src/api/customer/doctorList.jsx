import instance from "../../config/axios"; 

// Lấy danh sách bác sĩ công khai
export const getPublicDoctors = () =>
    instance.get("/api/doctors");

// Lấy thông tin chi tiết một bác sĩ
export const getDoctorDetail = (userId) =>
    instance.get(`/api/doctors/${userId}`);
