import "./App.css";
import { Auth } from "./pages/Auth/Auth";
import { Login } from "./pages/Auth/Login/Login";
import { Register } from "./pages/Auth/Register/Register";
import { Habbits } from "./pages/Habbits/Habbits";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Auth />,
      children: [
        {
          path: "/",
          element: <Navigate to="/login" replace />,
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
    {
      path: "/home",
      element: (
        <ProtectedRoute>
          <Habbits />
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
