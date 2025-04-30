import { api } from "../../services/customFetch";
import { useAsync } from "../useAsync";
import { Client } from "./useFetchClient";

export interface PropsUpdateClient {
  id: number;
  name?: string;
  companyValue?: number;
  salary?: number;
  selected?: boolean;
}
export interface DataUpdateClient {
  message: string;
  client: Client;
}

export function useUpdateClient() {
  const {
    data,
    error,
    isError,
    isSuccess,
    isLoading: isPending,
    execute: mutate,
  } = useAsync<DataUpdateClient, PropsUpdateClient>(({ id, ...body }) =>
    api.patch<DataUpdateClient>("/client/" + id, body),
  );
  return {
    data,
    error,
    isError,
    isSuccess,
    isPending,
    mutate,
  };
}
