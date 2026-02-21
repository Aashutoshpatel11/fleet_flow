
'use client';

import { useState } from 'react';
import { useUIStore } from '@/store/useUIStore';
import { useCreateDriver } from '@/hooks/useCreateDrivers';
import { X, UserPlus } from 'lucide-react';

export default function AddDriverModal() {
    const { isDriverModalOpen, closeDriverModal } = useUIStore();
    const { mutateAsync: createDriver, isPending } = useCreateDriver();

    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        licenseNumber: '',
        licenseExpiry: '',
    });

    if (!isDriverModalOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
        await createDriver(formData);
        setFormData({ name: '', licenseNumber: '', licenseExpiry: '' });
        closeDriverModal();
        } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to register driver');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl relative">
            <button onClick={closeDriverModal} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
            </button>

            <h2 className="text-xl font-bold text-gray-900 mb-6">Onboard New Driver</h2>

            {error && (
            <div className="mb-4 rounded bg-red-50 p-3 text-sm text-red-600 border border-red-200">
                {error}
            </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                type="text"
                required
                className="mt-1 w-full rounded border border-gray-300 p-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">License Number</label>
                <input
                type="text"
                required
                className="mt-1 w-full rounded border border-gray-300 p-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">License Expiry Date</label>
                <input
                type="date"
                required
                className="mt-1 w-full rounded border border-gray-300 p-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.licenseExpiry}
                onChange={(e) => setFormData({ ...formData, licenseExpiry: e.target.value })}
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full mt-4 flex justify-center items-center px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-all disabled:opacity-50"
            >
                <UserPlus className="h-4 w-4 mr-2" />
                {isPending ? 'Registering...' : 'Add to Registry'}
            </button>
            </form>
        </div>
        </div>
    );
}