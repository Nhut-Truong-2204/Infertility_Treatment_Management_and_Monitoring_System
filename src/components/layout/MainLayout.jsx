import Topbar from "./Topbar";
import Navbar from "./navbar/Navbar";
import Hero from "../layout/Hero";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import CommunicationWidget from "../chat/CommunicationWidget";

const MainLayout = () => {
  // Layout theo bố cục ferlix
  return (
    <div className="min-h-screen flex flex-col mt-20">
      {/* Topbar */}

      {/* Navbar */}
      <Navbar />
      {/* Hero section chỉ hiển thị ở trang chủ */}
      {window.location.pathname === "/" && <Hero /> }

      {/* Main Content */}
      <main className="flex-1 w-full mx-auto max-w-[1440px] px-4 lg:px-12 py-8">
        <Outlet />
      </main>

      {/* Widget chat */}
      <CommunicationWidget />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
