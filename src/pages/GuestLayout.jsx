// Guest Layout - Layout dành cho người dùng chưa đăng nhập
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openLoginModal } from "../redux/slices/uiSlice";

import GuestHeader from "../components/headers/GuestHeader";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";

const GuestLayout = () => {
  const dispatch = useDispatch();

  return (
    <>
      <GuestHeader onLoginClick={() => dispatch(openLoginModal())} />
      <main>
        <Outlet />
      </main>
      <Footer />
      <LoginModal />
    </>
  );
};

export default GuestLayout;
