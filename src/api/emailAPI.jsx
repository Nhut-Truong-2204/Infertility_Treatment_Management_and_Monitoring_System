export const sendVerificationCode = async (email) => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  // Gửi mã qua API giả
  await fetch("/api/send-verification", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });

  return code;
};
