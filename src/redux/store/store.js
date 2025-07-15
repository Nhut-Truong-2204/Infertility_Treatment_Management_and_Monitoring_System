import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import uiReducer from "../slices/uiSlice";
import registerReducer from "../slices/registerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    register: registerReducer,
  },
});
