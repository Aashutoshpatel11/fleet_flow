
'use client';

import { useVehicles } from '@/hooks/useVehicles';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Table } from '@/components/ui/Table';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Truck, Wrench, Activity, Clock } from 'lucide-react';

export default function CommandCenter() {
const { data: analytics, isLoading: isLoadingAnalytics } = useAnalytics();
const { data: vehicles, isLoading: isLoadingVehicles } = useVehicles();

const kpis = analytics?.kpis || {};
const activeFleet = kpis['On Trip'] || 0;
const inShop = kpis['In Shop'] || 0;
const available = kpis['Available'] || 0;

const totalUsable = activeFleet + available;
const utilizationRate = totalUsable > 0 ? Math.round((activeFleet / totalUsable) * 100) : 0;

const columns = [
    { 
        header: 'Vehicle Name', 
        accessor: 'name' as const 
    },
    { 
        header: 'License Plate', 
        accessor: 'licensePlate' as const 
    },
    { 
        header: 'Capacity (kg)', 
        accessor: 'maxCapacityKg' as const 
    },
    { 
        header: 'Odometer (km)', 
        accessor: 'currentOdometer' as const 
    },
    { 
        header: 'Status', 
        accessor: (vehicle: any) => <StatusBadge status={vehicle.status} /> 
    }
];

return (
    <div className="space-y-6">
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <Activity className="h-6 w-6" />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">Active Fleet</p>
                <p className="text-2xl font-bold text-gray-900">{isLoadingAnalytics ? '-' : activeFleet}</p>
            </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex items-center">
            <div className="p-3 rounded-full bg-orange-100 text-orange-600 mr-4">
                <Wrench className="h-6 w-6" />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">Maintenance Alerts</p>
                <p className="text-2xl font-bold text-gray-900">{isLoadingAnalytics ? '-' : inShop}</p>
            </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                <Truck className="h-6 w-6" />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">Available Vehicles</p>
                <p className="text-2xl font-bold text-gray-900">{isLoadingAnalytics ? '-' : available}</p>
            </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                <Clock className="h-6 w-6" />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">Fleet Utilization</p>
                <p className="text-2xl font-bold text-gray-900">{isLoadingAnalytics ? '-' : `${utilizationRate}%`}</p>
            </div>
            </div>

        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">Current Fleet Status</h2>
                
                <select className="border border-gray-300 text-sm rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="All">All Vehicles</option>
                    <option value="Available">Available Only</option>
                    <option value="On Trip">On Trip</option>
                    <option value="In Shop">In Shop</option>
                </select>
            </div>

            <div className="p-6">
                <Table 
                    columns={columns} 
                    data={vehicles || []} 
                    isLoading={isLoadingVehicles} 
                    emptyMessage="No vehicles registered in the fleet yet."
                />
            </div>
        </div>

    </div>
  );
}