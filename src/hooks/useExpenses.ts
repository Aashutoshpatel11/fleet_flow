
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/axios';

export function useExpenses() {
    return useQuery({
        queryKey: ['expenses'],
        queryFn: async () => {
            const { data } = await apiClient.get('/expenses');
            return data;
        },
    });
}

export function useCreateExpense() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (expenseData: any) => {
            const { data } = await apiClient.post('/expenses', expenseData);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
            queryClient.invalidateQueries({ queryKey: ['vehicles'] });
            queryClient.invalidateQueries({ queryKey: ['analytics'] });
        },
    });
}