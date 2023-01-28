import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

function ProtectedRoutes({ path }) {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Outlet /> : <Navigate to={path} replace />;
}

export default ProtectedRoutes;
