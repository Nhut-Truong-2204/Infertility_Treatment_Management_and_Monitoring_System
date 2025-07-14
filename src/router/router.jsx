import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/guest/Home";
import GuestLayout from "../pages/GuestLayout";
import CustomerLayout from "../pages/CustomerLayout";
import AboutUs from "../pages/guest/AboutUs";
import Dashboard from "../pages/customer/Dashboard";
import AppointmentList from "../pages/customer/AppointmentList";

// Shared components
import Services from "../pages/shared/Services";
import Blog from "../pages/shared/Blog";
import Contact from "../pages/shared/Contact";

// Import SmartHeader Layout
import MainLayout from "../pages/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <AboutUs /> },
      { path: "services", element: <Services /> },
      { path: "blog", element: <Blog /> },
      { path: "contact", element: <Contact /> },

      // Customer routes (với Dashboard làm trang chính khi đăng nhập)
      { path: "dashboard", element: <Dashboard /> },
      { path: "customer", element: <Dashboard /> }, // Redirect customer -> dashboard
      { path: "customer/dashboard", element: <Dashboard /> },
      { path: "customer/appointments", element: <AppointmentList /> }, // Trang danh sách lịch hẹn
      { path: "customer/medical-records", element: <Dashboard /> }, // Tạm thời dùng Dashboard
      { path: "customer/prescriptions", element: <Dashboard /> }, // Tạm thời dùng Dashboard
      { path: "customer/profile", element: <Dashboard /> }, // Tạm thời dùng Dashboard
      { path: "customer/settings", element: <Dashboard /> }, // Tạm thời dùng Dashboard
    ],
  },
]);

export default router;
