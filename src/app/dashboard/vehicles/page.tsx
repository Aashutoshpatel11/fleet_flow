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
    { header: 'Asset Name', accessor: (v: any) => <span className="font-bold text-white tracking-wide">{v.name}</span> },
    { 
      header: 'License Plate', 
      accessor: (v: any) => (
        <span className="text-gray-300 font-bold tracking-widest px-3 py-1.5 bg-white/5 rounded-xl border border-white/10 uppercase text-xs">
          {v.licensePlate}
        </span>
      ) 
    },
    { 
      header: 'Max Capacity', 
      accessor: (v: any) => (
        <span className="text-white font-bold">
          {v.maxCapacityKg.toLocaleString()} <span className="text-gray-500 font-medium text-xs ml-1">kg</span>
        </span>
      ) 
    },
    { 
      header: 'Odometer', 
      accessor: (v: any) => (
        <span className="text-white font-bold">
          {v.currentOdometer.toLocaleString()} <span className="text-gray-500 font-medium text-xs ml-1">km</span>
        </span>
      ) 
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
    <div className="space-y-8 relative z-10 selection:bg-[#FFC229] selection:text-[#4A2B5E] animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_rgba(167,139,250,0.6)]"></span>
            <span className="text-xs font-bold tracking-wide text-gray-400 uppercase">Asset Management</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">Vehicle Registry</h1>
          <p className="text-lg text-gray-500 mt-2 font-medium">Manage your fleet assets and monitor current statuses.</p>
        </div>
        
        <button
          onClick={openVehicleModal}
          className="flex items-center px-6 py-3.5 bg-[#FFC229] hover:bg-[#E5AC24] text-[#1F2937] text-sm font-bold rounded-2xl shadow-lg hover:shadow-[#FFC229]/50 hover:-translate-y-0.5 transition-all duration-300 group border-none"
        >
          <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
          Add Vehicle
        </button>
      </div>

      <div className="bg-[#1E1E24]/80 backdrop-blur-md rounded-3xl border border-white/5 shadow-2xl overflow-hidden delay-100 hover:border-white/10 transition-all duration-300">
        
        <div className="p-6 md:p-8 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6 bg-white/[0.02]">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-2 h-6 bg-[#FFC229] rounded-full"></div>
            <h2 className="text-xl font-bold text-white tracking-wide">Fleet Roster</h2>
          </div>

          <div className="relative w-full sm:max-w-md group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-500 group-focus-within:text-[#FFC229] transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-3.5 border border-white/10 rounded-2xl leading-5 bg-[#0a0a0a] text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FFC229]/20 focus:border-[#FFC229] transition-all sm:text-sm font-bold shadow-inner"
              placeholder="Search by name or license plate..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="p-6 md:p-8">
          <Table 
            columns={columns} 
            data={filteredVehicles} 
            isLoading={isLoading} 
            emptyMessage="No vehicles found. Click 'Add Vehicle' to register a new asset."
          />
        </div>
      </div>

      <AddVehicleModal />
      
    </div>
  );
}