import React from "react";

export default function VerifyCodeCard({
  countdown,
  inputCode,
  setInputCode,
  canResend,
  handleSendCode,
  handleVerify,
}) {
  const minutes = String(Math.floor(countdown / 60)).padStart(2, "0");
  const seconds = String(countdown % 60).padStart(2, "0");

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-2xl shadow-lg bg-white space-y-4">
      <h2 className="text-xl font-bold text-center">Xác nhận mã OTP</h2>
      <p className="text-center text-sm text-gray-600">
        Mã xác nhận đã được gửi tới email của bạn. Vui lòng nhập mã bên dưới.
      </p>
      <div className="flex justify-center text-2xl font-semibold text-red-500">
        {minutes}:{seconds}
      </div>

      <input
        className="w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 ring-blue-400"
        placeholder="Nhập mã xác nhận"
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
      />

      <button
        onClick={handleVerify}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Xác nhận
      </button>

      <button
        onClick={handleSendCode}
        disabled={!canResend}
        className={`w-full py-2 rounded-lg border ${
          canResend
            ? "text-blue-600 border-blue-600 hover:bg-blue-50"
            : "text-gray-400 border-gray-300 cursor-not-allowed"
        } transition`}
      >
        {canResend ? "Gửi lại mã" : "Gửi lại sau 1 phút..."}
      </button>
    </div>
  );
}
