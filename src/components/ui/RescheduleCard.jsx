import React, { useState, useEffect } from "react";
import { Calendar, CalendarDays, Check, Timer } from "lucide-react";
import { rescheduleAppointment } from "@/api/customer/appointmentAPI";
import toast from "react-hot-toast";

const RescheduleAppointmentCard = ({ appointmentId }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedShifts, setSelectedShifts] = useState(null);
  const [loadingShifts, setLoadingShifts] = useState(false);
  const [shifts, setShifts] = useState([]);
  const isSaturday = (dateStr) => {
    if (!dateStr) return false;
    const date = new Date(dateStr);
    return date.getDay() === 6;
  };
  const generateCalendarDays = () => {
    const today = new Date();
    const days = [];

    for (let i = 0; i < 8; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      if (date.getDay() !== 0) {
        days.push({
          date: date.toISOString().split("T")[0],
          day: date.getDate(),
          month: date.getMonth() + 1,
          weekday: date.toLocaleDateString("vi-VN", { weekday: "short" }),
          isToday: i === 0,
          disabled: date.getDay() === 0,
        });
      }
    }

    return days;
  };
  useEffect(() => {
    if (!selectedDate) return;
    setLoadingShifts(true);
    // Giả lập API lấy ca khám theo ngày
    setTimeout(() => {
      setShifts([
        { startTime: "08:00", endTime: "09:00" },
        { startTime: "09:30", endTime: "10:30" },
        { startTime: "13:00", endTime: "14:00" },
        { startTime: "15:00", endTime: "16:00" },
      ]);
      setLoadingShifts(false);
    }, 500);
  }, [selectedDate]);

  const handleReschedule = async () => {
    if (!selectedDate || !selectedTime) return toast.error("Vui lòng chọn ngày và giờ mới");

    const newDateTime = new Date(`${selectedDate}T${selectedTime}:00`);

    try {
      await rescheduleAppointment(appointmentId, {
        appointmentDateTime: newDateTime.toISOString(),
      });
      toast.success("Dời lịch thành công!");
    } catch (err) {
      toast.error("Dời lịch thất bại");
    }
  };

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
        {/* Calendar */}
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
                className={`group relative p-4 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${selectedDate === day.date
                  ? "border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg scale-105"
                  : day.isToday
                    ? "border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50 hover:border-purple-400"
                    : "border-gray-200 bg-white hover:border-purple-300"
                  } ${day.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={day.disabled}
              >
                <div className="text-center">
                  <p className="text-sm text-gray-600 font-medium mb-1">{day.weekday}</p>
                  <p
                    className={`text-2xl font-bold ${selectedDate === day.date
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
              </button>
            ))}
          </div>
        </div>

        {/* Time Picker */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
            <Timer className="w-8 h-8 text-purple-600" />
            <span>Chọn giờ khám</span>
          </h3>

          {!selectedDate ? (
            <div className="text-center py-16">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Vui lòng chọn ngày khám trước</p>
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
              <p className="ml-3 text-gray-600 text-lg">Đang tải ca làm việc...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {shifts.map((shift) => {
                const start = shift.startTime.slice(0, 5);
                const end = shift.endTime.slice(0, 5);
                const label = `${start} - ${end}`;
                const [sh, sm] = start.split(":").map(Number);
                const [eh, em] = end.split(":").map(Number);

                const duration = (eh * 60 + em - (sh * 60 + sm)) / 60;

                return (
                  <button
                    key={label}
                    onClick={() => {
                      setSelectedTime(start);
                      setSelectedShifts(shift);
                    }}
                    className={`group w-full p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1 ${selectedTime === start
                      ? "border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-lg scale-105"
                      : "border-gray-200 bg-white hover:border-purple-300"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <p className={`text-lg font-bold ${selectedTime === start ? "text-purple-700" : "text-gray-800"}`}>{label}</p>
                        <p className="text-sm text-gray-600">{duration} giờ</p>
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

              <div className="text-center mt-8">
                <button
                  className="bg-purple-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-purple-700 transition"
                  onClick={handleReschedule}
                >
                  Xác nhận dời lịch
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RescheduleAppointmentCard;
