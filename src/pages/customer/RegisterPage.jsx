import { useState, useEffect } from 'react';
import { registerUser } from '../../api/customer/registerUser'; // file này hiện đang dùng dữ liệu giả để test
import InputField from '../../components/ui/InputField'; // Giả sử bạn đã tạo một component InputField để tái sử dụng
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import Image from '../../assets/Surgery.jpg'; 

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';
const RegisterPage = () => {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState(''); // 'success' hoặc 'error'
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

    // fullName
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Họ và tên là bắt buộc.';
    } if (formData.fullName.length < 2) {
      newErrors.fullName = 'Họ và tên phải ít nhất 2 ký tự.';
    }
    if (formData.fullName.length > 50) {
      newErrors.fullName = 'Họ và tên không được quá 50 ký tự.';
    }
    // Kiểm tra ký tự đặc biệt
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (specialCharRegex.test(formData.fullName)) {
      newErrors.fullName = 'Họ và tên không được chứa ký tự đặc biệt.';
    }

    // email
    if (!formData.email.trim()) {
      newErrors.email = 'Email là bắt buộc.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Email không đúng định dạng.';
      }
    }

    // password
    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc.';
    } else {
      const password = formData.password;
      const minLength = password.length >= 8;
      const hasUpper = /[A-Z]/.test(password);
      const hasLower = /[a-z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSpecial = /[^A-Za-z0-9]/.test(password);

      if (!minLength || !hasUpper || !hasLower || !hasNumber || !hasSpecial) {
        newErrors.password = 'Mật khẩu phải từ 8 ký tự trở lên và chứa chữ hoa, chữ thường, số, ký tự đặc biệt.';
      }
    }

    // confirmPassword
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Xác nhận mật khẩu là bắt buộc.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp.';
    }

    // phoneNumber (optional)
    if (formData.phoneNumber) {
      const phoneRegex = /^[0-9]{9,15}$/; // ví dụ: 09xxxxxxx hoặc dài hơn
      if (!phoneRegex.test(formData.phoneNumber)) {
        newErrors.phoneNumber = 'Số điện thoại không hợp lệ (Chỉ nhập số và 9–15 chữ số).';
      }
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
      if (toastType === 'success') {
        toast.success(toastMessage);
      } else if (toastType === 'error') {
        toast.error(toastMessage);
      }
      setShowToast(false);
    }
  }, [showToast, toastMessage, toastType]);


  const handleRegister = async () => {
    if (!validate()) {
      return;
    }

    try {
      const result = await registerUser(formData);
      setToastMessage('Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.');
      setToastType('success');
      setShowToast(true);

      // Chuyển hướng đến trang xác thực email sau 2 giây
    setTimeout(() => {
      navigate('/email-verification', { 
        state: { email: formData.email }
      });
    }, 2000);

    } catch (err) {
      setToastMessage(err?.response?.data?.message || 'Đăng ký thất bại!');
      setToastType('error');
      setShowToast(true);
    }
  };

  return (
    <MDBContainer
    fluid
    className='bg-[#BEBEBE]'
    style={{ minHeight: '100vh', paddingTop: '2rem', paddingBottom: '2rem' }}
  >
    <MDBRow className='d-flex justify-content-center align-items-center h-100'>
      <MDBCol md={9} lg={8} xl={8}>
        <MDBCard className='rounded-4 shadow-5-strong overflow-hidden'>
          <MDBRow className='g-0'>
            {/* Ảnh bên trái */}
            <MDBCol md='6' className="d-none d-md-block">
              <MDBCardImage
                src={'https://i.pinimg.com/736x/47/a4/44/47a4448f2df0046ee1f7bed28f87e551.jpg'}
                alt="Sample"
                className="w-100 h-100 object-fit-cover"
                style={{ objectFit: 'cover', height: '100%' }}
              />
            </MDBCol>
    {/* Phải */}
              <MDBCol md='6'>
                <MDBCardBody className='text-black d-flex flex-column justify-content-center'>
                  <h3 className="mb-5 text-uppercase fw-bold">Đăng ký</h3>

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



                  <div className="d-flex justify-content-end pt-3">
                    <MDBBtn color='light' size='sm' onClick={() => navigate('/')}>Đăng ký bằng Google</MDBBtn>
                    <MDBBtn color='light' size='lg' onClick={handleReset}>Reset all</MDBBtn>
                    <MDBBtn className='ms-2' color='info' size='lg' onClick={handleRegister}>Đăng ký</MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <ToastContainer position="top-center" autoClose={3000} />
    </MDBContainer>
  );
};

export default RegisterPage;


