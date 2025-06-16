import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Stack, Avatar } from "@mui/material";
import { Syringe } from "phosphor-react";
import Background from "../../assets/UpdatePassword.jpg";
import { resetPassword } from "../../api/customer/forgotPassword";

export default function ChangePasswordPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({});

    // Add form variants from LoginPage
    const formContainerVariants = {
        hidden: { opacity: 0, y: 20 },
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
            transition: { duration: 0.3 }
        }
    };

    const formItemVariants = {
        hidden: { opacity: 0, x: -20, y: 10 },
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
        }
    };

    // Password validation
    const isValidPassword = (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate mật khẩu
        if (!formData.newPassword || !formData.confirmPassword) {
            setError("Vui lòng điền đầy đủ thông tin");
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setError("Mật khẩu xác nhận không khớp");
            return;
        }

        if (!isValidPassword(formData.newPassword)) {
            setError("Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số");
            return;
        }

        useEffect(() => {
            const token = new URLSearchParams(window.location.search).get('token');
            if (!token) {
                navigate('/forgot-password');
            }
        }, [navigate]);

        setLoading(true);
        try {
            // Lấy token từ URL
            const params = new URLSearchParams(window.location.search);
            const token = params.get('token');

            if (!token) {
                throw new Error("Token không hợp lệ");
            }

            const response = await resetPassword(
                token,
                formData.newPassword,
                formData.confirmPassword
            );

            if (response.success) {
                setSuccess("Đổi mật khẩu thành công!");
                // Chuyển về trang login sau 2 giây
                setTimeout(() => {
                    navigate('/login', {
                        state: {
                            message: "Đổi mật khẩu thành công. Vui lòng đăng nhập lại.",
                            type: "success"
                        }
                    });
                }, 2000);
            }
        } catch (err) {
            setError(err?.message || "Đổi mật khẩu thất bại. Vui lòng thử lại.");
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
                    {/* Logo Section */}
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
                                <Avatar sx={{ bgcolor: "#23A0FF" }}>
                                    <Syringe size={20} weight="fill" color="white" />
                                </Avatar>
                            </Stack>
                            <motion.span
                                onClick={() => navigate('/')}
                                whileTap={{ scale: 0.95 }}
                            >
                                ReproTrack
                            </motion.span>
                        </motion.div>
                    </motion.div>

                    {/* Title Section */}
                    <div className="relative mb-5">
                        <motion.h2
                            className="text-4xl font-bold text-center font-['Inter'] relative"
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                type: "spring",
                                bounce: 0.5
                            }}
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent blur-[0.5px]">
                                Đổi mật khẩu
                            </span>
                            <span className="absolute inset-0 bg-gradient-to-r from-white-500 to-blue-500 bg-clip-text text-transparent mix-blend-overlay">
                                Đổi mật khẩu
                            </span>
                            <span className="relative bg-gradient-to-r from-blue-600 to-white-500 bg-clip-text text-transparent">
                                Đổi mật khẩu
                            </span>
                        </motion.h2>

                        <motion.div
                            initial={{ width: 1 }}
                            animate={{ width: "380px" }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="h-1 mb-8 mt-8 bg-gradient-to-r from-blue-600 via-white-500 to-blue-300 mx-auto mt-4 rounded-full"
                        />

                    </div>

                    {/* Error/Success Messages */}
                    {(error || success) && (
                        <motion.div
                            className="mb-6"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className={`p-4 rounded-lg ${success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {success || error}
                            </div>
                        </motion.div>
                    )}

                    {/* Form Section */}
                    <motion.form
                        variants={formContainerVariants}
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        <motion.div variants={formItemVariants} className="space-y-2">
                            <motion.label className="block text-sm font-medium text-gray-700">
                                Mật khẩu mới
                            </motion.label>
                            <motion.input
                                type="password"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-lg border ${errors.newPassword ? 'border-red-500' : 'border-gray-300'
                                    } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200`}
                                placeholder="••••••••"
                            />
                            {errors.newPassword && (
                                <motion.p className="text-red-500 text-sm mt-3">
                                    {errors.newPassword}
                                </motion.p>
                            )}
                        </motion.div>

                        <motion.div variants={formItemVariants} className="space-y-2">
                            <motion.label className="block text-sm font-medium text-gray-700">
                                Xác nhận mật khẩu
                            </motion.label>
                            <motion.input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                    } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200`}
                                placeholder="••••••••"
                            />
                            {errors.confirmPassword && (
                                <motion.p className="text-red-500 text-sm mt-3">
                                    {errors.confirmPassword}
                                </motion.p>
                            )}
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
                                            <span>Đang xử lý...</span>
                                        </div>
                                    ) : (
                                        "Xác nhận"
                                    )}
                                </motion.span>
                            </motion.button>

                            <motion.div
                                className="mt-6 text-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <motion.button
                                    type="button"
                                    whileHover={{
                                        scale: 1.05,
                                        color: "#1B7ACD",
                                        transition: {
                                            type: "spring",
                                            stiffness: 300
                                        }
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 10
                                    }}
                                    className="text-[#23A0FF] font-medium inline-flex items-center space-x-1 mt-4"
                                    onClick={() => navigate('/login')}
                                >
                                    <motion.span
                                        initial={{ x: 5 }}
                                        whileHover={{ x: -3 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                    >
                                        ←
                                    </motion.span>
                                    <span>Quay lại đăng nhập</span>
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </motion.form>
                </motion.div>
            </div>
        </motion.div>
    );
}