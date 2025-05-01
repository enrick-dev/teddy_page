import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { PropsFetchAuth, useFetchAuth } from "../hooks/auth/useFetchAuth";
import {
  PropsFetchAuthRegister,
  useFetchAuthRegister,
} from "../hooks/auth/useFetchAuthRegister";
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
  sign: (data: PropsFetchAuth) => void;
  register: (data: PropsFetchAuthRegister) => void;
  signOut: () => void;
  error: unknown;
  isError: boolean;
  token: string;
  userID: number;
  name: string;
  username: string;
}>({
  signed: false,
  isPending: false,
  sign: (_: PropsFetchAuth) => {
    void _;
  },
  register: (_: PropsFetchAuthRegister) => {
    void _;
  },
  signOut: () => {},
  error: null,
  isError: false,
  token: "",
  userID: 0,
  name: "",
  username: "",
});

export const AuthProvider: React.FC = () => {
  const [token, setToken] = React.useState(
    localStorageManager.getItem("@Auth:token"),
  );
  const [authMethod, setAuthMethod] = React.useState<"sign" | "register">(
    "sign",
  );
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!token) navigate("/entrar");
  }, [token]);

  const [userData, setUserData] = React.useState({
    userID: localStorageManager.getItem("@Auth:id") || "",
    name: localStorageManager.getItem("@Auth:name") || "",
    username: localStorageManager.getItem("@Auth:username") || "",
  });

  const {
    mutate: loginMutate,
    isPending: loginIsPending,
    isSuccess: loginIsSuccess,
    data: loginData,
    error: loginError,
    isError: loginIsError,
  } = useFetchAuth();

  const {
    mutate: registerMutate,
    isPending: registerIsPending,
    isSuccess: registerIsSuccess,
    data: registerData,
    error: registerError,
    isError: registerIsError,
  } = useFetchAuthRegister();

  const sign = (data: PropsFetchAuth) => {
    setAuthMethod("sign");
    loginMutate(data);
  };

  const register = (data: PropsFetchAuthRegister) => {
    setAuthMethod("register");
    registerMutate(data);
  };

  const isPending = authMethod === "sign" ? loginIsPending : registerIsPending;
  const isSuccess = authMethod === "sign" ? loginIsSuccess : registerIsSuccess;
  const data = authMethod === "sign" ? loginData : registerData;
  const error = authMethod === "sign" ? loginError : registerError;
  const isError = authMethod === "sign" ? loginIsError : registerIsError;

  React.useEffect(() => {
    if (isSuccess && data) {
      localStorageManager.setItem("@Auth:token", data.token);
      setToken(data.token);
    }
  }, [isSuccess, data]);

  const user = useFetchUserByToken(token);

  React.useEffect(() => {
    if (!token) {
      setUserData({ userID: null, name: "", username: "" });
      return;
    }

    if (user.isSuccess && user.data) {
      const { id, name, username } = user.data;

      setUserData((prev) => {
        if (
          prev.userID === id &&
          prev.name === name &&
          prev.username === username
        ) {
          return prev;
        }
        localStorageManager.setItem("@Auth:id", String(id));
        localStorageManager.setItem("@Auth:name", name);
        localStorageManager.setItem("@Auth:username", username);
        return { userID: id, name, username };
      });
    }
  }, [token, user.isSuccess, user.data]);

  const signOut = () => {
    setToken(null);
    setUserData({
      userID: "",
      name: "",
      username: "",
    });
    localStorageManager.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!token,
        signOut,
        sign,
        register,
        isPending,
        error,
        isError,
        token,
        userID: userData.userID,
        name: userData.name,
        username: userData.username,
      }}
    >
      <Outlet />
    </AuthContext.Provider>
  );
};
