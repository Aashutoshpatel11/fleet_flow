import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/axios';

export function useVehicles(status?: string) {
  return useQuery({
    queryKey: ['vehicles', status],
    queryFn: async () => {
      const url = status ? `/vehicles?status=${status}` : '/vehicles';
      const { data } = await apiClient.get(url);
      return data;
    },
  });
}

export function useCreateVehicle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newVehicle: any) => {
      const { data } = await apiClient.post('/vehicles', newVehicle);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
  });
}