/**
 * Hệ thống màu sắc và theme cho ứng dụng y tế hiếm muộn
 * Thiết kế để tạo cảm giác an toàn, chuyên nghiệp và nhẹ nhàng
 */

export const MEDICAL_COLORS = {
  // Màu chính - Navy Blue (tin cậy, chuyên nghiệp)
  primary: {
    50: "#f4f5ff",
    100: "#e8ebff",
    500: "#20296e",
    600: "#1a2259",
    700: "#151c47",
    900: "#0f1533",
  },

  // Màu phụ - Pink (nhẹ nhàng, hy vọng)
  accent: {
    50: "#fef7f3",
    100: "#fdeee6",
    500: "#ff70a3",
    600: "#e65892",
    700: "#cc4f82",
    900: "#99386b",
  },

  // Màu trạng thái - Success (tích cực, khỏe mạnh)
  success: {
    50: "#f0fdf4",
    100: "#dcfce7",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    900: "#064e3b",
  },

  // Màu cảnh báo - Warning (cần chú ý)
  warning: {
    50: "#fffbeb",
    100: "#fef3c7",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    900: "#78350f",
  },

  // Màu lỗi - Error (nhẹ nhàng hơn so với màu đỏ thông thường)
  error: {
    50: "#fef2f2",
    100: "#fee2e2",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    900: "#7f1d1d",
  },

  // Màu thông tin - Info (bình tĩnh, thông tin)
  info: {
    50: "#eff6ff",
    100: "#dbeafe",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    900: "#1e3a8a",
  },

  // Màu y tế đặc biệt
  medical: {
    // Màu cho xét nghiệm
    lab: "#8b5cf6",
    // Màu cho điều trị
    treatment: "#06b6d4",
    // Màu cho tư vấn
    consultation: "#f59e0b",
    // Màu cho thuốc
    medicine: "#10b981",
  },

  // Màu xám - Neutral
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },
};

export const MEDICAL_GRADIENTS = {
  primary: "linear-gradient(135deg, #20296e 0%, #ff70a3 100%)",
  gentle: "linear-gradient(135deg, #fef7f3 0%, #f4f5ff 100%)",
  success: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
  medical: "linear-gradient(135deg, #eff6ff 0%, #fef7f3 100%)",
};

export const MEDICAL_SHADOWS = {
  soft: "0 1px 3px rgba(32, 41, 110, 0.1), 0 1px 2px rgba(32, 41, 110, 0.06)",
  medium: "0 4px 6px rgba(32, 41, 110, 0.1), 0 2px 4px rgba(32, 41, 110, 0.06)",
  large:
    "0 10px 15px rgba(32, 41, 110, 0.1), 0 4px 6px rgba(32, 41, 110, 0.05)",
  accent:
    "0 4px 6px rgba(255, 112, 163, 0.15), 0 2px 4px rgba(255, 112, 163, 0.1)",
};

export const MEDICAL_SPACING = {
  xs: "0.25rem", // 4px
  sm: "0.5rem", // 8px
  md: "1rem", // 16px
  lg: "1.5rem", // 24px
  xl: "2rem", // 32px
  "2xl": "3rem", // 48px
  "3xl": "4rem", // 64px
};

export const MEDICAL_BORDER_RADIUS = {
  sm: "0.375rem", // 6px
  md: "0.5rem", // 8px
  lg: "0.75rem", // 12px
  xl: "1rem", // 16px
  "2xl": "1.5rem", // 24px
};

export const MEDICAL_TYPOGRAPHY = {
  // Font families phù hợp với y tế
  fonts: {
    sans: ["Inter", "Roboto", "system-ui", "sans-serif"],
    display: ["Poppins", "Montserrat", "sans-serif"],
  },

  // Font sizes
  sizes: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
  },

  // Line heights
  leading: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const MEDICAL_ANIMATIONS = {
  // Transition timings phù hợp với y tế (mượt mà, không gây căng thẳng)
  duration: {
    fast: "150ms",
    normal: "250ms",
    slow: "350ms",
  },

  // Easing functions
  easing: {
    ease: "cubic-bezier(0.4, 0, 0.2, 1)",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
};

// Preset themes cho các tình huống khác nhau
export const MEDICAL_THEMES = {
  appointment: {
    primary: MEDICAL_COLORS.info[500],
    background: MEDICAL_COLORS.info[50],
    border: MEDICAL_COLORS.info[200],
  },

  treatment: {
    primary: MEDICAL_COLORS.accent[500],
    background: MEDICAL_COLORS.accent[50],
    border: MEDICAL_COLORS.accent[200],
  },

  labtest: {
    primary: MEDICAL_COLORS.medical.lab,
    background: "#f3f0ff",
    border: "#c7b8fa",
  },

  success: {
    primary: MEDICAL_COLORS.success[500],
    background: MEDICAL_COLORS.success[50],
    border: MEDICAL_COLORS.success[200],
  },

  gentle: {
    primary: MEDICAL_COLORS.gray[600],
    background: MEDICAL_COLORS.gray[50],
    border: MEDICAL_COLORS.gray[200],
  },
};
