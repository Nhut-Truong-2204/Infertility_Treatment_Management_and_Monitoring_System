import React from "react";

const Step4Confirmation = ({ onSelect, formData }) => {
  const formatTime = (time) => {
    // time is always a string in "HH:MM" format
    return time || "";
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-4">
        Bước 4: Xác Nhận Thông Tin
      </h2>
      <div className="space-y-4 p-4 bg-secondary rounded-lg">
        <div className="flex justify-between">
          <strong className="text-gray-600">Dịch vụ:</strong>
          <span className="text-primary font-semibold text-right">
            {formData.serviceDefinition?.description}
          </span>
        </div>
        <div className="flex justify-between">
          <strong className="text-gray-600">Giá dịch vụ:</strong>
          <span className="text-primary font-semibold">
            {formData.serviceDefinition?.defaultPrice
              ? `${Number(
                  formData.serviceDefinition.defaultPrice
                ).toLocaleString("vi-VN")} VNĐ`
              : "Chưa có giá"}
          </span>
        </div>
        <div className="flex justify-between">
          <strong className="text-gray-600">Loại lịch hẹn:</strong>
          <span className="text-primary font-semibold text-right">
            {formData.appointmentType?.description}
          </span>
        </div>
        <div className="flex justify-between">
          <strong className="text-gray-600">Ngày khám:</strong>
          <span className="text-primary font-semibold">{formData.date}</span>
        </div>
        <div className="flex justify-between">
          <strong className="text-gray-600">Ca khám:</strong>
          <span className="text-primary font-semibold">
            {formData.shift
              ? `${formatTime(formData.shift.startTime)} - ${formatTime(
                  formData.shift.endTime
                )}`
              : ""}
          </span>
        </div>
      </div>
      <div className="mt-6">
        <label
          htmlFor="reasonForVisit"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Lý do khám (bắt buộc)
        </label>
        <input
          type="text"
          id="reasonForVisit"
          value={formData.reasonForVisit || ""}
          onChange={(e) => onSelect("reasonForVisit", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="Ví dụ: Tư vấn hiếm muộn"
          required
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Ghi chú thêm (tùy chọn)
        </label>
        <textarea
          id="notes"
          value={formData.notes || ""}
          onChange={(e) => onSelect("notes", e.target.value)}
          rows="3"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="Thông tin bổ sung cho bác sĩ..."
        ></textarea>
      </div>
    </div>
  );
};

export default Step4Confirmation;
