import { api } from "../../services/customFetch";
import { useAsync } from "../useAsync";

export interface PropsFetchAuth {
  username: string;
  password: string;
}

interface AuthData {
  token: string;
}

export function useFetchAuth() {
  const {
    data,
    error,
    isLoading: isPending,
    isError,
    isSuccess,
    execute: mutate,
  } = useAsync<AuthData | null, PropsFetchAuth>((body) =>
    api.post<AuthData | null>("/auth", body),
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
