import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../authStore';

export const useLogout = () => {
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      logout();
    },
    onError: () => {
      // Выходим даже при ошибке API
      logout();
    },
  });
};