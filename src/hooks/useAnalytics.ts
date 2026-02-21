import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/axios';

export function useAnalytics() {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      const { data } = await apiClient.get('/analytics');
      return data;
    },
  });
}