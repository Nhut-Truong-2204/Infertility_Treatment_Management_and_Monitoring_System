import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function LoginPage() {
    const [form, setForm] = useState({
        email: "",
        password: "",
      });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login info:", form);
    }

    const handleGoogleLogin = () => {
        console.log("Google login clicked");
    };

    return (
        <div className="min-h-screen bg-[#f0f7ff] flex items-center justify-center p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md"
            >
                <Typography
                    marginBottom="20px"
                    variant="h5"
                    className="text-center text-[#032F6C] font-bold mb-6 uppercase"
                >
                    Đăng Nhập
                </Typography>

                <div className="space-y-4">
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        InputLabelProps={{ style: { color: "#032F6C" } }}
                    />
                    <TextField
                        label="Mật khẩu"
                        variant="outlined"
                        fullWidth
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        InputLabelProps={{ style: { color: "#032F6C" } }}
                    />
                </div>

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                    marginTop: 3,
                    backgroundColor: "#23A0FF",
                    paddingY: "10px",
                    fontWeight: "bold",
                    fontSize: "16px",
                    borderRadius: "8px",
                    "&:hover": {
                        backgroundColor: "#1B7ACD",
                    },
                }}
                >
                    Đăng Nhập
                </Button>

                <div className="text-center mt-2 text-sm text-gray-600">
                    Chưa có tài khoản?{" "}
                    <Link to="/register" 
                    className="text-[#23A0FF] hover:underline font-medium transition-colors"
                    >
                    Đăng Ký
                    </Link>
                </div>
                
                <div className="text-center mt-2 text-sm text-gray-600">
                    Quên mật khẩu?{" "}
                    <Link
                    to="/forgot-password"
                    className="text-[#23A0FF] hover:underline font-medium transition-colors"
                    >
                    Lấy lại mật khẩu
                    </Link>
                </div>

                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                    marginTop: 2,
                    backgroundColor: "#23A0FF",
                    paddingY: "10px",
                    fontWeight: "bold",
                    fontSize: "16px",
                    borderRadius: "8px",
                    "&:hover": {
                        backgroundColor: "#1B7ACD",
                    },
                }}
                    onClick={handleGoogleLogin}
                    >
                    Đăng nhập bằng Google
                </Button>
            </form>
        </div>
    );
    }