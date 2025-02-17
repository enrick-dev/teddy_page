import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "../../services/api";

interface PropsClearSelectedClient {
  userID: number;
}

const clearSelectedClient = async (data: PropsClearSelectedClient) => {
  try {
    const response = await api.post("/client/clear/selected", data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
};

export function useClearSelectedClient() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: clearSelectedClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchClient"] });
    },
  });
  return mutate;
}
