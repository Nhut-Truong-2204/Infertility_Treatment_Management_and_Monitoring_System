// pages/DoctorList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorCard from '../../components/ui/DoctorCard';
import ReactPaginate from 'react-paginate';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // Zero-based index
  const [isLoading, setIsLoading] = useState(false);

  const fetchDoctors = async (page = 0) => {
    setIsLoading(true);
    try {

        // Endpoint
      const response = await axios.get(`/api/v1/admin/users?page=${page}`);
      
      const data = response.data.data;
      setDoctors(data.content);
      setPageCount(data.totalPages);
    } catch (error) {
      console.error('Lỗi khi tải danh sách bác sĩ:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors(currentPage);
  }, [currentPage]);

  const handlePageClick = (selectedItem) => {
    setCurrentPage(selectedItem.selected);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Danh sách Bác sĩ</h1>

        {isLoading ? (
          <div className="text-center text-gray-500">Đang tải dữ liệu...</div>
        ) : doctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.userId} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">Không có dữ liệu bác sĩ.</div>
        )}

        {pageCount > 1 && (
          <div className="mt-8 flex justify-center">
            <ReactPaginate
              previousLabel={'← Trước'}
              nextLabel={'Tiếp →'}
              breakLabel={'...'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={'flex space-x-2'}
              pageClassName={'px-3 py-1 border rounded'}
              activeClassName={'bg-blue-500 text-white'}
              previousClassName={'px-3 py-1 border rounded'}
              nextClassName={'px-3 py-1 border rounded'}
              disabledClassName={'opacity-50 cursor-not-allowed'}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorList;
