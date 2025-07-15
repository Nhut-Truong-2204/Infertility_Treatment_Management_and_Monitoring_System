import React from "react";
import useDoctors from "../../hooks/useDoctors";
import { Loading } from "../ui";

const Step3Doctor = ({ onSelect, formData }) => {
  const { doctors, loading, error } = useDoctors(formData.date, formData.shift);

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-4">
        Bước 3: Chọn Bác Sĩ
      </h2>
      {loading ? (
        <Loading
          variant="primary"
          type="consultation"
          text="Đang tải danh sách bác sĩ..."
        />
      ) : error ? (
        <p className="text-center text-red-500 p-10">
          Không thể tải danh sách bác sĩ.
        </p>
      ) : doctors.length > 0 ? (
        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
          {doctors.map((doctor) => (
            <label
              key={doctor.userId}
              className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-secondary has-[:checked]:bg-secondary has-[:checked]:border-accent"
            >
              <input
                type="radio"
                name="doctor"
                value={doctor.userId}
                checked={formData.doctor === doctor.userId}
                onChange={(e) => onSelect("doctor", parseInt(e.target.value))}
                className="w-4 h-4 text-accent border-gray-300 focus:ring-accent"
              />
              <img
                src={
                  doctor.profilePictureUrl || "https://via.placeholder.com/50"
                }
                alt={doctor.fullName}
                className="w-12 h-12 rounded-full ml-4 object-cover"
              />
              <div className="ml-4">
                <p className="font-bold text-primary">{doctor.fullName}</p>
                <p className="text-sm text-text-color">
                  {doctor.specializationName}
                </p>
              </div>
            </label>
          ))}
        </div>
      ) : (
        <p className="text-center text-text-color p-10">
          Không có bác sĩ nào làm việc vào ca này. Vui lòng chọn ngày hoặc ca
          khác.
        </p>
      )}
    </div>
  );
};

export default Step3Doctor;
