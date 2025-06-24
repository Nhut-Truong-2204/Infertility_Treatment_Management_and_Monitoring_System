// import React, { useState, useEffect } from 'react';
// import { io } from 'socket.io-client';

// const socket = io("http://localhost:3001"); // sửa lại đúng địa chỉ backend socket

// export default function ChatPage({ sender = 'Customer' }) {
//     const [chat, setChat] = useState([]);
//     const [message, setMessage] = useState('');

//     useEffect(() => {
//         socket.on('receive_message', (data) => {
//             setChat((prev) => [...prev, data]);
//         });

//         return () => {
//             socket.off('receive_message');
//         };
//     }, []);

//     const sendMessage = () => {
//         if (!message.trim()) return;
//         socket.emit('send_message', { sender, content: message });
//         setMessage('');
//     };

//     return (
//         <div className="pt-[100px] bg-grey-500 min-h-screen flex flex-col items-center justify-start p-4 bg-gray-50">
//             <h1 className="text-xl font-bold mb-4">💬 Chat Trực Tiếp</h1>

//             <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg flex flex-col">
//                 <div className="h-96 overflow-y-auto p-4 border-b space-y-2 text-sm bg-gray-50">
//                     {chat.length === 0 ? (
//                         <div className="text-center text-gray-400 mt-20">Chưa có tin nhắn nào</div>
//                     ) : (
//                         chat.map((msg, idx) => (
//                             <div
//                                 key={idx}
//                                 className={`p-2 rounded max-w-[80%] ${msg.sender === sender ? 'bg-blue-100 ml-auto' : 'bg-gray-200'
//                                     }`}
//                             >
//                                 <strong>{msg.sender}:</strong> {msg.content}
//                             </div>
//                         ))
//                     )}
//                 </div>

//                 <div className="flex gap-2 p-3">
//                     <input
//                         className="flex-1 border rounded px-3 py-2 text-sm"
//                         placeholder="Nhập tin nhắn..."
//                         value={message}
//                         onChange={(e) => setMessage(e.target.value)}
//                         onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
//                     />
//                     <button
//                         onClick={sendMessage}
//                         className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
//                     >
//                         Gửi
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }
