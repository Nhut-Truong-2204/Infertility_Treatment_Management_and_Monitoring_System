import React from "react";
import useServiceDefinitions from "../../hooks/useServiceDefinitions";
import GlobalLoading from "../ui/GlobalLoading";

const Step3ServiceDefinition = ({ onSelect, formData }) => {
  const { services, loading, error } = useServiceDefinitions(
    formData.serviceType
  );

  if (!formData.serviceType || !formData.serviceType.typeName) {
    return (
      <div className="text-center py-8">
        <i className="fas fa-arrow-left text-gray-400 text-3xl mb-3"></i>
        <p className="text-gray-500">
          Vui lòng chọn loại dịch vụ ở bước trước để tiếp tục.
        </p>
      </div>
    );
  }

  if (loading) {
    return <GlobalLoading isLoading={true} />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <i className="fas fa-exclamation-triangle text-red-400 text-3xl mb-3"></i>
        <p className="text-red-500 mb-3">
          Không thể tải được dịch vụ. Vui lòng thử lại.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="text-accent hover:text-accent/80 underline"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">
          Bước 3: Chọn Dịch Vụ Cụ Thể
        </h2>
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
          <i className="fas fa-info-circle text-blue-500"></i>
          <span>
            Đang xem dịch vụ cho loại:
            <span className="font-medium text-primary ml-1">
              {formData.serviceType.typeName}
            </span>
          </span>
        </div>
      </div>
      <div className="space-y-3 max-h-60 overflow-y-auto">
        {services.length > 0 ? (
          services.map((service) => (
            <label
              key={service.serviceDefinitionId}
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:border-accent hover:bg-accent/5 ${
                formData.serviceDefinition?.serviceDefinitionId ===
                service.serviceDefinitionId
                  ? "border-accent bg-accent/10"
                  : "border-gray-200"
              }`}
            >
              <input
                type="radio"
                name="serviceDefinition"
                value={service.serviceDefinitionId}
                checked={
                  formData.serviceDefinition?.serviceDefinitionId ===
                  service.serviceDefinitionId
                }
                onChange={() => onSelect("serviceDefinition", service)}
                className="w-4 h-4 text-accent border-gray-300 focus:ring-accent"
              />
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-primary">
                    {service.serviceName}
                  </p>
                  {service.serviceCode && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {service.serviceCode}
                    </span>
                  )}
                </div>
                <p className="text-sm text-text-color">{service.description}</p>
                {service.price && (
                  <div className="mt-2 flex items-center gap-4">
                    <span className="text-sm font-medium text-accent">
                      Giá: {Number(service.price).toLocaleString("vi-VN")} VNĐ
                    </span>
                    {service.duration && (
                      <span className="text-sm text-gray-600">
                        Thời gian: {service.duration} phút
                      </span>
                    )}
                  </div>
                )}
              </div>
            </label>
          ))
        ) : (
          <div className="text-center py-8">
            <i className="fas fa-info-circle text-gray-400 text-3xl mb-3"></i>
            <p className="text-gray-500">
              Không có dịch vụ nào cho loại "{formData.serviceType?.typeName}"
              đã chọn.
            </p>
          </div>
        )}
      </div>

      {services.length > 0 && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-2">
            <i className="fas fa-lightbulb text-yellow-600 mt-0.5"></i>
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-1">Lưu ý:</p>
              <ul className="space-y-1 text-xs">
                <li>
                  • Giá dịch vụ có thể thay đổi tùy theo tình trạng cụ thể
                </li>
                <li>• Thời gian thực hiện có thể dao động ±15 phút</li>
                <li>
                  • Vui lòng đến đúng giờ hẹn để tránh ảnh hưởng đến lịch trình
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step3ServiceDefinition;
