
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
            <div className="flex flex-col">
            <span className="text-sm font-medium">{v.fuelEfficiencyKmL.toFixed(2)} km/L</span>
            <div className="w-24 bg-gray-200 rounded-full h-1.5 mt-1">
                <div 
                className="bg-blue-500 h-1.5 rounded-full" 
                style={{ width: `${Math.min(v.fuelEfficiencyKmL * 5, 100)}%` }}
                ></div>
            </div>
            </div>
        )
        },
        { 
        header: 'Total Expenses', 
        accessor: (v: any) => `$${v.totalExpenses.toLocaleString()}` 
        },
        { 
        header: 'Total Revenue', 
        accessor: (v: any) => `$${v.totalRevenue.toLocaleString()}` 
        },
        { 
        header: 'ROI', 
        accessor: (v: any) => (
            <span className={`font-bold ${v.roiPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {v.roiPercentage.toFixed(1)}%
            </span>
        ) 
        }
    ];

    return (
        <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
            <h1 className="text-2xl font-bold text-gray-900">Operational Analytics</h1>
            <p className="text-sm text-gray-500">Financial performance and asset utilization audits.</p>
            </div>
            <div className="flex gap-2">
            <button className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-all shadow-sm">
                <FileText className="h-4 w-4 mr-2" />
                Export CSV
            </button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <TrendingUp className="h-8 w-8 text-green-500 bg-green-50 p-1.5 rounded" />
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">+12.5%</span>
            </div>
            <p className="text-sm text-gray-500 font-medium">Avg. Vehicle ROI</p>
            <p className="text-3xl font-bold text-gray-900">
                {isLoading ? '...' : `${(analytics?.vehicleAnalytics?.reduce((acc: number, curr: any) => acc + curr.roiPercentage, 0) / (analytics?.vehicleAnalytics?.length || 1)).toFixed(1)}%`}
            </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <Fuel className="h-8 w-8 text-blue-500 bg-blue-50 p-1.5 rounded" />
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">Fleet Wide</span>
            </div>
            <p className="text-sm text-gray-500 font-medium">Avg. Fuel Efficiency</p>
            <p className="text-3xl font-bold text-gray-900">
                {isLoading ? '...' : `${(analytics?.vehicleAnalytics?.reduce((acc: number, curr: any) => acc + curr.fuelEfficiencyKmL, 0) / (analytics?.vehicleAnalytics?.length || 1)).toFixed(2)} km/L`}
            </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <Calculator className="h-8 w-8 text-purple-500 bg-purple-50 p-1.5 rounded" />
            </div>
            <p className="text-sm text-gray-500 font-medium">Total Operational Cost</p>
            <p className="text-3xl font-bold text-gray-900">
                {isLoading ? '...' : `$${analytics?.vehicleAnalytics?.reduce((acc: number, curr: any) => acc + curr.totalExpenses, 0).toLocaleString()}`}
            </p>
            </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Vehicle Performance Breakdown</h2>
            </div>
            <div className="p-6">
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