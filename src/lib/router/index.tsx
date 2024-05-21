import { createBrowserRouter } from "react-router-dom";
import UserHome from "../../pages/[user]/home";
import Login from "../../pages/[auth]/login";
import Register from "../../pages/[auth]/register";
import SimpleLogin from "../../layouts/simple-login";
import ManagerLayout from "../../layouts/manager";
import ManagerDashboard from "../../pages/[manager]/dashboard";
import ManagerHome from "../../pages/[manager]/historic";
import ManagerStartup from "../../pages/[manager]/startup";
import ManagerRelatory from "../../pages/[manager]/relatory";
import DefaultLayout from "../../layouts/user";

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
        path: '/manager/relatorio',
        element: <ManagerRelatory />
      },
    ]
  },
])
