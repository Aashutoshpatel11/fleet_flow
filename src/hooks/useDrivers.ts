import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/axios';

export function useDrivers(status?: string) {
    
    return useQuery({
        queryKey: ['drivers', status],
        queryFn: async () => {
            const url = status ? `/drivers?status=${status}` : '/drivers';
            const { data } = await apiClient.get(url);
            return data;
        },
    });
}