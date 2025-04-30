import { api } from "../../services/customFetch";
import { useAsync } from "../useAsync";

interface PropsClearSelectedClient {
  userID: number;
}
interface DataClearSelectedClient {
  message: string;
}

export function useClearSelectedClient() {
  const {
    data,
    error,
    isError,
    isSuccess,
    isLoading: isPending,
    execute: mutate,
  } = useAsync<DataClearSelectedClient, PropsClearSelectedClient>((body) =>
    api.post<DataClearSelectedClient>("/client/clear/selected", body),
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
