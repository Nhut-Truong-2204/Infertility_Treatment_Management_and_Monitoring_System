// src/utils/socket.js
import { io } from "socket.io-client";

// Có thể cấu hình URL khác nếu bạn chạy backend ở cổng khác
const socket = io("http://localhost:3000", {
  transports: ["websocket"],
  withCredentials: true, // nếu dùng cookie
});

export default socket;
