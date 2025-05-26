import Navbar from './navbar/Navbar';
import Footer from './Footer';
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
        <Navbar/>
        <Outlet />
        <Footer/>
    </div>
  )
}

export default MainLayout