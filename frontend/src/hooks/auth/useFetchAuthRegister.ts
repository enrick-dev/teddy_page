import { api } from "../../services/customFetch";
import { useAsync } from "../useAsync";

export interface PropsFetchAuthRegister {
  name: string;
  username: string;
  password: string;
}

interface AuthRegisterData {
  token: string;
}

export function useFetchAuthRegister() {
  const {
    data,
    error,
    isLoading: isPending,
    isError,
    isSuccess,
    execute: mutate,
  } = useAsync<AuthRegisterData | null, PropsFetchAuthRegister>((body) =>
    api.post<AuthRegisterData | null>("/auth/register", body),
  );

  return {
    mutate,
    data,
    error,
    isPending,
    isError,
    isSuccess,
  };
}
