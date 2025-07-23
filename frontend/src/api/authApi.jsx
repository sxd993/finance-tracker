import { apiClient, deleteCookie } from "./api_client";

export const login = async ({ login, password }) => {
  const response = await apiClient.post("/auth/login", { login, password });
  return response.data;
};

export const register = async ({ login, password, name }) => {
  const response = await apiClient.post("/auth/register", {
    login,
    password,
    name,
  });
  return response.data;
};

export const logout = async () => {
  try {
    const response = await apiClient.post("/auth/logout");
    return response.data;
  } finally {
    // Удаляем токен из cookie в любом случае
    deleteCookie("token");
  }
};

export const checkAuth = async () => {
  const response = await apiClient.get("/auth/check");
  return response.data;
};