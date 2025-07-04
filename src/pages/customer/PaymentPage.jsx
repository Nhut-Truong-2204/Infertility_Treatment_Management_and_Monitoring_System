import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "../../components/ui/card";
import { Button } from "../../components/ui/Button";
import instance from "@/config/axios";
import toast from "react-hot-toast";

const PaymentPage = () => {
  const [activeTab, setActiveTab] = useState("contracts");
  const [selectedContract, setSelectedContract] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [contracts, setContracts] = useState([]);
  // Mock data - sẽ được thay thế bằng API calls
  useEffect(() => {
    async function fetchContracts() {
      try {
        const response = await instance.get("/api/customer/treatment-contracts")
        // Axios: dữ liệu nằm trong response.data
        setContracts(response.data || [])
      } catch (error) {
        toast.error("Lỗi khi tải hợp đồng: " + error.message)
      }
    }

    fetchContracts()
  }, [])


  const transactions = [
    {
      id: 1,
      date: "2024-06-15",
      amount: 20000000,
      method: "Chuyển khoản",
      status: "completed",
      description: "Thanh toán đợt 1 - Điều trị IVF",
      invoiceNumber: "INV-2024-001"
    },
    {
      id: 2,
      date: "2024-11-15",
      amount: 15000000,
      method: "Tiền mặt",
      status: "completed",
      description: "Tư vấn và Khám tổng quát",
      invoiceNumber: "INV-2024-002"
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const handlePayment = async (contractId) => {
    try {
      const response = await instance.get("/api/payment/payos-link", {
        params: {
          contractId,
        },
      });

      console.log("Response data:", response.data);

      const paymentUrl = response.data.payosUrl;

      if (paymentUrl) {
        console.log("Redirecting to:", paymentUrl);
        window.location.href = paymentUrl; // ⬅️ chuyển hướng sang PayOS
      } else {
        alert("Không tìm thấy link thanh toán trong response");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API thanh toán:", error);
      alert("Có lỗi xảy ra khi tạo link thanh toán!");
    }
  };

  const processPayment = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setShowPaymentModal(false);
    // Redirect to payment gateway or show success message
  };

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  const tabs = [
    { id: "contracts", label: "Hợp đồng của tôi", icon: "📋" },
    { id: "transactions", label: "Lịch sử Giao dịch", icon: "📊" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-white pt-30 pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-blue-900 mb-5">
            Quản lý Thanh toán
          </h1>
          <p className="text-gray-600 text-lg">
            Theo dõi hợp đồng và lịch sử thanh toán của bạn
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white rounded-lg p-1 shadow-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "contracts" && (
            <motion.div
              key="contracts"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {contracts.map((contract) => (
                <motion.div
                  key={contract.treatmentContractId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-600">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl text-blue-900">
                            Số hợp đồng: {contract.contractNumber}
                          </CardTitle>

                        </div>
                        <div className="text-right">
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${contract.status === "SIGNED"
                            ? "bg-green-100 text-green-800"
                            : contract.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                            }`}>
                            {{
                              PENDING: "Chờ xác nhận",
                              SIGNED: "Chờ thanh toán",
                              ACTIVE: "Đang thực hiện",
                              COMPLETED: "Hoàn thành"
                            }[contract.status] || "Không rõ"}
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-900">
                            {formatCurrency(contract.totalValue)}
                          </div>
                          <div className="text-sm text-gray-600">Tổng giá trị</div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-800">Thông tin thanh toán:</h4>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium">
                              Số tiền cần thanh toán: {formatCurrency(contract.totalValue)}
                            </div>
                            <div className="text-sm text-gray-600">
                              Trạng thái:{" "}
                              <span className={`font-semibold ${contract.status === "PENDING"
                                ? "text-yellow-700"
                                : "text-green-700"
                                }`}>
                                {contract.status === "SIGNED" ? "Đã ký" : "Chưa ký"}
                              </span>
                            </div>
                          </div>

                          {contract.status === "SIGNED" ? (
                            <Button
                              onClick={() => handlePayment(contract.treatmentContractId)}
                              className="bg-green-400 text-green6100 hover:bg-green-700"
                            >
                              Thanh toán
                            </Button>
                          ) : <>
                            <span className="text-red-600">Bạn phải ký hợp đồng mới được thanh toán</span>
                          </>}
                        </div>
                      </div>

                    </CardContent>
                  </Card>
                </motion.div>
              ))}

            </motion.div>
          )}

          {activeTab === "transactions" && (
            <motion.div
              key="transactions"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {transactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg text-gray-800">
                              {transaction.description}
                            </h3>
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                              {transaction.status === 'completed' ? 'Hoàn thành' : 'Đang xử lý'}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div>Mã hóa đơn: {transaction.invoiceNumber}</div>
                            <div>Ngày giao dịch: {formatDate(transaction.date)}</div>
                            <div>Phương thức: {transaction.method}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-900">
                            {formatCurrency(transaction.amount)}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={() => {
                              setSelectedTransaction(transaction);
                              setShowTransactionModal(true);
                            }}
                          >
                            Xem chi tiết
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={() => setShowPaymentModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-blue-900 mb-4">
                Thanh toán Online
              </h3>

              {selectedContract && (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-sm text-gray-600">Số tiền cần thanh toán:</div>
                    <div className="text-2xl font-bold text-blue-900">
                      {formatCurrency(selectedContract.remainingAmount)}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chọn phương thức thanh toán:
                    </label>
                    <div className="space-y-2">
                      {[
                        { id: "banking", label: "Chuyển khoản ngân hàng", icon: "🏦" },
                        { id: "momo", label: "Ví MoMo", icon: "💜" },
                        { id: "vnpay", label: "VNPay", icon: "💳" },
                        { id: "zalopay", label: "ZaloPay", icon: "💙" }
                      ].map((method) => (
                        <label
                          key={method.id}
                          className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.id}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="mr-3"
                          />
                          <span className="mr-2">{method.icon}</span>
                          {method.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowPaymentModal(false)}
                      className="flex-1"
                    >
                      Hủy
                    </Button>
                    <Button
                      onClick={processPayment}
                      disabled={!paymentMethod || isProcessing}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      {isProcessing ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Đang xử lý...
                        </div>
                      ) : (
                        "Tiến hành thanh toán"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Transaction Detail Modal */}
      <AnimatePresence>
        {showTransactionModal && selectedTransaction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={() => setShowTransactionModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-blue-900 mb-4">
                Chi tiết giao dịch
              </h3>
              <div className="space-y-2">
                <div><b>Mã hóa đơn:</b> {selectedTransaction.invoiceNumber}</div>
                <div><b>Ngày giao dịch:</b> {formatDate(selectedTransaction.date)}</div>
                <div><b>Số tiền:</b> {formatCurrency(selectedTransaction.amount)}</div>
                <div><b>Phương thức:</b> {selectedTransaction.method}</div>
                <div><b>Trạng thái:</b> {selectedTransaction.status === 'completed' ? 'Hoàn thành' : 'Đang xử lý'}</div>
                <div><b>Mô tả:</b> {selectedTransaction.description}</div>
              </div>
              <div className="flex justify-end pt-4">
                <Button variant="outline" onClick={() => setShowTransactionModal(false)}>
                  Đóng
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentPage;