import './App.css'
import { Auth } from './pages/Auth/Auth'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './pages/Auth/Login/Login'
import { Register } from './pages/Auth/Register/Register'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Auth />,
      children: [
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'register', 
          element: <Register />
        }
      ]
    }
  ])
  
  return (
    <div>
      <RouterProvider router={router} />
    </div>  
  )
}

export default App