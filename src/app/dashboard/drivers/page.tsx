'use client';

import { useDrivers } from '@/hooks/useDrivers';
import { Table } from '@/components/ui/Table';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Users, ShieldCheck, AlertTriangle } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { Plus } from 'lucide-react';

export default function DriverProfiles() {
    const { data: drivers, isLoading } = useDrivers();
    const {openDriverModal} = useUIStore()

    const columns = [
        { header: 'Driver Name', accessor: 'name' as const },
        { header: 'License #', accessor: 'licenseNumber' as const },
        { 
        header: 'License Expiry', 
        accessor: (d: any) => {
            const expiry = new Date(d.licenseExpiry);
            const isExpired = expiry < new Date();
            
            return (
            <span className={isExpired ? 'text-red-600 font-bold flex items-center' : 'text-gray-700'}>
                {isExpired && <AlertTriangle className="h-4 w-4 mr-1" />}
                {expiry.toLocaleDateString()}
            </span>
            );
        }
        },
        { 
        header: 'Safety Score', 
        accessor: (d: any) => (
            <div className="flex items-center">
            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                <div 
                className={`h-2 rounded-full ${d.safetyScore > 80 ? 'bg-green-500' : 'bg-orange-500'}`} 
                style={{ width: `${d.safetyScore}%` }}
                ></div>
            </div>
            <span className="font-medium">{d.safetyScore}</span>
            </div>
        )
        },
        { 
        header: 'Status', 
        accessor: (d: any) => <StatusBadge status={d.status} /> 
        }
    ];

    return (
        <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
            <h1 className="text-2xl font-bold text-gray-900">Driver Management</h1>
            <p className="text-sm text-gray-500">Monitor compliance, safety scores, and duty status.</p>
            </div>
            <button
                onClick={() => openDriverModal}
                className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-all shadow-sm"
                >
                <Plus className="h-4 w-4 mr-2" />
                Add Driver
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center">
            <ShieldCheck className="h-10 w-10 text-green-500 mr-4" />
            <div>
                <p className="text-sm text-gray-500 font-medium">Compliance Rate</p>
                <p className="text-2xl font-bold text-gray-900">98.2%</p>
            </div>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Operator Registry</h2>
            </div>
            <div className="p-6">
            <Table 
                columns={columns} 
                data={drivers || []} 
                isLoading={isLoading} 
                emptyMessage="No drivers registered in the system."
            />
            </div>
        </div>
        </div>
    );
}