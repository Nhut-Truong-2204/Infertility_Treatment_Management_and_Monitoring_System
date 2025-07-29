import React, { useEffect, useState } from "react";
import {
  FileText,
  Calendar,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Filter,
  RefreshCw,
} from "lucide-react";
import { MEDICAL_COLORS } from "../../styles/medicalTheme";
import { Loading, MedicalAlert, Button } from "../../components/ui";
import useInvoices from "../../hooks/useInvoices";

const formatCurrency = (amount) => {
  if (!amount) return "0 VNĐ";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const InvoiceList = () => {
  const [filters, setFilters] = useState({ page: 0, size: 10 });
  const { data, loading, error, fetchInvoices } = useInvoices();

  useEffect(() => {
    fetchInvoices(filters);
    // eslint-disable-next-line
  }, [filters]);

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };
  const handleSizeChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      size: parseInt(e.target.value),
      page: 0,
    }));
  };
  const handleRefresh = () => {
    fetchInvoices(filters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 font-onest">
      <div className="container mx-auto px-4 max-w-7xl py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: MEDICAL_COLORS.primary[500] }}
            >
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1
                className="text-3xl font-bold"
                style={{ color: MEDICAL_COLORS.primary[700] }}
              >
                Hóa đơn của tôi
              </h1>
              <p className="text-gray-600 mt-1">
                Quản lý và theo dõi các hóa đơn thanh toán
              </p>
            </div>
          </div>
        </div>

        {/* Error/Loading */}
        {loading && (
          <Loading
            size="large"
            variant="medical"
            text="Đang tải danh sách hóa đơn..."
            subText="Vui lòng đợi trong giây lát"
            fullScreen
          />
        )}
        {error && (
          <div className="mb-6">
            <MedicalAlert type="error" title="Có lỗi xảy ra" message={error}>
              <div className="mt-4">
                <Button
                  variant="medical"
                  onClick={handleRefresh}
                  className="w-full"
                >
                  <RefreshCw className="w-4 h-4 mr-2" /> Thử lại
                </Button>
              </div>
            </MedicalAlert>
          </div>
        )}

        {/* Table */}
        {!loading && !error && data && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Mã hóa đơn
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Ngày phát hành
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Ngày đến hạn
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Tổng tiền
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Chi tiết
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {data.content.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">
                      Không có hóa đơn nào.
                    </td>
                  </tr>
                ) : (
                  data.content.map((invoice) => (
                    <tr
                      key={invoice.invoiceId}
                      className="hover:bg-blue-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-semibold text-blue-900">
                        {invoice.invoiceNumber}
                      </td>
                      <td className="px-6 py-4">{invoice.issueDate}</td>
                      <td className="px-6 py-4">{invoice.dueDate}</td>
                      <td className="px-6 py-4 text-right text-green-700 font-bold">
                        {formatCurrency(
                          invoice.items?.reduce(
                            (sum, i) => sum + i.totalPrice,
                            0
                          )
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium border border-blue-200 bg-blue-50 text-blue-700">
                          {invoice.status === "ISSUED"
                            ? "Đã phát hành"
                            : invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {/* <Button variant="info" size="sm" onClick={() => {}}>Xem</Button> */}
                        <span className="text-blue-600 cursor-pointer hover:underline">
                          Xem
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  Hiển thị {data.number * data.size + 1} -{" "}
                  {Math.min((data.number + 1) * data.size, data.totalElements)}{" "}
                  trong {data.totalElements} hóa đơn
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50"
                  onClick={() => handlePageChange(Math.max(0, data.number - 1))}
                  disabled={data.first}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm">
                  {data.number + 1} / {data.totalPages}
                </span>
                <button
                  className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50"
                  onClick={() =>
                    handlePageChange(
                      Math.min(data.totalPages - 1, data.number + 1)
                    )
                  }
                  disabled={data.last}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <select
                  className="ml-4 px-2 py-1 rounded border border-gray-300 bg-white text-sm"
                  value={filters.size}
                  onChange={handleSizeChange}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceList;
