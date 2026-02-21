// src/app/dashboard/vehicles/page.tsx
'use client';

import { useVehicles } from '@/hooks/useVehicles';
import { useUIStore } from '@/store/useUIStore';
import { Table } from '@/components/ui/Table';
import { StatusBadge } from '@/components/ui/StatusBadge';
import AddVehicleModal from '@/components/vehicles/AddVehicleModal';
import { Plus, Search } from 'lucide-react';
import { useState } from 'react';

export default function VehicleRegistry() {
  const { data: vehicles, isLoading } = useVehicles();
  const { openVehicleModal } = useUIStore();
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    { header: 'Asset Name', accessor: 'name' as const },
    { header: 'License Plate', accessor: 'licensePlate' as const },
    { 
      header: 'Max Capacity', 
      accessor: (v: any) => `${v.maxCapacityKg.toLocaleString()} kg` 
    },
    { 
      header: 'Odometer', 
      accessor: (v: any) => `${v.currentOdometer.toLocaleString()} km` 
    },
    { 
      header: 'Status', 
      accessor: (v: any) => <StatusBadge status={v.status} /> 
    }
  ];

  const filteredVehicles = vehicles?.filter((v: any) => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="space-y-6 relative">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vehicle Registry</h1>
          <p className="text-sm text-gray-500">Manage your fleet assets and monitor current statuses.</p>
        </div>
        
        <button
          onClick={openVehicleModal}
          className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Vehicle
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        
        <div className="p-4 border-b border-gray-200 flex items-center">
          <div className="relative w-full max-w-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search by name or license plate..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Table 
          columns={columns} 
          data={filteredVehicles} 
          isLoading={isLoading} 
          emptyMessage="No vehicles found. Click 'Add Vehicle' to register a new asset."
        />
      </div>

      <AddVehicleModal />
      
    </div>
  );
}