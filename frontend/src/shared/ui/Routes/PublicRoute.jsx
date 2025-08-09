import { useAuthStore } from "../../../features/auth/store/useAuthStore";
import { Navigate } from "react-router-dom";
import { Loading } from "../../ui/Loading";


export const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuthStore();

  if (loading) {
    return <Loading />;
  }

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return children;
};