import { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { blue, red } from "@mui/material/colors";
import { useAuth } from "../../../context/AuthContext";
import logo from "../../../../public/LogoWithoutText.png";
import User from "../../ui/UserIcon";
import Earth from "../../ui/Earth";
import Calendar1 from "@/components/ui/Calendar";
import { BadgeDollarSign } from "@/components/ui/BadgeDollarSign ";
import { ClipboardCopy } from "@/components/ui/ClipboardCopy";
import { Bolt } from "@/components/ui/Bolt";
import { ToggleLeft } from "@/components/ui/ToggleLeft ";
import { Clock8 } from "@/components/ui/Clock8";
// Icons
import {
  ArrowDropDown as ArrowDropDownIcon,
  Male as MaleIcon,
  Female as FemaleIcon,
  AccountCircle as AccountCircleIcon,
  EventNote as EventNoteIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  MedicalServices as MedicalServicesIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
  School as SchoolIcon,
  HealthAndSafety as HealthAndSafetyIcon,
  Groups as GroupsIcon,
  RateReview as RateReviewIcon,
  History as HistoryIcon,
  MedicalInformation as MedicalInformationIcon,
  PersonSearch as PersonSearchIcon,
  LocalHospital as LocalHospitalIcon,
  Science as ScienceIcon,
  Business as BusinessIcon,
  Checklist as ChecklistIcon,
  Forum as ForumIcon,
} from "@mui/icons-material";
import Swal from "sweetalert2";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  ///avatar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleLogout = () => {
    Swal.fire({
      title: "Xác nhận đăng xuất?",
      text: "Bạn sẽ cần đăng nhập lại để tiếp tục.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Đăng xuất",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/login");
        Swal.fire("Đã đăng xuất!", "", "success");
      }
    });
  };
  const routes = {
    goHome: () => navigate("/"),
    goRegister: () => navigate("/register"),
    goLogin: () => navigate("/login"),
    goBarrenMale: () => navigate("/barrenMale"),
    goBarrenFeMale: () => navigate("/barrenFemale"),
    goInfertility: () => navigate("/infertility"),
    goTestingList: () => navigate("/viewTestingList"),
    goDoctorList: () => navigate("/viewDoctorList"),
    goClinicIntro: () => navigate("/clinicpage"),
    goService: () => navigate("/servicepage"),
    goHistory: () => navigate("/history"),
    goPayment: () => navigate("/payment"),
    goFeedback: () => navigate("/feedback"),
    goMedicine: () => navigate("/medicine"),
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-60 transition-all duration-300 ${
        isScrolled ? "bg-[#183383]/90 shadow-lg" : "bg-transparent"
      }`}
    >
      <nav className="py-10 px-40 flex items-center justify-between text-white sticky top-0 z-50">
        {/* Logo */}
        <div
          onClick={routes.goHome}
          className="flex items-center space-x-2 font-semibold text-lg cursor-pointer hover:bg-blue-900 hover:rounded-2xl hover:py-2 hover:px-4 transition-all duration-300"
        >
          <img src={logo} alt="CumIcon" className="h-12" />
          <span>ReproTrack</span>
        </div>

        {/* Menu chính */}
        <ul className="flex space-x-10">
          {/* Tìm hiểu thêm */}
          <li
            className="relative group"
            onMouseEnter={() => setOpenDropdown(0)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="flex px-4 py-2 items-center gap-1 font-semibold uppercase transition-all duration-300 group-hover:text-[#032F6C] group-hover:bg-white group-hover:shadow rounded-md">
              Tìm hiểu thêm
              <ArrowDropDownIcon />
            </button>

            {/* Tìm hiểu thêm Dropdown */}
            {openDropdown === 0 && (
              <div className="absolute -left-20 w-[400px] bg-white text-gray-800 z-20 rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-400">
                  <h3 className="text-white text-lg font-bold flex items-center gap-2">
                    <SchoolIcon /> Tìm hiểu về hiếm muộn
                  </h3>
                  <p className="text-blue-100 text-sm mt-1">
                    Khám phá thông tin chi tiết về vấn đề hiếm muộn
                  </p>
                </div>

                <div className="p-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div
                      onClick={routes.goBarrenMale}
                      className="flex items-center gap-4 p-3 hover:bg-blue-50 rounded-lg cursor-pointer transition-all group"
                    >
                      <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-all">
                        <MaleIcon className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          Hiếm muộn Nam
                        </h4>
                        <p className="text-sm text-gray-500">
                          Khám phá các vấn đề hiếm muộn ở nam giới
                        </p>
                      </div>
                    </div>

                    <div
                      onClick={routes.goBarrenFeMale}
                      className="flex items-center gap-4 p-3 hover:bg-blue-50 rounded-lg cursor-pointer transition-all group"
                    >
                      <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-all">
                        <FemaleIcon className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          Hiếm muộn Nữ
                        </h4>
                        <p className="text-sm text-gray-500">
                          Khám phá các vấn đề hiếm muộn ở nữ giới
                        </p>
                      </div>
                    </div>

                    <div
                      onClick={routes.goInfertility}
                      className="flex items-center gap-4 p-3 hover:bg-blue-50 rounded-lg cursor-pointer transition-all group"
                    >
                      <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-all">
                        <ScienceIcon className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Vô sinh</h4>
                        <p className="text-sm text-gray-500">
                          Thông tin chuyên sâu về vô sinh và điều trị
                        </p>
                      </div>
                    </div>
                    <div
                      onClick={routes.goMedicine}
                      className="flex items-center gap-4 p-3 hover:bg-blue-50 rounded-lg cursor-pointer transition-all group"
                    >
                      <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-all">
                        <MedicalInformationIcon className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          Tra cứu thuốc
                        </h4>
                        <p className="text-sm text-gray-500">
                          Tìm kiếm các thông tin cần thiết về thuốc
                        </p>
                      </div>
                    </div>
                    <div
                      onClick={routes.goClinicIntro}
                      className="flex items-center gap-4 p-3 hover:bg-blue-50 rounded-lg cursor-pointer transition-all group"
                    >
                      <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-all">
                        <BusinessIcon className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          Giới thiệu phòng khám
                        </h4>
                        <p className="text-sm text-gray-500">
                          Tìm hiểu về cơ sở vật chất và chuyên môn
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </li>

          {/* Chăm sóc */}
          <li
            className="relative group"
            onMouseEnter={() => setOpenDropdown(1)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="flex px-4 py-2 items-center gap-1 font-semibold uppercase transition-all duration-300 group-hover:text-[#032F6C] group-hover:bg-white group-hover:shadow rounded-md">
              Chăm sóc
              <ArrowDropDownIcon />
            </button>
            {/* Chăm sóc Dropdown */}
            {openDropdown === 1 && (
              <div className="absolute -left-20 w-[400px] bg-white text-gray-800 z-20 rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-400">
                  <h3 className="text-white text-lg font-bold flex items-center gap-2">
                    <HealthAndSafetyIcon /> Dịch vụ chăm sóc
                  </h3>
                  <p className="text-blue-100 text-sm mt-1">
                    Khám phá các dịch vụ y tế chất lượng cao
                  </p>
                </div>

                <div className="p-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div
                      onClick={routes.goTestingList}
                      className="flex items-center gap-4 p-3 hover:bg-blue-50 rounded-lg cursor-pointer transition-all group"
                    >
                      <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-all">
                        <MedicalInformationIcon className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          Dịch vụ xét nghiệm
                        </h4>
                        <p className="text-sm text-gray-500">
                          Các gói xét nghiệm toàn diện
                        </p>
                      </div>
                    </div>

                    <div
                      onClick={routes.goDoctorList}
                      className="flex items-center gap-4 p-3 hover:bg-blue-50 rounded-lg cursor-pointer transition-all group"
                    >
                      <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-all">
                        <PersonSearchIcon className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          Đội ngũ bác sĩ
                        </h4>
                        <p className="text-sm text-gray-500">
                          Đội ngũ chuyên gia giàu kinh nghiệm
                        </p>
                      </div>
                    </div>

                    <div
                      onClick={routes.goService}
                      className="flex items-center gap-4 p-3 hover:bg-blue-50 rounded-lg cursor-pointer transition-all group"
                    >
                      <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-all">
                        <LocalHospitalIcon className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          Dịch vụ điều trị
                        </h4>
                        <p className="text-sm text-gray-500">
                          Các phương pháp điều trị tiên tiến
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </li>

          {/* Tham gia */}
          <li
            className="relative group"
            onMouseEnter={() => setOpenDropdown(2)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="flex px-4 py-2 items-center gap-1 font-semibold uppercase transition-all duration-300 group-hover:text-[#032F6C] group-hover:bg-white group-hover:shadow rounded-md">
              Tham gia
              <ArrowDropDownIcon />
            </button>
            {/* Tham gia Dropdown */}
            {openDropdown === 2 && (
              <div className="absolute -left-20 w-[400px] bg-white text-gray-800 z-20 rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-400">
                  <h3 className="text-white text-lg font-bold flex items-center gap-2">
                    <GroupsIcon /> Tham gia cùng chúng tôi
                  </h3>
                  <p className="text-blue-100 text-sm mt-1">
                    Chia sẻ và theo dõi hành trình của bạn
                  </p>
                </div>

                <div className="p-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div
                      onClick={routes.goFeedback}
                      className="flex items-center gap-4 p-3 hover:bg-blue-50 rounded-lg cursor-pointer transition-all group"
                    >
                      <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-all">
                        <RateReviewIcon className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          Đánh giá dịch vụ
                        </h4>
                        <p className="text-sm text-gray-500">
                          Chia sẻ trải nghiệm của bạn
                        </p>
                      </div>
                    </div>

                    <div
                      onClick={() => navigate("/blog-forum")}
                      className="flex items-center gap-4 p-3 hover:bg-blue-50 rounded-lg cursor-pointer transition-all group"
                    >
                      <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-all">
                        <ForumIcon className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          Blog & Diễn đàn
                        </h4>
                        <p className="text-sm text-gray-500">
                          Chia sẻ và kết nối cộng đồng
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </li>
        </ul>

        {/* Nút Đăng nhập & Đăng ký hoặc thông tin tài khoản */}
        <div className="flex space-x-5 gap-2">
          {user ? (
            // Nếu đã đăng nhập, hiển thị thông tin tài khoản và nút Đăng xuất
            <div className="flex items-center space-x-4 relative" ref={menuRef}>
              <span className="text-white font-semibold">
                {user.fullName || "Người dùng"}
              </span>

              <div className="relative">
                <Avatar
                  sx={{ bgcolor: blue[600], cursor: "pointer" }}
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <Earth sx={{ color: "white", fontSize: 20 }} />
                </Avatar>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-[#2e6fd8] rounded-md shadow-lg z-20 py-2">
                    

                    <button
                      onClick={() => navigate("/viewAppointment")}
                      className="flex items-center w-full px-4 py-2 text-sm hover:bg-[#1c398e]"
                    >
                      <Calendar1 stroke="#ea580c" className="mr-2 text-white" />
                      Lịch hẹn
                    </button>

                    <button
                      onClick={() => navigate("/")}
                      className="flex items-center w-full px-4 py-2 text-sm hover:bg-[#1c398e]"
                    >
                      <ClipboardCopy
                        stroke="#16a34a"
                        className="mr-2 text-green-600"
                      />
                      Kết quả xét nghiệm
                    </button>

                    <button
                      onClick={() => navigate("/payment")}
                      className="flex items-center w-full px-4 py-2 text-sm hover:bg-[#1c398e]"
                    >
                      <BadgeDollarSign
                        stroke="#ff0f91"
                        className="mr-2 text-green-600"
                      />
                      Quản lý thanh toán
                    </button>

                    <button
                      onClick={() => navigate("/historyTreatment")}
                      className="flex items-center w-full px-4 py-2 text-sm hover:bg-[#1c398e]"
                    >
                      <Clock8
                        stroke="#3B82F6 "
                        className="mr-2 text-yellow-600"
                      />
                      Lịch sử điều trị
                    </button>

                    <button
                      onClick={() => navigate("/historyLabtest")}
                      className="flex items-center w-full px-4 py-2 text-sm hover:bg-[#1c398e]"
                    >
                      <Clock8
                        stroke="#16a34a "
                        className="mr-2 text-yellow-600"
                      />
                      Lịch sử xét nghiệm
                    </button>

                    <button
                      onClick={() => navigate("/setting")}
                      className="flex items-center w-full px-4 py-2 text-sm hover:bg-[#1c398e]"
                    >
                      <Bolt stroke="#ca8a04" className="mr-2 text-yellow-600" />
                      Cài đặt
                    </button>

                    <button
                      onClick={() => {
                        handleLogout();
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm hover:bg-[#1c398e]"
                    >
                      <ToggleLeft
                        stroke="#dc2626"
                        className="mr-2 text-red-600"
                      />
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Nếu chưa đăng nhập, hiển thị nút Đăng nhập và Đăng ký
            <>
              <div className="relative group w-[140px] h-[50px]">
                <Button
                  onClick={routes.goLogin}
                  variant="outlined"
                  sx={{
                    color: "white",
                    borderColor: "white",
                    borderRadius: "8px",
                    textTransform: "none",
                    backgroundColor: "#1B7ACD",
                    px: 3,
                    "&:hover": {
                      backgroundColor: "#20296e",
                      color: "white",
                      borderColor: "white",
                    },
                  }}
                  className="w-full h-full flex items-center justify-center relative overflow-hidden"
                >
                  <span className="relative z-10 text-[20px] text-base md:text-sm font-bold">
                    Đăng nhập
                  </span>
                  <span className="absolute top-0 left-[-100%] w-full h-full bg-white/20 skew-x-[-20deg] group-hover:left-[100%] transition-all duration-500 ease-in-out"></span>
                </Button>
              </div>
              <div className="relative group w-[140px] h-[50px]">
                <Button
                  onClick={routes.goRegister}
                  variant="contained"
                  sx={{
                    backgroundColor: "#f41574",
                    borderRadius: "8px",
                    textTransform: "none",
                    px: 3,
                    "&:hover": {
                      backgroundColor: "#20296e",
                    },
                  }}
                  className="w-full h-full flex items-center justify-center relative overflow-hidden"
                >
                  <span className="relative z-10 text-[20px] text-base md:text-sm font-bold">
                    Đăng ký
                  </span>
                  <span className="absolute top-0 left-[-100%] w-full h-full bg-white/20 skew-x-[-20deg] group-hover:left-[100%] transition-all duration-500 ease-in-out"></span>
                </Button>
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
