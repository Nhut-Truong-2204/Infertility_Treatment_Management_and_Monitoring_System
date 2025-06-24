import Navbar from "./navbar/Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
