import { useState } from "react";
import {
  Heart,
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import GoogleLogo from "../../assets/GoogleLogo.png";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/customer/registerUser";
import { toast } from "react-toastify"; // Uncomment if using react-toastify
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Mock functions to replace imports

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
            ${isFocused ? "transform scale-105" : ""}
          `}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
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

      {error && (
        <div className="flex items-center mt-2 text-red-600 text-sm animate-slideIn">
          <AlertCircle className="h-4 w-4 mr-2" />
          {error}
        </div>
      )}
    </div>
  );
};

const RegisterPage = () => {
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});
  // const handleGoogleLogin = () => {
  //   try {
  //     setLoading(true);
  //     // TODO: Thêm xử lý đăng nhập Google ở đây
  //     toast.success("Đăng nhập Google thành công!");
  //     navigate("/");
  //   } catch (error) {
  //     toast.error("Đăng nhập Google thất bại!");
  //     console.error("Google login error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Họ và tên là bắt buộc.";
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = "Họ và tên phải ít nhất 2 ký tự.";
    } else if (formData.fullName.length > 50) {
      newErrors.fullName = "Họ và tên không được quá 50 ký tự.";
    } else if (/[!@#$%^&*(),.?":{}|<>]/.test(formData.fullName)) {
      newErrors.fullName = "Họ và tên không được chứa ký tự đặc biệt.";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Số điện thoại là bắt buộc.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email là bắt buộc.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không đúng định dạng.";
    }

    const password = formData.password;
    if (!password) {
      newErrors.password = "Mật khẩu là bắt buộc.";
    } else {
      const valid =
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[^A-Za-z0-9]/.test(password);
      if (!valid) {
        newErrors.password =
          "Mật khẩu phải từ 8 ký tự, chứa chữ hoa, chữ thường, số và ký tự đặc biệt.";
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Xác nhận mật khẩu là bắt buộc.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp.";
    }

    if (formData.phoneNumber && !/^[0-9]{9,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber =
        "Số điện thoại không hợp lệ (Chỉ nhập số và 9–15 chữ số).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showToastMessage = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleRegister = async () => {
    if (!validate() || isLoading) return; // nếu form không hợp lệ hoặc đang loading thì không xử lý

    setIsLoading(true);
    try {
      const response = await registerUser(formData);

      if (response.success) {
        const { userId, fullName, email } = response.data;

        console.log("User ID:", userId);
        console.log("Full Name:", fullName);
        console.log("Email:", email);

        toast({
          title: "Thành công",
          description: response.message,
          variant: "success",
        });
        navigate("/login");
      } else {
        toast({
          title: "Đăng ký thất bại",
          description: response.message,
          variant: "destructive",
        });
      }
    } catch (err) {
      // Xử lý lỗi trả về từ API hoặc lỗi khác
      showToastMessage(
        err?.response?.data?.message || err?.message || "Đăng ký thất bại!",
        "error"
      );
    } finally {
      setIsLoading(false); // Dù thành công hay thất bại cũng kết thúc loading
    }
  };

  return (
    <div className="relative bg-[url('https://i.pinimg.com/736x/ed/47/1b/ed471bb12dd54f43cc7b7b5877371853.jpg')] w-screen h-screen bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-opacity-50 backdrop-blur-sm"></div>
      <div className="min-h-screen relative overflow-hidden animate-gradientShift ">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-20 animate-float blur-sm"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-sky-200 to-blue-200 rounded-full opacity-20 animate-float-delay blur-sm"></div>
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full opacity-15 animate-pulse-slow"></div>
          <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-gradient-to-r from-sky-300 to-blue-300 rounded-full opacity-20 animate-pulse-slower"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full opacity-25 animate-float-reverse"></div>
          <div className="absolute bottom-1/4 right-1/3 w-20 h-20 bg-gradient-to-bl from-blue-300 to-sky-300 rounded-full opacity-15 animate-float-slow"></div>

          {/* Floating particles */}
          <div className="absolute top-20 left-20 w-3 h-3 bg-white rounded-full opacity-60 animate-particle-float"></div>
          <div className="absolute top-40 right-32 w-2 h-2 bg-blue-200 rounded-full opacity-50 animate-particle-float-delay"></div>
          <div className="absolute bottom-32 left-16 w-4 h-4 bg-cyan-200 rounded-full opacity-40 animate-particle-float-slow"></div>
          <div className="absolute bottom-20 right-20 w-2 h-2 bg-sky-200 rounded-full opacity-60 animate-particle-float-reverse"></div>
          <div className="absolute top-60 left-1/3 w-3 h-3 bg-blue-300 rounded-full opacity-45 animate-particle-float-slower"></div>
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center  px-4">
          <div
            className="max-w-6xl w-full bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden 
                        grid grid-cols-1 lg:grid-cols-2 animate-slideUp"
          >
            {/* Medical themed left side */}
            <div className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 p-12 flex flex-col justify-center items-center text-white overflow-hidden animate-gradientShimmer">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full animate-pulse-slow"></div>
                <div className="absolute bottom-20 right-10 w-16 h-16 border-2 border-white rounded-full animate-pulse delay-500"></div>
                <div className="absolute top-1/2 left-20 w-12 h-12 border-2 border-white rounded-full animate-pulse-slower delay-1000"></div>
                <div className="absolute top-1/3 right-1/3 w-8 h-8 border border-white rounded-full animate-pulse delay-700"></div>
                <div className="absolute bottom-1/3 left-1/4 w-6 h-6 border border-white rounded-full animate-pulse-slow delay-300"></div>
              </div>

              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-600/20 via-transparent to-cyan-100/20 animate-gradientSweep"></div>

              <div className="relative z-10 text-center animate-fadeIn">
                <div className="mb-8 transform animate-bounce">
                  <Heart className="w-20 h-20 mx-auto mb-4 text-white drop-shadow-lg" />
                </div>

                {/* //back button */}
                <div
                onClick={() => navigate(-1)}
                  className="absolute flex items-center justify-center w-[77px] h-[77px] -top-30 -left-2 rounded-4xl hover:bg-blue-400 transition-all duration-300"
                >
                  <span>
                    <ArrowBackIcon fontSize="large" />
                  </span>
                </div>
                <h1 className="text-4xl font-bold mb-6 leading-tight">
                  Chào mừng đến với
                  <span className="block text-cyan-200 text-3xl mt-2">
                    ReproTrack
                  </span>
                </h1>

                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Đăng ký để trải nghiệm dịch vụ chăm sóc sức khỏe tốt nhất
                </p>

                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-3 text-blue-100">
                    <CheckCircle className="w-5 h-5" />
                    <span>Tư vấn y tế chuyên nghiệp</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3 text-blue-100">
                    <CheckCircle className="w-5 h-5" />
                    <span>Theo dõi sức khỏe 24/7</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3 text-blue-100">
                    <CheckCircle className="w-5 h-5" />
                    <span>Bảo mật thông tin tuyệt đối</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration form */}
            <div className="p-12 relative">
              <div className="animate-slideInRight">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Tạo tài khoản
                  </h2>
                  <p className="text-gray-600">
                    Điền thông tin để bắt đầu hành trình chăm sóc sức khỏe
                  </p>
                </div>

                <div className="space-y-2">
                  <InputField
                    name="fullName"
                    placeholder="Họ và tên"
                    value={formData.fullName}
                    onChange={handleChange}
                    error={errors.fullName}
                    icon={User}
                  />

                  <InputField
                    name="email"
                    type="email"
                    placeholder="Địa chỉ email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    icon={Mail}
                  />

                  <InputField
                    name="password"
                    type="password"
                    placeholder="Mật khẩu"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    icon={Lock}
                  />

                  <InputField
                    name="confirmPassword"
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    icon={Lock}
                  />

                  <InputField
                    name="phoneNumber"
                    placeholder="Số điện thoại"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    error={errors.phoneNumber}
                    icon={Phone}
                  />
                </div>

                <div className="flex flex-col space-y-4 mt-8">
                  <button
                    onClick={handleRegister}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 px-6 rounded-xl 
                           font-semibold text-lg transition-all duration-300 transform hover:scale-105 
                           hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed
                           focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Đang xử lý...</span>
                      </div>
                    ) : (
                      "Đăng ký tài khoản"
                    )}
                  </button>

                  <div className="flex space-x-3">
                    <motion.button
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      whileHover={{
                        scale: 1.02,
                        backgroundColor: "#f8fafc",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      // onClick={handleGoogleLogin}
                      type="button"
                      className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300"
                    >
                      <motion.div
                        initial={{ rotate: -180 }}
                        animate={{ rotate: 0 }}
                        transition={{ delay: 1, type: "spring" }}
                        className="flex items-center justify-center"
                      >
                        <img
                          src={GoogleLogo}
                          alt="Google"
                          className="w-6 h-6 object-contain"
                        />
                      </motion.div>
                      <span>Đăng ký với Google</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Toast notification */}
        {showToast && (
          <div
            className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-50 
                        px-6 py-4 rounded-xl shadow-2xl animate-slideDown
                        ${
                          toastType === "success"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
          >
            <div className="flex items-center space-x-3">
              {toastType === "success" ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                <AlertCircle className="w-6 h-6" />
              )}
              <span className="font-medium">{toastMessage}</span>
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes gradientFlow3 {
            0%,
            50% {
              background: linear-gradient(60deg, transparent, #e0f2fe, #dbeafe);
              transform: translateX(2%) translateY(-3%) scale(1.05);
            }
            100% {
              background: linear-gradient(
                240deg,
                transparent,
                #cffafe,
                #e0f2fe
              );
              transform: translateX(0%) translateY(0%) scale(1);
            }
          }

          @keyframes gradientShift {
            0%,
            100% {
              filter: hue-rotate(0deg) brightness(1);
            }
            25% {
              filter: hue-rotate(30deg) brightness(1.1);
            }
            50% {
              filter: hue-rotate(60deg) brightness(0.9);
            }
            75% {
              filter: hue-rotate(90deg) brightness(1.05);
            }
          }

          @keyframes gradientSweep {
            0%,
            100% {
              background: linear-gradient(
                45deg,
                rgba(14, 165, 233, 0.2),
                transparent,
                rgba(6, 182, 212, 0.2)
              );
              transform: translateX(0%) translateY(0%);
            }
            50% {
              background: linear-gradient(
                225deg,
                rgba(6, 182, 212, 0.3),
                transparent,
                rgba(14, 165, 233, 0.1)
              );
              transform: translateX(5%) translateY(-3%);
            }
          }

          @keyframes float {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg) scale(1);
            }
            33% {
              transform: translateY(-15px) rotate(120deg) scale(1.1);
            }
            66% {
              transform: translateY(-25px) rotate(240deg) scale(0.9);
            }
          }

          @keyframes float-delay {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg) scale(1);
            }
            33% {
              transform: translateY(-20px) rotate(-120deg) scale(0.95);
            }
            66% {
              transform: translateY(-35px) rotate(-240deg) scale(1.05);
            }
          }

          @keyframes float-reverse {
            0%,
            100% {
              transform: translateY(0px) rotate(360deg) scale(1);
            }
            50% {
              transform: translateY(20px) rotate(180deg) scale(1.2);
            }
          }

          @keyframes float-slow {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-10px) rotate(180deg);
            }
          }

          @keyframes particle-float {
            0%,
            100% {
              transform: translateY(0px) translateX(0px) opacity(0.6);
            }
            25% {
              transform: translateY(-20px) translateX(10px) opacity(0.8);
            }
            50% {
              transform: translateY(-40px) translateX(-5px) opacity(0.4);
            }
            75% {
              transform: translateY(-20px) translateX(-10px) opacity(0.7);
            }
          }

          @keyframes particle-float-delay {
            0%,
            100% {
              transform: translateY(0px) translateX(0px) opacity(0.5);
            }
            33% {
              transform: translateY(-15px) translateX(-8px) opacity(0.8);
            }
            66% {
              transform: translateY(-30px) translateX(12px) opacity(0.3);
            }
          }

          @keyframes particle-float-slow {
            0%,
            100% {
              transform: translateY(0px) translateX(0px) opacity(0.4);
            }
            50% {
              transform: translateY(-25px) translateX(15px) opacity(0.7);
            }
          }

          @keyframes particle-float-reverse {
            0%,
            100% {
              transform: translateY(0px) translateX(0px) opacity(0.6);
            }
            50% {
              transform: translateY(25px) translateX(-12px) opacity(0.3);
            }
          }

          @keyframes particle-float-slower {
            0%,
            100% {
              transform: translateY(0px) translateX(0px) opacity(0.45);
            }
            50% {
              transform: translateY(-18px) translateX(8px) opacity(0.8);
            }
          }

          @keyframes pulse-slow {
            0%,
            100% {
              opacity: 0.3;
              transform: scale(1);
            }
            50% {
              opacity: 0.8;
              transform: scale(1.1);
            }
          }

          @keyframes pulse-slower {
            0%,
            100% {
              opacity: 0.2;
              transform: scale(1);
            }
            50% {
              opacity: 0.6;
              transform: scale(1.05);
            }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-10px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateX(-50%) translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(-50%) translateY(0);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          .animate-gradientFlow {
            animation: gradientFlow 8s ease-in-out infinite;
          }
          .animate-gradientFlow2 {
            animation: gradientFlow2 12s ease-in-out infinite;
          }
          .animate-gradientFlow3 {
            animation: gradientFlow3 10s ease-in-out infinite;
          }
          .animate-gradientShift {
            animation: gradientShift 15s ease-in-out infinite;
          }
          .animate-gradientShimmer {
            animation: gradientShimmer 6s ease-in-out infinite;
          }
          .animate-gradientSweep {
            animation: gradientSweep 8s ease-in-out infinite;
          }
          .animate-float {
            animation: float 8s ease-in-out infinite;
          }
          .animate-float-delay {
            animation: float-delay 10s ease-in-out infinite;
          }
          .animate-float-reverse {
            animation: float-reverse 7s ease-in-out infinite;
          }
          .animate-float-slow {
            animation: float-slow 12s ease-in-out infinite;
          }
          .animate-pulse-slow {
            animation: pulse-slow 4s ease-in-out infinite;
          }
          .animate-pulse-slower {
            animation: pulse-slower 6s ease-in-out infinite;
          }
          .animate-particle-float {
            animation: particle-float 6s ease-in-out infinite;
          }
          .animate-particle-float-delay {
            animation: particle-float-delay 8s ease-in-out infinite;
          }
          .animate-particle-float-slow {
            animation: particle-float-slow 10s ease-in-out infinite;
          }
          .animate-particle-float-reverse {
            animation: particle-float-reverse 7s ease-in-out infinite;
          }
          .animate-particle-float-slower {
            animation: particle-float-slower 9s ease-in-out infinite;
          }
          .animate-slideUp {
            animation: slideUp 0.8s ease-out;
          }
          .animate-slideInRight {
            animation: slideInRight 0.8s ease-out 0.2s both;
          }
          .animate-slideIn {
            animation: slideIn 0.3s ease-out;
          }
          .animate-slideDown {
            animation: slideDown 0.3s ease-out;
          }
          .animate-fadeIn {
            animation: fadeIn 1s ease-out 0.5s both;
          }
        `}</style>
      </div>
    </div>
  );
};

export default RegisterPage;
