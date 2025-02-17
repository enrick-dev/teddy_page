import { useMutation } from '@tanstack/react-query';
import { api } from '../../services/api';
import { AxiosError } from 'axios';

export interface FetchAuthInterface {
  username: string;
  password: string;
}

const auth = async (data: FetchAuthInterface) => {
  try {
    const response = await api.post('/auth', data);
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
