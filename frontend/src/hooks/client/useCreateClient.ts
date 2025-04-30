import { api } from "../../services/customFetch";
import { useAsync } from "../useAsync";
import { Client } from "./useFetchClient";

interface PropsCreateClient {
  name: string;
  companyValue: number;
  salary: number;
  userID: number;
}

interface DataCreateClient {
  message: string;
  client: Client;
}

export function useCreateClient() {
  const {
    data,
    error,
    isError,
    isSuccess,
    isLoading: isPending,
    execute: mutate,
  } = useAsync<DataCreateClient, PropsCreateClient>((body) =>
    api.post<DataCreateClient>("/client", body),
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
