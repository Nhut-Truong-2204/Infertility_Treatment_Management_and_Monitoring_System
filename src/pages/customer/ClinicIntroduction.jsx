import { useState, useEffect } from 'react';

export default function ClinicIntroduction() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Gọi API khi component mount
  useEffect(() => {
    const fetchClinicInfo = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://infertility-treatment-management-and.onrender.com/api/clinic-info');
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Không tìm thấy thông tin phòng khám');
          }
          throw new Error('Lỗi khi tải dữ liệu');
        }
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClinicInfo();
  }, []);

  // Xử lý trạng thái loading
  if (loading) {
    return (
      <section className="py-10 px-4 bg-gradient-to-b from-blue-200 to-white min-h-screen">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-700">Đang tải thông tin...</p>
        </div>
      </section>
    );
  }

  // Xử lý trạng thái lỗi
  if (error) {
    return (
      <section className="py-10 px-4 bg-gradient-to-b from-blue-200 to-white min-h-screen">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  // Xử lý khi không có dữ liệu
  if (!data) {
    return (
      <section className="py-10 px-4 bg-gradient-to-b from-blue-200 to-white min-h-screen">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-700">Không có thông tin phòng khám để hiển thị.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 px-4 bg-gradient-to-b from-blue-200 to-white min-h-screen">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Giới thiệu về {data.clinicName}</h1>
          {data.logoUrl ? (
            <img
              src={data.logoUrl}
              alt={`${data.clinicName} Logo`}
              className="mx-auto h-24 mb-4 rounded-lg shadow-md"
              onError={(e) => (e.target.src = '/fallback-logo.png')} // Fallback nếu logo lỗi
            />
          ) : (
            <p className="text-gray-700 mb-4">Không có logo để hiển thị</p>
          )}
        </header>

        {/* Main Content */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Về chúng tôi</h2>
          <p className="text-gray-700 mb-4">{data.description}</p>
          <p className="text-gray-700 mb-4">
            Với sứ mệnh cải thiện sức khỏe cộng đồng, chúng tôi không ngừng nâng cao chất lượng dịch vụ và ứng dụng công nghệ hiện đại trong điều trị.
          </p>

          {/* Contact Information */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Thông tin liên hệ</h3>
            <p className="text-gray-700"><strong>Địa chỉ:</strong> {data.address}</p>
            <p className="text-gray-700"><strong>Số điện thoại:</strong> {data.phoneNumber}</p>
            <p className="text-gray-700">
              <strong>Email:</strong>{' '}
              <a href={`mailto:${data.email}`} className="text-blue-600 hover:underline">
                {data.email}
              </a>
            </p>
            <p className="text-gray-700"><strong>Giờ hoạt động:</strong> {data.operatingHours}</p>
            <p className="text-gray-700">
              <strong>Website:</strong>{' '}
              <a
                href={data.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {data.websiteUrl}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}