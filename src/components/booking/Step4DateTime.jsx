import React from "react";
import useWorkingShifts from "../../hooks/useWorkingShifts";
import GlobalLoading from "../ui/GlobalLoading";

const Step4DateTime = ({ onSelect, formData }) => {
  const { shifts, loading } = useWorkingShifts();

  const formatTime = (timeString) => {
    if (!timeString) return "";

    // Nếu timeString đã là định dạng HH:MM, trả về luôn
    if (typeof timeString === "string" && timeString.includes(":")) {
      return timeString;
    }

    // Nếu là số (minutes từ 00:00), chuyển đổi thành HH:MM
    if (typeof timeString === "number") {
      const hours = Math.floor(timeString / 60);
      const minutes = timeString % 60;
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}`;
    }

    // Fallback: cố gắng parse thành số
    const timeNum = parseInt(timeString);
    if (!isNaN(timeNum)) {
      const hours = Math.floor(timeNum / 60);
      const minutes = timeNum % 60;
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}`;
    }

    return timeString;
  };

  // Lấy ngày hiện tại theo định dạng YYYY-MM-DD
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Kiểm tra xem ca khám có trong tương lai không
  const isShiftInFuture = (shift, selectedDate) => {
    if (!selectedDate) return true; // Nếu chưa chọn ngày, hiển thị tất cả ca

    const today = new Date();
    const selected = new Date(selectedDate);

    // Nếu ngày được chọn là trong tương lai, cho phép tất cả ca
    if (selected.toDateString() !== today.toDateString()) {
      return selected > today;
    }

    // Nếu là ngày hôm nay, chỉ hiển thị ca chưa qua
    const currentTime = today.getHours() * 60 + today.getMinutes();

    // Parse startTime - có thể là string "HH:MM" hoặc number (minutes)
    let shiftStartMinutes;
    if (typeof shift.startTime === "string" && shift.startTime.includes(":")) {
      const [hours, minutes] = shift.startTime.split(":").map(Number);
      shiftStartMinutes = hours * 60 + minutes;
    } else {
      shiftStartMinutes = parseInt(shift.startTime);
    }

    return shiftStartMinutes > currentTime;
  };

  // Lọc ca khám trong tương lai
  const futureShifts = shifts.filter((shift) =>
    isShiftInFuture(shift, formData.date)
  );

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">
          Bước 4: Chọn Ngày Giờ Khám
        </h2>
        {formData.serviceDefinition && (
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
            <i className="fas fa-info-circle text-blue-500"></i>
            <span>
              Dịch vụ đã chọn:
              <span className="font-medium text-primary ml-1">
                {formData.serviceDefinition.serviceName}
              </span>
            </span>
          </div>
        )}
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <i className="fas fa-calendar-alt mr-2 text-accent"></i>
            Chọn Ngày Khám
          </label>
          <input
            type="date"
            value={formData.date || ""}
            min={getTodayDate()}
            onChange={(e) => {
              onSelect("date", e.target.value);
              if (
                formData.shift &&
                !isShiftInFuture(formData.shift, e.target.value)
              ) {
                onSelect("shift", null);
              }
            }}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
            placeholder="Chọn ngày khám"
          />
          <p className="text-xs text-gray-500 mt-1">
            Chỉ có thể đặt lịch từ hôm nay trở đi
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <i className="fas fa-clock mr-2 text-accent"></i>
            Chọn Ca Khám
          </label>
          {loading ? (
            <GlobalLoading isLoading={true} />
          ) : futureShifts.length === 0 ? (
            <div className="text-center py-6">
              <i
                className={`fas ${
                  formData.date ? "fa-calendar-times" : "fa-calendar-plus"
                } text-gray-400 text-2xl mb-2`}
              ></i>
              <p className="text-gray-500">
                {formData.date
                  ? "Không có ca khám khả dụng cho ngày này"
                  : "Vui lòng chọn ngày trước"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {futureShifts.map((shift, index) => {
                const shiftValue = JSON.stringify(shift);
                const isSelected =
                  formData.shift &&
                  JSON.stringify(formData.shift) === shiftValue;
                return (
                  <label
                    key={index}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:border-accent hover:bg-accent/5 ${
                      isSelected
                        ? "border-accent bg-accent/10"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="shift"
                      value={shiftValue}
                      checked={isSelected}
                      onChange={(e) => {
                        onSelect("shift", JSON.parse(e.target.value));
                      }}
                      className="w-4 h-4 text-accent border-gray-300 focus:ring-accent"
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-clock text-accent text-sm"></i>
                        <span className="font-medium text-primary">
                          {formatTime(shift.startTime)} -{" "}
                          {formatTime(shift.endTime)}
                        </span>
                      </div>
                      {shift.maxPatients && (
                        <div className="text-xs text-gray-500 mt-1">
                          Tối đa: {shift.maxPatients} bệnh nhân
                        </div>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {formData.date && formData.shift && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start gap-3">
            <i className="fas fa-check-circle text-green-600 mt-0.5"></i>
            <div>
              <h3 className="font-medium text-green-800 mb-1">
                Thông tin đã chọn
              </h3>
              <p className="text-sm text-green-700">
                <strong>Ngày:</strong>{" "}
                {new Date(formData.date).toLocaleDateString("vi-VN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-sm text-green-700">
                <strong>Giờ:</strong> {formatTime(formData.shift.startTime)} -{" "}
                {formatTime(formData.shift.endTime)}
              </p>
            </div>
          </div>
        </div>
      )}

      {futureShifts.length > 0 && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-2">
            <i className="fas fa-info-circle text-yellow-600 mt-0.5"></i>
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-1">Lưu ý quan trọng:</p>
              <ul className="space-y-1 text-xs">
                <li>• Vui lòng đến trước giờ hẹn 15 phút để làm thủ tục</li>
                <li>• Mang theo giấy tờ tùy thân và thẻ bảo hiểm (nếu có)</li>
                <li>• Liên hệ phòng khám nếu cần thay đổi lịch hẹn</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step4DateTime;
