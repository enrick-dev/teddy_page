import React from "react";
import { api } from "../../services/customFetch";
import { useAsync } from "../useAsync";

interface PropsFetchClient {
  selected?: boolean;
  page: number;
  limit: number;
  userID: number;
}

export interface Client {
  id: number;
  name: string;
  companyValue: number;
  salary: number;
  createdAt: Date;
  updatedAt: Date;
  userID: number;
  selected?: boolean;
}

interface DataFetchClient {
  clients: Client[];
  totalClients: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

async function _fetchClientApi(
  params: PropsFetchClient,
): Promise<DataFetchClient> {
  const { page, limit, userID, selected } = params;
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    userID: String(userID),
    ...(selected !== undefined ? { selected: String(selected) } : {}),
  }).toString();

  return api.get<DataFetchClient>(`/client?${query}`);
}

export function useFetchClient(params: PropsFetchClient) {
  const fetchClientFn = React.useCallback(_fetchClientApi, []);

  const {
    data,
    error,
    isError,
    isSuccess,
    isLoading: isPending,
    execute: fetchClients,
  } = useAsync<DataFetchClient, PropsFetchClient>(fetchClientFn);

  const { page, limit, userID, selected } = params;

  React.useEffect(() => {
    fetchClients({ page, limit, userID, selected });
  }, [page, limit, userID, selected, fetchClients]);

  return {
    refetch: () => fetchClients(params),
    data,
    error,
    isPending,
    isError,
    isSuccess,
  };
}
