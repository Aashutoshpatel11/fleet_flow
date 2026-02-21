'use client';

import { useAnalytics } from '@/hooks/useAnalytics';
import { Table } from '@/components/ui/Table';
import { BarChart3, TrendingUp, Fuel, Calculator, FileText } from 'lucide-react';

export default function AnalyticsPage() {
    const { data: analytics, isLoading } = useAnalytics();

    const columns = [
        { header: 'Vehicle', accessor: 'name' as const },
        { header: 'License', accessor: 'licensePlate' as const },
        { 
            header: 'Fuel Efficiency', 
            accessor: (v: any) => (
                <div className="flex flex-col gap-1.5">
                    <span className="text-sm font-bold text-gray-300">{v.fuelEfficiencyKmL.toFixed(2)} km/L</span>
                    <div className="w-24 bg-gray-800 rounded-full h-1.5 overflow-hidden">
                        <div 
                            className="bg-[#FFC229] h-full rounded-full shadow-[0_0_8px_rgba(255,194,41,0.6)]" 
                            style={{ width: `${Math.min(v.fuelEfficiencyKmL * 5, 100)}%` }}
                        ></div>
                    </div>
                </div>
            )
        },
        { 
            header: 'Total Expenses', 
            accessor: (v: any) => <span className="text-gray-400 font-medium">${v.totalExpenses.toLocaleString()}</span>
        },
        { 
            header: 'Total Revenue', 
            accessor: (v: any) => <span className="text-white font-bold">${v.totalRevenue.toLocaleString()}</span>
        },
        { 
            header: 'ROI', 
            accessor: (v: any) => (
                <span className={`font-black tracking-wide ${v.roiPercentage >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {v.roiPercentage >= 0 ? '+' : ''}{v.roiPercentage.toFixed(1)}%
                </span>
            ) 
        }
    ];

    return (
        <div className="space-y-8 relative z-10 selection:bg-[#FFC229] selection:text-[#4A2B5E] animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-[#FFC229] animate-pulse"></span>
                        <span className="text-xs font-bold tracking-wide text-gray-400 uppercase">System Active</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">Operational Analytics</h1>
                    <p className="text-lg text-gray-500 mt-2 font-medium">Financial performance and asset utilization audits.</p>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center px-6 py-3.5 bg-white/5 border border-white/10 text-white text-sm font-bold rounded-2xl hover:bg-[#FFC229] hover:border-[#FFC229] hover:text-[#1F2937] transition-all duration-300 shadow-lg group">
                        <FileText className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                        Export CSV
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#1E1E24]/80 backdrop-blur-md p-8 rounded-3xl border border-white/5 shadow-xl hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-300">
                            <TrendingUp className="h-6 w-6 text-emerald-400" />
                        </div>
                        <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 shadow-[0_0_15px_rgba(52,211,153,0.1)]">+12.5%</span>
                    </div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Avg. Vehicle ROI</p>
                    <p className="text-4xl font-black text-white">
                        {isLoading ? '...' : `${(analytics?.vehicleAnalytics?.reduce((acc: number, curr: any) => acc + curr.roiPercentage, 0) / (analytics?.vehicleAnalytics?.length || 1)).toFixed(1)}%`}
                    </p>
                </div>

                <div className="bg-[#1E1E24]/80 backdrop-blur-md p-8 rounded-3xl border border-white/5 shadow-xl hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-[#FFC229]/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#FFC229]/20 transition-all duration-300">
                            <Fuel className="h-6 w-6 text-[#FFC229]" />
                        </div>
                        <span className="text-xs font-black text-[#FFC229] bg-[#FFC229]/10 px-3 py-1.5 rounded-full border border-[#FFC229]/20">Fleet Wide</span>
                    </div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Avg. Fuel Efficiency</p>
                    <p className="text-4xl font-black text-white">
                        {isLoading ? '...' : `${(analytics?.vehicleAnalytics?.reduce((acc: number, curr: any) => acc + curr.fuelEfficiencyKmL, 0) / (analytics?.vehicleAnalytics?.length || 1)).toFixed(2)}`}
                        <span className="text-lg text-gray-500 ml-1">km/L</span>
                    </p>
                </div>

                <div className="bg-[#1E1E24]/80 backdrop-blur-md p-8 rounded-3xl border border-white/5 shadow-xl hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-[#4A2B5E]/40 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#4A2B5E]/60 transition-all duration-300">
                            <Calculator className="h-6 w-6 text-[#a78bfa]" />
                        </div>
                    </div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Total Operational Cost</p>
                    <p className="text-4xl font-black text-white truncate">
                        {isLoading ? '...' : `$${analytics?.vehicleAnalytics?.reduce((acc: number, curr: any) => acc + curr.totalExpenses, 0).toLocaleString()}`}
                    </p>
                </div>
            </div>

            <div className="bg-[#1E1E24]/80 backdrop-blur-md rounded-3xl border border-white/5 shadow-2xl overflow-hidden delay-100">
                <div className="p-6 md:p-8 border-b border-white/5 flex items-center gap-3 bg-white/[0.02]">
                    <div className="w-2 h-6 bg-[#FFC229] rounded-full"></div>
                    <h2 className="text-xl font-bold text-white tracking-wide">Vehicle Performance Breakdown</h2>
                </div>
                <div className="p-6 md:p-8">
                    <Table 
                        columns={columns} 
                        data={analytics?.vehicleAnalytics || []} 
                        isLoading={isLoading} 
                        emptyMessage="Insufficient data to generate financial reports."
                    />
                </div>
            </div>
        </div>
    );
}