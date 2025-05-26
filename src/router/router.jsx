import { createBrowserRouter } from "react-router";
import HomePage from "./../pages/customer/HomePage";
import RegisterPage from "./../pages/customer/RegisterPage";
import LoginPage from "../pages/customer/LoginPage";
import ForgetPasswordPage from "../pages/customer/ForgetPasswordPage";
import MainLayout from "../components/layout/MainLayout";
import ViewTestingServiceList from "../../src/components/layout/navbar/blogDropDown/Care/ViewTestingServiceList";
import BarrenMale from "../components/layout/navbar/blogDropDown/Learn/BarrenMale";
import BarrenFemale from "../components/layout/navbar/blogDropDown/Learn/BarrenFemale"
import Infertility from "../components/layout//navbar/blogDropDown/Learn/Infertility";

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
    ],
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },

  {
    path: "/login",
    element: <LoginPage />,
  },

  {
  path: "/forgot-password",
  element: <ForgetPasswordPage />,
  },

]);
export default router;
