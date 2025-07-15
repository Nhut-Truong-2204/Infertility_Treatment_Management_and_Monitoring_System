import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { closeBookingModal } from "../redux/slices/uiSlice";
import CustomerHeader from "../components/headers/CustomerHeader";
import Footer from "../components/Footer";
import BookingModal from "../components/BookingModal";
import { useAuth } from "../hooks/useAuth";

const CustomerLayout = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const isBookingModalOpen = useSelector(
    (state) => state.ui.isBookingModalOpen
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Customer Header */}
      <CustomerHeader />

      {/* Customer-specific top bar */}
      <div className="bg-gradient-to-r from-primary to-accent text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <span>
            <i className="fas fa-user-circle mr-2"></i>
            Chào mừng, {user?.name || "Khách hàng"}
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

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Booking Modal cho customer */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => dispatch(closeBookingModal())}
      />
    </div>
  );
};

export default CustomerLayout;
