export const getDayOfWeekInfo = (dateStr) => {
  if (!dateStr || isNaN(new Date(dateStr))) {
    return { code: "UNKNOWN", displayName: "Không xác định" };
  }

  const date = new Date(dateStr);
  const weekday = date.getDay(); // 0 = Sunday

  const dayMap = [
    { code: "SUNDAY", displayName: "Chủ nhật" },
    { code: "MONDAY", displayName: "Thứ hai" },
    { code: "TUESDAY", displayName: "Thứ ba" },
    { code: "WEDNESDAY", displayName: "Thứ tư" },
    { code: "THURSDAY", displayName: "Thứ năm" },
    { code: "FRIDAY", displayName: "Thứ sáu" },
    { code: "SATURDAY", displayName: "Thứ bảy" },
  ];

  return dayMap[weekday] || { code: "UNKNOWN", displayName: "Không xác định" };
};
