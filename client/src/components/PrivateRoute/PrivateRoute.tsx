import { Navigate, useLocation } from "react-router-dom";
import Home from "../../pages/Home/Home";
import { authStore } from "../../stores/authStore";

const PrivateRoute = () => {
  const location = useLocation();
  const { accessToken } = authStore();
  return (
    <>
      {accessToken ? (
        <Home />
      ) : (
        <Navigate to="/login" replace={true} state={{ from: location }} />
      )}
    </>
  );
};

export default PrivateRoute;