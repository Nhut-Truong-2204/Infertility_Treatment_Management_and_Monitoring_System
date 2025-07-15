import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoginModalOpen: false,
  isBookingModalOpen: false,
  isRegisterModalOpen: false,
  isOTPModalOpen: false,
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
} = uiSlice.actions;

export default uiSlice.reducer;
