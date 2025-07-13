import React from "react";
import { Calendar, CalendarDays, Timer, Check } from "lucide-react";
const StepSelectTime = ({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  shifts,
  generateCalendarDays,
  loadingShifts,
  setCurrentStep,
  setSelectedShift,
}) => {
  const calendarDays = generateCalendarDays();

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (shift) => {
    setSelectedShift(shift); // ✅ Lưu nguyên object
    setSelectedTime(shift.startTime); // Nếu bạn vẫn cần lưu riêng giờ bắt đầu
    setCurrentStep(3); // Chuyển sang bước chọn bác sĩ
  };

  // Kiểm tra nếu là thứ 7 thì không hiển thị ca chiều
  const getSession = (timeStr) => {
    const hour = parseInt(timeStr.split(":")[0]);
    return hour < 12 ? "MORNING" : "AFTERNOON";
  };

  const isSaturday = (dateStr) => {
    return new Date(dateStr).getDay() === 5;
  };

  const filteredShifts = shifts.filter((s) => {
    if (!s.startTime) return false;

    const session = getSession(s.startTime);

    // Nếu ngày được chọn là thứ 7 và ca là buổi chiều → loại bỏ
    if (isSaturday(selectedDate) && session === "AFTERNOON") return false;

    return true;
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
          <Calendar className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
          Chọn thời gian khám
        </h2>
        <p className="text-xl text-gray-600">
          Lựa chọn ngày và giờ phù hợp với lịch trình của bạn
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Calendar - LEFT */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
            <CalendarDays className="w-8 h-8 text-purple-600" />
            <span>Chọn ngày khám</span>
          </h3>

          <div className="grid grid-cols-3 gap-3">
            {generateCalendarDays().map((day) => (
              <button
                key={day.date}
                onClick={() => setSelectedDate(day.date)}
                className={`group relative p-4 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
                  selectedDate === day.date
                    ? "border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg scale-105"
                    : day.isToday
                    ? "border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50 hover:border-purple-400"
                    : "border-gray-200 bg-white hover:border-purple-300"
                } ${day.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={day.disabled}
              >
                <div className="text-center">
                  <p className="text-sm text-gray-600 font-medium mb-1">
                    {day.weekday}
                  </p>
                  <p
                    className={`text-2xl font-bold ${
                      selectedDate === day.date
                        ? "text-purple-700"
                        : day.isToday
                        ? "text-blue-700"
                        : "text-gray-800"
                    }`}
                  >
                    {day.day}
                  </p>
                  <p className="text-xs text-gray-500">Tháng {day.month}</p>
                </div>

                {selectedDate === day.date && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}

                {day.isToday && (
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots - RIGHT */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
            <Timer className="w-8 h-8 text-purple-600" />
            <span>Chọn giờ khám</span>
          </h3>

          {!selectedDate ? (
            <div className="text-center py-16">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                Vui lòng chọn ngày khám trước
              </p>
            </div>
          ) : loadingShifts ? (
            <div className="flex justify-center items-center py-16">
              <svg
                className="animate-spin h-8 w-8 text-purple-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              <p className="ml-3 text-gray-600 text-lg">
                Đang tải ca làm việc...
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Buổi sáng */}
              <div>
                <h4 className="font-bold text-lg text-gray-800 mb-4 flex items-center space-x-2">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                  </div>
                  <span>Buổi sáng</span>
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {(shifts || [])
                    .filter(
                      (shift) =>
                        parseInt(shift.startTime.split(":")[0], 10) < 12
                    )
                    .map((shift, i) => {
                      const start = shift.startTime.slice(0, 5);
                      const end = shift.endTime.slice(0, 5);
                      const label = `${start} - ${end}`;
                      const [sh, sm] = start.split(":").map(Number);
                      const [eh, em] = end.split(":").map(Number);
                      const duration = (eh * 60 + em - (sh * 60 + sm)) / 60;

                      return (
                        <button
                          key={`${start}-${end}`}
                          onClick={() => {
                            setSelectedTime(start);
                            setSelectedShift(shift);
                          }}
                          className={`group p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1 ${
                            selectedTime === start
                              ? "border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg scale-105"
                              : "border-gray-200 bg-white hover:border-purple-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="text-left">
                              <p
                                className={`text-lg font-bold ${
                                  selectedTime === start
                                    ? "text-purple-700"
                                    : "text-gray-800"
                                }`}
                              >
                                {label}
                              </p>
                              <p className="text-sm text-gray-600">
                                {duration} giờ
                              </p>
                            </div>
                            {selectedTime === start && (
                              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                </div>
              </div>

              {/* Buổi chiều */}
              {!isSaturday(selectedDate) && (
                <div>
                  <h4 className="font-bold text-lg text-gray-800 mb-4 flex items-center space-x-2">
                    <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                    </div>
                    <span>Buổi chiều</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {(shifts || [])
                      .filter((shift) => {
                        const hour = parseInt(
                          shift.startTime.split(":")[0],
                          10
                        );
                        // Giữ ca chiều (hour >= 12) nhưng loại nếu là Thứ 7
                        return hour >= 12 && !isSaturday(selectedDate);
                      })
                      .map((shift, i) => {
                        const start = shift.startTime.slice(0, 5); // "HH:mm"
                        const end = shift.endTime.slice(0, 5); // "HH:mm"
                        const label = `${start} - ${end}`;

                        // Tính thời lượng (giờ)
                        const [sh, sm] = start.split(":").map(Number);
                        const [eh, em] = end.split(":").map(Number);
                        const duration = (eh * 60 + em - (sh * 60 + sm)) / 60;

                        return (
                          <button
                            key={`${start}-${end}`}
                            onClick={() => setSelectedTime(start)}
                            className={`group p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1 ${
                              selectedTime === start
                                ? "border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg scale-105"
                                : "border-gray-200 bg-white hover:border-purple-300"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="text-left">
                                <p
                                  className={`text-lg font-bold ${
                                    selectedTime === start
                                      ? "text-purple-700"
                                      : "text-gray-800"
                                  }`}
                                >
                                  {label}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {duration} giờ
                                </p>
                              </div>
                              {selectedTime === start && (
                                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                                  <Check className="w-4 h-4 text-white" />
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepSelectTime;
