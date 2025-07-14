// Main Layout - Layout thông minh sử dụng SmartHeader để tự động chọn header phù hợp
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openLoginModal, closeBookingModal } from "../redux/slices/uiSlice";

import SmartHeader from "../components/headers/SmartHeader";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";
import BookingModal from "../components/BookingModal";
import { useAuth } from "../hooks/useAuth";

const MainLayout = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const isBookingModalOpen = useSelector(
    (state) => state.ui.isBookingModalOpen
  );

  return (
    <div className="min-h-screen flex flex-col">
      <SmartHeader onLoginClick={() => dispatch(openLoginModal())} />
      {user && (
        <div className="bg-gradient-to-r from-primary to-accent text-white py-2 px-4">
          <div className="container mx-auto flex justify-between items-center text-sm">
            <span>
              <i className="fas fa-user-circle mr-2"></i>
              Chào mừng, {user?.fullName || user?.name || "Khách hàng"}
            </span>
            <div className="flex items-center gap-4">
              <span>
                <i className="fas fa-calendar-check mr-1"></i>
                Lịch hẹn tiếp theo: 15/07/2024
              </span>
              <span>
                <i className="fas fa-bell mr-1"></i>3 thông báo mới
              </span>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      <LoginModal />

      {user && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => dispatch(closeBookingModal())}
        />
      )}
    </div>
  );
};

export default MainLayout;
