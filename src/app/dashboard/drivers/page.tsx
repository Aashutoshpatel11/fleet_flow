'use client';

import { useDrivers } from '@/hooks/useDrivers';
import { Table } from '@/components/ui/Table';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Users, ShieldCheck, AlertTriangle } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { Plus } from 'lucide-react';
import AddDriverModal from '@/components/drivers/AddDriverModal';

export default function DriverProfiles() {
    const { data: drivers, isLoading } = useDrivers();
    const { openDriverModal } = useUIStore();

    const columns = [
        { header: 'Driver Name', accessor: (d: any) => <span className="font-bold text-white">{d.name}</span> },
        { header: 'License #', accessor: (d: any) => <span className="text-gray-400 font-medium">{d.licenseNumber}</span> },
        { 
            header: 'License Expiry', 
            accessor: (d: any) => {
                const expiry = new Date(d.licenseExpiry);
                const isExpired = expiry < new Date();
                
                return (
                    <span className={`flex items-center font-bold px-3 py-1.5 rounded-xl w-fit ${isExpired ? 'text-red-400 bg-red-500/10 border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]' : 'text-gray-300 bg-white/5 border border-white/5'}`}>
                        {isExpired && <AlertTriangle className="h-4 w-4 mr-2" />}
                        {expiry.toLocaleDateString()}
                    </span>
                );
            }
        },
        { 
            header: 'Safety Score', 
            accessor: (d: any) => (
                <div className="flex items-center gap-3">
                    <div className="w-24 bg-gray-800 rounded-full h-1.5 overflow-hidden">
                        <div 
                            className={`h-full rounded-full ${d.safetyScore > 80 ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]' : 'bg-[#FFC229] shadow-[0_0_8px_rgba(255,194,41,0.6)]'}`} 
                            style={{ width: `${d.safetyScore}%` }}
                        ></div>
                    </div>
                    <span className="font-bold text-white">{d.safetyScore}</span>
                </div>
            )
        },
        { 
            header: 'Status', 
            accessor: (d: any) => <StatusBadge status={d.status} /> 
        }
    ];

    return (
        <div className="space-y-8 relative z-10 selection:bg-[#FFC229] selection:text-[#4A2B5E] animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-[#FFC229] animate-pulse shadow-[0_0_8px_rgba(255,194,41,0.6)]"></span>
                        <span className="text-xs font-bold tracking-wide text-gray-400 uppercase">Driver Ops</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">Driver Management</h1>
                    <p className="text-lg text-gray-500 mt-2 font-medium">Monitor compliance, safety scores, and duty status.</p>
                </div>
                <button
                    onClick={openDriverModal}
                    className="flex items-center px-6 py-3.5 bg-[#FFC229] hover:bg-[#E5AC24] text-[#1F2937] text-sm font-bold rounded-2xl shadow-lg hover:shadow-[#FFC229]/50 hover:-translate-y-0.5 transition-all duration-300 group border-none"
                >
                    <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                    Add Driver
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#1E1E24]/80 backdrop-blur-md p-8 rounded-3xl border border-white/5 shadow-xl hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300 group flex items-center">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mr-6 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-300">
                        <ShieldCheck className="h-7 w-7 text-emerald-400" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Compliance Rate</p>
                        <p className="text-4xl font-black text-white">98.2%</p>
                    </div>
                </div>
            </div>

            <div className="bg-[#1E1E24]/80 backdrop-blur-md rounded-3xl border border-white/5 shadow-2xl overflow-hidden delay-100">
                <div className="p-6 md:p-8 border-b border-white/5 flex items-center gap-3 bg-white/[0.02]">
                    <div className="w-2 h-6 bg-[#FFC229] rounded-full"></div>
                    <h2 className="text-xl font-bold text-white tracking-wide">Operator Registry</h2>
                </div>
                <div className="p-6 md:p-8">
                    <Table 
                        columns={columns} 
                        data={drivers || []} 
                        isLoading={isLoading} 
                        emptyMessage="No drivers registered in the system."
                    />
                </div>
            </div>
            
            <AddDriverModal />
        </div>
    );
}