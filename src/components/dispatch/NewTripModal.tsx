'use client';

import { useState } from 'react';
import { useUIStore } from '@/store/useUIStore';
import { useVehicles } from '@/hooks/useVehicles';
import { useDrivers } from '@/hooks/useDrivers';
import { useDispatchTrip } from '@/hooks/useTrips';
import { X, AlertCircle } from 'lucide-react';

export default function NewTripModal() {
    const { isTripModalOpen, closeTripModal } = useUIStore();
    const { data: availableVehicles } = useVehicles('Available');
    const { data: availableDrivers } = useDrivers('Available');
    const { mutateAsync: dispatchTrip, isPending } = useDispatchTrip();

    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        vehicleId: '',
        driverId: '',
        origin: '',
        destination: '',
        cargoWeightKg: '',
    });

    if (!isTripModalOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
        await dispatchTrip({
            ...formData,
            cargoWeightKg: Number(formData.cargoWeightKg),
        });
        setFormData({ vehicleId: '', driverId: '', origin: '', destination: '', cargoWeightKg: '' });
        closeTripModal();
        } catch (err: any) {
        setError(err.response?.data?.error || 'Validation Failed: Check capacity and license expiry.');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl relative">
            <button onClick={closeTripModal} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
            </button>

            <h2 className="text-xl font-bold text-gray-900 mb-6">Dispatch New Trip</h2>

            {error && (
            <div className="mb-4 flex items-center gap-2 rounded bg-red-50 p-3 text-sm text-red-600 border border-red-200">
                <AlertCircle className="h-4 w-4" />
                {error}
            </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-medium text-gray-700">Select Vehicle</label>
                <select
                    required
                    className="mt-1 w-full rounded border border-gray-300 p-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                    value={formData.vehicleId}
                    onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                >
                    <option value="">Choose Asset...</option>
                    {availableVehicles?.map((v: any) => (
                    <option key={v._id} value={v._id}>{v.name} ({v.maxCapacityKg}kg)</option>
                    ))}
                </select>
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700">Select Driver</label>
                <select
                    required
                    className="mt-1 w-full rounded border border-gray-300 p-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                    value={formData.driverId}
                    onChange={(e) => setFormData({ ...formData, driverId: e.target.value })}
                >
                    <option value="">Choose Driver...</option>
                    {availableDrivers?.map((d: any) => (
                    <option key={d._id} value={d._id}>{d.name}</option>
                    ))}
                </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-medium text-gray-700">Origin</label>
                <input
                    type="text"
                    required
                    className="mt-1 w-full rounded border border-gray-300 p-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700">Destination</label>
                <input
                    type="text"
                    required
                    className="mt-1 w-full rounded border border-gray-300 p-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Cargo Weight (kg)</label>
                <input
                type="number"
                required
                className="mt-1 w-full rounded border border-gray-300 p-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="Must be ≤ Vehicle Capacity"
                value={formData.cargoWeightKg}
                onChange={(e) => setFormData({ ...formData, cargoWeightKg: e.target.value })}
                />
            </div>

            <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={closeTripModal} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
                Cancel
                </button>
                <button type="submit" disabled={isPending} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors">
                {isPending ? 'Processing...' : 'Confirm Dispatch'}
                </button>
            </div>
            </form>
        </div>
        </div>
    );
}