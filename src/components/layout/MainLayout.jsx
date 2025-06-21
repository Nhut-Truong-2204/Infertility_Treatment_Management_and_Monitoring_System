import Navbar from "./navbar/Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
// import MiniChatWidget from "../../components/chat/MiniChat"; // hoặc đúng path của bạn
import { useLocation } from 'react-router-dom';
import MiniChat from '../chat/MiniChat';
const MainLayout = () => {
  const location = useLocation();
  const isChatPage = location.pathname === '/chatcustomer';
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 ">
        <Outlet />
      </main>

      <Footer />

      {/* Chat xuất hiện mọi lúc */}
      {!isChatPage && <MiniChat />}
    </div>
  );
};

export default MainLayout;
