import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import InputField from '../../components/ui/InputField';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState(location.state?.message || '');
  const [messageType, setMessageType] = useState(location.state?.type || '');
  const [showPassword, setShowPassword] = useState(false);

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
    if (!validate()) return;

    try {
      // const res = await loginUser(formData);
      toast.success('Đăng nhập thành công!');
      navigate('/');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Đăng nhập thất bại!');
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-xl overflow-hidden flex flex-col md:flex-row">
        {/* Ảnh bên trái */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://i.pinimg.com/736x/47/a4/44/47a4448f2df0046ee1f7bed28f87e551.jpg"
            alt="Login"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form bên phải */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Đăng nhập</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            <InputField
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              icon={
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </span>
              }
            />

            <div className="text-right text-sm">
              <Link to="/forgot-password" className="text-blue-500 hover:underline">
                Quên mật khẩu?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Đăng nhập
            </button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full border border-gray-400 flex items-center justify-center py-2 rounded hover:bg-gray-100 transition"
            >
              <img
                src="https://img.icons8.com/color/16/000000/google-logo.png"
                alt="Google"
                className="mr-2"
              />
              Đăng nhập với Google
            </button>
          </form>

          <div className="text-center mt-6 text-sm text-gray-600">
            <span>Chưa có tài khoản? </span>
            <Link to="/register" className="text-blue-500 hover:underline">
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
