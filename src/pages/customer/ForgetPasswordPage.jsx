import React, { useState } from "react";
import { Typography, Alert, Avatar, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Syringe } from "phosphor-react";
import Background from "../../assets/ForgotPassword.jpg";
import { requestPasswordReset, validateResetToken } from "../../api/customer/forgotPassword";

export default function ForgetPasswordPage() {
    const navigate = useNavigate();
    const [showVerification, setShowVerification] = useState(false);
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [verificationDigits, setVerificationDigits] = useState(['', '', '', '', '', '']);

    const [formData, setFormData] = useState({
        email: "",
        verificationCode: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear errors when user starts typing
        if (name === 'email') {
            setErrors({});
            setError('');
        }
    };

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

    // Handle email submission
    const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email) {
            setError("Vui lòng nhập email");
            return;
        }
        if (!EMAIL_REGEX.test(formData.email)) {
            setError("Email không hợp lệ");
            return;
        }

        setLoading(true);
        try {
            const response = await requestPasswordReset(formData.email);
            if (response.success) {
                setError("");
                setShowVerification(true);
                // Lưu email vào state để sử dụng cho bước xác thực
                setFormData(prev => ({
                    ...prev,
                    verificationCode: ""
                }));
            }
        } catch (err) {
            setError(err?.message || "Không thể gửi mã xác nhận. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerificationSubmit = async (e) => {
        e.preventDefault();
        if (!formData.verificationCode) {
            setError("Vui lòng nhập mã xác nhận");
            return;
        }

        setLoading(true);
        try {
            const response = await validateResetToken(formData.verificationCode, formData.email);
            if (response.success) {
                // Chuyển đến trang đổi mật khẩu với token và email
                navigate(`/change-password?token=${formData.verificationCode}&email=${formData.email}`);
            }
        } catch (err) {
            setError(err?.message || "Mã xác nhận không hợp lệ");
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        setLoading(true);
        try {
            // Tạm thời giữ logic giả lập gửi mã
            await new Promise(resolve => setTimeout(resolve, 1000)); // Giả lập API call
            setVerificationDigits(['', '', '', '', '', '']);
            setFormData(prev => ({
                ...prev,
                verificationCode: ''
            }));
            setError('');
            // Hiển thị thông báo thành công
            setError("Mã xác nhận mới đã được gửi đến email của bạn");
        } catch (err) {
            setError("Có lỗi xảy ra khi gửi lại mã xác nhận.");
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

                    <div className="text-center">
                        <motion.h2
                            className="text-4xl font-bold text-center font-['Inter'] relative mb-8"
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                type: "spring",
                                bounce: 0.5
                            }}
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent blur-[0.5px]">
                                Quên mật khẩu
                            </span>
                            <span className="absolute inset-0 bg-gradient-to-r from-white-500 to-blue-500 bg-clip-text text-transparent mix-blend-overlay">
                                Quên mật khẩu
                            </span>
                            <span className="relative bg-gradient-to-r from-blue-600 to-white-500 bg-clip-text text-transparent">
                                Quên mật khẩu
                            </span>
                        </motion.h2>

                        <motion.div
                            initial={{ width: 1 }}
                            animate={{ width: "380px" }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="h-1 mb-8 bg-gradient-to-r from-blue-600 via-white-500 to-blue-300 mx-auto mt-4 rounded-full"
                        />

                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            key={showVerification ? "verification" : "email"}
                            className="mb-8" // Key để trigger animation khi text thay đổi
                        >
                            <Typography
                                variant="body1"
                                className="text-gray-800 text-lg font-medium"
                            >
                                {!showVerification
                                    ? "Vui lòng điền email gắn với tài khoản của bạn để nhận mã xác nhận thay đổi mật khẩu"
                                    : "Mã xác nhận đã được gửi về email của bạn. Vui lòng kiểm tra email và nhập mã xác nhận"
                                }
                            </Typography>
                        </motion.div>
                    </div>

                    {/* Alert Messages */}
                    {error && (
                        <motion.div
                            className="mb-6"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <Alert severity="error">{error}</Alert>
                        </motion.div>
                    )}

                    {/* Form Section */}
                    {!showVerification ? (
                        <motion.form
                            variants={formContainerVariants}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            onSubmit={handleEmailSubmit}
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
                                    className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'
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
                                                <span>Đang gửi...</span>
                                            </div>
                                        ) : (
                                            "Gửi mã xác nhận"
                                        )}
                                    </motion.span>
                                </motion.button>
                            </motion.div>
                        </motion.form>
                    ) : (
                        <motion.form
                            variants={formContainerVariants}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            onSubmit={handleVerificationSubmit}
                            className="space-y-6"
                        >
                            <motion.div
                                variants={formItemVariants}
                                className="space-y-4"
                            >
                                <div className="flex flex-col items-center space-y-4">
                                    <motion.h3
                                        className="text-3xl mt-4 font-['Inter'] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 tracking-tight"
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 20
                                        }}
                                    >
                                        Nhập mã xác nhận
                                    </motion.h3>
                                </div>

                                <motion.div
                                    className="w-full"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 25,
                                        delay: 0.2
                                    }}
                                >
                                    <input
                                        type="text"
                                        className={`w-full h-14 text-center text-3xl font-semibold border-2 rounded-lg
                                    ${error ? 'border-red-500' : 'border-gray-300'}
                                    focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                                    transition-all duration-300 ease-in-out
                                    hover:border-blue-400
                                    bg-white/50 backdrop-blur-sm
                                    shadow-sm`}
                                        value={verificationDigits.join('')}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                                            const newDigits = value.split('').concat(Array(6 - value.length).fill(''));
                                            setVerificationDigits(newDigits);
                                            setFormData(prev => ({
                                                ...prev,
                                                verificationCode: value
                                            }));
                                        }}
                                        maxLength={6}
                                    />
                                </motion.div>
                            </motion.div>

                            <motion.div
                                className="flex justify-between items-center mt-8 ml-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <motion.button
                                    type="button"
                                    onClick={handleResendCode}
                                    disabled={loading}
                                    className={`text-blue-600 mt-4 hover:text-blue-700 flex items-center space-x-2
                                    px-3 py-2 rounded-lg hover:bg-blue-50 transition-all duration-300
                                    ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <motion.span
                                        animate={loading ? {
                                            rotate: 360,
                                            transition: { duration: 1, repeat: Infinity, ease: "linear" }
                                        } : {}}
                                        className="inline-block"
                                    >
                                        {loading ? '⭕' : '↻'}
                                    </motion.span>
                                    <span>{loading ? 'Đang gửi...' : 'Gửi lại mã'}</span>
                                </motion.button>

                                <motion.button
                                    variants={submitButtonVariants}
                                    initial="idle"
                                    animate={loading ? "loading" : "idle"}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={loading || verificationDigits.some(digit => !digit)}
                                    className={`bg-gradient-to-r from-blue-500 to-blue-600 text-white 
                                    px-4 py-2.5 rounded-lg font-medium mt-4
                                    transition-all duration-300 ease-out
                                ${loading || verificationDigits.some(digit => !digit)
                                            ? 'opacity-60 cursor-not-allowed'
                                            : 'hover:from-blue-600 hover:to-blue-700'}`}
                                >
                                    {loading ? (
                                        <div className="flex items-center space-x-2">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{
                                                    duration: 1,
                                                    repeat: Infinity,
                                                    ease: "linear"
                                                }}
                                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                            />
                                            <span>Đang xác nhận...</span>
                                        </div>
                                    ) : (
                                        'Tiếp tục'
                                    )}
                                </motion.button>
                            </motion.div>
                        </motion.form>
                    )}

                    {/* Back to Login Link */}
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
            </div>
        </motion.div>
    );
}