import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ isLoggedIn }) => {
  return isLoggedIn ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoutes;
