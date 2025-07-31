import { loginWithGoogle as googleLoginApi } from "../../api/googleAuth";
export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (googleToken, { rejectWithValue }) => {
    try {
      const response = await googleLoginApi(googleToken);
      const { accessToken, user } = response.data;
      // Lưu vào cookie
      Cookies.set("accessToken", accessToken, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set("user", JSON.stringify(user), {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });
      return user;
    } catch (error) {
      return rejectWithValue(error.message || "Đăng nhập Google thất bại");
    }
  }
);
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/axios"; // Đảm bảo đường dẫn đúng
import Cookies from "js-cookie";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/login", credentials);
      const { accessToken, user } = response.data.data;

      Cookies.set("accessToken", accessToken, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set("user", JSON.stringify(user), {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });

      return user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Đăng nhập thất bại"
      );
    }
  }
);

// Thunk để logout
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  try {
    const token = Cookies.get("accessToken");
    if (token) {
      await axios.post("/api/auth/logout");
    }
  } catch (error) {
    console.error("Lỗi khi logout trên server:", error);
    // Vẫn tiếp tục logout ở client dù API thất bại
  }

  // Xóa cookies
  Cookies.remove("accessToken");
  Cookies.remove("user");

  return null;
});

// Thunk để lấy thông tin người dùng khi tải lại trang
export const fetchUserOnLoad = createAsyncThunk(
  "auth/fetchUserOnLoad",
  async (_, { rejectWithValue }) => {
    const token = Cookies.get("accessToken");
    console.log("Token from cookies:", token ? "exists" : "not found");

    if (!token) {
      console.log("No token found, user not logged in");
      return rejectWithValue("No token found");
    }

    try {
      console.log("Fetching user information...");
      const response = await axios.get("/api/auth/information");
      const user = response.data.data;
      console.log("User fetched successfully:", user);

      Cookies.set("user", JSON.stringify(user), {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });
      return user;
    } catch (error) {
      console.error(
        "Error fetching user on load:",
        error.response?.status,
        error.response?.data
      );
      Cookies.remove("accessToken");
      Cookies.remove("user");
      return rejectWithValue("Invalid token");
    }
  }
);

const userCookie = Cookies.get("user");
const initialState = {
  user: userCookie && userCookie !== 'undefined' ? JSON.parse(userCookie) : null, // Lấy user từ cookie nếu có
  loading: true,
  error: null,
  resetEmail: "",
  resetToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      Cookies.remove("accessToken");
      Cookies.remove("user");
    },
    setResetPasswordData: (state, action) => {
      state.resetEmail = action.payload.email;
      state.resetToken = action.payload.token;
    },
    clearResetPasswordData: (state) => {
      state.resetEmail = "";
      state.resetToken = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login with Google
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch user on load
      .addCase(fetchUserOnLoad.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserOnLoad.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserOnLoad.rejected, (state) => {
        state.user = null;
        state.loading = false;
      })
      // Logout user
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { logout, setResetPasswordData, clearResetPasswordData } = authSlice.actions;
export default authSlice.reducer;
