import { createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/auth";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/auth/Login";
import ClientList from "../pages/client-list/ClientList";
import ClientSelected from "../pages/client-selected/ClientSelected";

const router = createBrowserRouter([
  {
    Component: AuthProvider,
    children: [
      {
        path: "/entrar",
        element: <Login />,
      },
      {
        Component: MainLayout,
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
