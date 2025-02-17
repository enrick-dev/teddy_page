import { useQuery } from "@tanstack/react-query";

import { AxiosError } from "axios";
import { api } from "../../services/api";

interface BodyRequest {
  page: number;
  limit: number;
}

export interface Client {
  id: number;
  name: string;
  companyValue: number;
  salary: number;
  createdAt: Date;
  updatedAt: Date;
  userID: number;
}

export interface FetchClientResponse {
  clients: Client[];
  totalClients: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}
const clients = async (data: BodyRequest): Promise<FetchClientResponse> => {
  try {
    const response = await api.get(`/client/`, { params: data });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
};

export function useFetchClient(data: BodyRequest) {
  const query = useQuery({
    enabled: !!data.page && !!data.limit,
    queryFn: () => clients(data),
    queryKey: ["fetchClient"],
  });
  return query;
}
