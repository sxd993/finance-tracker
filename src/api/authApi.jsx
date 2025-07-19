import { apiClient } from "./api_client";

export const login = async (email, password) => {
  const response = await apiClient.post("/auth/login", { email, password });
  return response.data;
};

export const register = async (email, password, name) => {
  const response = await apiClient.post("/auth/register", { email, password, name });
  return response.data;
};

export const logout = async () => {
  const response = await apiClient.post("/auth/logout");
  return response.data;
};

export const checkAuth = async () => {
  const response = await apiClient.get("/auth/check");
  return response.data;
};