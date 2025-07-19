import React from "react";
import { XCircle } from "lucide-react";
import { Button } from "../../components/ui";
import { useNavigate } from "react-router-dom";

const PaymentCancel = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 via-white to-blue-50 font-onest">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full flex flex-col items-center border border-red-100">
        <XCircle className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-red-700 mb-2">
          Thanh toán bị hủy
        </h1>
        <p className="text-gray-700 mb-6 text-center">
          Giao dịch của bạn đã bị hủy hoặc không thành công.
          <br />
          Nếu cần hỗ trợ, vui lòng liên hệ phòng khám.
        </p>
        <Button
          onClick={() => navigate("/customer/appointments")}
          className="w-full mb-2"
          variant="outline"
        >
          Quay lại lịch hẹn
        </Button>
        <Button
          onClick={() => navigate("/customer/treatment-contracts")}
          className="w-full"
          variant="primary"
        >
          Xem hợp đồng điều trị
        </Button>
      </div>
    </div>
  );
};

export default PaymentCancel;
