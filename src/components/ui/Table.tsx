
import React from 'react';


export interface ColumnDef<T> {
    header: string;
    accessor: keyof T | ((row: T) => React.ReactNode); 
}

interface TableProps<T> {
    columns: ColumnDef<T>[];
    data: T[];
    isLoading?: boolean;
    emptyMessage?: string;
}

export function Table<T>({ 
    columns, 
    data, 
    isLoading = false, 
    emptyMessage = "No data available." 
    }: TableProps<T>) {

    if (isLoading) {
        return (
        <div className="w-full h-64 flex items-center justify-center border border-gray-200 rounded-lg bg-white">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
        );
    }

return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
            <tr>
                {columns.map((col, index) => (
                <th
                    key={index}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                    {col.header}
                </th>
                ))}
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {data.length === 0 ? (
                <tr>
                <td colSpan={columns.length} className="px-6 py-8 text-center text-sm text-gray-500">
                    {emptyMessage}
                </td>
                </tr>
            ) : (
                data.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
                    {columns.map((col, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {/* Check if accessor is a function (for custom rendering) or a string (for direct property access) */}
                        {typeof col.accessor === 'function' 
                        ? col.accessor(row) 
                        : String(row[col.accessor])}
                    </td>
                    ))}
                </tr>
                ))
            )}
            </tbody>
        </table>
        </div>
    );
}