import React, { useState } from 'react';
import AIChatModal from './AIChatModal';

const AIChatbotIcon = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed',
          bottom: 28,
          right: 28,
          zIndex: 1000,
          background: 'linear-gradient(135deg, #4F8EF7 60%, #8f5cff 100%)',
          borderRadius: '50%',
          boxShadow: '0 0 16px 4px #4F8EF7, 0 2px 8px rgba(0,0,0,0.10)',
          width: 48,
          height: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          cursor: 'pointer',
          transition: 'box-shadow 0.2s, transform 0.1s, background 0.2s',
          outline: 'none',
        }}
        title="Chat với AI"
        onMouseOver={e => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #8f5cff 60%, #4F8EF7 100%)';
          e.currentTarget.style.transform = 'scale(1.08) rotate(-6deg)';
          e.currentTarget.style.boxShadow = '0 0 24px 8px #8f5cff, 0 2px 12px rgba(0,0,0,0.15)';
        }}
        onMouseOut={e => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #4F8EF7 60%, #8f5cff 100%)';
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.boxShadow = '0 0 16px 4px #4F8EF7, 0 2px 8px rgba(0,0,0,0.10)';
        }}
      >
        <span style={{ fontSize: 26, color: '#fff', filter: 'drop-shadow(0 0 2px #fff)' }}>🤖</span>
      </button>
      {open && <AIChatModal open={open} onClose={() => setOpen(false)} />}
    </>
  );
};

export default AIChatbotIcon; 