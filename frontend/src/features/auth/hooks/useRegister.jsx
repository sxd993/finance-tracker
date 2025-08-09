import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../store/useAuthStore';

export const useRegister = () => {
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (response) => {
      setUser(response.user);
    },
  });
};