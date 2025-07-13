import { useState, useEffect } from 'react';
import { getClinicIntroduction } from '../../api/customer/clinicIntroAPI'; // Adjust the path as needed
import logo from '../../../public/logo-removebg-preview.png'; // Import your local logo image
import { useNavigate } from "react-router-dom";
export default function ClinicIntroduction() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchClinicInfo = async () => {
            try {
                setLoading(true);
                const clinicData = await getClinicIntroduction();
                setData(clinicData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchClinicInfo();
    }, []);

    if (loading) {
        return (
            <section className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-100 flex items-center justify-center p-4">
                <div className="text-center text-navy-700 text-lg font-medium animate-pulse">
                    Đang tải thông tin phòng khám...
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="min-h-screen bg-gradient-to-br from-pink-100 to-red-100 flex items-center justify-center p-4">
                <div className="text-center text-red-600 text-lg font-medium">
                    Lỗi: {error} Vui lòng thử lại sau.
                </div>
            </section>
        );
    }

    if (!data) {
        return (
            <section className="min-h-screen bg-gradient-to-br from-pink-50 to-gray-100 flex items-center justify-center p-4">
                <div className="text-center text-gray-600 text-lg font-medium">
                    Không có thông tin phòng khám để hiển thị.
                </div>
            </section>
        );
    }

    return (
        <section className="py-12 px-4 bg-pink-50 min-h-screen">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.005] transition-transform duration-300">
                {/* Hero Section with Logo and Clinic Name */}
                <div className="relative bg-gradient-to-br from-pink-400 to-navy-800 text-white p-8 sm:p-12 text-center">
                    <div className="flex flex-col items-center justify-center mb-6">
                        <img
                            src={logo.src || logo}
                            alt={`${data.clinicName} Logo`}
                            className="h-34 w-35 rounded-full border-4 border-white shadow-md object-cover mb-9 ring-2 ring-pink-200"
                        />
                        <h1 className="text-4xl sm:text-5xl font-bold mb-3 leading-tight text-white">
                            {data.clinicName}
                        </h1>
                        <p className="text-pink-100 text-lg sm:text-xl font-light italic">
                            Chăm sóc sức khỏe với niềm vui và sự tận tâm.
                        </p>
                    </div>
                    <svg className="absolute bottom-0 left-0 w-full h-16 text-white" viewBox="0 0 1440 100" fill="currentColor" preserveAspectRatio="none">
                        <path d="M0,0C400,80,1040,80,1440,0L1440,100L0,100Z" opacity="0.1"></path>
                        <path d="M0,20C400,100,1040,100,1440,20L1440,100L0,100Z" opacity="0.05"></path>
                    </svg>
                </div>

                {/* Main Content Sections */}
                <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* About Us */}
                        <div className="bg-white p-6 rounded-xl shadow-md border border-pink-100 hover:shadow-xl transition-shadow duration-200">
                            <h2 className="text-2xl font-bold text-navy-800 mb-4 flex items-center">
                                <svg className="w-8 h-8 mr-3 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                Về chúng tôi
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-base">
                                {data.description}
                            </p>
                            <p className="text-gray-500 leading-relaxed text-sm italic border-l-4 border-pink-300 pl-4 mt-4">
                                "Mang đến nụ cười và sức khỏe với sự chăm sóc tận tâm, ứng dụng công nghệ hiện đại để phục vụ cộng đồng."
                            </p>
                        </div>

                        {/* Our Services */}
                        <div className="bg-white p-6 rounded-xl shadow-md border border-pink-100 hover:shadow-xl transition-shadow duration-200">
                            <h3 className="text-2xl font-bold text-navy-800 mb-4 flex items-center">
                                <svg className="w-8 h-8 mr-3 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                                Các dịch vụ nổi bật
                            </h3>
                            <ul className="list-disc list-inside text-gray-600 space-y-2 text-base">
                                <li>Khám và điều trị tổng quát</li>
                                <li>Chuyên khoa hiếm muộn</li>
                                <li>Chuyên khoa giới tính</li>
                                <li>Tiêm chủng và tư vấn sức khỏe</li>
                                <li>Dịch vụ xét nghiệm hiện đại</li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-md border border-pink-100 h-full flex flex-col justify-between hover:shadow-xl transition-shadow duration-200">
                            <div>
                                <h3 className="text-2xl font-bold text-navy-800 mb-4 flex items-center">
                                    <svg className="w-8 h-8 mr-3 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                    Liên hệ chúng tôi
                                </h3>
                                <ul className="space-y-3 text-base text-gray-600">
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 mr-2 flex-shrink-0 text-pink-400 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                                        <p><strong>Địa chỉ:</strong> {data.address}</p>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 mr-2 flex-shrink-0 text-pink-400 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.774a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
                                        <p><strong>Điện thoại:</strong>{' '}
                                            <a href={`tel:${data.phoneNumber}`} className="text-pink-600 hover:underline">
                                                {data.phoneNumber}
                                            </a>
                                        </p>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 mr-2 flex-shrink-0 text-pink-400 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                                        <p><strong>Email:</strong>{' '}
                                            <a href={`mailto:${data.email}`} className="text-pink-600 hover:underline">
                                                {data.email}
                                            </a>
                                        </p>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 mr-2 flex-shrink-0 text-pink-400 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path></svg>
                                        <p><strong>Giờ hoạt động:</strong> {data.operatingHours}</p>
                                    </li>
                                    {data.websiteUrl && (
                                        <li className="flex items-start">
                                            <svg className="w-5 h-5 mr-2 flex-shrink-0 text-pink-400 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.153a2.002 2.002 0 011.666.908l1.472 2.943A4 4 0 0020 10a4 4 0 00-3.709-3.95l-1.472-2.943A2 2 0 0013.153 3H11zM10 18a8 8 0 100-16 8 8 0 000 16zM6.5 9A1.5 1.5 0 005 10.5v1A1.5 1.5 0 006.5 13H8v-2h-.5a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5H8V9H6.5zM11 9.25a.75.75 0 100 1.5.75.75 0 000-1.5zM13.5 9A1.5 1.5 0 0012 10.5v1A1.5 1.5 0 0013.5 13H15v-2h-.5a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5H15V9h-1.5z"></path></svg>
                                            <p><strong>Website:</strong>{' '}
                                                <a
                                                    href={data.websiteUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-pink-600 hover:underline"
                                                >
                                                    {data.websiteUrl.replace(/^(https?:\/\/)?(www\.)?/, '')}
                                                </a>
                                            </p>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <div className="mt-6">
                                <button 
                                    onClick={() => navigate("/bookingAppointment")}
                                className="w-full bg-pink-500 text-white py-2.5 rounded-lg text-lg font-medium hover:bg-pink-600 transition-colors duration-300 shadow-sm">
                                    Đặt lịch hẹn ngay
                                    
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}