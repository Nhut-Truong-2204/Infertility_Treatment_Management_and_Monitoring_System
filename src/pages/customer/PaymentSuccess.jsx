import React from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "../../components/ui";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 font-onest">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full flex flex-col items-center border border-green-100">
        <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
        <h1 className="text-2xl font-bold text-green-700 mb-2">
          Thanh toán thành công!
        </h1>
        <p className="text-gray-700 mb-6 text-center">
          Cảm ơn bạn đã thanh toán. Giao dịch của bạn đã được xác nhận.
          <br />
          Nếu có thắc mắc, vui lòng liên hệ phòng khám để được hỗ trợ.
        </p>
        <Button
          onClick={() => navigate("/customer/appointments")}
          className="w-full mb-2"
          variant="success"
        >
          Xem lịch hẹn
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

export default PaymentSuccess;
