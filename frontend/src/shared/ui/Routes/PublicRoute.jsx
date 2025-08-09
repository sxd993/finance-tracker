import { useAuthStore } from "../../../features/auth/authStore";
import { Navigate } from "react-router-dom";
import { Loading } from "../../ui/Loading";


export const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuthStore();
  if (loading) {
    return <Loading />;
  }
  return isAuthenticated ? <Navigate to='/dashboard' /> : children;
};
