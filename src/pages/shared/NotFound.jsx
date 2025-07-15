import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import {
  MEDICAL_COLORS,
  MEDICAL_GRADIENTS,
  MEDICAL_SHADOWS,
} from "../../styles/medicalTheme";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{
        background: MEDICAL_GRADIENTS.gentle,
      }}
    >
      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* 404 Number */}
        <div className="relative mb-8">
          <h1
            className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text leading-none"
            style={{
              backgroundImage: `linear-gradient(135deg, ${MEDICAL_COLORS.primary[500]} 0%, ${MEDICAL_COLORS.accent[500]} 100%)`,
            }}
          >
            404
          </h1>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div
              className="w-32 h-32 md:w-40 md:h-40 backdrop-blur-sm rounded-full border flex items-center justify-center"
              style={{
                backgroundColor: `${MEDICAL_COLORS.gray[50]}80`,
                borderColor: `${MEDICAL_COLORS.primary[200]}80`,
                boxShadow: MEDICAL_SHADOWS.soft,
              }}
            >
              <svg
                className="w-16 h-16 md:w-20 md:h-20"
                style={{ color: MEDICAL_COLORS.primary[500] }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: MEDICAL_COLORS.primary[700] }}
          >
            Trang không tìm thấy
          </h2>
          <p
            className="text-lg max-w-md mx-auto leading-relaxed"
            style={{ color: MEDICAL_COLORS.gray[600] }}
          >
            Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được chuyển
            đến một địa chỉ khác. Hãy thử các liên kết bên dưới để tiếp tục.
          </p>
        </div>

        {/* Suggestions */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <Link
              to="/"
              className="p-4 backdrop-blur-sm rounded-lg border transition-all duration-300 group hover:scale-105"
              style={{
                backgroundColor: `${MEDICAL_COLORS.gray[50]}90`,
                borderColor: MEDICAL_COLORS.primary[200],
                boxShadow: MEDICAL_SHADOWS.soft,
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = `${MEDICAL_COLORS.primary[50]}90`;
                e.target.style.boxShadow = MEDICAL_SHADOWS.medium;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = `${MEDICAL_COLORS.gray[50]}90`;
                e.target.style.boxShadow = MEDICAL_SHADOWS.soft;
              }}
            >
              <div
                className="mb-2"
                style={{ color: MEDICAL_COLORS.primary[500] }}
              >
                <svg
                  className="w-8 h-8 mx-auto group-hover:scale-110 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <h3
                className="font-semibold"
                style={{ color: MEDICAL_COLORS.primary[700] }}
              >
                Trang chủ
              </h3>
              <p
                className="text-sm"
                style={{ color: MEDICAL_COLORS.gray[600] }}
              >
                Quay về trang chủ
              </p>
            </Link>

            <Link
              to="/services"
              className="p-4 backdrop-blur-sm rounded-lg border transition-all duration-300 group hover:scale-105"
              style={{
                backgroundColor: `${MEDICAL_COLORS.gray[50]}90`,
                borderColor: MEDICAL_COLORS.accent[200],
                boxShadow: MEDICAL_SHADOWS.soft,
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = `${MEDICAL_COLORS.accent[50]}90`;
                e.target.style.boxShadow = MEDICAL_SHADOWS.medium;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = `${MEDICAL_COLORS.gray[50]}90`;
                e.target.style.boxShadow = MEDICAL_SHADOWS.soft;
              }}
            >
              <div
                className="mb-2"
                style={{ color: MEDICAL_COLORS.accent[500] }}
              >
                <svg
                  className="w-8 h-8 mx-auto group-hover:scale-110 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3
                className="font-semibold"
                style={{ color: MEDICAL_COLORS.primary[700] }}
              >
                Dịch vụ
              </h3>
              <p
                className="text-sm"
                style={{ color: MEDICAL_COLORS.gray[600] }}
              >
                Xem các dịch vụ y tế
              </p>
            </Link>

            <Link
              to="/contact"
              className="p-4 backdrop-blur-sm rounded-lg border transition-all duration-300 group hover:scale-105"
              style={{
                backgroundColor: `${MEDICAL_COLORS.gray[50]}90`,
                borderColor: MEDICAL_COLORS.info[200],
                boxShadow: MEDICAL_SHADOWS.soft,
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = `${MEDICAL_COLORS.info[50]}90`;
                e.target.style.boxShadow = MEDICAL_SHADOWS.medium;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = `${MEDICAL_COLORS.gray[50]}90`;
                e.target.style.boxShadow = MEDICAL_SHADOWS.soft;
              }}
            >
              <div className="mb-2" style={{ color: MEDICAL_COLORS.info[500] }}>
                <svg
                  className="w-8 h-8 mx-auto group-hover:scale-110 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3
                className="font-semibold"
                style={{ color: MEDICAL_COLORS.primary[700] }}
              >
                Liên hệ
              </h3>
              <p
                className="text-sm"
                style={{ color: MEDICAL_COLORS.gray[600] }}
              >
                Liên hệ với chúng tôi
              </p>
            </Link>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            asChild
            className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            style={{
              background: MEDICAL_GRADIENTS.primary,
              color: "white",
              boxShadow: MEDICAL_SHADOWS.medium,
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = MEDICAL_SHADOWS.large;
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = MEDICAL_SHADOWS.medium;
            }}
          >
            <Link to="/">
              <svg
                className="w-5 h-5 mr-2 inline"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              Về trang chủ
            </Link>
          </Button>

          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            style={{
              border: `2px solid ${MEDICAL_COLORS.primary[300]}`,
              color: MEDICAL_COLORS.primary[600],
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = MEDICAL_COLORS.primary[50];
              e.target.style.borderColor = MEDICAL_COLORS.primary[400];
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.borderColor = MEDICAL_COLORS.primary[300];
            }}
          >
            <svg
              className="w-5 h-5 mr-2 inline"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
              />
            </svg>
            Quay lại
          </Button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div
            className="absolute top-20 left-10 w-20 h-20 rounded-full blur-xl"
            style={{ backgroundColor: `${MEDICAL_COLORS.primary[200]}30` }}
          ></div>
          <div
            className="absolute top-40 right-20 w-32 h-32 rounded-full blur-xl"
            style={{ backgroundColor: `${MEDICAL_COLORS.accent[200]}30` }}
          ></div>
          <div
            className="absolute bottom-20 left-20 w-24 h-24 rounded-full blur-xl"
            style={{ backgroundColor: `${MEDICAL_COLORS.success[200]}30` }}
          ></div>
          <div
            className="absolute bottom-40 right-10 w-28 h-28 rounded-full blur-xl"
            style={{ backgroundColor: `${MEDICAL_COLORS.info[200]}30` }}
          ></div>

          {/* Medical-themed floating elements */}
          <div
            className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full blur-lg animate-pulse"
            style={{ backgroundColor: `${MEDICAL_COLORS.accent[300]}20` }}
          ></div>
          <div
            className="absolute bottom-1/3 right-1/3 w-12 h-12 rounded-full blur-lg animate-pulse"
            style={{ backgroundColor: `${MEDICAL_COLORS.primary[300]}20` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
