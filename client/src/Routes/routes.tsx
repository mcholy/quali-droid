import {
    Navigate,
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import Result from "../pages/Result/Result";
import { authStore } from "../stores/authStore";
  
  const Routes = () => {
    const { accessToken } = authStore();
    const routesForAuthenticatedOnly = [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        element: <PrivateRoute />,
        children: [
          {
            path: "result",
            element: <Result />,
          },

        ],
        errorElement: <Navigate to="/" />,
      },
    ];
  
    const routesForNotAuthenticatedOnly = [
      {
        path: "/",
        element: <Navigate to="/login" />,
        errorElement: <NotFound />,
      },
      {
        path: "/login",
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
  