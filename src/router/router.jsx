import { createBrowserRouter } from "react-router-dom";
import HomePage from "./../pages/customer/HomePage";
import RegisterPage from "./../pages/customer/RegisterPage";
import EmailVerificationPage from "../pages/customer/EmailVerificationPage";
import LoginPage from "../pages/customer/LoginPage";
import ForgetPasswordPage from "../pages/customer/ForgetPasswordPage";
import ChangePasswordPage from "../pages/customer/ChangePasswordPage";
import MainLayout from "../components/layout/MainLayout";
import ViewTestingServiceList from "../../src/components/layout/navbar/blogDropDown/Care/ViewTestingServiceList";
import BarrenMale from "../components/layout/navbar/blogDropDown/Learn/BarrenMale";
import BarrenFemale from "../components/layout/navbar/blogDropDown/Learn/BarrenFemale"
import Infertility from "../components/layout//navbar/blogDropDown/Learn/Infertility";
import NotFound from "../pages/customer/NotFound";
import BookingAppointment from "../pages/customer/BookingAppointment";
import DoctorList from "../pages/customer/DoctorList";
import ClinicIntroduction from "../pages/customer/ClinicIntroduction";
import ServicesPage from "../pages/customer/Servicepage";
import DoctorDetail from "../pages/customer/DoctorDetail";
import TreatmentHistory from "@/pages/customer/TreatmentHistory";
import ViewAppointment from "../pages/customer/AppointmentHistory";
import PaymentPage from "@/pages/customer/PaymentPage";
import Feedback from "@/pages/customer/Feedback";
import BlogForum from "@/pages/customer/BlogForum";
import LabtestHistory from "@/pages/customer/LabtestHistory";
import ChatWidget from "@/components/chat/Chat";
import ProfileUser from "@/pages/customer/ProfileUser";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/homapage",
        element: <HomePage />,
      },
      {
        path: "/viewTestingList",
        element: <ViewTestingServiceList />,
      },
      {
        path: "/barrenMale",
        element: <BarrenMale />,
      },
      {
        path: "/barrenFemale",
        element: <BarrenFemale />,
      },
      {
        path: "/infertility",
        element: <Infertility />,
      },
      {
        path: "/bookingAppointment",
        element: <BookingAppointment />,
      },
      {
        path: "/viewDoctorList",
        element:
          <DoctorList />,
      },
      {
        path: "/doctors/:userId",
        element: <DoctorDetail />,
      },
      {
        path: "/clinicpage",
        element: <ClinicIntroduction />,
      },
      {
        path: "/profile",
        element: <ProfileUser />,
      },
      {
        path: "/chat",
        element: <ChatWidget />,
      },
      {
        path: "/servicepage",
        element: <ServicesPage />,
      },
      {
        path: "/historyTreatment",
        element: <TreatmentHistory />,
      },
      {
        path: "/historyLabtest",
        element: <LabtestHistory />,
      },
      {
        path: "/payment",
        element: <PaymentPage />,
      },
      {
        path: "/feedback",
        element: <Feedback />,
      },
      {
        path: "/blog-forum",
        element: <BlogForum />,
      },
    ],
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/viewAppointment",
    element: <ViewAppointment />

  },
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/forgot-password",
    element: <ForgetPasswordPage />,
  },

  {
    path: "/change-password",
    element: <ChangePasswordPage />,
  },

  {
    path: "/email-verification",
    element: <EmailVerificationPage />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
export default router;
