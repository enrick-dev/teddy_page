import { api } from "../../services/customFetch";
import { useAsync } from "../useAsync";
import { Client } from "./useFetchClient";

export interface DataRemoveClient {
  message: string;
  client: Client;
}

export function useRemoveClient() {
  const {
    data,
    error,
    isError,
    isSuccess,
    isLoading: isPending,
    execute: mutate,
  } = useAsync<DataRemoveClient, number>((id) => api.del("/client/" + id));

  return {
    data,
    error,
    isError,
    isSuccess,
    isPending,
    mutate,
  };
}
