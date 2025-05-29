import React, { useState } from "react";
import { Button, TextField, Typography, Alert, CircularProgress } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { verifyEmail, resendVerificationCode } from "../../api/customer/verifyEmail";

export default function EmailVerificationPage() {
  const [code, setCode] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const handleVerify = async (e) => {
    e.preventDefault();
    // Gọi API xác thực mã ở đây
    if (!code.trim()) {
      setError("Vui lòng nhập mã xác thực");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await verifyEmail({ email, code });
      setSuccess("Xác thực email thành công!");
      // Chuyển hướng đến trang đăng nhập sau 2 giây
      setTimeout(() => {
        navigate("/login", { 
          state: { 
            message: "Email đã được xác thực thành công. Vui lòng đăng nhập.", 
            type: "success" 
          } 
        });
      }, 2000);
      
    } catch (err) {
      setError(err?.response?.data?.message || "Có lỗi xảy ra khi xác thực email");
    } finally {
      setLoading(false);
    }
  };
  
  const handleResendCode = async () => {
    if (!email) {
      setError("Không tìm thấy email");
      return;
    }

    setResending(true);
    setError("");
    
    try {
      const result = await resendVerificationCode(email);
      setSuccess(result.message);
    } catch (err) {
      setError(err?.response?.data?.message || "Không thể gửi lại mã xác thực");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f7ff] flex items-center justify-center p-4">
      <form className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md" onSubmit={handleVerify}>
        
        <Typography 
        marginBottom="20px"
        variant="h5" 
        className="text-center text-[#032F6C] font-bold mb-6 uppercase">
          Xác thực Email
        </Typography>

        <Typography 
        marginBottom="20px"
        className="mb-4 text-center text-gray-700">
          {email
            ? `Vui lòng kiểm tra email ${email} để lấy mã xác thực.`
            : "Vui lòng kiểm tra email của bạn để lấy mã xác thực."}
        </Typography>

        {error && <Alert severity="error" className="mb-4">{error}</Alert>}
        {success && <Alert severity="success" className="mb-4">{success}</Alert>}

        <TextField
          label="Mã xác thực"
          variant="outlined"
          fullWidth
          margin="normal"
          value={code}
          onChange={e => setCode(e.target.value)}
        />

        <div className="mt-4 text-center">
        <Button
          onClick={handleResendCode}
          disabled={resending}
          sx={{
            color: '#23A0FF',
            '&:hover': {
            backgroundColor: 'rgba(35, 160, 255, 0.04)',
          },
        }}
        >
        {resending ? 'Đang gửi...' : 'Gửi lại mã xác thực'}
        </Button>
        </div>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{
            marginTop: 3,
            backgroundColor: "#23A0FF",
            fontWeight: "bold",
            fontSize: "16px",
            borderRadius: "8px",
            paddingY: "12px",
            "&:hover": {
              backgroundColor: "#1B7ACD",
            },
          }}
          >
        {loading ? (
        <>
        <CircularProgress size={24} color="inherit" className="mr-2" />
            Đang xử lý...
        </>
        ) : (
            "Xác thực"
        )}
        </Button>
      </form>
    </div>
  );
}