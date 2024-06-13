import { createBrowserRouter } from "react-router-dom";
import UserHome from "../../pages/[user]/home";
import Login from "../../pages/[auth]/login";
import Register from "../../pages/[auth]/register";
import SimpleLogin from "../../layouts/simple-login";
import ManagerLayout from "../../layouts/manager";
import ManagerDashboard from "../../pages/[manager]/dashboard";
import ManagerHome from "../../pages/[manager]/home";
import ManagerHistoric from "../../pages/[manager]/historic";
import ManagerStartup from "../../pages/[manager]/startup";
import DefaultLayout from "../../layouts/user";
import ForgotPassword from "../../pages/[auth]/forgot-password";
import SimpleLayout from "../../layouts/simple";
import CreateStartup from "../../pages/[startup]/create";

export const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <UserHome />
      }
    ]
  },
  {
    element: <SimpleLogin />,
    children: [
      {
        path: '/auth/login',
        element: <Login />
      },
      {
        path: '/auth/register',
        element: <Register />
      },
      {
        path: '/auth/forget-password',
        element: <ForgotPassword />
      }
    ]
  },
  {
    element: <ManagerLayout />,
    children: [
      {
        path: '/manager/home',
        element: <ManagerDashboard />
      },
      {
        path: '/manager/solicitations',
        element: <ManagerHome />
      },
      {
        path: '/manager/startup',
        element: <ManagerStartup />
      },
      {
        path: '/manager/historic',
        element: <ManagerHistoric />
      },
    ]
  },
  {
    element: <SimpleLayout />,
    children: [
      {
        path: '/startup/create',
        element: <CreateStartup />
      }
    ]
  }
])
