// features/auth/hooks/useCheckAuth.js - ПРОСТОЙ вариант без React Query
import { useEffect, useState } from 'react';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../authStore';

export const useCheckAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { setUser, setInitialized, isInitialized } = useAuthStore();

  useEffect(() => {
    // Если уже проверяли - не проверяем повторно
    if (isInitialized) {
      setIsLoading(false);
      return;
    }

    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const userData = await authApi.checkAuth();
        setUser(userData);
      } catch (error) {
        console.log('Auth check failed:', error);
        setUser(null);
      } finally {
        setInitialized(true);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [setUser, setInitialized, isInitialized]);

  return { isLoading };
};