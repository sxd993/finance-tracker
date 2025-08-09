import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../authStore';

export const useLogin = () => {
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      setUser(response.user);
    },
  });
};