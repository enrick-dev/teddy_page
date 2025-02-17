import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "../../services/api";

export interface PropsFetchAuth {
  username: string;
  password: string;
}

const auth = async (data: PropsFetchAuth) => {
  try {
    const response = await api.post("/auth", data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
};

export function useFetchAuth() {
  const mutate = useMutation({
    mutationFn: auth,
  });
  return mutate;
}
