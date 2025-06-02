const clinicData = {
  success: true,
  data: {
    clinicName: "ReproTrack Medical Clinic",
    address: "123 Health Street, District 1, Ho Chi Minh City",
    phoneNumber: "+84 123 456 789",
    email: "contact@ReproTrackclinic.com",
    operatingHours: "Mon - Fri: 8:00 AM - 5:00 PM, Sat: 9:00 AM - 1:00 PM",
    description: "Sunrise Medical Clinic provides comprehensive healthcare services with a focus on patient care and advanced medical technology.",
    logoUrl: "https://khoinguonsangtao.vn/wp-content/uploads/2022/10/hinh-anh-chu-mo.jpg",
    websiteUrl: "https://sunriseclinic.com",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.447173177537!2d106.69832931525847!3d10.776389162294936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0!2zMTDCsDQ2JzM0LjAiTiAxMDbCsDQxJzUzLjciRQ!5e0!3m2!1sen!2s!4v1631234567890!5m2!1sen!2s",
    awardsAndCertifications: "Certified by the Ministry of Health, 2024 Excellence in Patient Care Award",
    additionalImagesJSON: JSON.stringify([
      "https://hthaostudio.com/wp-content/uploads/2022/08/Anh-profile-bac-si-min.jpg",
      "https://hthaostudio.com/wp-content/uploads/2022/08/Anh-profile-bac-si-min.jpg",
      "https://hthaostudio.com/wp-content/uploads/2022/08/Anh-profile-bac-si-min.jpg"
    ])
  }
};

export default function ClinicIntroduction() {
  const { data } = clinicData;

  return (
    <section className="py-10 px-4 bg-gradient-to-b from-blue-200 to-white min-h-screen">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Giới thiệu về {data.clinicName}</h1>
          <img
            src={data.logoUrl}
            alt={`${data.clinicName} Logo`}
            className="mx-auto h-24 mb-4 rounded-lg shadow-md"
          />
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
            <p className="text-gray-700"><strong>Email:</strong> <a href={`mailto:${data.email}`} className="text-blue-600 hover:underline">{data.email}</a></p>
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

          {/* Awards and Certifications */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Giải thưởng & Chứng nhận</h3>
            <p className="text-gray-700">{data.awardsAndCertifications}</p>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Vị trí của chúng tôi</h2>
          <div className="w-full h-64 rounded-lg overflow-hidden shadow-inner">
            <iframe
              src={data.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Gallery */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Hình ảnh cơ sở</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {JSON.parse(data.additionalImagesJSON).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${data.clinicName} Image ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg shadow-sm"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}