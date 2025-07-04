import React, { useState, useEffect } from 'react';
import { MailCheck, Loader2, CheckCircle, ArrowLeft, RefreshCw, Shield } from 'lucide-react';

export default function EmailVerificationCard({ email = "user@example.com", onVerified }) {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const [verified, setVerified] = useState(false);

    // Countdown timer cho resend
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [countdown]);

    const handleOtpChange = (value, index) => {
        if (value.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const handleVerify = async () => {
        const otpValue = otp.join('');
        if (otpValue.length !== 6) {
            showToast('Vui lòng nhập đầy đủ mã OTP', 'error');
            return;
        }

        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Simulate success
            setVerified(true);
            showToast('Xác thực thành công!', 'success');

            setTimeout(() => {
                onVerified && onVerified();
            }, 1500);
        } catch (error) {
            showToast('Mã OTP không chính xác, vui lòng thử lại', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setResendLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            setCountdown(60);
            setCanResend(false);
            setOtp(['', '', '', '', '', '']);
            showToast('Đã gửi lại mã OTP mới', 'success');
        } catch (error) {
            showToast('Không thể gửi lại mã, vui lòng thử lại', 'error');
        } finally {
            setResendLoading(false);
        }
    };

    const showToast = (message, type) => {
        // Simple toast notification
        const toast = document.createElement('div');
        toast.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transform transition-all duration-300 ${type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    };

    if (verified) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Xác thực thành công!</h2>
                    <p className="text-gray-600 mb-6">Email của bạn đã được xác thực thành công.</p>
                    <div className="w-full bg-green-200 rounded-full h-2 mb-4">
                        <div className="bg-green-600 h-2 rounded-full animate-pulse"></div>
                    </div>
                    <p className="text-sm text-gray-500">Đang chuyển hướng...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl backdrop-blur-sm border border-white/20 p-8 max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Xác thực email</h1>
                    <p className="text-gray-600 text-sm">Chúng tôi đã gửi mã xác thực 6 chữ số đến</p>
                </div>

                {/* Email Display */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6 border border-blue-100">
                    <div className="flex items-center justify-center space-x-2">
                        <MailCheck className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-blue-800">{email}</span>
                    </div>
                </div>

                {/* OTP Input */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                        Nhập mã xác thực
                    </label>
                    <div className="flex justify-center space-x-2">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="w-12 h-12 text-center text-lg font-bold border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                placeholder="0"
                            />
                        ))}
                    </div>
                </div>

                {/* Verify Button */}
                <button
                    onClick={handleVerify}
                    disabled={loading || otp.join('').length !== 6}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Đang xác thực...</span>
                        </>
                    ) : (
                        <>
                            <CheckCircle className="w-5 h-5" />
                            <span>Xác thực</span>
                        </>
                    )}
                </button>

                {/* Resend Section */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 mb-2">Chưa nhận được mã?</p>
                    {canResend ? (
                        <button
                            onClick={handleResend}
                            disabled={resendLoading}
                            className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center justify-center space-x-1 mx-auto transition-colors"
                        >
                            {resendLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Đang gửi...</span>
                                </>
                            ) : (
                                <>
                                    <RefreshCw className="w-4 h-4" />
                                    <span>Gửi lại mã</span>
                                </>
                            )}
                        </button>
                    ) : (
                        <p className="text-gray-500 text-sm">
                            Gửi lại sau {countdown}s
                        </p>
                    )}
                </div>

                {/* Help Text */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 text-center">
                        💡 <strong>Lưu ý:</strong> Kiểm tra hộp thư rác nếu không thấy email.
                        Mã có hiệu lực trong 10 phút.
                    </p>
                </div>

                {/* Back Button */}
                <div className="mt-4 text-center">
                    <button className="text-gray-500 hover:text-gray-700 text-sm flex items-center justify-center space-x-1 mx-auto transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Quay lại</span>
                    </button>
                </div>
            </div>
        </div>
    );
}