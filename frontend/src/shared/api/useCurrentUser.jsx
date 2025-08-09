import { useQuery } from "@tanstack/react-query"
import { authApi } from '../../features/auth/api/authApi'

export const useCurrentUser = () => {
    const { data: user, isLoading, error } = useQuery({
        queryKey: ['user'],
        queryFn: authApi.checkAuth
    });
    return { user, isLoading, error }
}