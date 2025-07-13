// src/components/ui/UserDropdown.jsx
import { useNavigate } from "react-router-dom";
import Calendar1 from "./Calendar";
import { BadgeDollarSign } from "./BadgeDollarSign ";
import { ClipboardCopy } from "./ClipboardCopy";
import { ToggleLeft } from "./ToggleLeft ";
import { Bolt } from "./Bolt";
import { Clock8 } from "./Clock8";
const menuItems = [
  {
    label: "Lịch hẹn",
    icon: <Calendar1 stroke="#ea580c" />,
    path: "/viewAppointment",
  },
  {
    label: "Xem hợp đồng",
    icon: <ClipboardCopy stroke="#e7000b" />,
    path: "/treatmentContract",
  },
  {
    label: "Quản lý thanh toán",
    icon: <BadgeDollarSign stroke="#ff0f91" />,
    path: "/payment",
  },
  {
    label: "Quản lý điều trị",
    icon: <Clock8 stroke="#3B82F6" />,
    path: "/historyTreatment",
  },
  {
    label: "Quản lý xét nghiệm",
    icon: <Clock8 stroke="#16a34a" />,
    path: "/historyLabtest",
  },
  {
    label: "Cài đặt",
    icon: <Bolt stroke="#ca8a04" />,
    path: "/setting",
  },
];

export default function UserDropdown({ onLogout }) {
  const navigate = useNavigate();

  return (
    <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-[#2e6fd8] text-gray-800 dark:text-white rounded-xl shadow-2xl z-50 py-3 overflow-hidden">
      {menuItems.map((item, idx) => (
        <button
          key={idx}
          onClick={() => navigate(item.path)}
          className="w-full flex items-center gap-x-4 px-6 py-3 text-[15px] font-medium 
             hover:bg-blue-50 dark:hover:bg-[#1c398e] transition-all"
        >
          <div className="min-w-[24px] h-6 flex items-center justify-center">
            {item.icon}
          </div>
          <span className="flex-1 text-left">{item.label}</span>
        </button>
      ))}
      <button
        onClick={onLogout}
        className="w-full flex items-center gap-x-3 px-6 py-3 text-base text-red-600 hover:bg-red-100 dark:hover:bg-[#801e1e] transition-all"
      >
        <ToggleLeft stroke="#dc2626" />
        Đăng xuất
      </button>
    </div>
  );
}
