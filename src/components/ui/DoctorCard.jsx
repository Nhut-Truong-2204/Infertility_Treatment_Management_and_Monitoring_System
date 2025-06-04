// components/DoctorCard.jsx
import React from 'react';

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
      <img
        src={doctor.profilePictureUrl || '/default-avatar.png'}
        alt={doctor.fullName}
        className="w-16 h-16 rounded-full object-cover"
      />
      <div>
        <h3 className="text-lg font-semibold">{doctor.fullName}</h3>
        <p className="text-sm text-gray-500">{doctor.specializationName}</p>
        <p className="text-sm text-gray-600 mt-1">{doctor.shortBio}</p>
      </div>
    </div>
  );
};

export default DoctorCard;
