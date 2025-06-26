import React, { useState } from 'react';
import Swal from 'sweetalert2';

const RescheduleCard = ({ appointmentId, onClose, onConfirm }) => {
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  const handleSubmit = () => {
    if (!newDate || !newTime) {
      Swal.fire('Lỗi', 'Vui lòng chọn đầy đủ ngày và giờ.', 'warning');
      return;
    }
    const isoString = new Date(`${newDate}T${newTime}`).toISOString();
    onConfirm(appointmentId, isoString);
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md space-y-4">
        <h2 className="text-lg font-semibold">Dời lịch hẹn #{appointmentId}</h2>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Ngày mới</label>
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          <label className="block text-sm font-medium text-gray-700">Giờ mới</label>
          <input
            type="time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
          >
            Huỷ
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default RescheduleCard;
