import React, { useState, useEffect } from 'react';
import {
    Search,
    Stethoscope,
    Heart,
    Brain,
    Eye,
    Bone,
    Baby,
    Zap,
    CheckCircle,
    ChevronRight,
    Sparkles,
    Activity
} from 'lucide-react';

const ServiceSelection = ({ onServiceSelect, selectedService, instanceConfig }) => {
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [hoveredService, setHoveredService] = useState(null);

    // Icon mapping for different service types
    const getServiceIcon = (typeName) => {
        const name = typeName.toLowerCase();
        if (name.includes('CONSULTATION')) return Heart;
        if (name.includes('TESTS')) return Brain;
        if (name.includes('PROCEDURE')) return Eye;
        if (name.includes('OTHER')) return Zap;

        return Stethoscope;
    };

    // Fetch services from API
    const fetchServices = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await instanceConfig.get('/api/customer/service-types');

            if (response.data.success) {
                // Filter out TESTS service type
                const filteredData = response.data.data.filter(service => service.typeName !== 'TESTS');
                setServices(filteredData);
                setFilteredServices(filteredData);
            } else {
                setError('Không thể tải danh sách dịch vụ');
            }
        } catch (err) {
            console.error('Error fetching services:', err);
            setError('Lỗi kết nối. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    // Load services on component mount
    useEffect(() => {
        fetchServices();
    }, []);

    // Filter services based on search term
    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredServices(services);
        } else {
            const filtered = services.filter(service =>
                service.typeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredServices(filtered);
        }
    }, [searchTerm, services]);

    // Handle service selection
    const handleServiceSelect = (service) => {
        onServiceSelect(service);
    };

    // Retry function
    const handleRetry = () => {
        fetchServices();
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
                        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-700">Đang tải dịch vụ...</h3>
                        <p className="text-sm text-gray-500">Vui lòng chờ trong giây lát</p>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center space-y-6 max-w-md mx-auto p-8">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                        <Activity className="w-10 h-10 text-red-500" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-gray-800">Không thể tải dịch vụ</h3>
                        <p className="text-gray-600">{error}</p>
                    </div>
                    <button
                        onClick={handleRetry}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                    >
                        Thử lại
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                    <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Chọn dịch vụ khám
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Lựa chọn dịch vụ y tế phù hợp với nhu cầu của bạn. Chúng tôi cung cấp đầy đủ các dịch vụ chuyên khoa với đội ngũ bác sĩ giàu kinh nghiệm.
                    </p>
                </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm dịch vụ..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-lg placeholder-gray-400"
                    />
                </div>
            </div>

            {/* Services Grid */}
            {filteredServices.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                        <Search className="w-10 h-10 text-gray-400" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-gray-700">Không tìm thấy dịch vụ</h3>
                        <p className="text-gray-500">
                            {searchTerm ? 'Thử tìm kiếm với từ khóa khác' : 'Hiện tại không có dịch vụ nào'}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredServices.map((service, index) => {
                        const IconComponent = getServiceIcon(service.typeName);
                        const isSelected = selectedService?.typeName === service.typeName;
                        const isHovered = hoveredService === index;

                        return (
                            <div
                                key={index}
                                className={`group relative overflow-hidden rounded-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${isSelected
                                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-2xl scale-105'
                                    : 'bg-white hover:bg-gray-50 shadow-lg hover:shadow-2xl border border-gray-100'
                                    }`}
                                onClick={() => handleServiceSelect(service)}
                                onMouseEnter={() => setHoveredService(index)}
                                onMouseLeave={() => setHoveredService(null)}
                            >
                                {/* Background Pattern */}
                                <div className="absolute inset-0 opacity-5">
                                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-current rounded-full"></div>
                                    <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-current rounded-full"></div>
                                </div>

                                {/* Content */}
                                <div className="relative p-6 space-y-4">
                                    {/* Icon and Selection Indicator */}
                                    <div className="flex items-start justify-between">
                                        <div className={`p-3 rounded-xl transition-all duration-200 ${isSelected
                                            ? 'bg-white/20 backdrop-blur-sm'
                                            : 'bg-blue-50 group-hover:bg-blue-100'
                                            }`}>
                                            <IconComponent className={`w-6 h-6 transition-colors duration-200 ${isSelected ? 'text-white' : 'text-blue-600'
                                                }`} />
                                        </div>

                                        {isSelected && (
                                            <div className="flex items-center justify-center w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full">
                                                <CheckCircle className="w-5 h-5 text-white" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Service Info */}
                                    <div className="space-y-3">
                                        <h3 className={`text-xl font-bold transition-colors duration-200 ${isSelected ? 'text-white' : 'text-gray-800 group-hover:text-blue-600'
                                            }`}>
                                            {service.typeName}
                                        </h3>

                                        <p className={`text-sm leading-relaxed transition-colors duration-200 ${isSelected ? 'text-white/90' : 'text-gray-600'
                                            }`}>
                                            {service.description}
                                        </p>
                                    </div>

                                    {/* Action Indicator */}
                                    <div className="flex items-center justify-between pt-2">
                                        <span className={`text-sm font-medium transition-colors duration-200 ${isSelected ? 'text-white/80' : 'text-blue-600 group-hover:text-blue-700'
                                            }`}>
                                            {isSelected ? 'Đã chọn' : 'Chọn dịch vụ'}
                                        </span>

                                        <ChevronRight className={`w-5 h-5 transition-all duration-200 ${isSelected ? 'text-white' : 'text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1'
                                            }`} />
                                    </div>
                                </div>

                                {/* Hover Effect */}
                                {isHovered && !isSelected && (
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 pointer-events-none"></div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Selected Service Summary */}
            {selectedService && (
                <div className="max-w-2xl mx-auto">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6">
                        <div className="flex items-start gap-4">
                            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                                <CheckCircle className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 space-y-2">
                                <h4 className="text-lg font-bold text-gray-800">
                                    Đã chọn: {selectedService.typeName}
                                </h4>
                                <p className="text-gray-600">
                                    {selectedService.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceSelection;