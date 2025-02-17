import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/auth/Login';
import ClientSelected from '../pages/client-selected/ClientSelected';
import ClientList from '../pages/client-list/ClientList';
import { AuthProvider } from '../context/auth';
import MainLayout from '../layout/MainLayout';

const router = createBrowserRouter([
  {
    Component: AuthProvider,
    children: [
      {
        path: '/entrar',
        element: <Login />,
      },
      {
        Component: MainLayout,
        children: [
          {
            path: '/',
            element: <ClientList />,
          },
          {
            path: '/selecionados',
            element: <ClientSelected />,
          },
        ],
      },
    ],
  },
]);

export default router;
