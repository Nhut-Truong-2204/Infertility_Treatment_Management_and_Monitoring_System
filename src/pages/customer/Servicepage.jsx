import React, { useState, useEffect } from 'react';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  // Dữ liệu giả lập với hình ảnh (thay thế bằng API GET /api/services)
  const mockServices = [
    { id: 1, name: 'Xét nghiệm máu tổng quát', description: 'Kiểm tra các chỉ số sinh học cơ bản trong máu.', price: '500.000 đ', category: 'Xét nghiệm máu', image: 'https://via.placeholder.com/150x100?text=Blood+Test' },
    { id: 2, name: 'Xét nghiệm HIV', description: 'Kiểm tra kháng thể HIV trong máu.', price: '250.000 đ', category: 'Xét nghiệm máu', image: 'https://via.placeholder.com/150x100?text=HIV+Test' },
    { id: 3, name: 'Xét nghiệm viêm gan B', description: 'Phát hiện virus viêm gan B (HBV) qua máu.', price: '300.000 đ', category: 'Xét nghiệm máu', image: 'https://via.placeholder.com/150x100?text=HepB+Test' },
    { id: 4, name: 'Xét nghiệm viêm gan C', description: 'Phát hiện kháng thể viêm gan C (HCV).', price: '320.000 đ', category: 'Xét nghiệm máu', image: 'https://via.placeholder.com/150x100?text=HepC+Test' },
    { id: 5, name: 'Xét nghiệm nội tiết tố nữ', description: 'Kiểm tra hormone estrogen, progesterone...', price: '650.000 đ', category: 'Xét nghiệm nội tiết', image: 'https://via.placeholder.com/150x100?text=Hormone+Test' },
    { id: 6, name: 'Xét nghiệm tinh dịch đồ', description: 'Đánh giá số lượng và chất lượng tinh trùng.', price: '700.000 đ', category: 'Xét nghiệm sinh sản', image: 'https://via.placeholder.com/150x100?text=Semen+Test' },
    { id: 7, name: 'Xét nghiệm ung thư cổ tử cung (Pap smear)', description: 'Tầm soát tế bào bất thường ở cổ tử cung.', price: '450.000 đ', category: 'Xét nghiệm ung thư', image: 'https://via.placeholder.com/150x100?text=Pap+Smear' },
    { id: 8, name: 'Xét nghiệm tủy (HBA1C)', description: 'Đo chỉ số huyết đường (HBA1C) trong vòng 3 tháng gần.', price: '200.000 đ', category: 'Xét nghiệm máu', image: 'https://via.placeholder.com/150x100?text=HBA1C+Test' },
    { id: 9, name: 'Kết nghiệm nước tiểu', description: 'Kiểm tra chức năng nước tiểu, đường, viêm nhiễm.', price: '50.000 đ', category: 'Xét nghiệm nước tiểu', image: 'https://via.placeholder.com/150x100?text=Urine+Test' },
  ];

  // Giả lập gọi API
  useEffect(() => {
    // Thay thế bằng: fetch('/api/services').then(res => res.json()).then(data => {
    //   setServices(data);
    //   setFilteredServices(data);
    // });
    setServices(mockServices);
    setFilteredServices(mockServices);
  }, []);

  // Lọc và tìm kiếm dịch vụ
  useEffect(() => {
    let filtered = services;

    // Lọc theo danh mục
    if (selectedCategory !== 'Tất cả') {
      filtered = services.filter(service => service.category === selectedCategory);
    }

    // Tìm kiếm theo tên
    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredServices(filtered);
  }, [searchTerm, selectedCategory, services]);

  // Lấy danh sách danh mục duy nhất
  const categories = ['Tất cả', ...new Set(services.map(service => service.category))];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header
      <header className="bg-blue-900 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="https://via.placeholder.com/30" alt="Logo" className="mr-2" />
          <h1 className="text-xl font-bold">ReproTrack</h1>
        </div>
        <nav className="space-x-4">
          <a href="#" className="hover:underline">Học</a>
          <a href="#" className="hover:underline">Chăm sóc</a>
          <a href="#" className="hover:underline">Tham gia</a>
        </nav>
        <div>
          <button className="bg-blue-600 px-4 py-2 rounded mr-2">Đăng nhập</button>
          <button className="bg-blue-600 px-4 py-2 rounded">Đăng ký</button>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Bảng giá Dịch vụ</h2>

        {/* Bộ lọc và tìm kiếm */}
        <div className="flex justify-between mb-6">
          <div className="flex items-center space-x-4">
            <label htmlFor="category" className="font-semibold">Lọc theo loại dịch vụ:</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded p-2"
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <input
              type="text"
              placeholder="Tìm kiếm dịch vụ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded p-2 w-64"
            />
          </div>
        </div>

        {/* Layout với danh sách dịch vụ và quảng cáo */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Danh sách dịch vụ */}
          <div className="w-full md:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredServices.length > 0 ? (
                filteredServices.map(service => (
                  <div key={service.id} className="bg-white p-4 rounded-lg shadow-md flex items-center">
                    <img src={service.image} alt={service.name} className="w-32 h-20 object-cover mr-4" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                      <p className="text-gray-600 mb-2">{service.description}</p>
                      <p className="text-lg font-bold text-blue-600">{service.price}</p>
                      <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="col-span-2 text-center text-gray-600">Không tìm thấy dịch vụ nào.</p>
              )}
            </div>
          </div>

          {/* Quảng cáo cơ sở y tế */}
          <div className="w-full md:w-1/4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <img src="https://via.placeholder.com/300x400?text=Quảng+Cáo+Cơ+Sở+Y+Tế" alt="Quảng cáo cơ sở y tế" className="w-full h-64 object-cover rounded mb-4" />
              <h3 className="text-lg font-semibold text-center">Khám sức khỏe tại cơ sở y tế uy tín</h3>
              <p className="text-gray-600 text-center mt-2">Đặt lịch ngay hôm nay để nhận ưu đãi đặc biệt!</p>
              <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Đặt lịch ngay
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServicesPage;