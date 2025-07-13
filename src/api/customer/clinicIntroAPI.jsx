// clinicIntroAPI.jsx
import instance from '../../config/axios'; // Assuming instance is your axios configured instance

async function getClinicIntroduction() {
    try {
        const response = await instance.get('/api/clinic-info');
        if (!response.data.success) {
            if (response.status === 404) {
                throw new Error('Không tìm thấy thông tin phòng khám');
            }
            throw new Error('Lỗi khi tải dữ liệu');
        }
        return response.data.data;
    } catch (error) {
        console.error("Error fetching clinic introduction:", error);
        throw error;
    }
}

async function updateClinicIntroduction(id, data) {
    // Implementation for updating clinic introduction
    // You'll need to implement this based on your API's update endpoint
    try {
        const response = await instance.put(`/api/clinic-info/${id}`, data);
        if (!response.data.success) {
            throw new Error('Lỗi khi cập nhật thông tin phòng khám');
        }
        return response.data.data;
    } catch (error) {
        console.error("Error updating clinic introduction:", error);
        throw error;
    }
}

async function deleteClinicIntroduction(id) {
    // Implementation for deleting clinic introduction
    // You'll need to implement this based on your API's delete endpoint
    try {
        const response = await instance.delete(`/api/clinic-info/${id}`);
        if (!response.data.success) {
            throw new Error('Lỗi khi xóa thông tin phòng khám');
        }
        return response.data.message; // Or whatever your API returns on successful deletion
    } catch (error) {
        console.error("Error deleting clinic introduction:", error);
        throw error;
    }
}

export {
    getClinicIntroduction,
    updateClinicIntroduction,
    deleteClinicIntroduction
};