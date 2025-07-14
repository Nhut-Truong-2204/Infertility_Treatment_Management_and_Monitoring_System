import React from "react";
import useServiceTypes from "../../hooks/useServiceTypes";
import GlobalLoading from "../ui/GlobalLoading";

const Step2ServiceType = ({ onSelect, formData }) => {
  const { serviceTypes, loading, error } = useServiceTypes();
  if (loading) return <GlobalLoading isLoading={true} />;
  if (error)
    return (
      <div className="text-center text-red-500 p-10">
        Không thể tải danh sách dịch vụ.
      </div>
    );
  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-4">
        Bước 2: Chọn Loại Dịch Vụ
      </h2>
      <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
        {serviceTypes
          .filter((type) => type.typeName !== "PROCEDURE")
          .map((type) => (
            <label
              key={type.typeName}
              className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-secondary has-[:checked]:bg-secondary has-[:checked]:border-accent"
            >
              <input
                type="radio"
                name="serviceType"
                value={type.typeName}
                checked={formData.serviceType?.typeName === type.typeName}
                onChange={() =>
                  onSelect("serviceType", {
                    typeName: type.typeName,
                    description: type.description,
                  })
                }
                className="w-4 h-4 text-accent border-gray-300 focus:ring-accent"
              />
              <div className="ml-4">
                <p className="font-semibold text-primary">{type.typeName}</p>
                <p className="text-sm text-text-color">{type.description}</p>
              </div>
            </label>
          ))}
      </div>
    </div>
  );
};

export default Step2ServiceType;
