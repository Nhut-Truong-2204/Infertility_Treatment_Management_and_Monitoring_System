import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { toast, ToastContainer, Flip } from 'react-toastify';
import { motion} from "framer-motion";
import 'react-toastify/dist/ReactToastify.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { blue } from "@mui/material/colors";
import GoogleLogo from "../../assets/GoogleLogo.png";
import Background from "../../assets/DoctorLogin.jpg";

export default function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [showPassword] = useState(false);

    const formContainerVariants = {
        hidden: { 
            opacity: 0,
            y: 20
        },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                duration: 1,
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.3
            }
        }
    };

    const formItemVariants = {
        hidden: { 
            opacity: 0,
            x: -20,
            y: 10
        },
        show: { 
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 24
            }
        }
    };

    const submitButtonVariants = {
        idle: { scale: 1 },
        loading: {
            scale: [1, 0.98, 1],
            transition: {
                duration: 1.5,
                repeat: Infinity
            }
        },
        success: {
            backgroundColor: ["#3B82F6", "#10B981"],
            transition: { duration: 0.5 }
        },
        error: {
            x: [-10, 10, -10, 10, 0],
            transition: { duration: 0.5 }
        }
    };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location.state?.message) {
      toast[location.state.type](location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate() || loading) return;

        setLoading(true);
        try {
            // TODO: Add your login API call here
            toast.success("Đăng nhập thành công!");
            navigate("/");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Đăng nhập thất bại!");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        try {
            setLoading(true);
            // TODO: Thêm xử lý đăng nhập Google ở đây
            toast.success("Đăng nhập Google thành công!");
            navigate("/");
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
        style={{ 
            backgroundImage: `url(${Background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
    >
        {/* Thêm dark overlay */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-black/50"  // Độ tối 50%, có thể điều chỉnh
        />

        {/* Content wrapper */}
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
                        whileHover={{ 
                            color: "#3B82F6",
                            transition: { duration: 0.2 }
                        }}
                    >
                        <Stack direction="row" spacing={2}>
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.8 }}
                            >
                                <Avatar sx={{ bgcolor: blue[700] }}>R</Avatar>
                            </motion.div>
                        </Stack>
                        <motion.span
                            onClick={() => navigate('/')}
                            whileTap={{ scale: 0.95 }}
                        >
                            ReproTrack
                        </motion.span>
                    </motion.div>
                </motion.div>

                <div className="relative mb-5">
                <motion.h2 
                    className="text-6xl font-bold text-center font-['Inter'] relative"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                        duration: 0.8, 
                        type: "spring",
                        bounce: 0.5 
                    }}
                >
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent blur-[0.5px]">
                        Đăng nhập
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-white-500 to-blue-500 bg-clip-text text-transparent mix-blend-overlay">
                        Đăng nhập
                    </span>
                    <span className="relative bg-gradient-to-r from-blue-600 to-white-500 bg-clip-text text-transparent">
                        Đăng nhập
                    </span>
                </motion.h2>

                <motion.div
                    initial={{ width: 1 }}
                    animate={{ width: "380px" }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="h-1 bg-gradient-to-r from-blue-600 via-white-500 to-blue-300 mx-auto mt-4 rounded-full"
                />
                </div>

                <motion.form 
                  variants={formContainerVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >

                    <motion.div 
                      variants={formItemVariants}
                      className="space-y-2"
                    >
                        <motion.label 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </motion.label>

                        <motion.input
                          whileFocus={{ scale: 1.01 }}
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                            } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200`}
                          placeholder="example@gmail.com"
                        />

                        {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-red-500 text-sm mt-3"
                        >
                          {errors.email}
                        </motion.p>
                        )}
                        </motion.div>

                    <motion.div 
                      variants={formItemVariants}
                      className="space-y-2"
                    >
                        <motion.label 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="block text-sm font-medium text-gray-700"
                        >
                          Mật khẩu
                        </motion.label>
                        <motion.input
                          whileFocus={{ scale: 1.01 }}
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.password ? 'border-red-500' : 'border-gray-300'
                            } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200`}
                          placeholder="••••••••"
                        />
                        {errors.password && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-red-500 text-sm mt-3"
                        >
                        {errors.password}
                        </motion.p>
                        )}
                        </motion.div>

                    <motion.div 
                      variants={formItemVariants}
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

                    <motion.div variants={formItemVariants}>
                    <motion.button
                        variants={submitButtonVariants}
                        initial="idle"
                        animate={loading ? "loading" : "idle"}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300
                        ${loading ? "opacity-80" : ""}`}
                >
                    <motion.span
                        animate={loading ? {
                        opacity: [1, 0.7, 1],
                        transition: { duration: 1.5, repeat: Infinity }
                    } : {}}
                    >
                        {loading ? (
                        <div className="flex items-center justify-center space-x-2">
                    <motion.span
                        animate={{
                        rotate: 360
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear"
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

                <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    whileHover={{ 
                        scale: 1.02,
                        backgroundColor: "#f8fafc",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGoogleLogin}
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
                    <span>Đăng nhập với Google</span>
                </motion.button>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="my-6 flex items-center justify-center text-sm"
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative"
                    >
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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-6 text-center"
                >
                </motion.div>
                </motion.div>
                </div>
                
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
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
