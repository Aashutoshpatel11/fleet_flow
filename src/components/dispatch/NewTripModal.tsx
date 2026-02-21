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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]/80 backdrop-blur-md p-4 animate-in fade-in duration-300 selection:bg-[#FFC229] selection:text-[#4A2B5E]">
            <div className="w-full max-w-lg rounded-3xl bg-[#18181B] border border-white/10 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
                
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#FFC229]/10 rounded-full blur-[60px] pointer-events-none -z-10"></div>

                <div className="p-8">
                    <button 
                        onClick={closeTripModal} 
                        className="absolute right-6 top-6 text-gray-500 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all duration-300"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    <h2 className="text-3xl font-black text-white mb-8 tracking-tight flex items-center gap-3">
                        <span className="w-2.5 h-6 bg-[#FFC229] rounded-full inline-block"></span>
                        Dispatch New Trip
                    </h2>

                    {error && (
                        <div className="mb-6 flex items-start gap-3 rounded-2xl bg-red-500/10 p-4 text-sm text-red-400 border border-red-500/20 shadow-inner">
                            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                            <span className="font-medium leading-relaxed">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Select Vehicle</label>
                                <select
                                    required
                                    className="w-full rounded-2xl border border-white/10 bg-[#0a0a0a] p-3.5 text-white text-sm font-medium focus:ring-2 focus:ring-[#FFC229]/20 focus:border-[#FFC229] outline-none transition-all shadow-inner appearance-none cursor-pointer"
                                    value={formData.vehicleId}
                                    onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                                >
                                    <option value="" className="text-gray-500">Choose Asset...</option>
                                    {availableVehicles?.map((v: any) => (
                                        <option key={v._id} value={v._id}>{v.name} ({v.maxCapacityKg}kg)</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Select Driver</label>
                                <select
                                    required
                                    className="w-full rounded-2xl border border-white/10 bg-[#0a0a0a] p-3.5 text-white text-sm font-medium focus:ring-2 focus:ring-[#FFC229]/20 focus:border-[#FFC229] outline-none transition-all shadow-inner appearance-none cursor-pointer"
                                    value={formData.driverId}
                                    onChange={(e) => setFormData({ ...formData, driverId: e.target.value })}
                                >
                                    <option value="" className="text-gray-500">Choose Driver...</option>
                                    {availableDrivers?.map((d: any) => (
                                        <option key={d._id} value={d._id}>{d.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Origin</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full rounded-2xl border border-white/10 bg-[#0a0a0a] p-3.5 text-white text-sm font-bold focus:ring-2 focus:ring-[#FFC229]/20 focus:border-[#FFC229] outline-none transition-all placeholder-gray-600 shadow-inner"
                                    value={formData.origin}
                                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Destination</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full rounded-2xl border border-white/10 bg-[#0a0a0a] p-3.5 text-white text-sm font-bold focus:ring-2 focus:ring-[#FFC229]/20 focus:border-[#FFC229] outline-none transition-all placeholder-gray-600 shadow-inner"
                                    value={formData.destination}
                                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Cargo Weight (kg)</label>
                            <input
                                type="number"
                                required
                                className="w-full rounded-2xl border border-white/10 bg-[#0a0a0a] p-3.5 text-white text-sm font-bold focus:ring-2 focus:ring-[#FFC229]/20 focus:border-[#FFC229] outline-none transition-all placeholder-gray-600 shadow-inner"
                                placeholder="Must be ≤ Vehicle Capacity"
                                value={formData.cargoWeightKg}
                                onChange={(e) => setFormData({ ...formData, cargoWeightKg: e.target.value })}
                            />
                        </div>

                        <div className="pt-6 flex justify-end gap-4 border-t border-white/5 mt-8">
                            <button 
                                type="button" 
                                onClick={closeTripModal} 
                                className="px-6 py-3.5 text-sm font-bold text-gray-400 bg-white/5 rounded-2xl hover:bg-white/10 hover:text-white transition-all duration-300"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                disabled={isPending} 
                                className="px-8 py-3.5 text-sm font-bold text-[#1F2937] bg-[#FFC229] rounded-2xl hover:bg-[#E5AC24] hover:-translate-y-0.5 shadow-lg shadow-[#FFC229]/20 transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none"
                            >
                                {isPending ? 'Processing...' : 'Confirm Dispatch'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}