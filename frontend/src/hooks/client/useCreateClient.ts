import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "../../services/api";

export interface PropsUseCreateClient {
  name: string;
  companyValue: number;
  salary: number;
}

const createClient = async (data: PropsUseCreateClient) => {
  try {
    const response = await api.post("/client/", data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
};

export function useCreateClient() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchClient"] });
    },
  });
  return mutate;
}
