// src/components/LoginModal.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeLoginModal } from "../redux/slices/uiSlice";
import { login } from "../redux/slices/authSlice";

const LoginModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpen = useSelector((state) => state.ui.isLoginModalOpen);
  const { loading: isLoggingIn, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Thêm useEffect để xử lý ESC key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        dispatch(closeLoginModal());
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      // Ngăn scroll của body khi modal mở
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  // Hàm xử lý click overlay
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      dispatch(closeLoginModal());
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await dispatch(login({ email, password })).unwrap();
      dispatch(closeLoginModal());
      // Redirect to dashboard after successful login
      navigate("/dashboard");
    } catch (err) {
      // Error is handled by Redux state
      console.error("Login error:", err);
    }
  };

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50"
      style={{ backgroundColor: "rgba(32, 41, 110, 0.3)" }}
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md relative animate__animated animate__fadeInUp">
        <button
          onClick={() => dispatch(closeLoginModal())}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-3xl font-bold text-primary mb-2 text-center">
          Đăng Nhập
        </h2>
        <p className="text-center text-text-color mb-6">Chào mừng trở lại!</p>

        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded-lg text-center mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Địa chỉ Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="nhapemail@example.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-white font-bold py-3 rounded-lg hover:bg-primary transition-colors duration-300 disabled:opacity-50"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Đang xử lý..." : "Đăng Nhập"}
          </button>
        </form>
        <div className="text-center mt-4">
          <a href="#!" className="text-sm text-accent hover:underline">
            Quên mật khẩu?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
