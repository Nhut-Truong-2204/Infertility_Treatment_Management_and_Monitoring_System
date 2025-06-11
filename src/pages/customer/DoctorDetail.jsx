// src/pages/DoctorDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../../config/axios';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar";
"../../"
import { Skeleton } from "@/components/ui/skeleton";

const DoctorDetail = () => {
  const { userId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDoctor = async () => {
    setLoading(true);
    try {
      const res = await instance.get(`/api/doctors/${userId}`);
      setDoctor(res.data.data);
    } catch (err) {
      console.error('Không tìm thấy bác sĩ:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, [userId]);

  if (loading) {
    return <Skeleton className="h-96 max-w-2xl mx-auto mt-10" />;
  }

  if (!doctor) {
    return <p className="text-center text-gray-500 mt-10">Không tìm thấy bác sĩ</p>;
  }

  return (
    <section className="max-w-2xl mx-auto px-4 py-12 mt-20">
      <Card>
        <CardHeader className="flex flex-col items-center gap-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={doctor.profilePictureUrl || "/default-avatar.png"} />
            <AvatarFallback>{doctor.fullName?.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl">{doctor.fullName}</CardTitle>
          <p className="text-sm text-muted-foreground">{doctor.specializationName}</p>
        </CardHeader>
        <CardContent className="text-gray-700">
          <h2 className="text-lg font-semibold mb-2">Tiểu sử</h2>
          <p>{doctor.shortBio}</p>
        </CardContent>
      </Card>
    </section>
  );
};

export default DoctorDetail;
