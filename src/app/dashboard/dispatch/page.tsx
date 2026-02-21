'use client';

import { useTrips } from '@/hooks/useTrips';
import { useUIStore } from '@/store/useUIStore';
import { Table } from '@/components/ui/Table';
import { StatusBadge } from '@/components/ui/StatusBadge';
import NewTripModal from '@/components/dispatch/NewTripModal';
import { MapPin, Plus } from 'lucide-react';

export default function TripDispatcher() {
    const { data: trips, isLoading } = useTrips();
    const { openTripModal } = useUIStore();

    const columns = [
        { header: 'Vehicle', accessor: (t: any) => t.vehicleId?.name || 'N/A' },
        { header: 'Driver', accessor: (t: any) => t.driverId?.name || 'N/A' },
        { header: 'Route', accessor: (t: any) => `${t.origin} → ${t.destination}` },
        { header: 'Load', accessor: (t: any) => `${t.cargoWeightKg} kg` },
        { header: 'Status', accessor: (t: any) => <StatusBadge status={t.status} /> }
    ];

    return (
        <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
            <h1 className="text-2xl font-bold text-gray-900">Trip Dispatcher</h1>
            <p className="text-sm text-gray-500">Coordinate and validate delivery workflows.</p>
            </div>
            <button onClick={openTripModal} className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 shadow-sm transition-all">
            <Plus className="h-4 w-4 mr-2" />
            Create Trip
            </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <Table 
            columns={columns} 
            data={trips || []} 
            isLoading={isLoading} 
            emptyMessage="No active or pending trips found."
            />
        </div>

        <NewTripModal />
        </div>
    );
}