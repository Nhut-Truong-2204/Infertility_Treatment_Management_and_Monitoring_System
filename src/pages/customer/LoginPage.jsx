import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast, ToastContainer, Flip } from "react-toastify";
import { Mail, Lock, Eye, EyeOff, AlertCircle, Syringe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { GoogleLogin } from "@react-oauth/google";
import Background1 from "../../assets/DoctorLogin1.jpg";
import Background2 from "../../assets/DoctorLogin2.jpg";
import Background3 from "../../assets/DoctorLogin3.jpg";
import Background4 from "../../assets/DoctorLogin4.jpg";
import Background5 from "../../assets/DoctorLogin5.jpg";
import { useAuth } from "../../context/AuthContext"; // Import useAuth
import logo from "../../../public/logo-removebg-preview.png"; // Import your logo
const InputField = ({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative mb-6 group">
      <div
        className={`relative transition-all duration-300 ${
          isFocused ? "transform scale-105" : ""
        }`}
      >
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
          <Icon
            className={`h-5 w-5 transition-colors duration-300 ${
              isFocused
                ? "text-blue-500"
                : error
                ? "text-red-400"
                : "text-gray-400"
            }`}
          />
        </div>
        <input
          type={type === "password" && showPassword ? "text" : type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full pl-12 pr-12 py-4 bg-white/80 backdrop-blur-sm border-2 rounded-xl
                    transition-all duration-300 text-gray-800 placeholder-gray-500
                    focus:outline-none focus:ring-0 focus:shadow-lg focus:shadow-blue-500/20
                    ${
                      error
                        ? "border-red-300 focus:border-red-500 bg-red-50/50"
                        : isFocused
                        ? "border-blue-400 focus:border-blue-500"
                        : "border-gray-200 hover:border-gray-300"
                    }
                    ${isFocused ? "transform scale-105" : ""}`}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center z-10"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
            )}
          </button>
        )}
      </div>
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10, x: -10 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="flex items-center mt-2 space-x-2"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, times: [0, 0.2, 0.4, 0.6, 0.8] }}
              className="text-red-600"
            >
              <AlertCircle className="h-4 w-4" />
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-600 font-medium"
              style={{ textShadow: "0 0 1px rgba(239, 68, 68, 0.2)" }}
            >
              {error}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth(); // Sử dụng useAuth để lấy hàm login
  const [loading, setLoading] = useState(false);
  const [currentBg, setCurrentBg] = useState(0);
  const backgrounds = [
    Background1,
    Background2,
    Background3,
    Background4,
    Background5,
  ];

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location.state?.message) {
      toast[location.state.type](location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5900);
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email là bắt buộc";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!formData.password) {
      newErrors.password = "Mật khẩu là bắt buộc";
    } else if (formData.password.length < 8) {
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate() || loading) return;

    setLoading(true);
    try {
      await login({ email: formData.email, password: formData.password }); // Gọi hàm login từ AuthContext
      toast.success("Đăng nhập thành công!");
      navigate("/");
    } catch (err) {
      toast.error(err?.message || "Đăng nhập thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      setLoading(true);
      const credential = credentialResponse.credential;
      // TODO: Gọi API để xác thực Google credential
      // Ví dụ: const response = await axios.post("/api/auth/google", { credential });
      // await login(response.data.user, response.data.accessToken);
      toast.success("Đăng nhập Google thành công!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Đăng nhập Google thất bại!");
      console.error("Google login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen relative overflow-hidden"
    >
      {backgrounds.map((bg, index) => (
        <motion.div
          key={index}
          className={`background-slide ${currentBg === index ? "active" : ""}`}
          initial={false}
          style={{
            backgroundImage: `url(${bg})`,
            opacity: currentBg === index ? 1 : 0,
          }}
        />
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-black/50"
      />
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white bg-opacity-95 backdrop-blur-sm p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 relative z-10"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex justify-center mb-5"
          >
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", duration: 1, bounce: 0.5 }}
              className="flex items-center space-x-2 font-semibold text-lg cursor-pointer"
              whileHover={{ color: "#3B82F6", transition: { duration: 0.2 } }}
              onClick={() => navigate("/")}
            >
              <Stack direction="row" spacing={2} onClick={() => navigate("/")}>
                <img src={logo} alt="CumIcon" className="h-10" />
              </Stack>
              <motion.span
                onClick={() => navigate("/")}
                whileTap={{ scale: 0.95 }}
              >
                ReproTrack
              </motion.span>
            </motion.div>
          </motion.div>
          <div className="relative mb-5">
            <motion.h2
              className="text-4xl font-bold font-['Montserrat'] text-center relative"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent blur-[2px]">
                Đăng Nhập
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-400 to-blue-600 bg-clip-text text-transparent mix-blend-overlay">
                Đăng Nhập
              </span>
              <span className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                Đăng Nhập
              </span>
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.5,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
                className="text-xl text-gray-500 font-normal mt-8 mb-8 relative"
              >
                <motion.span
                  initial={{ filter: "blur(8px)" }}
                  animate={{ filter: "blur(0px)" }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="bg-gradient-to-r from-blue-700 to-blue-300 bg-clip-text text-transparent"
                >
                  Chào mừng bạn quay trở lại
                </motion.span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent"
                />
              </motion.p>
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-1 mb-10 bg-gradient-to-r from-blue-700 via-indigo-300 to-blue-300 mx-auto mt-4 rounded-full shadow-lg"
            />
          </div>
          <motion.form
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  duration: 1,
                  staggerChildren: 0.2,
                  delayChildren: 0.3,
                },
              },
              exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
            }}
            initial="hidden"
            animate="show"
            exit="exit"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20, y: 10 },
                show: {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  transition: { type: "spring", stiffness: 300, damping: 24 },
                },
              }}
            >
              <InputField
                name="email"
                type="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                icon={Mail}
              />
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20, y: 10 },
                show: {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  transition: { type: "spring", stiffness: 300, damping: 24 },
                },
              }}
            >
              <InputField
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                icon={Lock}
              />
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20, y: 10 },
                show: {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  transition: { type: "spring", stiffness: 300, damping: 24 },
                },
              }}
              className="flex justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative inline-block"
              >
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Quên mật khẩu?
                </Link>
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20, y: 10 },
                show: {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  transition: { type: "spring", stiffness: 300, damping: 24 },
                },
              }}
            >
              <motion.button
                variants={{
                  idle: { scale: 1 },
                  loading: {
                    scale: [1, 0.98, 1],
                    transition: { duration: 1.5, repeat: Infinity },
                  },
                  success: {
                    backgroundColor: ["#3B82F6", "#10B981"],
                    transition: { duration: 0.5 },
                  },
                  error: {
                    x: [-10, 10, -10, 10, 0],
                    transition: { duration: 0.5 },
                  },
                }}
                initial="idle"
                animate={loading ? "loading" : "idle"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 ${
                  loading ? "opacity-80" : ""
                }`}
              >
                <motion.span
                  animate={
                    loading
                      ? {
                          opacity: [1, 0.7, 1],
                          transition: { duration: 1.5, repeat: Infinity },
                        }
                      : {}
                  }
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="inline-block"
                      >
                        ⭕
                      </motion.span>
                      <span>Đang đăng nhập...</span>
                    </div>
                  ) : (
                    "Đăng nhập"
                  )}
                </motion.span>
              </motion.button>
            </motion.div>
          </motion.form>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative my-6"
          >
            <div className="absolute inset-0 flex items-center">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="w-full border-t border-gray-300"
              />
            </div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="relative flex justify-center text-sm"
            >
              <span className="px-2 bg-white text-gray-500">
                Hoặc đăng nhập với
              </span>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="w-full flex items-center justify-center"
          >
            <div className="custom-google-btn w-full relative">
              <button
                className="w-full flex items-center justify-center gap-3 px-4 py-3 text-gray-700 bg-white border-2 border-gray-200 rounded-lg hover:bg-gray-100 hover:border-gray-300 active:bg-gray-200 transition-all duration-200"
                onClick={() => {
                  const iframe = document.querySelector("iframe");
                  if (iframe?.contentWindow) {
                    const googleButton =
                      iframe.contentWindow.document.querySelector(
                        '[role="button"]'
                      );
                    if (googleButton) {
                      googleButton.click();
                    }
                  }
                }}
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  className="w-6 h-6"
                />
                <span className="text-base font-semibold">
                  Đăng nhập bằng Google
                </span>
              </button>
              <div
                className="google-login-hidden absolute flex items-center justify-center"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  zIndex: 10,
                }}
              >
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => {
                    toast.error("Đăng nhập Google thất bại!");
                  }}
                  size="large"
                  type="standard"
                  shape="rectangular"
                  useOneTap
                  locale="vi"
                />
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="my-6 flex items-center justify-center text-sm"
          >
            <motion.div whileHover={{ scale: 1.05 }} className="relative">
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Tạo tài khoản mới
              </Link>
              <motion.div
                className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                color: "#1B7ACD",
                transition: { type: "spring", stiffness: 300 },
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="text-[#23A0FF] font-medium inline-flex items-center space-x-2 mt-4 text-lg"
              onClick={() => navigate("/")}
            >
              <motion.span
                initial={{ x: 5 }}
                whileHover={{ x: -3 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                ←
              </motion.span>
              <span>Quay về trang chủ</span>
            </motion.button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 text-center"
          ></motion.div>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          transition={Flip}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </motion.div>
    </motion.div>
  );
}
