
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
    const { data: vehicles } = useVehicles('In Shop'); // Fetch only vehicles currently in repair
    const { openExpenseModal } = useUIStore();

    // Filter expenses to show only Maintenance records
    const maintenanceLogs = expenses?.filter((e: any) => e.type === 'Maintenance') || [];

    const columns = [
        { header: 'Date', accessor: (e: any) => new Date(e.date).toLocaleDateString() },
        { header: 'Vehicle', accessor: (e: any) => e.vehicleId?.name || 'N/A' },
        { header: 'Service Performed', accessor: 'description' as const },
        { header: 'Cost', accessor: (e: any) => `$${e.amount.toLocaleString()}` },
        { 
        header: 'Status', 
        accessor: () => <StatusBadge status="Completed" /> 
        }
    ];

    return (
        <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Maintenance & Service</h1>
                <p className="text-sm text-gray-500">Preventative health tracking and repair history.</p>
            </div>
            <button
            onClick={openExpenseModal}
            className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-all shadow-sm"
            >
            <Plus className="h-4 w-4 mr-2" />
            Schedule Service
            </button>
        </div>

        {/* "In Shop" Alert Section */}
        {vehicles && vehicles.length > 0 && (
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
                <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-orange-400 mr-3" />
                    <p className="text-sm text-orange-700 font-medium">
                    Currently {vehicles.length} vehicle(s) are "In Shop" and unavailable for dispatch.
                    </p>
                </div>
            </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Historical Service Logs</h2>
            </div>
            <div className="p-6">
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