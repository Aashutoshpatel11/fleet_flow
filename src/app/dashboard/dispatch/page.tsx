'use client';

import { useTrips } from '@/hooks/useTrips';
import { useUIStore } from '@/store/useUIStore';
import { Table } from '@/components/ui/Table';
import { StatusBadge } from '@/components/ui/StatusBadge';
import NewTripModal from '@/components/dispatch/NewTripModal';
import { MapPin, Plus } from 'lucide-react';
import { useUpdateTrip } from '@/hooks/useTrips';

export default function TripDispatcher() {
    const { data: trips, isLoading } = useTrips();
    const { openTripModal } = useUIStore();

    const { mutateAsync: updateTrip } = useUpdateTrip();

    const handleCompleteTrip = async (tripId: string) => {
    const finalOdometer = prompt("Enter final odometer reading:");
    const revenue = prompt("Enter revenue generated from this trip:");

    if (finalOdometer) {
        try {
        await updateTrip({
            id: tripId,
            data: {
            status: 'Completed',
            finalOdometer: Number(finalOdometer),
            revenue: Number(revenue) || 0
            }
        });
        alert("Trip completed and assets released!");
        } catch (error) {
        alert("Failed to complete trip. Check console for details.");
        }
    }
    };

    const columns = [
    { header: 'Vehicle', accessor: (t: any) => <span className="font-bold text-white">{t.vehicleId?.name || 'N/A'}</span> },
    { header: 'Driver', accessor: (t: any) => <span className="text-gray-300 font-medium">{t.driverId?.name || 'N/A'}</span> },
    { 
        header: 'Route', 
        accessor: (t: any) => (
            <div className="flex items-center gap-2 text-gray-400 font-medium">
                <span>{t.origin}</span>
                <MapPin className="w-3 h-3 text-[#FFC229]" />
                <span>{t.destination}</span>
            </div>
        )
    },
    { header: 'Load', accessor: (t: any) => <span className="text-gray-400">{t.cargoWeightKg} kg</span> },
    { header: 'Status', accessor: (t: any) => <StatusBadge status={t.status} /> },
    { 
        header: 'Actions', 
        accessor: (t: any) => (
            t.status === 'Dispatched' ? (
                <button
                    onClick={() => handleCompleteTrip(t._id)}
                    className="px-4 py-1.5 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white text-xs font-bold rounded-lg border border-emerald-500/20 transition-all duration-200"
                >
                    Complete Trip
                </button>
            ) : null
        ) 
    }
];

    return (
        <div className="space-y-8 relative z-10 selection:bg-[#FFC229] selection:text-[#4A2B5E] animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]"></span>
                        <span className="text-xs font-bold tracking-wide text-gray-400 uppercase">Live Dispatch</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">Trip Dispatcher</h1>
                    <p className="text-lg text-gray-500 mt-2 font-medium">Coordinate and validate delivery workflows.</p>
                </div>
                <button 
                    onClick={openTripModal} 
                    className="flex items-center px-6 py-3.5 bg-[#FFC229] hover:bg-[#E5AC24] text-[#1F2937] text-sm font-bold rounded-2xl shadow-lg hover:shadow-[#FFC229]/50 hover:-translate-y-0.5 transition-all duration-300 group border-none"
                >
                    <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                    Create Trip
                </button>
            </div>

            <div className="bg-[#1E1E24]/80 backdrop-blur-md rounded-3xl border border-white/5 shadow-2xl overflow-hidden p-6 md:p-8 hover:border-white/10 transition-all duration-300">
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