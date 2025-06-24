import React, { useState, useEffect } from "react";
import { Typography, Alert, CircularProgress, Avatar, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmail, resendVerificationCode } from "../../api/customer/verifyEmail";
import { motion } from "framer-motion";
import { Syringe } from "phosphor-react";
import Background from "../../assets/VerificationPage.jpg";

export default function EmailVerificationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!code) {
      setError("Vui lòng nhập mã xác thực");
      return;
    }

    if (!email) {
      setError("Email không hợp lệ");
      return;
    }

    setLoading(true);
    try {
      const response = await verifyEmail({ email, code });
      if (response.success) {
        setSuccess(response.message || "Xác thực email thành công!");
        setTimeout(() => {
          navigate('/login', {
            state: {
              message: "Email đã được xác thực. Vui lòng đăng nhập.",
              type: "success"
            }
          });
        }, 2000);
      }
    } catch (err) {
      setError(err?.message || "Xác thực thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      setError("Email không hợp lệ");
      return;
    }
    setResending(true);
    setError("");
    setSuccess("");

    try {
      const response = await resendVerificationCode(email);
      if (response.success) {
        setSuccess(response.message || "Đã gửi lại mã xác thực. Vui lòng kiểm tra email của bạn.");
      }
    } catch (err) {
      setError(err?.message || "Không thể gửi lại mã xác thực. Vui lòng thử lại.");
    } finally {
      setResending(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

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

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white bg-opacity-95 backdrop-blur-sm p-8 rounded-xl shadow-2xl max-w-md w-full mx-4"
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

          <div className="relative mb-5 mt-5">
            <motion.h2
              className="text-3xl font-bold text-center font-['Inter'] relative"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent blur-[0.5px]">
                Xác thực Email
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-white-500 to-blue-500 bg-clip-text text-transparent mix-blend-overlay">
                Xác thực Email
              </span>
              <span className="relative bg-gradient-to-r from-blue-600 to-white-500 bg-clip-text text-transparent">
                Xác thực Email
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
            onSubmit={handleVerify}
            className="space-y-6"
          >
            <motion.div
              variants={formItemVariants}
              className="text-center"
            >
              <Typography className="text-gray-700">
                {email
                  ? `Vui lòng kiểm tra email ${email} để lấy mã xác thực.`
                  : "Vui lòng kiểm tra email của bạn để lấy mã xác thực."}
              </Typography>
            </motion.div>

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <Alert severity="success" className="mb-4">{success}</Alert>
              </motion.div>
            )}

            <motion.div variants={formItemVariants} className="space-y-2 mt-10">
              <motion.label
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="block text-sm font-medium text-gray-700"
              >
                Mã xác thực
              </motion.label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  // Clear error when user starts typing
                  if (error) setError("");
                }}
                className={`w-full px-4 py-3 rounded-lg border ${error ? 'border-red-500 bg-red-50/50' : 'border-gray-300'
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200`}
                placeholder="Nhập mã xác thực"
              />
              {error && code === "" && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {error}
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={formItemVariants} className="flex justify-center">
              <motion.button
                type="button"
                onClick={handleResendCode}
                disabled={resending}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`text-blue-600 hover:text-blue-800 font-medium text-sm relative
                  ${resending ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {resending ? (
                  <motion.span
                    animate={{
                      opacity: [1, 0.7, 1],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Đang gửi...
                  </motion.span>
                ) : (
                  <>
                    Gửi lại mã xác thực
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </>
                )}
              </motion.button>
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg 
                font-semibold hover:shadow-lg transition-all duration-300 ${loading ? 'opacity-80' : ''}`}
            >
              {loading ? (
                <motion.div
                  className="flex items-center justify-center space-x-2"
                  animate={{
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <CircularProgress size={24} color="inherit" className="mr-2" />
                  <span>Đang xử lý...</span>
                </motion.div>
              ) : (
                "Xác thực"
              )}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </motion.div>
  );
}