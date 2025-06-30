import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock } from "lucide-react";

const RescheduleCard = ({ appointment, onConfirm, onClose }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleSubmit = () => {
    if (selectedDate && selectedTime) {
      const newDatetime = `${selectedDate}T${selectedTime}`;
      onConfirm(appointment.id, newDatetime);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-6 animate-fade-in">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">
          Dời lịch hẹn
        </h2>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-1">
              Ngày mới
            </label>
            <div className="relative">
              <input
                type="date"
                className="w-full px-4 py-2 border rounded-lg dark:bg-zinc-800 dark:text-white dark:border-zinc-700"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              <CalendarIcon className="absolute right-3 top-2.5 text-zinc-400 pointer-events-none" size={18} />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-1">
              Giờ mới
            </label>
            <div className="relative">
              <input
                type="time"
                className="w-full px-4 py-2 border rounded-lg dark:bg-zinc-800 dark:text-white dark:border-zinc-700"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              />
              <Clock className="absolute right-3 top-2.5 text-zinc-400 pointer-events-none" size={18} />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button disabled={!selectedDate || !selectedTime} onClick={handleSubmit}>
            Xác nhận
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RescheduleCard;
