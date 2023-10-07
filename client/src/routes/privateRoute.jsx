import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Auth = ({ allowedRoles }) => {
  const location = useLocation();
  const user = useSelector((state) => state.user.user);

  // Check if the user has the allowed role
  const isAuthorized = user && allowedRoles.includes(user.role);

  return isAuthorized ? (
    <Outlet />
  ) : user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/sign-in" state={{ from: location }} replace />
  );
};

export default Auth;
