import { useEffect } from "react";
import { XCircle } from "lucide-react";

export default function PaymentFail() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/";
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <XCircle className="text-red-500 w-16 h-16 mb-4" />
      <h1 className="text-2xl font-bold text-red-600">Thanh toán thất bại!</h1>
      <p className="text-gray-600 mt-2">Bạn sẽ được chuyển về trang chủ sau vài giây...</p>
    </div>
  );
}
