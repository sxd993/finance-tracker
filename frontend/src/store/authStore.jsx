import { create } from 'zustand';
import { useQuery } from '@tanstack/react-query';
import { checkAuth } from '../api/authApi';
import { useEffect } from 'react';

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  loading: false,
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setUser: (user) => set({ user }),
}));


export const AuthProvider = ({ children }) => {
  const { setIsAuthenticated, setUser } = useAuthStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuth,
    retry: 1,
  });

  useEffect(() => {
    if (data) {
      setIsAuthenticated(true);
      setUser(data);
    } else if (error) {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [data, error, setIsAuthenticated, setUser]);

  return <>{children}</>;
};