import "./App.css";
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
import { Layout } from "./components/Layout";
import { Goals } from "./pages/Goals/Goals";

function App() {
  const router = createBrowserRouter([
    // Корневой редирект
    {
      path: "/",
      element: <Navigate to="/login" replace />,
    },
    // Роуты аутентификации
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register", 
      element: <Register />,
    },
    // Защищенные роуты с навигацией
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