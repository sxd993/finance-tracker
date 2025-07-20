import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Loading } from "../components/Loading";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  if (loading) {
    return <Loading />;
  }
  return isAuthenticated ? children : <Navigate to="/login" />;
};
