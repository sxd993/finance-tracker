import "./App.css";
import { Auth } from "./pages/Auth/Auth";
import { Login } from "./pages/Auth/Login/Login";
import { Register } from "./pages/Auth/Register/Register";
import { DashBoardPage } from "./pages/Dashboard/DashBoardPage";
import { Transactions } from "./pages/Transactions/Transactions";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Layout } from "./utils/Layout";
import { Goals } from "./pages/Goals/Goals";

function App() {
  const router = createBrowserRouter([
    // Роуты без навигации
    {
      path: "/",
      element: <Auth />,
      children: [
        {
          path: "/",
          element: <Navigate to="login" replace />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    // Роуты С навигацией
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/home",
          element: (
            <ProtectedRoute>
              <DashBoardPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/transactions",
          element: (
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          ),
        },
        {
          path: "/goals",
          element: (
            <ProtectedRoute>
              <Goals />
            </ProtectedRoute>
          ),
        },
      ],  
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;