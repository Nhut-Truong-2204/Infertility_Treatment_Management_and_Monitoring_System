import React, { useEffect, useState } from 'react';
import DoctorCard from '../../components/ui/DoctorCard';
import { Skeleton } from '../../components/ui/skeleton';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import LoadingPage from '../../components/layout/LoadingPage';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [limit, setLimit] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDoctors = async (page = 0) => {
    setIsLoading(true);
    try {
      const url = `https://infertility-treatment-management-and.onrender.com/api/doctors?page=${page}&size=${limit}`;
      const response = await fetch(url);
      const contentType = response.headers.get('content-type');
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Lỗi HTTP ${response.status}: ${text.substring(0, 100)}`);
      }
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error('Phản hồi không phải JSON: ' + text.substring(0, 100));
      }
      const data = await response.json();
      setDoctors(data.data.content || []);
      setPageCount(data.data.totalPages || 0);
    } catch (err) {
      console.error('Lỗi khi tải bác sĩ:', err.message);
      setDoctors([]);
      setPageCount(0);
    } finally {
      setTimeout(() => setIsLoading(false), 1500);
    }
  };

  useEffect(() => {
    fetchDoctors(currentPage);
  }, [currentPage, limit]);

  return (
    <>
      {isLoading && (
        <div className="min-h-screen flex items-center justify-center bg-blue-100">
          <LoadingPage />
        </div>
      )}
      {!isLoading && (
        <section className="w-screen min-h-screen">
          {/* Header Section */}
          <div
            className="text-center py-30 rounded-3xl mb-20 "
            style={{
              backgroundImage: "url('https://html.awaikenthemes.com/ferlix/images/page-header-bg.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              overflow: 'hidden',

              backgroundColor: 'rgba(0, 41, 59, 0.8)', // deep blue overlay
            }}
          >
            {/* Overlay Div */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 94, 184, 0.8)', // Medical blue with 80% opacity
                zIndex: 0, // Place it behind the text
                borderRadius: 'inherit', // Inherit border-radius from the parent
              }}
            ></div>

            {/* Header text - ensure it's above the overlay */}
           <h1
              className="text-white text-5xl font-bold"
              style={{
                position: 'relative', // Essential to ensure text is above the overlay
                zIndex: 1, // Place it above the overlay div
              }}
            >
              Our <span className="text-pink-400">team</span>
            </h1>
            <p
             style={{
               color: '#ffffff',       // text-white
               fontSize: '1.5rem',    // text-3xl (tương đương 30px)
               lineHeight: '2.25rem',   // line-height cho text-3xl (tương đương 36px)
               fontWeight: '700700',       // font-bold
               marginTop: '1rem',       // mt-4 (tương đương 16px)
               position: 'relative',    // Để đảm bảo nó nằm trên lớp phủ
               zIndex: 1,               // Để đảm bảo nó nằm trên lớp phủ
             }}
             >Thấu hiểu, đồng hành, cùng bạn ươm mầm.</p>
          </div>
          {/* Doctor List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <DoctorCard
                  key={doctor.userId}
                  doctor={doctor}
                  style={{
                    backgroundColor: '#f9f9f9',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    textAlign: 'center',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">Không tìm thấy bác sĩ.</p>
            )}
          </div>

          {pageCount > 1 && (
            <Pagination className="mt-10 justify-center">
              <PaginationContent>
                {[...Array(pageCount)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      isActive={index === currentPage}
                      onClick={() => setCurrentPage(index)}
                      className={index === currentPage ? 'bg-indigo-600 text-white' : 'text-indigo-600'}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              </PaginationContent>
            </Pagination>
          )}
        </section>
      )}
    </>
  );
};

export default DoctorList;