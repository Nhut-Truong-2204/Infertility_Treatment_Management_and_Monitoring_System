import React, { useEffect, useState, useRef } from "react";
import {
  MessageCircle,
  Video,
  X,
  Send,
  Maximize2,
  Minimize2,
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Camera,
  CameraOff,
} from "lucide-react";
const mockSocket = {
  on: (event, callback) => {
    // Simulate receiving messages
    if (event === "receive_message") {
      setTimeout(() => {
        callback({
          content: "Xin chào! Tôi có thể giúp gì cho bạn?",
          sender: "support",
          time: new Date().toISOString(),
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        });
      }, 1000);
    }
  },
  off: (event) => {},
  emit: (event, data) => {
    console.log(`Emitting ${event}:`, data);
  },
};

const ChatWidget = ({
  onClose,
  onVideoCall,
  isMinimized,
  onToggleMinimize,
}) => {
  const [messages, setMessages] = useState([
    {
      content:
        "Chào mừng bạn đến với hỗ trợ khách hàng! Chúng tôi có thể giúp gì cho bạn?",
      sender: "support",
      time: new Date().toISOString(),
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    mockSocket.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
      setIsTyping(false);
    });

    return () => {
      mockSocket.off("receive_message");
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() === "") return;

    const message = {
      content: input,
      sender: "user",
      time: new Date().toISOString(),
    };

    mockSocket.emit("send_message", message);
    setMessages((prev) => [...prev, message]);
    setInput("");

    // Simulate typing indicator
    setIsTyping(true);
  };

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isMinimized) {
    return (
      <div
        className="fixed bottom-20 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-2xl shadow-2xl cursor-pointer hover:scale-105 transition-all duration-300 z-50"
        onClick={onToggleMinimize}
      >
        <div className="flex items-center space-x-3">
          <MessageCircle size={20} />
          <span className="font-medium">Chat hỗ trợ</span>
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="  fixed bottom-20 right-6 w-96 h-[32rem] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
              alt="Support"
              className="w-10 h-10 rounded-full border-2 border-white/30"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h3 className="font-semibold text-sm">Hỗ trợ khách hàng</h3>
            <p className="text-xs text-white/80">Đang hoạt động</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onVideoCall}
            className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
            title="Gọi video"
          >
            <Video size={18} />
          </button>
          <button
            onClick={onToggleMinimize}
            className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
            title="Thu nhỏ"
          >
            <Minimize2 size={18} />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
            title="Đóng"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-50/50 to-white/50 backdrop-blur-sm">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              } animate-in slide-in-from-bottom-2 duration-300`}
            >
              <div
                className={`max-w-[80%] ${
                  msg.sender === "user" ? "order-2" : "order-1"
                }`}
              >
                {msg.sender !== "user" && (
                  <div className="flex items-center space-x-2 mb-1">
                    <img
                      src={msg.avatar}
                      alt="Avatar"
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-xs text-gray-500 font-medium">
                      Hỗ trợ viên
                    </span>
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl shadow-sm ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-lg"
                      : "bg-white border border-gray-100 text-gray-800 rounded-bl-lg"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.sender === "user" ? "text-white/70" : "text-gray-400"
                    }`}
                  >
                    {formatTime(msg.time)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-300">
              <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-bl-lg shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-gray-100">
        <div className="flex items-center space-x-3 bg-gray-50 rounded-2xl p-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Nhập tin nhắn của bạn..."
            className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none px-2"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
