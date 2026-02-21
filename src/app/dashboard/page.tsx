
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

// return (
//     <div className="space-y-6">
      
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex items-center">
//             <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
//                 <Activity className="h-6 w-6" />
//             </div>
//             <div>
//                 <p className="text-sm font-medium text-gray-500">Active Fleet</p>
//                 <p className="text-2xl font-bold text-gray-900">{isLoadingAnalytics ? '-' : activeFleet}</p>
//             </div>
//             </div>

//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex items-center">
//             <div className="p-3 rounded-full bg-orange-100 text-orange-600 mr-4">
//                 <Wrench className="h-6 w-6" />
//             </div>
//             <div>
//                 <p className="text-sm font-medium text-gray-500">Maintenance Alerts</p>
//                 <p className="text-2xl font-bold text-gray-900">{isLoadingAnalytics ? '-' : inShop}</p>
//             </div>
//             </div>

//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex items-center">
//             <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
//                 <Truck className="h-6 w-6" />
//             </div>
//             <div>
//                 <p className="text-sm font-medium text-gray-500">Available Vehicles</p>
//                 <p className="text-2xl font-bold text-gray-900">{isLoadingAnalytics ? '-' : available}</p>
//             </div>
//             </div>

//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex items-center">
//             <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
//                 <Clock className="h-6 w-6" />
//             </div>
//             <div>
//                 <p className="text-sm font-medium text-gray-500">Fleet Utilization</p>
//                 <p className="text-2xl font-bold text-gray-900">{isLoadingAnalytics ? '-' : `${utilizationRate}%`}</p>
//             </div>
//             </div>

//         </div>

//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
//             <div className="p-6 border-b border-gray-200 flex justify-between items-center">
//                 <h2 className="text-lg font-semibold text-gray-800">Current Fleet Status</h2>
                
//                 <select className="border border-gray-300 text-sm rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
//                     <option value="All">All Vehicles</option>
//                     <option value="Available">Available Only</option>
//                     <option value="On Trip">On Trip</option>
//                     <option value="In Shop">In Shop</option>
//                 </select>
//             </div>

//             <div className="p-6">
//                 <Table 
//                     columns={columns} 
//                     data={vehicles || []} 
//                     isLoading={isLoadingVehicles} 
//                     emptyMessage="No vehicles registered in the fleet yet."
//                 />
//             </div>
//         </div>

//     </div>
//   );

return (
  <div className="space-y-8 relative z-10 selection:bg-[#FFC229] selection:text-[#4A2B5E]">
      
      {/* --- Stats Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* Active Fleet */}
          <div className="bg-[#1E1E24]/80 backdrop-blur-md border border-white/5 rounded-3xl p-6 flex items-center hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300 group shadow-xl">
            <div className="p-4 rounded-2xl bg-[#FFC229]/10 text-[#FFC229] mr-5 group-hover:scale-110 group-hover:bg-[#FFC229]/20 transition-all duration-300">
                <Activity className="h-6 w-6" />
            </div>
            <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Active Fleet</p>
                <p className="text-3xl font-black text-white">{isLoadingAnalytics ? '-' : activeFleet}</p>
            </div>
          </div>

          {/* Maintenance Alerts */}
          <div className="bg-[#1E1E24]/80 backdrop-blur-md border border-white/5 rounded-3xl p-6 flex items-center hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300 group shadow-xl relative overflow-hidden">
            {/* Urgent glow if there are items in shop */}
            {!isLoadingAnalytics && inShop > 0 && (
              <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            )}
            <div className="p-4 rounded-2xl bg-red-500/10 text-red-400 mr-5 group-hover:scale-110 group-hover:bg-red-500/20 transition-all duration-300 relative z-10">
                <Wrench className="h-6 w-6" />
            </div>
            <div className="relative z-10">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Maintenance</p>
                <p className="text-3xl font-black text-white">{isLoadingAnalytics ? '-' : inShop}</p>
            </div>
          </div>

          {/* Available Vehicles */}
          <div className="bg-[#1E1E24]/80 backdrop-blur-md border border-white/5 rounded-3xl p-6 flex items-center hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300 group shadow-xl">
            <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-400 mr-5 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-300">
                <Truck className="h-6 w-6" />
            </div>
            <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Available</p>
                <p className="text-3xl font-black text-white">{isLoadingAnalytics ? '-' : available}</p>
            </div>
          </div>

          {/* Fleet Utilization */}
          <div className="bg-[#1E1E24]/80 backdrop-blur-md border border-white/5 rounded-3xl p-6 flex items-center hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300 group shadow-xl">
            <div className="p-4 rounded-2xl bg-[#4A2B5E]/40 text-[#a78bfa] mr-5 group-hover:scale-110 group-hover:bg-[#4A2B5E]/60 transition-all duration-300">
                <Clock className="h-6 w-6" />
            </div>
            <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Utilization</p>
                <p className="text-3xl font-black text-white">{isLoadingAnalytics ? '-' : `${utilizationRate}%`}</p>
            </div>
          </div>

      </div>

      {/* --- Table Section --- */}
      <div className="bg-[#1E1E24]/80 backdrop-blur-md rounded-3xl border border-white/5 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          
          <div className="p-6 md:p-8 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                  <div className="w-2 h-6 bg-[#FFC229] rounded-full"></div>
                  <h2 className="text-xl font-bold text-white tracking-wide">Current Fleet Status</h2>
              </div>
              
              <div className="relative group">
                <select className="appearance-none bg-[#0a0a0a] border border-white/10 text-gray-300 text-sm font-bold rounded-xl pl-4 pr-10 py-2.5 outline-none focus:border-[#FFC229] focus:ring-2 focus:ring-[#FFC229]/20 transition-all cursor-pointer hover:border-white/20 shadow-inner">
                    <option value="All">All Vehicles</option>
                    <option value="Available">Available Only</option>
                    <option value="On Trip">On Trip</option>
                    <option value="In Shop">In Shop</option>
                </select>
                {/* Custom dropdown arrow to replace the native ugly one */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 group-hover:text-[#FFC229] transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
          </div>

          <div className="p-6 md:p-8">
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