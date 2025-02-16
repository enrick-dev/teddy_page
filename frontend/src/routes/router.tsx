import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/auth/Login';
import ClientSelected from '../pages/client-selected/ClientSelected';
import ClientList from '../pages/client-list/ClientList';

const router = createBrowserRouter([
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
]);

export default router;
