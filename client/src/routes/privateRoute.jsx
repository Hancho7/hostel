import { useSelector } from "react-redux";
import {  Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const user = useSelector((state) => state.user.user);

  return (
    user?.role && allowedRoles?.includes(user?.role)
      ? <Outlet />
      : user
        ? <Navigate to="/unauthorized" state={{ from: location.pathname }} replace />
        : <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
};

export default RequireAuth;
