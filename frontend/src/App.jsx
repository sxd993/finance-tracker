import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// UX-Компоненты
import { Layout } from "./shared/ui/Layout";

// Авторизация
import { PublicRoute } from './shared/ui/Routes/PublicRoute'
import { ProtectedRoute } from "./shared/ui/Routes/ProtectedRoute";
import { LoginPage } from './features/auth/pages/LoginPage'
import { RegisterPage } from './features/auth/pages/RegisterPage'

// Защищенные страницы
import { Dashboard } from './features/dashboard/pages/DashBoard'

// Query Client
const queryClient = new QueryClient();

// Роутер
const router = createBrowserRouter([
  // Публичные пути
  {
    path: "/",
    element:
      <PublicRoute>
        <LoginPage />
      </PublicRoute>,
  },
  {
    path: "/login",
    element:
      <PublicRoute>
        <LoginPage />
      </PublicRoute>,
  },
  {
    path: "/register",
    element:
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>,
  },
  // Защищенные руты (только для авторизованных пользователей)
  {
    element:
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>,
    children: [
      {
        path: '/home',
        element: <Dashboard/>
      }
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
