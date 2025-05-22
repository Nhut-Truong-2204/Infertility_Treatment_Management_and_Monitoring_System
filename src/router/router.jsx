import { createBrowserRouter } from "react-router";
import HomePage from "./../pages/customer/HomePage";
import RegisterPage from "./../pages/customer/RegisterPage";
import MainLayout from "../components/layout/MainLayout";
import ViewTestingServiceList from "../pages/Care/ViewTestingServiceList";
import BarrenMale from "../pages/Learn/BarrenMale";
import BarrenFemale from "../pages/Learn/BarrenFemale";

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
        path: "/register",
        element: <RegisterPage />,
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
    ],
  },
]);
export default router;
