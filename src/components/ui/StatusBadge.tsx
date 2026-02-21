import React from 'react';

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
    let colorClasses = 'bg-white/5 text-gray-400 border-white/10'; 

    switch (status) {
        case 'Available':
            colorClasses = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(52,211,153,0.15)]';
            break;
        case 'On Trip':
        case 'Dispatched':
            colorClasses = 'bg-[#FFC229]/10 text-[#FFC229] border-[#FFC229]/20 shadow-[0_0_10px_rgba(255,194,41,0.15)]';
            break;
        case 'In Shop':
            colorClasses = 'bg-orange-500/10 text-orange-400 border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.15)]';
            break;
        case 'Out of Service':
        case 'Suspended':
        case 'Cancelled':
            colorClasses = 'bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.15)]';
            break;
        case 'Completed':
            colorClasses = 'bg-[#4A2B5E]/40 text-[#a78bfa] border-[#4A2B5E]/50 shadow-[0_0_10px_rgba(167,139,250,0.15)]';
            break;
        case 'Draft':
        case 'Off Duty':
            colorClasses = 'bg-white/5 text-gray-400 border-white/10';
        break;
    }

    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border backdrop-blur-sm ${colorClasses}`}>
            {status}
        </span>
    );
}