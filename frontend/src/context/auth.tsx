import React, { useEffect } from 'react';
import localStorageManager from '../utils/localStorageManager';
import { useQueryClient } from '@tanstack/react-query';
import { Outlet, useNavigate } from 'react-router-dom';
import { FetchAuthInterface, useFetchAuth } from '../hooks/auth/useFetchAuth';

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export const AuthContext = React.createContext<{
  signed: boolean;
  isPending: boolean;
  sign: (data: FetchAuthInterface) => void;
  signOut: () => Promise<void>;
  error: unknown;
  isError: boolean;
}>({
  signed: false,
  isPending: false,
  sign: (_: FetchAuthInterface) => {},
  signOut: async () => {},
  error: null,
  isError: false,
});

export const AuthProvider: React.FC = () => {
  const [token, setToken] = React.useState(
    localStorageManager.getItem('@Auth:token'),
  );

  const { mutate, isPending, isSuccess, data, error, isError } = useFetchAuth();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (token) navigate('/');
    else navigate('/entrar');
  }, [token]);

  useEffect(() => {
    if (isSuccess && data) {
      localStorageManager.setItem('@Auth:token', data.token);
      setToken(data.token);
    }
  }, [isSuccess]);

  const sign = (data: FetchAuthInterface) => {
    mutate(data);
  };

  const signOut = async () => {
    await queryClient.clear();
    await queryClient.cancelQueries();
    await setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!token,
        signOut,
        sign,
        isPending,
        error,
        isError,
      }}
    >
      <Outlet />
    </AuthContext.Provider>
  );
};
