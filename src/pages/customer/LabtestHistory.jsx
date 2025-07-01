import React, { useState, useEffect } from "react";
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
  RefreshCw,
  Activity,
  TestTube,
  Calendar as CalendarIcon,
  FileCheck,
  Loader2,
  X,
  ChevronUp,
  TrendingUp,
  Users,
  Clock3,
  AlertTriangle,
} from "lucide-react";

// Mock API function for demo purposes
const getLabTestHistory = async (page = 0, size = 10, statusFilter = "") => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Mock data
  const mockData = {
    content: [
      {
        labTestOrderId: 1001,
        orderDate: "2024-12-15",
        status: "COMPLETED",
        statusDescription: "Hoàn thành",
        items: [
          {
            serviceName: "Xét nghiệm máu tổng quát",
            resultValue: "Normal",
            unit: "",
            referenceRange: "Bình thường",
            doctorComments: "Kết quả trong giới hạn bình thường",
            attachmentUrl: "#",
          },
        ],
      },
      {
        labTestOrderId: 1002,
        orderDate: "2024-12-10",
        status: "PENDING",
        statusDescription: "Đang chờ xử lý",
        items: [
          {
            serviceName: "Xét nghiệm nước tiểu",
            resultValue: "Pending",
            unit: "",
            referenceRange: "Chờ kết quả",
            doctorComments: "Đang xử lý mẫu",
            attachmentUrl: null,
          },
        ],
      },
      {
        labTestOrderId: 1003,
        orderDate: "2024-12-08",
        status: "IN_PROGRESS",
        statusDescription: "Đang thực hiện",
        items: [
          {
            serviceName: "Xét nghiệm sinh hóa",
            resultValue: "In Progress",
            unit: "",
            referenceRange: "Đang xử lý",
            doctorComments: "Mẫu đang được phân tích",
            attachmentUrl: null,
          },
        ],
      },
    ],
    pageable: {
      pageNumber: page,
      pageSize: size,
    },
    last: true,
    totalElements: 3,
    totalPages: 1,
    first: true,
    size: size,
    number: page,
    numberOfElements: 3,
    empty: false,
  };

  return mockData;
};

const getLabTestOrderDetail = async (orderId) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    id: orderId,
    orderDate: "2024-12-15",
    status: "COMPLETED",
    statusDescription: "Hoàn thành",
    testCode: `TEST-${orderId}`,
    testName: "Xét nghiệm máu tổng quát",
    sampleDate: "2024-12-15",
    resultDate: "2024-12-16",
    doctor: "Dr. Nguyễn Văn A",
    department: "Huyết học",
    priority: "Normal",
    notes: "Kết quả xét nghiệm bình thường",
    tests: [
      {
        name: "Hemoglobin (Hb)",
        value: "14.2",
        unit: "g/dL",
        normal: "13.5-17.5 g/dL",
        attachmentUrl: "#",
      },
      {
        name: "White Blood Cells (WBC)",
        value: "7.5",
        unit: "×10³/μL",
        normal: "4.0-11.0 ×10³/μL",
        attachmentUrl: null,
      },
    ],
  };
};

const LabTestHistory = () => {
  const [labTestData, setLabTestData] = useState({
    content: [],
    pageable: {
      pageNumber: 0,
      pageSize: 10,
      sort: { empty: true, sorted: false, unsorted: true },
      offset: 0,
      paged: true,
      unpaged: false,
    },
    last: true,
    totalElements: 0,
    totalPages: 0,
    first: true,
    size: 10,
    number: 0,
    sort: { empty: true, sorted: false, unsorted: true },
    numberOfElements: 0,
    empty: true,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Stats for dashboard
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    inProgress: 0,
  });

  const fetchLabTestOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiResult = await getLabTestHistory(
        currentPage,
        pageSize,
        statusFilter
      );

      if (apiResult && Array.isArray(apiResult.content)) {
        const transformedContent = apiResult.content.map((order) => {
          const firstItem =
            order.items && order.items.length > 0 ? order.items[0] : null;

          return {
            id: order.labTestOrderId,
            orderDate: order.orderDate,
            status: order.status,
            statusDescription: order.statusDescription,
            testCode: firstItem ? `TEST-${order.labTestOrderId}` : "N/A",
            testName: firstItem ? firstItem.serviceName : "N/A",
            sampleDate: "N/A",
            resultDate: "N/A",
            doctor: "N/A",
            department: "N/A",
            priority: "Normal",
            notes: firstItem ? firstItem.doctorComments : "N/A",
            tests:
              order.items.map((item) => ({
                name: item.serviceName,
                value: item.resultValue,
                unit: item.unit,
                normal: item.referenceRange,
                attachmentUrl: item.attachmentUrl,
              })) || [],
          };
        });

        // Calculate stats
        const newStats = {
          total: apiResult.totalElements,
          completed: transformedContent.filter(
            (item) => item.status === "COMPLETED"
          ).length,
          pending: transformedContent.filter(
            (item) => item.status === "PENDING"
          ).length,
          inProgress: transformedContent.filter(
            (item) => item.status === "IN_PROGRESS"
          ).length,
        };
        setStats(newStats);

        setLabTestData({
          content: transformedContent,
          pageable: apiResult.pageable || labTestData.pageable,
          last: apiResult.last,
          totalElements: apiResult.totalElements,
          totalPages: apiResult.totalPages,
          first: apiResult.first,
          size: apiResult.size,
          number: apiResult.number,
          sort: apiResult.sort || labTestData.sort,
          numberOfElements: apiResult.numberOfElements,
          empty: apiResult.empty,
        });
      } else {
        setError(apiResult.message || "Không có dữ liệu hợp lệ từ API.");
        setLabTestData((prev) => ({
          ...prev,
          content: [],
          totalElements: 0,
          totalPages: 0,
        }));
      }
    } catch (err) {
      console.error("❌ Error fetching lab test history:", err);
      setError("Có lỗi xảy ra khi tải lịch sử xét nghiệm. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderDetail = async (orderId) => {
    setLoading(true);
    setError(null);
    try {
      const detail = await getLabTestOrderDetail(orderId);
      if (detail && detail.data) {
        setSelectedOrder(detail.data);
      } else if (detail) {
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
    fetchLabTestOrders();
  }, [currentPage, pageSize, statusFilter]);

  const handleSearch = () => {
    setCurrentPage(0);
    fetchLabTestOrders();
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(0);
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

  const renderStatusIcon = (status) => {
    switch (status) {
      case "COMPLETED":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "PENDING":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "CANCELLED":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "IN_PROGRESS":
        return <Beaker className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status, statusDescription) => {
    const statusConfig = {
      COMPLETED: "bg-green-100 text-green-800 border-green-200",
      PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
      IN_PROGRESS: "bg-blue-100 text-blue-800 border-blue-200",
      CANCELLED: "bg-red-100 text-red-800 border-red-200",
    };

    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${
          statusConfig[status] || "bg-gray-100 text-gray-800 border-gray-200"
        }`}
      >
        {renderStatusIcon(status)}
        {statusDescription}
      </span>
    );
  };

  const StatCard = ({ title, value, icon: Icon, color, bgColor }) => (
    <div
      className={`${bgColor} p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
        <div
          className={`p-3 rounded-lg ${color
            .replace("text", "bg")
            .replace("-600", "-100")}`}
        >
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>
    </div>
  );

  const renderOrderDetail = () => {
    if (!selectedOrder) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                  <TestTube className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Chi tiết Đơn xét nghiệm</h2>
                  <p className="text-blue-100">#{selectedOrder.id}</p>
                </div>
              </div>
              <button
                onClick={handleCloseDetail}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {/* Status and Basic Info */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                {getStatusBadge(
                  selectedOrder.status,
                  selectedOrder.statusDescription
                )}
                <span className="text-sm text-gray-500">
                  Cập nhật lần cuối: {selectedOrder.orderDate}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-600">
                      Ngày đặt
                    </span>
                  </div>
                  <p className="font-semibold">{selectedOrder.orderDate}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-600">
                      Bác sĩ
                    </span>
                  </div>
                  <p className="font-semibold">
                    {selectedOrder.doctor || "N/A"}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-600">
                      Khoa
                    </span>
                  </div>
                  <p className="font-semibold">
                    {selectedOrder.department || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Test Information */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-blue-600" />
                Thông tin xét nghiệm
              </h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Mã xét nghiệm</p>
                    <p className="font-semibold">
                      {selectedOrder.testCode || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tên xét nghiệm</p>
                    <p className="font-semibold">
                      {selectedOrder.testName || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Ngày lấy mẫu</p>
                    <p className="font-semibold">
                      {selectedOrder.sampleDate || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Ngày trả kết quả</p>
                    <p className="font-semibold">
                      {selectedOrder.resultDate || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Test Results */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Kết quả xét nghiệm
              </h3>
              {selectedOrder.tests && selectedOrder.tests.length > 0 ? (
                <div className="space-y-4">
                  {selectedOrder.tests.map((test, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-blue-700 flex items-center gap-2">
                          <TestTube className="h-4 w-4" />
                          {test.name}
                        </h4>
                        {test.attachmentUrl && (
                          <a
                            href={test.attachmentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium"
                          >
                            <Download className="h-4 w-4" />
                            Tải xuống
                          </a>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">Kết quả</p>
                          <p className="font-bold text-green-700">
                            {test.value} {test.unit}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-600 mb-1">
                            Khoảng tham chiếu
                          </p>
                          <p className="font-medium">{test.normal}</p>
                        </div>
                      </div>
                      {test.notes && (
                        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-sm">
                            <strong className="text-yellow-800">
                              Ghi chú:
                            </strong>{" "}
                            {test.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">
                    Không có kết quả xét nghiệm nào.
                  </p>
                </div>
              )}
            </div>

            {/* General Notes */}
            {selectedOrder.notes && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Ghi chú đơn hàng
                </h4>
                <p className="text-blue-700">{selectedOrder.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading && labTestData.content.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-600 rounded-xl">
                <TestTube className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Lịch sử Xét nghiệm
                </h1>
                <p className="text-gray-600">
                  Quản lý và theo dõi các đơn xét nghiệm của bạn
                </p>
              </div>
            </div>
            <button
              onClick={fetchLabTestOrders}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              disabled={loading}
            >
              <RefreshCw
                className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
              />
              Làm mới
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <StatCard
              title="Tổng số đơn"
              value={stats.total}
              icon={FileText}
              color="text-blue-600"
              bgColor="bg-white"
            />
            <StatCard
              title="Hoàn thành"
              value={stats.completed}
              icon={CheckCircle}
              color="text-green-600"
              bgColor="bg-white"
            />
            <StatCard
              title="Đang chờ"
              value={stats.pending}
              icon={Clock3}
              color="text-yellow-600"
              bgColor="bg-white"
            />
            <StatCard
              title="Đang thực hiện"
              value={stats.inProgress}
              icon={Activity}
              color="text-blue-600"
              bgColor="bg-white"
            />
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên xét nghiệm, mã đơn..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>

            <div className="flex gap-3">
              <select
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[180px]"
                value={statusFilter}
                onChange={handleStatusFilterChange}
              >
                <option value="">Tất cả trạng thái</option>
                <option value="PENDING">Đang chờ</option>
                <option value="IN_PROGRESS">Đang thực hiện</option>
                <option value="COMPLETED">Hoàn thành</option>
                <option value="CANCELLED">Đã hủy</option>
              </select>

              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Bộ lọc
                {isFilterOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {!loading && !error && labTestData.content.length === 0 ? (
            <div className="text-center py-16">
              <TestTube className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Không có dữ liệu
              </h3>
              <p className="text-gray-500">
                Không tìm thấy lịch sử xét nghiệm nào.
              </p>
            </div>
          ) : (
            <>
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Đơn hàng
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Xét nghiệm
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ngày đặt
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trạng thái
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {labTestData.content.map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <FileText className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">
                                #{order.id}
                              </p>
                              <p className="text-sm text-gray-500">
                                {order.testCode}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-900">
                            {order.testName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {order.tests.length} hạng mục
                          </p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-900">
                              {order.orderDate}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(
                            order.status,
                            order.statusDescription
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button
                            onClick={() => handleRowClick(order.id)}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors gap-1"
                          >
                            <Eye className="h-4 w-4" />
                            Xem chi tiết
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {labTestData.totalPages > 1 && (
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <span>Hiển thị</span>
                      <select
                        value={pageSize}
                        onChange={(e) => setPageSize(parseInt(e.target.value))}
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                      </select>
                      <span>
                        trong tổng số {labTestData.totalElements} kết quả
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={labTestData.first}
                        className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>

                      <div className="flex items-center gap-1">
                        {[...Array(Math.min(labTestData.totalPages, 5))].map(
                          (_, index) => {
                            let pageNum;
                            if (labTestData.totalPages <= 5) {
                              pageNum = index;
                            } else if (currentPage < 3) {
                              pageNum = index;
                            } else if (
                              currentPage >
                              labTestData.totalPages - 4
                            ) {
                              pageNum = labTestData.totalPages - 5 + index;
                            } else {
                              pageNum = currentPage - 2 + index;
                            }

                            return (
                              <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                                  currentPage === pageNum
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-600 hover:bg-gray-200"
                                }`}
                              >
                                {pageNum + 1}
                              </button>
                            );
                          }
                        )}
                      </div>

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={labTestData.last}
                        className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      {renderOrderDetail()}
    </div>
  );
};

export default LabTestHistory;
