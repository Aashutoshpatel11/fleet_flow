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
        { header: 'Date', accessor: (e: any) => <span className="text-gray-400 font-medium">{new Date(e.date).toLocaleDateString()}</span> },
        { header: 'Vehicle', accessor: (e: any) => <span className="font-bold text-white">{e.vehicleId?.name || 'N/A'}</span> },
        { 
            header: 'Type', 
            accessor: (e: any) => {
                const isFuel = e.type === 'Fuel';
                return (
                    <span className={`px-3 py-1.5 rounded-xl text-xs font-black tracking-wider border ${
                        isFuel 
                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]' 
                            : 'bg-orange-500/10 text-orange-400 border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.1)]'
                    }`}>
                        {e.type.toUpperCase()}
                    </span>
                );
            } 
        },
        { header: 'Amount', accessor: (e: any) => <span className="text-white font-bold text-lg">${e.amount.toLocaleString()}</span> },
        { header: 'Description', accessor: (e: any) => <span className="text-gray-400">{e.description}</span> },
    ];

    return (
        <div className="space-y-8 relative z-10 selection:bg-[#FFC229] selection:text-[#4A2B5E] animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>
                        <span className="text-xs font-bold tracking-wide text-gray-400 uppercase">Financial Ops</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">Financial Logs</h1>
                    <p className="text-lg text-gray-500 mt-2 font-medium">Track fuel spend and maintenance ROI per asset.</p>
                </div>
                <button
                    onClick={openExpenseModal}
                    className="flex items-center px-6 py-3.5 bg-[#FFC229] hover:bg-[#E5AC24] text-[#1F2937] text-sm font-bold rounded-2xl shadow-lg hover:shadow-[#FFC229]/50 hover:-translate-y-0.5 transition-all duration-300 group border-none"
                >
                    <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                    Log Expense
                </button>
            </div>

            <div className="bg-[#1E1E24]/80 backdrop-blur-md rounded-3xl border border-white/5 shadow-2xl overflow-hidden p-6 md:p-8 hover:border-white/10 transition-all duration-300 delay-100">
                <Table 
                    columns={columns} 
                    data={expenses || []} 
                    isLoading={isLoading} 
                    emptyMessage="No financial logs found for this period."
                />
            </div>

            <AddExpenseModal />
        </div> 
    );
}