import { useState, useEffect } from 'react';
import { registerUser } from '../../api/customer/registerUser';
import InputField from '../../components/ui/InputField';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from '../../assets/Surgery.jpg'; // Bạn có thể dùng ảnh của bạn

const RegisterPage = () => {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');
  const [showToast, setShowToast] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Họ và tên là bắt buộc.';
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = 'Họ và tên phải ít nhất 2 ký tự.';
    } else if (formData.fullName.length > 50) {
      newErrors.fullName = 'Họ và tên không được quá 50 ký tự.';
    } else if (/[!@#$%^&*(),.?":{}|<>]/.test(formData.fullName)) {
      newErrors.fullName = 'Họ và tên không được chứa ký tự đặc biệt.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email là bắt buộc.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không đúng định dạng.';
    }

    const password = formData.password;
    if (!password) {
      newErrors.password = 'Mật khẩu là bắt buộc.';
    } else {
      const valid = password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[^A-Za-z0-9]/.test(password);
      if (!valid) {
        newErrors.password = 'Mật khẩu phải từ 8 ký tự, chứa chữ hoa, chữ thường, số và ký tự đặc biệt.';
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Xác nhận mật khẩu là bắt buộc.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp.';
    }

    if (formData.phoneNumber && !/^[0-9]{9,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Số điện thoại không hợp lệ (Chỉ nhập số và 9–15 chữ số).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
    });
    setErrors({});
  };

  useEffect(() => {
    if (showToast) {
      toast[toastType](toastMessage);
      setShowToast(false);
    }
  }, [showToast, toastMessage, toastType]);

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      await registerUser(formData);
      setToastMessage('Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.');
      setToastType('success');
      setShowToast(true);
      setTimeout(() => {
        navigate('/email-verification', { state: { email: formData.email } });
      }, 2000);
    } catch (err) {
      setToastMessage(err?.response?.data?.message || 'Đăng ký thất bại!');
      setToastType('error');
      setShowToast(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center py-10 px-4">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Hình ảnh bên trái */}
        <div className="hidden md:block">
          <img
            src={Image}
            alt="Đăng ký"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form đăng ký */}
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 uppercase">Đăng ký</h2>

          <InputField
            name="fullName"
            placeholder="Họ và tên"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
          />
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
            type="password"
            placeholder="Mật khẩu"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          <InputField
            name="confirmPassword"
            type="password"
            placeholder="Xác nhận mật khẩu"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />
          <InputField
            name="phoneNumber"
            placeholder="Số điện thoại (tuỳ chọn)"
            value={formData.phoneNumber}
            onChange={handleChange}
            error={errors.phoneNumber}
          />

          <div className="flex justify-between mt-6">
            <button
              className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm hover:bg-red-200"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-200"
              onClick={() => navigate('/')}
            >
              Đăng ký bằng Google
            </button>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              onClick={handleRegister}
            >
              Đăng ký
            </button>
          </div>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default RegisterPage;
