// src/pages/DoctorList.jsx
import React, { useEffect, useState } from 'react';
import instance from '../../config/axios';
import DoctorCard from '../../components/ui/DoctorCard';
import { Skeleton } from '../../components/ui/skeleton';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDoctors = async (page = 0) => {
    setIsLoading(true);
    try {
      const response = await instance.get(`/api/doctors`);
      const data = response.data.data;
      setDoctors(data.content);
      setPageCount(data.totalPages);
    } catch (err) {
      console.error('Lỗi khi tải bác sĩ:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors(currentPage);
  }, [currentPage]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 mt-20">
      <h1 className="text-3xl font-bold mb-8 text-center">Danh sách Bác sĩ</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-lg" />
            ))
          : doctors.map((doctor) => <DoctorCard key={doctor.userId} doctor={doctor} />)}
      </div>

      {pageCount > 1 && (
        <Pagination className="mt-10">
          <PaginationContent>
            {[...Array(pageCount)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={index === currentPage}
                  onClick={() => setCurrentPage(index)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      )}
    </section>
  );
};

export default DoctorList;
