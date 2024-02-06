import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const StudentAuth = () => {
  const user = useSelector((state) => state.user.user);

  return (
    user ? <Outlet /> : <Navigate to="/login" replace />
  );
};


export const AdminAuth = () => {
  const admin = useSelector((state)=>state.adminSignIn.data)

  return (
    admin ? <Outlet /> : <Navigate to="admin/sign-in" replace />
  );
};

