import { useAuthStore } from "../../../features/auth/store/useAuthStore";
import { Navigate } from "react-router-dom";
import { Loading } from "../../ui/Loading";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuthStore();

  if (loading) {
    return <Loading />;
  }

  // Проверка только после полной загрузки состояния
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};