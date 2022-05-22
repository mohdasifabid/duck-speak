import { useAuthProvider } from "../authProvider";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const { state: authState } = useAuthProvider();
  return authState.isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};
