// src/components/DoctorCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/doctors/${doctor.userId}`);
  };

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition duration-300"
      onClick={handleClick}
    >
      <CardHeader className="flex flex-col items-center gap-2">
        <Avatar className="w-16 h-16">
          <AvatarImage src={doctor.profilePictureUrl || "/default-avatar.png"} />
          <AvatarFallback>{doctor.fullName?.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-lg text-center">{doctor.fullName}</CardTitle>
        <p className="text-sm text-muted-foreground">{doctor.specializationName}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{doctor.shortBio}</p>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
