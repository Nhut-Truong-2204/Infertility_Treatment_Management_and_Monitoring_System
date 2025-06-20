import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io("http://localhost:5173/"); // thay bằng domain thực tế

export default function ChatCustomer() {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setChat((prev) => [...prev, data]);
        });

        return () => {
            socket.off("receive_message");
        };
    }, []);

    const sendMessage = () => {
        const data = {
            sender: 'Customer',
            content: message,
        };
        socket.emit("send_message", data);
        setMessage('');
    };

    return (
        <div>
            <h3>Customer Chat</h3>
            <div style={{ border: '1px solid gray', height: 300, overflowY: 'scroll' }}>
                {chat.map((msg, index) => (
                    <div key={index}><strong>{msg.sender}:</strong> {msg.content}</div>
                ))}
            </div>
            <input value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}
