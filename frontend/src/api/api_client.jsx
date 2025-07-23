import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});



const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};

// Interceptor для обработки ответов
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      deleteCookie("token"); // Удаляем локально, если токен недействителен
      window.location.href = "/login"; // Редирект на страницу логина
    }
    return Promise.reject(error);
  }
);

export {  deleteCookie };