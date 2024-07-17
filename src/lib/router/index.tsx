import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Loading from '../../components/core/loading';
import ErrorBoundary from '../../components/core/error-boundary';
import ManagerStartupPortfolio from '../../pages/[manager]/startup/portfolio';
import NotFound from '../../pages/(errors)/not-found/page';
import UserHistoric from '../../pages/[user]/historic';
import UserAccount from '../../pages/[user]/account';
// import NotFound from '../../pages/(errors)/not-found/page';

const UserHome = lazy(() => import('../../pages/[user]/home'));
const Login = lazy(() => import('../../pages/[auth]/login'));
const Register = lazy(() => import('../../pages/[auth]/register'));
const SimpleLogin = lazy(() => import('../../layouts/simple-login'));
const ManagerLayout = lazy(() => import('../../layouts/manager'));
const ManagerDashboard = lazy(() => import('../../pages/[manager]/dashboard'));
const ManagerHome = lazy(() => import('../../pages/[manager]/home'));
const ManagerHistoric = lazy(() => import('../../pages/[manager]/historic'));
const ManagerStartup = lazy(() => import('../../pages/[manager]/startup'));
const DefaultLayout = lazy(() => import('../../layouts/user'));
const ForgotPassword = lazy(() => import('../../pages/[auth]/forgot-password'));
const SimpleLayout = lazy(() => import('../../layouts/simple'));
const CreateStartup = lazy(() => import('../../pages/[startup]/create'));
const ManagerAccount = lazy(() => import('../../pages/[manager]/account'));
const ManagerBookmarked = lazy(() => import('../../pages/[manager]/bookmarked'));

export const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <DefaultLayout />
        </ErrorBoundary>
      </Suspense>
    ),
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<Loading />}>
            <ErrorBoundary>
              <UserHome />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: '/historic',
        element: (
          <Suspense fallback={<Loading />}>
            <ErrorBoundary>
              <UserHistoric />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: '/account',
        element: (
          <Suspense fallback={<Loading />}>
            <ErrorBoundary>
              <UserAccount />
            </ErrorBoundary>
          </Suspense>
        ),
      },
    ],
  },
  {
    element: (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <SimpleLogin />
        </ErrorBoundary>
      </Suspense>
    ),
    children: [
      {
        path: '/auth/login',
        element: (
          <Suspense fallback={<Loading />}>
            <ErrorBoundary>
              <Login />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: '/auth/register',
        element: (
          <Suspense fallback={<Loading />}>
            <ErrorBoundary>
              <Register />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: '/auth/forget-password',
        element: (
          <Suspense fallback={<Loading />}>
            <ErrorBoundary>
              <ForgotPassword />
            </ErrorBoundary>
          </Suspense>
        ),
      }
    ]
  },
  {
    element: (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <ManagerLayout />
        </ErrorBoundary>
      </Suspense>
    ),
    children: [
      {
        path: '/manager/home',
        element: (
          <Suspense fallback={<Loading />}>
            <ErrorBoundary>
              <ManagerDashboard />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: '/manager/solicitations',
        element: (
          <Suspense fallback={<Loading />}>
            <ErrorBoundary>
              <ManagerHome />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: '/manager/startup',
        element: (
          <Suspense fallback={<Loading />}>
            <ErrorBoundary>
              <ManagerStartup />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: '/manager/startup/:id',
        element: (
          <Suspense fallback={<Loading />}>
            <ErrorBoundary>
              <ManagerStartupPortfolio />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: '/manager/historic',
        element: (
          <Suspense fallback={<Loading />}>
            <ErrorBoundary>
              <ManagerHistoric />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: '/manager/account',
        element: (
          <Suspense fallback={<Loading />}>
            <ErrorBoundary>
              <ManagerAccount />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: '/manager/bookmark',
        element: (
          <Suspense fallback={<Loading />}>
            <ErrorBoundary>
              <ManagerBookmarked />
            </ErrorBoundary>
          </Suspense>
        ),
      },
    ]
  },
  {
    element: (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <SimpleLayout />
        </ErrorBoundary>
      </Suspense>
    ),
    children: [
      {
        path: '/startup/create',
        element: (
          <Suspense fallback={<Loading />}>
            <ErrorBoundary>
              <CreateStartup />
            </ErrorBoundary>
          </Suspense>
        ),
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />, // Replace with your NotFound component
  },
])
