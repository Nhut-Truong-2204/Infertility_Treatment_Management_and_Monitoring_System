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
import { Delete } from '@/components/ui/Delete'; // Giả sử path này đúng
import { getLabTestHistory, getLabTestOrderDetail } from '../../api/customer/LabTestApi'; // Import các hàm API mới

const LabTestHistory = () => {  
    // Khởi tạo state với cấu trúc dữ liệu mong đợi từ API (phân trang)
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
    const [searchTerm, setSearchTerm] = useState(''); // Có thể sử dụng cho tìm kiếm nội dung các trường
    const [statusFilter, setStatusFilter] = useState('');
    const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
    const [currentPage, setCurrentPage] = useState(0); // API backend dùng page bắt đầu từ 0
    const [pageSize, setPageSize] = useState(10); // Số lượng item mỗi trang
    const [selectedOrder, setSelectedOrder] = useState(null); // State để hiển thị chi tiết đơn hàng

    // Hàm gọi API để lấy lịch sử xét nghiệm
    const fetchLabTestOrders = async () => {
        setLoading(true);
        setError(null);
        try {
            // Gọi API với các tham số phân trang và lọc
            const apiResult = await getLabTestHistory(currentPage, pageSize, statusFilter);

            // Cấu trúc API trả về dữ liệu phân trang trực tiếp ở root (totalPages, content, v.v.)
            // Kiểm tra xem 'content' có tồn tại và là mảng không
            if (apiResult && Array.isArray(apiResult.content)) {
                // Chuyển đổi dữ liệu từ API sang định dạng mà component đang sử dụng
                // Cần lưu ý các trường bị thiếu trong JSON so với mockData cũ của bạn.
                // Các trường 'testCode', 'sampleDate', 'resultDate', 'doctor', 'department', 'priority', 'notes'
                // không có trong JSON bạn cung cấp. Bạn cần bổ sung chúng từ backend
                // hoặc đặt giá trị mặc định/N/A.
                const transformedContent = apiResult.content.map(order => {
                    const firstItem = order.items && order.items.length > 0 ? order.items[0] : null;

                    return {
                        id: order.labTestOrderId, // Map labTestOrderId -> id
                        orderDate: order.orderDate,
                        status: order.status,
                        statusDescription: order.statusDescription, // Trường mới từ API
                        // Các trường này không có trong JSON bạn cung cấp,
                        // bạn cần hỏi backend bổ sung hoặc xử lý phù hợp
                        testCode: firstItem ? `TEST-${order.labTestOrderId}` : 'N/A', // Giả định
                        testName: firstItem ? firstItem.serviceName : 'N/A', // Giả định: Tên xét nghiệm tổng quát
                        sampleDate: 'N/A', // Cần từ API
                        resultDate: 'N/A', // Cần từ API
                        doctor: 'N/A', // Cần từ API
                        department: 'N/A', // Cần từ API
                        priority: 'Normal', // Cần từ API
                        notes: firstItem ? firstItem.doctorComments : 'N/A', // Có thể dùng doctorComments
                        // Chuyển đổi 'items' thành 'tests'
                        tests: order.items.map(item => ({
                            name: item.serviceName,
                            value: item.resultValue,
                            unit: item.unit,
                            normal: item.referenceRange, // Map referenceRange -> normal
                            attachmentUrl: item.attachmentUrl // Thêm trường attachmentUrl
                        })) || []
                    };
                });

                setLabTestData({
                    content: transformedContent,
                    pageable: apiResult.pageable || labTestData.pageable, // Sử dụng pageable từ API hoặc mặc định
                    last: apiResult.last,
                    totalElements: apiResult.totalElements,
                    totalPages: apiResult.totalPages,
                    first: apiResult.first,
                    size: apiResult.size,
                    number: apiResult.number, // current page number from API
                    sort: apiResult.sort || labTestData.sort,
                    numberOfElements: apiResult.numberOfElements,
                    empty: apiResult.empty
                });
            } else {
                setError(apiResult.message || "Không có dữ liệu hợp lệ từ API.");
                setLabTestData(prev => ({ ...prev, content: [], totalElements: 0, totalPages: 0 }));
            }
        } catch (err) {
            console.error("❌ Error fetching lab test history:", err);
            setError("Có lỗi xảy ra khi tải lịch sử xét nghiệm. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    // Hàm để lấy chi tiết đơn hàng khi click vào
    const fetchOrderDetail = async (orderId) => {
        setLoading(true);
        setError(null);
        try {
            const detail = await getLabTestOrderDetail(orderId);
            // API chi tiết có thể trả về { success: true, data: {...} } hoặc trực tiếp object
            if (detail && detail.data) { // Nếu API trả về { data: {...} }
                 setSelectedOrder(detail.data);
            } else if (detail) { // Nếu API trả về trực tiếp object
                setSelectedOrder(detail);
            } else {
                setError("Không tìm thấy chi tiết đơn hàng.");
            }
        } catch (err) {
            console.error("❌ Error fetching order detail:", err);
            setError("Không thể tải chi tiết đơn hàng.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLabTestOrders(); // Tải dữ liệu khi component mount hoặc khi bộ lọc/trang thay đổi
    }, [currentPage, pageSize, statusFilter]); // Dependencies cho useEffect

    const handleSearch = () => {
        setCurrentPage(0); // Reset về trang đầu khi tìm kiếm mới
        fetchLabTestOrders();
    };

    const handleStatusFilterChange = (e) => {
        setStatusFilter(e.target.value);
        setCurrentPage(0); // Reset về trang đầu khi đổi bộ lọc
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleRowClick = (orderId) => {
        fetchOrderDetail(orderId);
    };

    const handleCloseDetail = () => {
        setSelectedOrder(null);
    };

    // Hàm render status icon dựa trên trạng thái
    const renderStatusIcon = (status) => {
        switch (status) {
            case 'COMPLETED': return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'PENDING': return <Clock className="h-5 w-5 text-yellow-500" />;
            case 'CANCELLED': return <XCircle className="h-5 w-5 text-red-500" />;
            case 'IN_PROGRESS': return <Beaker className="h-5 w-5 text-blue-500" />;
            default: return <AlertCircle className="h-5 w-5 text-gray-500" />;
        }
    };

    // Render component chi tiết đơn hàng (nếu có selectedOrder)
    const renderOrderDetail = () => {
        if (!selectedOrder) return null;

        return (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
                    <button
                        onClick={handleCloseDetail}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-3xl leading-none"
                    >
                        &times;
                    </button>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                        Chi tiết Đơn xét nghiệm #{selectedOrder.id}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mb-6">
                        <p><strong>Ngày đặt:</strong> {selectedOrder.orderDate}</p>
                        <p><strong>Trạng thái:</strong> {selectedOrder.status} ({selectedOrder.statusDescription})</p>
                        <p><strong>Mã xét nghiệm:</strong> {selectedOrder.testCode || 'N/A'}</p>
                        <p><strong>Tên xét nghiệm:</strong> {selectedOrder.testName || 'N/A'}</p>
                        <p><strong>Ngày lấy mẫu:</strong> {selectedOrder.sampleDate || 'N/A'}</p>
                        <p><strong>Ngày trả kết quả:</strong> {selectedOrder.resultDate || 'N/A'}</p>
                        <p><strong>Bác sĩ:</strong> {selectedOrder.doctor || 'N/A'}</p>
                        <p><strong>Khoa:</strong> {selectedOrder.department || 'N/A'}</p>
                        <p><strong>Ưu tiên:</strong> {selectedOrder.priority || 'N/A'}</p>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">Các hạng mục xét nghiệm</h3>
                    {selectedOrder.tests && selectedOrder.tests.length > 0 ? (
                        <div className="space-y-4">
                            {selectedOrder.tests.map((test, index) => (
                                <div key={index} className="bg-gray-50 p-4 rounded-md border border-gray-200">
                                    <p className="font-semibold text-blue-700">{test.name}</p>
                                    <p><strong>Kết quả:</strong> {test.value} {test.unit}</p>
                                    <p><strong>Khoảng tham chiếu:</strong> {test.normal}</p>
                                    {test.attachmentUrl && (
                                        <p><strong>Tệp đính kèm:</strong> <a href={test.attachmentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Xem tệp</a></p>
                                    )}
                                    {test.notes && <p><strong>Ghi chú:</strong> {test.notes}</p>}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600">Không có hạng mục xét nghiệm nào.</p>
                    )}
                    {selectedOrder.notes && ( // Đây là notes tổng quát cho cả đơn, nếu có
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                            <strong>Ghi chú đơn hàng:</strong> {selectedOrder.notes}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="container mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Lịch sử Xét nghiệm</h1>

                {/* Thanh tìm kiếm và bộ lọc */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }}
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                    <select
                        className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        value={statusFilter}
                        onChange={handleStatusFilterChange}
                    >
                        <option value="">Tất cả trạng thái</option>
                        <option value="PENDING">Đang chờ</option>
                        <option value="IN_PROGRESS">Đang thực hiện</option>
                        <option value="COMPLETED">Hoàn thành</option>
                        <option value="CANCELLED">Đã hủy</option>
                    </select>
                    {/* Nút tìm kiếm (nếu cần, có thể bỏ qua nếu dùng onKeyPress) */}
                    {/* <button onClick={handleSearch} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Tìm kiếm</button> */}
                </div>

                {loading && <p className="text-center text-blue-600 text-lg">Đang tải dữ liệu...</p>}
                {error && <p className="text-center text-red-600 text-lg">{error}</p>}

                {!loading && !error && labTestData.content.length === 0 && (
                    <p className="text-center text-gray-600 text-lg">Không tìm thấy lịch sử xét nghiệm nào.</p>
                )}

                {/* Bảng hiển thị lịch sử xét nghiệm */}
                {!loading && !error && labTestData.content.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                            <thead>
                                <tr className="bg-gray-50 text-left text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-center">ID Đơn</th>
                                    <th className="py-3 px-6">Tên xét nghiệm</th>
                                    <th className="py-3 px-6">Ngày đặt</th>
                                    <th className="py-3 px-6">Trạng thái</th>
                                    <th className="py-3 px-6 text-center">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700 text-sm">
                                {labTestData.content.map((order) => (
                                    <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-center font-medium">{order.id}</td>
                                        <td className="py-3 px-6">{order.testName}</td>
                                        <td className="py-3 px-6">{order.orderDate}</td>
                                        <td className="py-3 px-6 flex items-center gap-2">
                                            {renderStatusIcon(order.status)}
                                            <span>{order.statusDescription}</span>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <button
                                                onClick={() => handleRowClick(order.id)}
                                                className="text-blue-600 hover:text-blue-900 mx-2"
                                                title="Xem chi tiết"
                                            >
                                                <Eye className="h-5 w-5" />
                                            </button>
                                            {/* Ví dụ nút xóa, nếu có */}
                                            {/* <Delete id={order.id} onDelete={() => console.log('Delete', order.id)} /> */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Phân trang */}
                {!loading && !error && labTestData.totalPages > 1 && (
                    <div className="flex justify-between items-center mt-6">
                        <p className="text-gray-600">
                            Hiển thị {labTestData.numberOfElements} trong tổng số {labTestData.totalElements} kết quả
                        </p>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={labTestData.first}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            {/* Hiển thị các nút số trang */}
                            {[...Array(labTestData.totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(index)}
                                    className={`px-4 py-2 rounded-lg ${
                                        currentPage === index ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={labTestData.last}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {renderOrderDetail()}
        </div>
    );
};

export default LabTestHistory;