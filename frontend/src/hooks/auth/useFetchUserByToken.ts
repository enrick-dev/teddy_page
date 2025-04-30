import React from "react";
import { api } from "../../services/customFetch";
import { useAsync } from "../useAsync";

export interface FetchUserByTokenResponse {
  id: number;
  name: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export function useFetchUserByToken(token: string | null) {
  const {
    data,
    error,
    isLoading,
    isError,
    isSuccess,
    execute: fetchByToken,
  } = useAsync<FetchUserByTokenResponse, string>((t) =>
    api.get<FetchUserByTokenResponse>(`/auth/${t}`),
  );

  React.useEffect(() => {
    if (token) {
      fetchByToken(token);
    }
  }, [token, fetchByToken]);

  return {
    refetch: fetchByToken,
    data,
    error,
    isLoading,
    isError,
    isSuccess,
  };
}
