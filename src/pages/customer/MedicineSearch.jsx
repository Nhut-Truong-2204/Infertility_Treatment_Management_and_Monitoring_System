import React, { useState, useEffect } from 'react';
import { searchDrugs, getDrugDetail } from '../../api/customer/MedicineApi'; // Import các hàm API

const MedicineSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('name'); // 'name' hoặc 'activeIngredient'
  const [searchResults, setSearchResults] = useState([]);
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  // Component con DrugDetail và DrugSearchResults
  // (Giữ nguyên từ code Tailwind CSS trước đó để tránh lặp lại)

  // Component hiển thị chi tiết thuốc
  const DrugDetail = ({ drug, onClose }) => {
    if (!drug) return null;

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 mt-5 shadow-md">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{drug.drugName}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl font-semibold leading-none"
            aria-label="Đóng"
          >
            &times;
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <p><strong>Mã thuốc:</strong> {drug.drugCode || 'N/A'}</p>
          <p><strong>Hoạt chất:</strong> {drug.activeIngredient}</p>
          <p><strong>Nhà sản xuất:</strong> {drug.manufacturer}</p>
          <p><strong>Nước sản xuất:</strong> {drug.countryOfOrigin}</p>
          <p><strong>Đơn vị:</strong> {drug.unit}</p>
          <p><strong>Dạng bào chế:</strong> {drug.dosageForm}</p>
          <p><strong>Giá bán:</strong> {drug.unitPrice ? drug.unitPrice.toLocaleString('vi-VN') + ' VNĐ' : 'N/A'}</p>
          <p><strong>Số lượng tồn kho:</strong> {drug.stockQuantity || 'N/A'}</p>
          <p className="col-span-1 md:col-span-2">
              <strong>Yêu cầu kê đơn:</strong> {drug.prescriptionRequired ? 'Có' : 'Không'}
          </p>
          <div className="col-span-1 md:col-span-2">
              <strong>Mô tả:</strong> <p className="mt-1 text-justify">{drug.description || 'Đang cập nhật'}</p>
          </div>
          <div className="col-span-1 md:col-span-2">
              <strong>Chống chỉ định:</strong> <p className="mt-1 text-justify">{drug.contraindications || 'Đang cập nhật'}</p>
          </div>
          <div className="col-span-1 md:col-span-2">
              <strong>Tác dụng phụ:</strong> <p className="mt-1 text-justify">{drug.sideEffects || 'Đang cập nhật'}</p>
          </div>
          <div className="col-span-1 md:col-span-2">
              <strong>Hướng dẫn bảo quản:</strong> <p className="mt-1 text-justify">{drug.storageInstructions || 'Đang cập nhật'}</p>
          </div>
        </div>
      </div>
    );
  };

  // Component hiển thị danh sách kết quả tìm kiếm
  const DrugSearchResults = ({ drugs, onSelectDrug, currentPage, totalPages, onPageChange }) => {
    if (drugs.length === 0) {
      return <p className="text-center text-gray-600 mt-5">Không tìm thấy thuốc nào phù hợp.</p>;
    }

    return (
      <div className="mt-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {drugs.map(drug => (
            <div
              key={drug.drugId}
              className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-lg transform hover:-translate-y-1 transition duration-200 ease-in-out"
              onClick={() => onSelectDrug(drug.drugId)}
            >
              <h3 className="text-lg font-semibold text-blue-700">{drug.drugName}</h3>
              <p className="text-sm text-gray-600">Hoạt chất: <span className="font-medium">{drug.activeIngredient}</span></p>
              <p className="text-sm text-gray-600">Nhà sản xuất: {drug.manufacturer}</p>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Trước
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => onPageChange(index + 1)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Tiếp
            </button>
          </div>
        )}
      </div>
    );
  };
  // Hết các component con

  // Hàm thực hiện tìm kiếm API
  const fetchDrugs = async (page = 1) => {
    setLoading(true);
    setError(null);
    setSelectedDrug(null); // Xóa chi tiết thuốc cũ khi bắt đầu tìm kiếm mới

    try {
      const data = await searchDrugs(searchTerm, searchBy, page); // Gọi hàm searchDrugs từ MedicineApi
      
      // Dựa vào cấu trúc response bạn cung cấp: { "success": true, "message": "string", "data": { "content": [...] } }
      if (data.success && data.data && Array.isArray(data.data.content)) {
        setSearchResults(data.data.content);
        setTotalPages(data.data.totalPages || 1);
        setTotalElements(data.data.totalElements || 0);
        setCurrentPage(page);
      } else if (data.success && Array.isArray(data.data)) { // Trường hợp data.content không tồn tại
        setSearchResults(data.data);
        setTotalPages(1); // Giả định không phân trang nếu không có totalPages
        setTotalElements(data.data.length);
        setCurrentPage(1);
      } else {
        setError(data.message || "Không có dữ liệu hợp lệ từ API.");
        setSearchResults([]);
        setTotalPages(1);
        setTotalElements(0);
      }
    } catch (err) {
      setError("Có lỗi xảy ra khi tìm kiếm thuốc. Vui lòng kiểm tra lại kết nối hoặc từ khóa.");
      console.error("Search API error:", err);
      setSearchResults([]);
      setTotalPages(1);
      setTotalElements(0);
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý tìm kiếm khi người dùng nhấn nút hoặc Enter
  const handleSearchClick = () => {
    setCurrentPage(1); // Luôn reset về trang 1 khi tìm kiếm mới
    fetchDrugs(1);
  };

  // Hàm xử lý khi người dùng chọn một thuốc để xem chi tiết
  const handleSelectDrug = async (drugId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getDrugDetail(drugId); // Gọi hàm getDrugDetail từ MedicineApi
      if (data.success && data.data) {
        setSelectedDrug(data.data);
      } else {
        setError(data.message || "Không tìm thấy thông tin chi tiết thuốc.");
      }
    } catch (err) {
      setError("Có lỗi xảy ra khi lấy thông tin chi tiết thuốc. Vui lòng thử lại.");
      console.error("Detail API error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Hàm đóng phần chi tiết thuốc
  const handleCloseDetail = () => {
    setSelectedDrug(null);
  };

  // Hàm xử lý thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchDrugs(page);
  };

  // useEffect để tải dữ liệu khi component được mount (nếu muốn tải mặc định)
  // Ví dụ: tải trang đầu tiên khi component mount
  // useEffect(() => {
  //   fetchDrugs(1);
  // }, []);


  return (
    <div className="font-sans max-w-4xl mx-auto my-40 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Tra cứu Thuốc</h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <select
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:w-auto w-full"
        >
            <option value="name">Tìm theo Tên thuốc</option>
            <option value="activeIngredient">Tìm theo Hoạt chất</option>
        </select>
        <input
          type="text"
          placeholder={`Nhập ${searchBy === 'name' ? 'tên thuốc' : 'hoạt chất'}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearchClick();
            }
          }}
          className="flex-grow p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleSearchClick}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Đang tìm...' : 'Tìm kiếm'}
        </button>
      </div>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      {loading && <p className="text-blue-600 text-center mb-4">Đang tải...</p>}

      {!selectedDrug && !loading && (
        <DrugSearchResults
          drugs={searchResults}
          onSelectDrug={handleSelectDrug}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      {!selectedDrug && !loading && searchResults.length === 0 && searchTerm.trim() && (
        <p className="text-center text-gray-600 mt-5">Không có kết quả tìm kiếm cho "{searchTerm}".</p>
      )}


      {selectedDrug && (
        <DrugDetail drug={selectedDrug} onClose={handleCloseDetail} />
      )}
    </div>
  );
};

export default MedicineSearch; // Đổi tên export để phù hợp với tên file