import { Navigate, Outlet, useLocation } from "react-router-dom";
import { authStore } from "../../stores/authStore";


const PrivateRoute = () => {
  const location = useLocation();
  const { accessToken } = authStore();
  return (
    <>
      {accessToken ? (
        <Outlet />
      ) : (
        <Navigate to="/login" replace={true} state={{ from: location }} />
      )}
    </>
  );
};

export default PrivateRoute;