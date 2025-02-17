import { useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { api } from '../../services/api';

interface fetchUserByTokenResponse {
  id: number;
  name: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}
const fetchUserByToken = async (
  token: string,
): Promise<fetchUserByTokenResponse> => {
  try {
    const response = await api.get(`/auth/${token}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    } else {
      throw error;
    }
  }
};

export function useFetchUserByToken(token: string) {
  const query = useQuery({
    enabled: !!token,
    queryFn: () => fetchUserByToken(token),
    queryKey: ['fetchUserByToken'],
  });
  return query;
}
