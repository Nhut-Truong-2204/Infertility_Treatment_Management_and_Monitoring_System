import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoginModalOpen: false,
  isBookingModalOpen: false,
  isRegisterModalOpen: false,
  isOTPModalOpen: false,
  isForgotPasswordModalOpen: false,
  isResetPasswordModalOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.isLoginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.isLoginModalOpen = false;
    },
    openForgotPasswordModal: (state) => {
      state.isForgotPasswordModalOpen = true;
    },
    closeForgotPasswordModal: (state) => {
      state.isForgotPasswordModalOpen = false;
    },
    openResetPasswordModal: (state) => {
      state.isResetPasswordModalOpen = true;
    },
    closeResetPasswordModal: (state) => {
      state.isResetPasswordModalOpen = false;
    },
    openBookingModal: (state) => {
      state.isBookingModalOpen = true;
    },
    closeBookingModal: (state) => {
      state.isBookingModalOpen = false;
    },
    openRegisterModal: (state) => {
      state.isRegisterModalOpen = true;
    },
    closeRegisterModal: (state) => {
      state.isRegisterModalOpen = false;
    },
    openOTPModal: (state) => {
      state.isOTPModalOpen = true;
    },
    closeOTPModal: (state) => {
      state.isOTPModalOpen = false;
    },
  },
});

export const {
  openLoginModal,
  closeLoginModal,
  openBookingModal,
  closeBookingModal,
  openRegisterModal,
  closeRegisterModal,
  openOTPModal,
  closeOTPModal,
  openForgotPasswordModal,
  closeForgotPasswordModal,
  openResetPasswordModal,
  closeResetPasswordModal,
} = uiSlice.actions;

export default uiSlice.reducer;
