import { apiClient } from '../../../shared/api/api_client';

export const authApi = {
  login: async (credentials) => {
    const response = await apiClient.post("/auth/login", credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await apiClient.post("/auth/register", userData);
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post("/auth/logout");
    return response.data;
  },

  checkAuth: async () => {
    const response = await apiClient.get("/auth/check");
    return response.data;
  },
};