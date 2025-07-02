import { useState, useEffect } from "react";
import { sendVerificationCode } from "../../api/customer/emailAPI";

export const useVerification = (email) => {
  const [codeSent, setCodeSent] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (!codeSent) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const timerToEnableResend = setTimeout(() => {
      setCanResend(true);
    }, 60000);

    return () => {
      clearInterval(interval);
      clearTimeout(timerToEnableResend);
    };
  }, [codeSent]);

  const handleSendCode = async () => {
    const code = await sendVerificationCode(email);
    setCodeSent(code);
    setCountdown(300); // 5 phút
    setCanResend(false);
    alert("Mã xác nhận đã được gửi!");
  };

  const handleVerify = () => {
    if (inputCode === codeSent) {
      setVerified(true);
    } else {
      alert("Mã xác nhận không đúng!");
    }
  };

  return {
    codeSent,
    countdown,
    canResend,
    inputCode,
    setInputCode,
    handleSendCode,
    handleVerify,
    verified,
  };
};
