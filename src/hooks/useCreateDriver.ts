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

export function useCreateDriver() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (driverData: { name: string; licenseNumber: string; licenseExpiry: string }) => {
            const { data } = await apiClient.post('/drivers', driverData);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['drivers'] });
        },
    });
}