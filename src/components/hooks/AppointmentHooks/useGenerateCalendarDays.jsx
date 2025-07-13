export const useGenerateCalendarDays = () => {
  const generateCalendarDays = () => {
    const today = new Date();
    const days = [];

    for (let i = 0; days.length < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);

      // ❌ Bỏ qua Chủ Nhật
      if (date.getDay() === 0) continue;

      const formatted = date.toISOString().split("T")[0];
      days.push({
        date: formatted,
        day: date.getDate(),
        weekday: date.toLocaleDateString("vi-VN", { weekday: "short" }),
        month: date.getMonth() + 1,
        disabled: false,
      });
    }

    return days;
  };

  return { generateCalendarDays };
};
