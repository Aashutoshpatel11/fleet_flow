import React from 'react';

interface StatusBadgeProps {
status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
    let colorClasses = 'bg-gray-100 text-gray-800 border-gray-200'; 

    switch (status) {
        case 'Available':
            colorClasses = 'bg-green-50 text-green-700 border-green-200';
            break;
        case 'On Trip':
        case 'Dispatched':
            colorClasses = 'bg-blue-50 text-blue-700 border-blue-200';
            break;
        case 'In Shop':
            colorClasses = 'bg-orange-50 text-orange-700 border-orange-200';
            break;
        case 'Out of Service':
        case 'Suspended':
        case 'Cancelled':
            colorClasses = 'bg-red-50 text-red-700 border-red-200';
            break;
        case 'Completed':
            colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200';
            break;
        case 'Draft':
        case 'Off Duty':
            colorClasses = 'bg-gray-100 text-gray-600 border-gray-300';
        break;
    }

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClasses}`}>
            {status}
        </span>
    );
}