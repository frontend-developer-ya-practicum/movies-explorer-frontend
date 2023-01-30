import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

function ProtectedRoutes({ path, isSignIn }) {
  const { isLoggedIn } = useAuth();

  return isLoggedIn === isSignIn ? <Outlet /> : <Navigate to={path} replace />;
}

export default ProtectedRoutes;
