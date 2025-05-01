import { createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/auth";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ClientList from "../pages/client-list/ClientList";
import ClientSelected from "../pages/client-selected/ClientSelected";

const router = createBrowserRouter([
  {
    element: <AuthProvider />,
    children: [
      {
        path: "/entrar",
        element: <Login />,
      },
      {
        path: "/cadastro",
        element: <Register />,
      },
      {
        element: <MainLayout />,
        children: [
          {
            path: "/clientes",
            element: <ClientList />,
          },
          {
            path: "/clientes-selecionados",
            element: <ClientSelected />,
          },
        ],
      },
    ],
  },
]);

export default router;
