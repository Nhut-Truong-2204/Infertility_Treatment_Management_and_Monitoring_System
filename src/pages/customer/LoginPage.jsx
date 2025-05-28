import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import InputField from '../../components/ui/InputField';
import 'react-toastify/dist/ReactToastify.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

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

export default function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [message, setMessage] = useState(location.state?.message || "");
    const [messageType, setMessageType] = useState(location.state?.type || "");
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (location.state?.message) {
            toast[location.state.type](location.state.message);
            // Clear state sau khi đã hiển thị
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error when user types
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

        // TODO: Add your login API call here
        // const response = await loginUser(formData);
        
        toast.success("Đăng nhập thành công!");
        navigate("/"); // Navigate to home page after successful login
        } catch (err) {
        toast.error(err?.response?.data?.message || "Đăng nhập thất bại!");
        }
    };

    const handleGoogleLogin = () => {
        // TODO: Implement Google login
        console.log("Google login clicked");
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

                            {/* Form bên phải */}
                            <MDBCol md='6'>
                                <MDBCardBody className='text-black d-flex flex-column justify-content-center'>
                                    <h3 className="mb-5 text-uppercase fw-bold">Đăng nhập</h3>

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
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {showPassword ? '👁️' : '👁️‍🗨️'}
                                            </span>
                                        }
                                    />

                                    <div className="text-center mb-4">
                                        <Link to="/forgot-password" className="text-info">
                                            Quên mật khẩu?
                                        </Link>
                                    </div>

                                    <div className="d-grid gap-4">
                                        <MDBBtn 
                                            color='info' 
                                            size='lg' 
                                            onClick={handleSubmit}
                                        >
                                            Đăng nhập
                                        </MDBBtn>

                                        <MDBBtn
                                            color='light' 
                                            size='lg'
                                            className='py-2.5 px-10 d-flex align-items-center justify-content-center gap-2'
                                            onClick={handleGoogleLogin}
                                        >
                                            <img 
                                                src="https://img.icons8.com/color/16/000000/google-logo.png" 
                                                className="me-2"
                                                alt="google"
                                            />
                                            Đăng nhập với Google
                                        </MDBBtn>
                                    </div>

                                    <div className="text-center mt-4 text-muted">
                                        <span>Chưa có tài khoản? </span>
                                        <Link to="/register" className="text-info">
                                            Đăng ký ngay
                                        </Link>
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
}