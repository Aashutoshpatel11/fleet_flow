import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/axios';

export function useTrips() {
  return useQuery({
    queryKey: ['trips'],
    queryFn: async () => {
      const { data } = await apiClient.get('/trips');
      return data;
    },
  });
}

export function useDispatchTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tripData: any) => {
      const { data } = await apiClient.post('/trips', tripData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
  });
}