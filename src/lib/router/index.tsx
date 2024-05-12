import { createBrowserRouter } from "react-router-dom";
// import SimpleLayout from "../../layouts/simple";
// import SimpleLayoutLight from "../../layouts/simple-light";
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
import SimpleRegister from "../../layouts/simple-register";

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
    ]
  },
  {
    element: <SimpleRegister />,
    children: [
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
        path: '/manager/overview',
        element: <ManagerDashboard />
      },
      {
        path: '/manager/home',
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
