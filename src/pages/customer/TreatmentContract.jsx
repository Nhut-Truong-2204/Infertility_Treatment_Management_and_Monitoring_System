import React, { useState, useEffect } from 'react';
import { Eye, FileText, Calendar, DollarSign, User, CheckCircle, Clock, AlertCircle, Search, Filter } from 'lucide-react';
import instance from '@/config/axios';
const TreatmentContractsViewer = () => {
    const [contracts, setContracts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedContract, setSelectedContract] = useState(null);

    useEffect(() => {
        const fetchContracts = async () => {
            setLoading(true);
            try {
                // Gọi API thật
                const response = await instance.get('/api/customer/treatment-contracts');

                // Kiểm tra phản hồi từ server (dựa vào cấu trúc JSON bạn cung cấp)
                if (response.data && Array.isArray(response.data)) {
                    setContracts(response.data);
                } else {
                    console.error('Dữ liệu không hợp lệ:', response.data);
                    setContracts([]);
                }
            } catch (error) {
                console.error('Lỗi khi tải danh sách hợp đồng:', error);
                setContracts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchContracts();
    }, []);


    const getStatusIcon = (status) => {
        switch (status) {
            case 'active':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'pending':
                return <Clock className="w-5 h-5 text-yellow-500" />;
            case 'completed':
                return <CheckCircle className="w-5 h-5 text-blue-500" />;
            default:
                return <AlertCircle className="w-5 h-5 text-gray-500" />;
        }
    };


    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('vi-VN');
    };

    const filteredContracts = contracts.filter(contract => {
        const name = contract.contractName?.toLowerCase() || '';
        const number = contract.contractNumber?.toLowerCase() || '';
        const matchesSearch = name.includes(searchTerm.toLowerCase()) || number.includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || contract.status === statusFilter;
        return matchesSearch && matchesStatus;
    });


    const getContractStatusInfo = (status) => {
        switch (status) {
            case "PENDING":
                return { text: "Chờ xử lý", colorClass: "text-yellow-900 bg-yellow-200" };
            case "SIGNED":
                return { text: "Đã ký", colorClass: "text-blue-900 bg-blue-200" };
            case "COMPLETED":
                return { text: "Đã hoàn thành", colorClass: "text-green-900 bg-green-200" };
            case "CANCELLED_BY_CLINIC":
                return { text: "Bệnh viện hủy hợp đồng", colorClass: "text-red-900 bg-red-200" };
            case "CANCELLED_BY_CUSTOMER":
                return { text: "Khách hàng hủy hợp đồng", colorClass: "text-red-900 bg-red-200" };
            default:
                return { text: "Không xác định", colorClass: "text-gray-900 bg-grey-200" };
        }
    };


    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Đang tải hợp đồng...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8  mt-25">
                    <div className="flex items-center mb-4">
                        <FileText className="w-8 h-8 text-blue-600 mr-3" />
                        <h1 className="text-3xl font-bold text-gray-800">Hợp đồng Điều trị</h1>
                    </div>
                    <p className="text-gray-600">Quản lý và theo dõi các hợp đồng điều trị của bạn</p>
                </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm theo tên hoặc số hợp đồng..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <select
                                className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">Tất cả trạng thái</option>
                                <option value="active">Đang hiệu lực</option>
                                <option value="pending">Đang chờ</option>
                                <option value="completed">Hoàn thành</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Contracts Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredContracts.map((contract) => (
                        <div
                            key={contract.treatmentContractId}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group"
                        >
                            <div className="p-6">
                                {/* Status Badge */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-2">
                                        {getStatusIcon(contract.status)}
                                        {(() => {
                                            const { text, colorClass } = getContractStatusInfo(contract.status);
                                            return (
                                                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${colorClass}`}>
                                                    {text}
                                                </span>
                                            );
                                        })()}

                                    </div>
                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                        {contract.contractNumber}
                                    </span>
                                </div>

                                {/* Contract Info */}
                                <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                                    {contract.contractName}
                                </h3>

                                {/* Value */}
                                <div className="flex items-center mb-3">
                                    <DollarSign className="w-5 h-5 text-green-500 mr-2" />
                                    <span className="text-xl font-bold text-green-600">
                                        {formatCurrency(contract.totalValue)}
                                    </span>
                                </div>

                                {/* Dates */}
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        <span>Ký: {formatDate(contract.signDate)}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        <span>Hiệu lực: {formatDate(contract.effectiveDate)} - {formatDate(contract.expiryDate)}</span>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <button
                                    onClick={() => setSelectedContract(contract)}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-lg"
                                >
                                    <Eye className="w-5 h-5" />
                                    <span className="font-medium">Xem chi tiết</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredContracts.length === 0 && (
                    <div className="text-center py-12">
                        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">Không tìm thấy hợp đồng</h3>
                        <p className="text-gray-500">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
                    </div>
                )}
            </div>

            {/* Contract Detail Modal */}
            {selectedContract && (
                <div className="fixed inset-0 bg-black/50  backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Chi tiết Hợp đồng</h2>
                                <button
                                    onClick={() => setSelectedContract(null)}
                                    className="text-gray-500 hover:text-gray-700 text-2xl"
                                >
                                    ×
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Basic Info */}
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <h3 className="font-semibold text-gray-800 mb-3">Thông tin cơ bản</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-600">Số hợp đồng</label>
                                            <p className="font-semibold">{selectedContract.contractNumber}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">Trạng thái</label>
                                            <div className="flex items-center space-x-2">
                                                {getStatusIcon(selectedContract.status)}
                                                {(() => {
                                                    const { text, colorClass } = getContractStatusInfo(selectedContract.status);
                                                    return (
                                                        <span className={`font-semibold px-3 py-1 rounded-full text-sm ${colorClass}`}>
                                                            {text}
                                                        </span>
                                                    );
                                                })()}

                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">Tên hợp đồng</label>
                                            <p className="font-semibold">{selectedContract.contractName}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">Giá trị</label>
                                            <p className="font-semibold text-green-600">
                                                {formatCurrency(selectedContract.totalValue)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Dates */}
                                <div className="bg-blue-50 rounded-xl p-4">
                                    <h3 className="font-semibold text-gray-800 mb-3">Thời gian</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-600">Ngày ký</label>
                                            <p className="font-semibold">{formatDate(selectedContract.signDate)}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">Ngày hiệu lực</label>
                                            <p className="font-semibold">{formatDate(selectedContract.effectiveDate)}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">Ngày hết hạn</label>
                                            <p className="font-semibold">{formatDate(selectedContract.expiryDate)}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Terms and Conditions */}
                                <div className="bg-purple-50 rounded-xl p-4">
                                    <h3 className="font-semibold text-gray-800 mb-3">Điều khoản và Điều kiện</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        {selectedContract.termsAndConditions}
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-end mt-6">
                                <button
                                    onClick={() => setSelectedContract(null)}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-xl transition-colors duration-200"
                                >
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TreatmentContractsViewer;