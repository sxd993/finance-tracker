import { apiClient, setCookie, getCookie, deleteCookie } from "./api_client";

export const login = async ({ login, password }) => {
  const response = await apiClient.post("/auth/login", { login, password });
  // Сохраняем токен в cookie после успешной авторизации
  if (response.data.token) {
    setCookie("token", response.data.token, 1);
  }
  return response.data;
};

export const register = async ({ login, password, name }) => {
  const response = await apiClient.post("/auth/register", {
    login,
    password,
    name,
  });
  // Сохраняем токен в cookie после успешной регистрации
  if (response.data.token) {
    setCookie("token", response.data.token, 1);
  }
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
  // Токен автоматически добавится через interceptor
  const response = await apiClient.get("/auth/check");
  console.log("Auth check successful:", response.data);
  return response.data;
};

// Утилиты
export const isAuthenticated = () => {
  return !!getCookie("token");
};

export const getCurrentToken = () => {
  return getCookie("token");
};
