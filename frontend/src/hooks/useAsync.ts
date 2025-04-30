import { useCallback, useState } from "react";

export interface AsyncState<T> {
  data: T | null;
  error: unknown;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

export interface ExecuteOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
}

export function useAsync<T, P = void>(asyncFn: (params: P) => Promise<T>) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
  });

  const execute = useCallback(
    async (params: P, options?: ExecuteOptions<T>) => {
      setState({
        data: null,
        error: null,
        isLoading: true,
        isError: false,
        isSuccess: false,
      });
      try {
        const result = await asyncFn(params);
        setState({
          data: result,
          error: null,
          isLoading: false,
          isError: false,
          isSuccess: true,
        });
        options?.onSuccess?.(result);
        return result;
      } catch (err) {
        setState({
          data: null,
          error: err,
          isLoading: false,
          isError: true,
          isSuccess: false,
        });
        options?.onError?.(err);
        throw err;
      }
    },
    [asyncFn],
  );

  return {
    ...state,
    execute,
  };
}
