'use client';

import { useExpenses } from '@/hooks/useExpenses';
import { useVehicles } from '@/hooks/useVehicles';
import { useUIStore } from '@/store/useUIStore';
import { Table } from '@/components/ui/Table';
import { StatusBadge } from '@/components/ui/StatusBadge';
import AddExpenseModal from '@/components/expenses/AddExpenseModal';
import { Wrench, Plus, AlertCircle } from 'lucide-react';

export default function MaintenancePage() {
    const { data: expenses, isLoading: isLoadingExpenses } = useExpenses();
    const { data: vehicles } = useVehicles('In Shop');
    const { openExpenseModal } = useUIStore();

    const maintenanceLogs = expenses?.filter((e: any) => e.type === 'Maintenance') || [];

    const columns = [
        { header: 'Date', accessor: (e: any) => <span className="text-gray-400 font-medium">{new Date(e.date).toLocaleDateString()}</span> },
        { header: 'Vehicle', accessor: (e: any) => <span className="font-bold text-white">{e.vehicleId?.name || 'N/A'}</span> },
        { header: 'Service Performed', accessor: (e: any) => <span className="text-gray-400">{e.description}</span> },
        { header: 'Cost', accessor: (e: any) => <span className="text-white font-bold text-lg">${e.amount.toLocaleString()}</span> },
        { 
            header: 'Status', 
            accessor: () => <StatusBadge status="Completed" /> 
        }
    ];

    return (
        <div className="space-y-8 relative z-10 selection:bg-[#FFC229] selection:text-[#4A2B5E] animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.6)]"></span>
                        <span className="text-xs font-bold tracking-wide text-gray-400 uppercase">Service Dept</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">Maintenance & Service</h1>
                    <p className="text-lg text-gray-500 mt-2 font-medium">Preventative health tracking and repair history.</p>
                </div>
                <button
                    onClick={openExpenseModal}
                    className="flex items-center px-6 py-3.5 bg-[#FFC229] hover:bg-[#E5AC24] text-[#1F2937] text-sm font-bold rounded-2xl shadow-lg hover:shadow-[#FFC229]/50 hover:-translate-y-0.5 transition-all duration-300 group border-none"
                >
                    <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                    Schedule Service
                </button>
            </div>

            {vehicles && vehicles.length > 0 && (
                <div className="bg-orange-500/10 border border-orange-500/20 p-5 rounded-3xl shadow-[0_0_20px_rgba(249,115,22,0.05)] backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="flex items-center">
                        <div className="p-2.5 bg-orange-500/20 rounded-xl mr-4 shadow-[0_0_10px_rgba(249,115,22,0.2)]">
                            <AlertCircle className="h-6 w-6 text-orange-400" />
                        </div>
                        <p className="text-gray-300 font-medium text-lg tracking-wide">
                            Currently <span className="font-black text-white">{vehicles.length}</span> vehicle(s) are <span className="text-orange-400 font-bold px-2 py-0.5 rounded-lg bg-orange-500/10 border border-orange-500/20">In Shop</span> and unavailable for dispatch.
                        </p>
                    </div>
                </div>
            )}

            <div className="bg-[#1E1E24]/80 backdrop-blur-md rounded-3xl border border-white/5 shadow-2xl overflow-hidden hover:border-white/10 transition-all duration-300 delay-100">
                <div className="p-6 md:p-8 border-b border-white/5 flex items-center gap-3 bg-white/2">
                    <div className="w-2 h-6 bg-[#FFC229] rounded-full"></div>
                    <h2 className="text-xl font-bold text-white tracking-wide">Historical Service Logs</h2>
                </div>
                <div className="p-6 md:p-8">
                    <Table 
                        columns={columns} 
                        data={maintenanceLogs} 
                        isLoading={isLoadingExpenses} 
                        emptyMessage="No maintenance records found."
                    />
                </div>
            </div>

            <AddExpenseModal />
        </div>
    );
}