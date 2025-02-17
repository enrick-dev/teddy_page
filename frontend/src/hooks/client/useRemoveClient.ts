import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "../../services/api";

const removeClient = async (id: number) => {
  try {
    const response = await api.delete("/client/" + id);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
};

export function useRemoveClient() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: removeClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchClient"] });
    },
  });
  return mutate;
}
