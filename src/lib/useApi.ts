import { useState, useCallback } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

type UseApiResponse<T> = {
  data: T | null;
  error: string | null;
  isLoading: boolean;
  fetchData: (config: AxiosRequestConfig) => Promise<void>;
};

function useApi<T>(): UseApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async (config: AxiosRequestConfig) => {
    setIsLoading(true);
    setError('');
    setData(null);

    try {
      const response: AxiosResponse<T> = await axios(config);
      setData(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'An error occurred. Please try again.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, error, isLoading, fetchData };
}

export default useApi;