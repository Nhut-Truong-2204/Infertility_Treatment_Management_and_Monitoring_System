// src/App.jsx
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import "src/index.css"
const ThemeContext = React.createContext();

function App({ children }) {
  return (
    <div className="app-layout">
      {children}
    </div>
  );
}
export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within App component');
  }
  return context;
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme khi app khởi động
  useEffect(() => {
    // Check localStorage trước
    const savedTheme = localStorage.getItem('theme');

    // Nếu không có trong localStorage, check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    setIsDarkMode(shouldUseDark);
    updateTheme(shouldUseDark);
  }, []);

  // Function để update theme
  const updateTheme = (isDark) => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    updateTheme(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  // Theme context value
  const themeValue = {
    isDarkMode,
    toggleTheme,
    theme: isDarkMode ? 'dark' : 'light'
  };

  return (
    <ThemeContext.Provider value={themeValue}>
      <div className="app">
        {/* Theme toggle button - có thể đặt ở header */}
        <header style={{
          padding: '1rem',
          backgroundColor: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1>My App</h1>
          <button onClick={toggleTheme} className="btn">
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </header>

        {/* Main content */}
        <main style={{ padding: '2rem' }}>
          <YourMainContent />
        </main>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
