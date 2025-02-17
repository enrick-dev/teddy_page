import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FetchAuthInterface, useFetchAuth } from "../hooks/auth/useFetchAuth";
import { useFetchUserByToken } from "../hooks/auth/useFetchUserByToken";
import localStorageManager from "../utils/localStorageManager";

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
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
  userID: string;
  name: string;
  username: string;
}>({
  signed: false,
  isPending: false,
  sign: (_: FetchAuthInterface) => {},
  signOut: async () => {},
  error: null,
  isError: false,
  userID: "",
  name: "",
  username: "",
});

export const AuthProvider: React.FC = () => {
  const [token, setToken] = React.useState(
    localStorageManager.getItem("@Auth:token"),
  );
  const userID = localStorageManager.getItem("@Auth:id");
  const name = localStorageManager.getItem("@Auth:name");
  const username = localStorageManager.getItem("@Auth:username");

  const { mutate, isPending, isSuccess, data, error, isError } = useFetchAuth();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const user = useFetchUserByToken(!userID ? token : null);

  useEffect(() => {
    if (user.data) {
      localStorageManager.setItem("@Auth:id", user.data?.id);
      localStorageManager.setItem("@Auth:name", user.data?.name);
      localStorageManager.setItem("@Auth:username", user.data?.username);
    }
  }, [user.isSuccess]);

  useEffect(() => {
    if (token) navigate("/");
    else navigate("/entrar");
  }, [token]);

  useEffect(() => {
    if (isSuccess && data) {
      localStorageManager.setItem("@Auth:token", data.token);
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
    localStorageManager.clear();
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
        userID,
        name,
        username,
      }}
    >
      <Outlet />
    </AuthContext.Provider>
  );
};
