// src/pages/NotFound.jsx
import { Link } from "react-router-dom"
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-6 py-12 text-center">
      {/* Icon báo lỗi */}
      <ExclamationTriangleIcon className="w-24 h-24 text-red-500 mb-6" />

      {/* Tiêu đề lỗi */}
      <h1 className="text-4xl font-bold text-gray-800 mb-2">404 - Không tìm thấy trang</h1>

      {/* Mô tả lỗi */}
      <p className="text-lg text-gray-600 mb-6">
        Trang bạn truy cập không tồn tại hoặc đã bị di chuyển.
      </p>

      {/* Nút quay về trang chủ */}
      <Link
        to="/"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow transition"
      >
        Quay về trang chủ
      </Link>
    </div>
  )
}
