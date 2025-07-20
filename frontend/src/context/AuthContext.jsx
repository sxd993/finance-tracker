import { createContext, useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "../api/authApi";
import { getCookie } from "../api/api_client";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuth,
    retry: 1,
    enabled: !!getCookie("token"),
  });

  useEffect(() => {
    if (data) {
      setIsAuthenticated(true);
      setUser(data.user);
    } else if (error) {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [data, error]);

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      loading: isLoading,
      setIsAuthenticated,
      setUser,
    }),
    [isAuthenticated, user, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
