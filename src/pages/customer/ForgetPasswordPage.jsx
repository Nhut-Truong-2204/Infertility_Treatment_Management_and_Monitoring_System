import React, { useState } from "react";
import { Button, TextField, Typography, InputAdornment, Alert } from "@mui/material";

export default function ForgetPasswordPage() {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Gửi mã xác minh
    const handleSendCode = (e) => {
        e.preventDefault();
        if (!email) {
            setError("Vui lòng nhập email.");
            setSuccess("");
            return;
        }
        setError("");
        setSuccess("Mã xác nhận đã được gửi đến email của bạn!");
    };

    // Đặt lại mật khẩu
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !code || !password || !confirmPassword) {
            setError("Vui lòng nhập đầy đủ thông tin.");
            setSuccess("");
            return;
        }
        if (code !== sentCode) {
            setError("Mã xác nhận không đúng.");
            setSuccess("");
            return;
        }
        if (password !== confirmPassword) {
            setError("Mật khẩu xác nhận không khớp.");
            setSuccess("");
            return;
        }
        setError("");
        setSuccess("Đặt lại mật khẩu thành công!");
        // Reset form nếu muốn
        // setEmail(""); setCode(""); setPassword(""); setConfirmPassword("");
    };

    return (
        <div className="min-h-screen bg-[#f0f7ff] flex items-center justify-center p-4">
            <form
                className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md"
                onSubmit={handleSubmit}
                autoComplete="off"
            >
                <Typography
                    marginBottom="20px"
                    variant="h5"
                    className="text-center text-[#032F6C] font-bold mb-6 uppercase"
                >
                    Quên mật khẩu
                </Typography>
                {error && <Alert severity="error" className="mb-4">{error}</Alert>}
                {success && <Alert severity="success" className="mb-4">{success}</Alert>}

                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <TextField
                    label="Mã xác nhận"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button
                                    onClick={handleSendCode}
                                    sx={{
                                        color: "#23A0FF",
                                        fontWeight: "bold",
                                        textTransform: "none",
                                        fontSize: "14px",
                                        p: 0,
                                        minWidth: "unset"
                                    }}
                                    tabIndex={-1}
                                >
                                    Lấy mã xác minh
                                </Button>
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    label="Mật khẩu"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <TextField
                    label="Nhập lại mật khẩu"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
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
                    Đặt lại mật khẩu
                </Button>
            </form>
        </div>
    );
}