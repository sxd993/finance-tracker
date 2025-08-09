import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router-dom";
import { Loading } from "../components/Loading";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuthStore();
  if (loading) {
    return <Loading />;
  }
  return isAuthenticated ? children : <Navigate to="/login" />;
};
