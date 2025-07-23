import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";

export const Auth = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuthStore();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/home", { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-10">
      <div>
        <h1 className="text-2xl font-bold">
          <span className="text-orange-500">Habbit</span> Tracker
        </h1>
      </div>
      <Outlet />
    </div>
  );
};