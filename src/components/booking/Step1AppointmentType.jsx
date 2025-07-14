import React from "react";
import useAppointmentTypes from "../../hooks/useAppointmentTypes";
import GlobalLoading from "../ui/GlobalLoading";

const Step1AppointmentType = ({ onSelect, formData }) => {
  const { appointmentTypes, loading, error } = useAppointmentTypes();

  if (loading) {
    return <GlobalLoading isLoading={true} />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-10">
        <p>Không thể tải danh sách loại lịch hẹn.</p>
        <p className="text-sm mt-2">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Bước 1: Chọn Loại Lịch Hẹn
      </h2>
      <p className="text-gray-600 mb-6">
        Vui lòng chọn loại lịch hẹn phù hợp với nhu cầu của bạn
      </p>

      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {appointmentTypes.map((type) => (
          <label
            key={type.typeName}
            className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500 transition-all"
          >
            <input
              type="radio"
              name="appointmentType"
              value={type.typeName}
              checked={formData.appointmentType?.typeName === type.typeName}
              onChange={() =>
                onSelect("appointmentType", {
                  typeName: type.typeName,
                  description: type.description,
                })
              }
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <div className="ml-4 flex-1">
              <p className="font-semibold text-gray-800">{type.description}</p>
              <p className="text-sm text-gray-500 mt-1">({type.typeName})</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Step1AppointmentType;
