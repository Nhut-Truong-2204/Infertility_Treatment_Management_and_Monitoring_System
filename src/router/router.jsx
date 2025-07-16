import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/guest/Home";
import GuestLayout from "../pages/GuestLayout";
import CustomerLayout from "../pages/CustomerLayout";
import AboutUs from "../pages/guest/AboutUs";
import Dashboard from "../pages/customer/Dashboard";
import AppointmentList from "../pages/customer/AppointmentList";
import TreatmentTimeline from "../pages/customer/TreatmentTimeline";
import TreatmentContracts from "../pages/customer/TreatmentContracts";
import MedicalRecords from "../pages/customer/MedicalRecords";
import Profile from "../pages/customer/Profile";
import Settings from "../pages/customer/Settings";

// Shared components
import Services from "../pages/shared/Services";
import Blog from "../pages/shared/Blog";
import Contact from "../pages/shared/Contact";
import NotFound from "../pages/shared/NotFound";

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
      { path: "customer/treatment-timeline", element: <TreatmentTimeline /> }, // Trang phác đồ điều trị
      { path: "customer/treatment-contracts", element: <TreatmentContracts /> }, // Trang hợp đồng điều trị
      { path: "customer/medical-records", element: <MedicalRecords /> }, // Trang hồ sơ y tế
      { path: "customer/prescriptions", element: <Dashboard /> }, // Tạm thời dùng Dashboard
      { path: "customer/profile", element: <Profile /> }, // Trang hồ sơ cá nhân
      { path: "customer/settings", element: <Settings /> }, // Trang cài đặt

      // 404 route - phải đặt cuối cùng
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
