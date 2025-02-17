import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/auth/Login';
import ClientSelected from '../pages/client-selected/ClientSelected';
import ClientList from '../pages/client-list/ClientList';
import { AuthProvider } from '../context/auth';

const router = createBrowserRouter([
  {
    Component: AuthProvider,
    children: [
      {
        path: '/entrar',
        element: <Login />,
      },
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
]);

export default router;
