import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import NotFound from '../pages/NotFound/NotFound';
import Result from '../pages/Result/Result';
import { authStore } from '../stores/authStore';

const Routes = () => {
  const { accessToken } = authStore();
  const routesForAuthenticatedOnly = [
    {
      path: '/',
      element: <PrivateRoute />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/result',
          element: <Result />,
        },
      ],
      errorElement: <Navigate to="/" />,
    },
    {
      path: '/login',
      element: <Login />,
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: '/',
      element: <Navigate to="/login" />,
      errorElement: <NotFound />,
    },
    {
      path: '/login',
      element: <Login />,
    },
  ];

  const router = createBrowserRouter([
    ...(!accessToken ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};
export default Routes;
