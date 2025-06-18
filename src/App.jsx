// src/App.jsx (Nếu là component layout chung)
import React from 'react';

function App({ children }) { // Nhận children prop
  return (
    <div className="app-layout">
      {/* Các phần tử layout chung khác có thể ở đây, ví dụ: */}
      {/* <GlobalHeader /> */}
      {children} {/* Nơi các route của bạn sẽ được render */}
      {/* <GlobalFooter /> */}
    </div>
  );
}

export default App;