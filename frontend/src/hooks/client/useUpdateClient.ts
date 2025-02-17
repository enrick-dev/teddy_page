import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "../../services/api";

export interface PropsUseUpdateClient {
  id: number;
  name?: string;
  companyValue?: number;
  salary?: number;
  selected?: boolean;
}

const updateClient = async ({ id, ...data }: PropsUseUpdateClient) => {
  try {
    const response = await api.patch("/client/" + id, data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
};

export function useUpdateClient() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: updateClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchClient"] });
    },
  });
  return mutate;
}
