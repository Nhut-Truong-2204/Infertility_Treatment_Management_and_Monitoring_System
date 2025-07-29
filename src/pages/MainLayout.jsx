// Main Layout - Layout thông minh sử dụng SmartHeader để tự động chọn header phù hợp
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  openLoginModal,
  openRegisterModal,
  closeBookingModal,
} from "../redux/slices/uiSlice";

import SmartHeader from "../components/headers/SmartHeader";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";
import OTPVerificationModal from "../components/OTPVerificationModal";
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
      <SmartHeader
        onLoginClick={() => dispatch(openLoginModal())}
        onRegisterClick={() => dispatch(openRegisterModal())}
      />
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      <LoginModal />
      <RegisterModal />
      <OTPVerificationModal />

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
