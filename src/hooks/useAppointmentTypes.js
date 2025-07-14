import { useState, useEffect, useCallback } from "react";
import { getAppointmentTypes } from "../api/appointmentAPI";

// Status configurations - colors synchronized with system design
const statusConfigurations = {
  SCHEDULED: {
    label: "Đã lên lịch",
    class: "bg-blue-50 text-blue-700 border-blue-200",
    iconColor: "text-blue-600",
  },
  CANCELLED_BY_PATIENT: {
    label: "Bệnh nhân hủy",
    class: "bg-red-50 text-red-700 border-red-200",
    iconColor: "text-red-600",
  },
  CANCELLED_BY_CLINIC: {
    label: "Phòng khám hủy",
    class: "bg-orange-50 text-orange-700 border-orange-200",
    iconColor: "text-orange-600",
  },
  COMPLETED: {
    label: "Hoàn thành",
    class: "bg-green-50 text-green-700 border-green-200",
    iconColor: "text-green-600",
  },
  NO_SHOW: {
    label: "Không đến",
    class: "bg-gray-50 text-gray-700 border-gray-200",
    iconColor: "text-gray-600",
  },
  RESCHEDULED: {
    label: "Đã dời lịch",
    class: "bg-purple-50 text-purple-700 border-purple-200",
    iconColor: "text-purple-600",
  },
  CHECKED_IN: {
    label: "Đã check-in",
    class: "bg-indigo-50 text-indigo-700 border-indigo-200",
    iconColor: "text-indigo-600",
  },
  IN_PROGRESS: {
    label: "Đang thực hiện",
    class: "bg-yellow-50 text-yellow-700 border-yellow-200",
    iconColor: "text-yellow-600",
  },
};

const useAppointmentTypes = () => {
  const [appointmentTypes, setAppointmentTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get status configuration
  const getStatusConfig = useCallback((statusKey) => {
    return (
      statusConfigurations[statusKey] || {
        label: "Không rõ",
        class: "bg-gray-50 text-gray-700 border-gray-200",
        iconColor: "text-gray-600",
      }
    );
  }, []);

  // Get appointment type by name
  const getAppointmentTypeByName = useCallback(
    (typeName) => {
      return (
        appointmentTypes.find((type) => type.typeName === typeName) || null
      );
    },
    [appointmentTypes]
  );

  // Get all status options for filtering
  const getStatusOptions = useCallback(() => {
    return [
      { value: "", label: "Tất cả trạng thái" },
      ...Object.entries(statusConfigurations).map(([key, config]) => ({
        value: key,
        label: config.label,
      })),
    ];
  }, []);

  useEffect(() => {
    const fetchAppointmentTypes = async () => {
      try {
        setLoading(true);
        setError(null);
        const types = await getAppointmentTypes();
        setAppointmentTypes(types);
      } catch (err) {
        setError(err.message || "Lỗi khi tải loại lịch hẹn");
        console.error("Lỗi khi tải loại lịch hẹn:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentTypes();
  }, []);

  return {
    appointmentTypes,
    loading,
    error,
    statusConfigurations,
    getStatusConfig,
    getAppointmentTypeByName,
    getStatusOptions,
  };
};

export default useAppointmentTypes;
