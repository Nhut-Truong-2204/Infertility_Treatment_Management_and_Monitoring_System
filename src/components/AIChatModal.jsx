import React, { useEffect, useRef, useState } from 'react';
import axios from '../config/axios';

const API_SESSION = 'https://infertility-treatment-management-and.onrender.com/api/chat/sessions';
const API_CHAT = 'https://infertility-treatment-management-and.onrender.com/api/ai-chatbot/chat';

const AI_AVATAR = 'https://cdn-icons-png.flaticon.com/512/4712/4712035.png'; // AI avatar
const USER_AVATAR = 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'; // User avatar

const AIChatModal = ({ open, onClose }) => {
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  // Fake userId/treatmentProtocolId/sessionType cho demo guest
  const recipientUserId = 123;
  const treatmentProtocolId = 456;
  const sessionType = 'GeneralSupport';

  useEffect(() => {
    if (open) {
      // Tạo/lấy session khi mở modal
      axios.post(API_SESSION, { recipientUserId, treatmentProtocolId, sessionType })
        .then(res => {
          setSessionId(res.data.sessionId || res.data.id || res.data.session_id);
        })
        .catch(() => setError('Không thể kết nối AI.'));
    }
  }, [open]);

  useEffect(() => {
    // Scroll to bottom khi có tin nhắn mới
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || !sessionId) return;
    const userMsg = { sender: 'user', text: input };
    setMessages(msgs => [...msgs, userMsg]);
    setInput('');
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(API_CHAT, { message: input, sessionId });
      setMessages(msgs => [...msgs, { sender: 'ai', text: res.data.response || res.data.message }]);
    } catch (e) {
      setMessages(msgs => [...msgs, { sender: 'ai', text: 'Xin lỗi, AI hiện không phản hồi.' }]);
    }
    setLoading(false);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!open) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 86,
      right: 28,
      zIndex: 1100,
      background: '#fff',
      width: 300,
      maxWidth: '95vw',
      borderRadius: 24,
      boxShadow: '0 8px 32px 4px #8f5cff, 0 2px 16px rgba(0,0,0,0.18)',
      display: 'flex',
      flexDirection: 'column',
      height: 400,
      overflow: 'hidden',
      border: '2.5px solid #8f5cff',
      animation: 'popIn 0.18s cubic-bezier(.68,-0.55,.27,1.55)',
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(90deg, #4F8EF7 60%, #8f5cff 100%)',
        color: '#fff',
        padding: '12px 16px',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(79,142,247,0.10)',
      }}>
        <div style={{ fontWeight: 700, fontSize: 16, display: 'flex', alignItems: 'center', letterSpacing: 0.5 }}>
          <span style={{ marginRight: 8, fontSize: 22, animation: 'ai-bounce 1.2s infinite alternate' }}>🤖</span> ReproCare
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer', fontWeight: 700 }}>&times;</button>
      </div>
      {/* Chat body */}
      <div style={{
        flex: 1,
        background: '#f7f7fa',
        padding: 10,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {messages.length === 0 && (
          <div style={{ color: '#888', textAlign: 'center', marginTop: 30 }}>
            Hãy đặt câu hỏi cho AI về điều trị, sức khỏe, dịch vụ...<br/>
            <span style={{ fontSize: 28 }}>💬</span>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} style={{
            display: 'flex',
            flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
            alignItems: 'flex-end',
            marginBottom: 10,
          }}>
            <img src={msg.sender === 'user' ? USER_AVATAR : AI_AVATAR} alt="avatar" style={{ width: 28, height: 28, borderRadius: '50%', margin: '0 6px' }} />
            <div style={{
              background: msg.sender === 'user' ? 'linear-gradient(90deg, #4F8EF7 60%, #8f5cff 100%)' : '#fff',
              color: msg.sender === 'user' ? '#fff' : '#222',
              borderRadius: 16,
              padding: '8px 12px',
              maxWidth: 180,
              fontSize: 13.5,
              boxShadow: msg.sender === 'user' ? '0 2px 8px rgba(79,142,247,0.10)' : '0 2px 8px rgba(0,0,0,0.06)',
              marginLeft: msg.sender === 'user' ? 0 : 3,
              marginRight: msg.sender === 'user' ? 3 : 0,
              wordBreak: 'break-word',
            }}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', marginBottom: 10 }}>
            <img src={AI_AVATAR} alt="avatar" style={{ width: 28, height: 28, borderRadius: '50%', margin: '0 6px' }} />
            <div style={{ background: '#fff', color: '#222', borderRadius: 16, padding: '8px 12px', maxWidth: 180, fontSize: 13.5, opacity: 0.7 }}>
              Đang trả lời...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* Input */}
      <div style={{
        padding: 8,
        background: '#fff',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        borderTop: '1px solid #eee',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      }}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nhập tin nhắn..."
          style={{
            flex: 1,
            resize: 'none',
            border: '1px solid #ddd',
            borderRadius: 10,
            padding: '6px 10px',
            fontSize: 13.5,
            minHeight: 28,
            maxHeight: 60,
            outline: 'none',
            background: '#fafbfc',
          }}
          rows={1}
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          style={{
            background: 'linear-gradient(90deg, #4F8EF7 60%, #8f5cff 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            padding: '6px 14px',
            fontWeight: 600,
            fontSize: 13.5,
            cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
            opacity: loading || !input.trim() ? 0.6 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          Gửi
        </button>
      </div>
      {error && <div style={{ color: 'red', textAlign: 'center', padding: 6, fontSize: 13 }}>{error}</div>}
      <style>{`
        @keyframes ai-bounce {
          0% { transform: translateY(0); }
          100% { transform: translateY(-4px) scale(1.08); }
        }
        @keyframes popIn {
          0% { transform: scale(0.7); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default AIChatModal; 