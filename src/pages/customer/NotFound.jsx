// src/pages/NotFound.jsx
import { Link } from "react-router-dom"
import { Syringe } from "phosphor-react";

export default function NotFound() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Icon báo lỗi với gradient */}
        

        <div>
          <img src="https://html.awaikenthemes.com/ferlix/images/404-error-img.png" alt="" />
        </div>
        
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
          Không tìm thấy trang
        </h2>

        {/* Mô tả lỗi */}
        <p className="text-lg text-gray-600 mb-8 max-w-md leading-relaxed">
          Trang bạn truy cập không tồn tại hoặc đã bị di chuyển.
        </p>

        {/* Nút quay về trang chủ với gradient */}
        <Link
          to="/"
          className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300/50"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300"></div>
          
          {/* Hover overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Button text */}
          <span className="relative flex items-center gap-2">
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Quay về trang chủ
          </span>
        </Link>

        {/* Decorative gradient line */}
        <div className="mt-12 w-32 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full"></div>
      </div>

      {/* Custom Styles for Animations */}
      <style jsx>{`
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  )
}