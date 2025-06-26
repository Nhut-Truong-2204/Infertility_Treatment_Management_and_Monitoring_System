import React, { useState, useEffect } from 'react';
import {
    Search,
    Filter,
    Calendar,
    Clock,
    User,
    FileText,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Beaker,
    AlertCircle,
    CheckCircle,
    XCircle,
    Eye,
    Download,
    RefreshCw
} from 'lucide-react';
import { Delete } from '@/components/ui/Delete';
const LabTestHistory = () => {
    const [labTestData, setLabTestData] = useState({
        content: [],
        pageable: {
            pageNumber: 0,
            pageSize: 10,
            sort: { empty: true, sorted: false, unsorted: true },
            offset: 0,
            paged: true,
            unpaged: false
        },
        last: true,
        totalElements: 0,
        totalPages: 0,
        first: true,
        size: 10,
        number: 0,
        sort: { empty: true, sorted: false, unsorted: true },
        numberOfElements: 0,
        empty: true
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    // Status options từ ảnh
    const statusOptions = [
        { value: '', label: 'Tất cả trạng thái' },
        { value: 'PendingSample', label: 'Chờ lấy mẫu' },
        { value: 'SampleCollected', label: 'Đã lấy mẫu' },
        { value: 'Processing', label: 'Đang xử lý' },
        { value: 'ResultsAvailable', label: 'Có kết quả' },
        { value: 'ReviewedByDoctor', label: 'Đã xem xét' }
    ];

    // Mock data để demo
    const mockData = {
        content: [
            {
                id: 1,
                testCode: 'LAB001',
                testName: 'Xét nghiệm máu tổng quát',
                orderDate: '2024-06-20T08:30:00',
                sampleDate: '2024-06-20T09:15:00',
                resultDate: '2024-06-21T14:30:00',
                status: 'ResultsAvailable',
                doctor: 'BS. Nguyễn Văn A',
                department: 'Khoa Nội Tổng Hợp',
                priority: 'Normal',
                tests: [
                    { name: 'Hemoglobin', value: '12.5', unit: 'g/dL', normal: '12.0-15.5' },
                    { name: 'WBC', value: '6.8', unit: '10³/μL', normal: '4.0-10.0' },
                    { name: 'Platelet', value: '280', unit: '10³/μL', normal: '150-450' }
                ],
                notes: 'Các chỉ số trong giới hạn bình thường'
            },
            {
                id: 2,
                testCode: 'LAB002',
                testName: 'Xét nghiệm sinh hóa máu',
                orderDate: '2024-06-18T10:00:00',
                sampleDate: '2024-06-18T10:30:00',
                resultDate: null,
                status: 'Processing',
                doctor: 'BS. Trần Thị B',
                department: 'Khoa Tim Mạch',
                priority: 'High',
                tests: [
                    { name: 'Glucose', value: null, unit: 'mg/dL', normal: '70-100' },
                    { name: 'Cholesterol', value: null, unit: 'mg/dL', normal: '<200' },
                    { name: 'Triglyceride', value: null, unit: 'mg/dL', normal: '<150' }
                ],
                notes: 'Đang xử lý kết quả'
            },
            {
                id: 3,
                testCode: 'LAB003',
                testName: 'Xét nghiệm chức năng gan',
                orderDate: '2024-06-15T14:20:00',
                sampleDate: '2024-06-16T08:00:00',
                resultDate: '2024-06-17T16:45:00',
                status: 'ReviewedByDoctor',
                doctor: 'BS. Lê Văn C',
                department: 'Khoa Tiêu Hóa',
                priority: 'Normal',
                tests: [
                    { name: 'ALT', value: '45', unit: 'U/L', normal: '7-56' },
                    { name: 'AST', value: '38', unit: 'U/L', normal: '10-40' },
                    { name: 'Bilirubin', value: '1.2', unit: 'mg/dL', normal: '0.3-1.2' }
                ],
                notes: 'Đã được bác sĩ xem xét và đánh giá'
            },
            {
                id: 4,
                testCode: 'LAB004',
                testName: 'Xét nghiệm nước tiểu',
                orderDate: '2024-06-14T09:30:00',
                sampleDate: null,
                resultDate: null,
                status: 'PendingSample',
                doctor: 'BS. Phạm Thị D',
                department: 'Khoa Thận - Tiết Niệu',
                priority: 'Normal',
                tests: [
                    { name: 'Protein', value: null, unit: 'mg/dL', normal: 'Negative' },
                    { name: 'Glucose', value: null, unit: 'mg/dL', normal: 'Negative' },
                    { name: 'WBC', value: null, unit: '/hpf', normal: '0-5' }
                ],
                notes: 'Chờ lấy mẫu'
            },
            {
                id: 5,
                testCode: 'LAB005',
                testName: 'Xét nghiệm hormone tuyến giáp',
                orderDate: '2024-06-12T11:15:00',
                sampleDate: '2024-06-12T11:45:00',
                resultDate: null,
                status: 'SampleCollected',
                doctor: 'BS. Hoàng Văn E',
                department: 'Khoa Nội Tiết',
                priority: 'High',
                tests: [
                    { name: 'TSH', value: null, unit: 'mIU/L', normal: '0.27-4.2' },
                    { name: 'T3', value: null, unit: 'ng/dL', normal: '80-200' },
                    { name: 'T4', value: null, unit: 'μg/dL', normal: '5.1-14.1' }
                ],
                notes: 'Đã lấy mẫu, chờ xử lý'
            }
        ],
        pageable: {
            pageNumber: 0,
            pageSize: 10,
            sort: { empty: true, sorted: false, unsorted: true },
            offset: 0,
            paged: true,
            unpaged: false
        },
        last: true,
        totalElements: 5,
        totalPages: 1,
        first: true,
        size: 10,
        number: 0,
        sort: { empty: true, sorted: false, unsorted: true },
        numberOfElements: 5,
        empty: false
    };

    useEffect(() => {
        fetchLabTestHistory();
    }, [currentPage, pageSize, statusFilter]);

    const fetchLabTestHistory = async () => {
        try {
            setLoading(true);
            // Thay thế bằng API call thực tế
            // const response = await fetch(`/api/customer/lab-test-orders?page=${currentPage}&size=${pageSize}&status=${statusFilter}`);
            // const result = await response.json();

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Filter mock data based on status
            let filteredContent = mockData.content;
            if (statusFilter) {
                filteredContent = mockData.content.filter(item => item.status === statusFilter);
            }

            setLabTestData({
                ...mockData,
                content: filteredContent,
                totalElements: filteredContent.length
            });
        } catch (err) {
            setError('Không thể tải dữ liệu lịch sử xét nghiệm');
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'PendingSample':
                return <Clock className="h-4 w-4 text-orange-500" />;
            case 'SampleCollected':
                return <CheckCircle className="h-4 w-4 text-blue-500" />;
            case 'Processing':
                return <RefreshCw className="h-4 w-4 text-yellow-500" />;
            case 'ResultsAvailable':
                return <FileText className="h-4 w-4 text-green-500" />;
            case 'ReviewedByDoctor':
                return <Eye className="h-4 w-4 text-purple-500" />;
            default:
                return <AlertCircle className="h-4 w-4 text-gray-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'PendingSample':
                return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'SampleCollected':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Processing':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'ResultsAvailable':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'ReviewedByDoctor':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'Medium':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Normal':
                return 'bg-green-100 text-green-800 border-green-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const formatDateTime = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const filteredData = labTestData.content.filter(item => {
        const matchesSearch = !searchTerm ||
            item.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.testCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.doctor.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesSearch;
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="animate-pulse space-y-6">
                            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="text-center py-12">
                            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Có lỗi xảy ra</h3>
                            <p className="text-gray-600">{error}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 mt-30">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <Beaker className="h-8 w-8 text-blue-600" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Lịch Sử Xét Nghiệm</h1>
                                <p className="text-gray-600">Theo dõi các đơn xét nghiệm và kết quả</p>
                            </div>
                        </div>
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2">
                            <RefreshCw className="h-5 w-5" />
                            <span>Làm mới</span>
                        </button>
                    </div>

                    {/* Filters */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm theo tên xét nghiệm, mã số, bác sĩ..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <select
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                {statusOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                        </div>

                        <div className="flex space-x-2">
                            <input
                                type="date"
                                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={dateRange.start}
                                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                            />
                            <input
                                type="date"
                                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={dateRange.end}
                                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
                            <div className="text-center">
                                <p className="text-blue-100 text-sm">Tổng số</p>
                                <p className="text-2xl font-bold">{labTestData.totalElements}</p>
                            </div>
                        </div>
                        {statusOptions.slice(1).map((status, index) => {
                            const count = labTestData.content.filter(item => item.status === status.value).length;
                            const colors = [
                                'from-orange-500 to-orange-600',
                                'from-blue-500 to-blue-600',
                                'from-yellow-500 to-yellow-600',
                                'from-green-500 to-green-600',
                                'from-purple-500 to-purple-600'
                            ];
                            return (
                                <div key={status.value} className={`bg-gradient-to-r ${colors[index]} rounded-xl p-4 text-white`}>
                                    <div className="text-center">
                                        <p className="text-white text-opacity-80 text-xs mb-1">{status.label}</p>
                                        <p className="text-xl font-bold">{count}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Lab Test List */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="space-y-4">
                        {filteredData.map((test) => (
                            <div key={test.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900">{test.testName}</h3>
                                            <span className="text-sm text-gray-500">#{test.testCode}</span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(test.status)} flex items-center space-x-1`}>
                                                {getStatusIcon(test.status)}
                                                <span>{test.status}</span>
                                            </span>
                                            <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getPriorityColor(test.priority)}`}>
                                                {test.priority}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <User className="h-4 w-4 mr-2" />
                                                <span>{test.doctor} - {test.department}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Calendar className="h-4 w-4 mr-2" />
                                                <span>Đặt: {formatDateTime(test.orderDate)}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className="h-4 w-4 mr-2" />
                                                <span>Lấy mẫu: {formatDateTime(test.sampleDate)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                                            <Eye className="w-5 h-5" />
                                        </button>
                                        
                                    </div>
                                </div>

                                {/* Test Results */}
                                {test.tests && test.tests.length > 0 && (
                                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                        <h4 className="font-medium text-gray-900 mb-3">Kết quả xét nghiệm</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {test.tests.map((result, index) => (
                                                <div key={index} className="bg-white p-3 rounded-lg border">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="font-medium text-gray-900">{result.name}</span>
                                                        <span className="text-sm text-gray-500">{result.unit}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-lg font-semibold text-blue-600">
                                                            {result.value || 'Chờ kết quả'}
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            Bình thường: {result.normal}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Notes */}
                                {test.notes && (
                                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                        <p className="text-sm text-blue-800">
                                            <strong>Ghi chú:</strong> {test.notes}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {labTestData.totalPages > 1 && (
                        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                            <div className="text-sm text-gray-600">
                                Hiển thị {labTestData.numberOfElements} trong tổng số {labTestData.totalElements} kết quả
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                                    disabled={labTestData.first}
                                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>
                                <span className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                                    {currentPage + 1}
                                </span>
                                <button
                                    onClick={() => setCurrentPage(Math.min(labTestData.totalPages - 1, currentPage + 1))}
                                    disabled={labTestData.last}
                                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LabTestHistory;