
'use client';

import { useState } from 'react';
import { useUIStore } from '@/store/useUIStore';
import { useVehicles } from '@/hooks/useVehicles';
import { useCreateExpense } from '@/hooks/useExpenses';
import { X, DollarSign } from 'lucide-react';

export default function AddExpenseModal() {
    const { isExpenseModalOpen, closeExpenseModal } = useUIStore();
    const { data: vehicles } = useVehicles();
    const { mutateAsync: createExpense, isPending } = useCreateExpense();

    const [formData, setFormData] = useState({
        vehicleId: '',
        type: 'Fuel',
        amount: '',
        litersLogged: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
    });

    if (!isExpenseModalOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        await createExpense({
            ...formData,
            amount: Number(formData.amount),
            litersLogged: formData.type === 'Fuel' ? Number(formData.litersLogged) : undefined,
        });
        closeExpenseModal();
        setFormData({ vehicleId: '', type: 'Fuel', amount: '', litersLogged: '', description: '', date: new Date().toISOString().split('T')[0] });
        } catch (err) {
        console.error(err);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl relative">
            <button onClick={closeExpenseModal} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
            </button>

            <h2 className="text-xl font-bold text-gray-900 mb-6 font-sans">Log New Expense</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Vehicle</label>
                <select
                required
                className="mt-1 w-full rounded border border-gray-300 p-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.vehicleId}
                onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                >
                <option value="">Select Vehicle...</option>
                {vehicles?.map((v: any) => (
                    <option key={v._id} value={v._id}>{v.name} - {v.licensePlate}</option>
                ))}
                </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                    className="mt-1 w-full rounded border border-gray-300 p-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                    <option value="Fuel">Fuel</option>
                    <option value="Maintenance">Maintenance</option>
                </select>
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                    type="date"
                    required
                    className="mt-1 w-full rounded border border-gray-300 p-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-medium text-gray-700">Amount ($)</label>
                <input
                    type="number"
                    required
                    className="mt-1 w-full rounded border border-gray-300 p-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
                </div>
                {formData.type === 'Fuel' && (
                <div>
                    <label className="block text-sm font-medium text-gray-700">Liters</label>
                    <input
                    type="number"
                    required
                    className="mt-1 w-full rounded border border-gray-300 p-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
                    value={formData.litersLogged}
                    onChange={(e) => setFormData({ ...formData, litersLogged: e.target.value })}
                    />
                </div>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                required
                rows={2}
                className="mt-1 w-full rounded border border-gray-300 p-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
                placeholder={formData.type === 'Fuel' ? "e.g. Full tank at Shell" : "e.g. Oil change and brake check"}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full mt-4 flex justify-center items-center px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-all disabled:opacity-50"
            >
                <DollarSign className="h-4 w-4 mr-2" />
                {isPending ? 'Saving...' : 'Log Expense'}
            </button>
            </form>
        </div>
        </div>
    );
}