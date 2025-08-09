import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Страницы (убрал DashBoard)
import { LoginPage } from "./features/auth/pages/LoginPage";
import { RegisterPage } from "./features/auth/pages/RegisterPage";
import { Transactions } from "./pages/Transactions/Transactions";
import { Goals } from "./pages/Goals/Goals";

// Query Client
const queryClient = new QueryClient();

// Простой роутер без Layout / Protect / Public
const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/transactions", element: <Transactions /> },
  { path: "/goals", element: <Goals /> },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
