// src/api/serviceDefinitionsApi.jsx

import instance from "../../config/axios";

// Lấy danh sách tất cả dịch vụ (Admin)
export const getAllServiceDefinitions = async (params = {}) => {
  const response = await instance.get("/api/admin/service-definitions", { params });
  return response.data;
};

// Lấy chi tiết một dịch vụ theo ID
export const getServiceDefinitionById = async (id) => {
  const response = await instance.get(`/api/admin/service-definitions/${id}`);
  return response.data;
};

// Tạo mới một dịch vụ
export const createServiceDefinition = async (data) => {
  const response = await instance.post("/api/admin/service-definitions", data);
  return response.data;
};

// Cập nhật thông tin dịch vụ
export const updateServiceDefinition = async (id, data) => {
  const response = await instance.put(`/api/admin/service-definitions/${id}`, data);
  return response.data;
};

// Xoá dịch vụ (thay đổi trạng thái hoạt động)
export const toggleServiceDefinitionStatus = async (id, isActive) => {
  const response = await instance.patch(`/api/admin/service-definitions/${id}/status`, { isActive });
  return response.data;
};
