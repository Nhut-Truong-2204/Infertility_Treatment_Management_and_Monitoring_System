import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";

export default function CusRegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register info:", form);
    // Xử lý logic gửi form ở đây
  };

  return (
    <div className="min-h-screen bg-[#f0f7ff] flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md"
      >
        <Typography
          variant="h5"
          className="text-center text-[#032F6C] font-bold mb-6 uppercase"
        >
          Đăng Ký
        </Typography>

        <div className="space-y-4">
          <TextField
            label="Họ và Tên"
            variant="outlined"
            fullWidth
            name="name"
            value={form.name}
            onChange={handleChange}
            InputLabelProps={{ sx: { color: "#032F6C" } }}
          />
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
          <TextField
            label="Xác nhận mật khẩu"
            variant="outlined"
            fullWidth
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
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
          Đăng ký
        </Button>

        <div className="text-center mt-4 text-sm text-gray-600">
          Đã có tài khoản?{" "}
          <a
            href="#"
            className="text-[#23A0FF] hover:underline font-medium transition-colors"
          >
            Đăng nhập
          </a>
        </div>
      </form>
    </div>
  );
}
