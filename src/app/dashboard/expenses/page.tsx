
'use client';

import { useExpenses } from '@/hooks/useExpenses';
import { useUIStore } from '@/store/useUIStore';
import { Table } from '@/components/ui/Table';
import AddExpenseModal from '@/components/expenses/AddExpenseModal';
import { Plus, Receipt } from 'lucide-react';

export default function ExpensesPage() {
    const { data: expenses, isLoading } = useExpenses();
    const { openExpenseModal } = useUIStore();

    const columns = [
        { header: 'Date', accessor: (e: any) => new Date(e.date).toLocaleDateString() },
        { header: 'Vehicle', accessor: (e: any) => e.vehicleId?.name || 'N/A' },
        { 
        header: 'Type', 
        accessor: (e: any) => (
            <span className={`px-2 py-1 rounded text-xs font-bold ${e.type === 'Fuel' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}`}>
            {e.type.toUpperCase()}
            </span>
        ) 
        },
        { header: 'Amount', accessor: (e: any) => `$${e.amount.toLocaleString()}` },
        { header: 'Description', accessor: 'description' as const },
    ];

    return (
        <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
            <h1 className="text-2xl font-bold text-gray-900 font-sans">Financial Logs</h1>
            <p className="text-sm text-gray-500 font-sans">Track fuel spend and maintenance ROI per asset.</p>
            </div>
            <button
            onClick={openExpenseModal}
            className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-all"
            >
            <Plus className="h-4 w-4 mr-2" />
            Log Expense
            </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <Table columns={columns} data={expenses || []} isLoading={isLoading} />
        </div>

        <AddExpenseModal />
        </div>
    );
}