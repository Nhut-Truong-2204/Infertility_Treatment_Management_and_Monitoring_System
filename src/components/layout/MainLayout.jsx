import Navbar from "./navbar/Navbar";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();

  // Danh sách các route cần ẩn Navbar + Footer
  const hiddenLayoutRoutes = [
    "/bookingAppointment",
    "/viewAppointment"
    // Thêm route khác nếu cần
  ];

  // Kiểm tra route hiện tại có nằm trong danh sách không
  const shouldHideLayout = hiddenLayoutRoutes.includes(location.pathname);

  return (
    <div>
      {!shouldHideLayout && <Navbar />}

      <div>
        <Outlet />
      </div>

      {!shouldHideLayout && <Footer />}
    </div>
  );
};

export default MainLayout;
