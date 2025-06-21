import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { MessageSquare, Send, X } from 'lucide-react';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
const socket = io('http://localhost:3001'); // Replace with your actual server
import { useNavigate } from 'react-router-dom';
export default function MiniChatWidget({ sender = 'Customer' }) {
    const [isOpen, setIsOpen] = useState(false);
    const [chat, setChat] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        socket.on("connect", () => {
            console.log("✅ Socket connected:", socket.id);
        });
        socket.on("receive_message", (data) => {
            console.log("📥 Nhận tin:", data); // debug
            setChat((prev) => [...prev, data]);
        });
        return () => {
            socket.off("receive_message");
        };
    }, []);

    const sendMessage = () => {
        if (!message.trim()) return;
        const data = { sender, content: message };
        socket.emit('send_message', data);
        setMessage('');
    };

    return (
        <div className="fixed bottom-10 right-10 z-50 ">
            {isOpen ? (
                <div className="w-80 bg-white rounded-xl shadow-2xl border border-gray-300 flex flex-col">
                    {/* header */}
                    <div className="flex relative items-center justify-between bg-blue-600 text-white px-4 py-2 rounded-t-xl">
                        <span className="font-semibold">{sender} Chat</span>
                        <button
                            onClick={() => navigate("/chatcustomer")}
                            className="absolute right-12 hover:bg-blue-700  rounded-full p-1 transition-colors duration-200"
                        >
                            <ZoomOutMapIcon />
                        </button>
                        <button onClick={() => setIsOpen(false)}><X size={20} /></button>

                    </div>
                    <div className="px-3 py-1 text-right">

                    </div>
                    <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50 min-h-50">
                        {chat.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`text-sm p-2 rounded-lg max-w-[80%] ${msg.sender === sender ? 'ml-auto bg-blue-100' : 'bg-gray-200'
                                    }`}
                            >
                                <strong>{msg.sender}:</strong> {msg.content}
                            </div>
                        ))}
                    </div>
                    {/* input */}
                    <div className="flex items-center gap-2 px-3 py-2 border-t">
                        <input
                            type="text"
                            placeholder="Nhập tin nhắn..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            className="flex-1 px-3 py-2 text-sm border rounded"
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
                    title="Mở chat"
                >
                    <MessageSquare size={24} />
                </button>
            )}
        </div>
    );
}
