import axios from "../config/axios";

export const getServiceTypes = async () => {
  try {
    const response = await axios.get("/api/customer/service-types");
    return response.data.data || [];
  } catch (error) {
    console.error("Không thể lấy danh sách các loại dịch vụ", error);
    throw new Error("Không thể lấy danh sách các loại dịch vụ");
  }
};

export const getServicesDefinitions = async (serviceType, search = "") => {
  try {
    let params = {};

    // Tạm thời chỉ sử dụng typeName để tránh vấn đề CORS
    if (typeof serviceType === "object" && serviceType.typeName) {
      params.serviceType = serviceType.typeName;
    } else if (typeof serviceType === "string") {
      params.serviceType = serviceType;
    }

    if (search) {
      params.search = search;
    }

    const response = await axios.get("/api/customer/service-definitions", {
      params: params,
    });
    return response.data.data || [];
  } catch (error) {
    console.error("Không thể lấy danh sách các dịch vụ cụ thể", error);
    throw new Error("Không thể lấy danh sách các dịch vụ cụ thể");
  }
};
