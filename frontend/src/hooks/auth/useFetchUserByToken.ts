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

async function _fetchUserByToken(t: string): Promise<FetchUserByTokenResponse> {
  return api.get<FetchUserByTokenResponse>(`/auth/${t}`);
}

export function useFetchUserByToken(token: string | null) {
  const fetchUserByTokenFn = React.useCallback(_fetchUserByToken, []);

  const {
    data,
    error,
    isLoading,
    isError,
    isSuccess,
    execute: fetchByToken,
  } = useAsync<FetchUserByTokenResponse, string>(fetchUserByTokenFn);

  React.useEffect(() => {
    if (!token) return;
    if (isLoading || isSuccess) return;
    fetchByToken(token);
  }, [token, isLoading, isSuccess, fetchByToken]);

  return {
    data,
    error,
    isLoading,
    isError,
    isSuccess,
  };
}
