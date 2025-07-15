import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, verifyOTP, resendOTP } from "../../api/registerUser";

// Async thunk cho đăng ký người dùng
export const register = createAsyncThunk(
  "register/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUser(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Đăng ký thất bại");
    }
  }
);

// Async thunk cho xác thực OTP
export const verifyRegistrationOTP = createAsyncThunk(
  "register/verifyOTP",
  async (otpData, { rejectWithValue }) => {
    try {
      const response = await verifyOTP(otpData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Xác thực OTP thất bại");
    }
  }
);

// Async thunk cho gửi lại OTP
export const resendRegistrationOTP = createAsyncThunk(
  "register/resendOTP",
  async (email, { rejectWithValue }) => {
    try {
      const response = await resendOTP(email);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Gửi lại OTP thất bại");
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  success: false,
  otpSent: false,
  verificationEmail: null,
  registrationSuccess: false,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    clearRegisterState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.otpSent = false;
      // Không clear verificationEmail để giữ email trong quá trình xác thực
      // state.verificationEmail = null;
      state.registrationSuccess = false;
    },
    clearAllRegisterState: (state) => {
      // Action này để clear hoàn toàn tất cả state
      state.loading = false;
      state.error = null;
      state.success = false;
      state.otpSent = false;
      state.verificationEmail = null;
      state.registrationSuccess = false;
    },
    setVerificationEmail: (state, action) => {
      state.verificationEmail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register user
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.otpSent = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        state.otpSent = false;
      })
      // Verify OTP
      .addCase(verifyRegistrationOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyRegistrationOTP.fulfilled, (state) => {
        state.loading = false;
        state.registrationSuccess = true;
        state.error = null;
      })
      .addCase(verifyRegistrationOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.registrationSuccess = false;
      })
      // Resend OTP
      .addCase(resendRegistrationOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendRegistrationOTP.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        // Có thể thêm thông báo thành công ở đây
      })
      .addCase(resendRegistrationOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearRegisterState,
  clearAllRegisterState,
  setVerificationEmail,
} = registerSlice.actions;
export default registerSlice.reducer;
