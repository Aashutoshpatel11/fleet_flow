'use client';

import { useState } from 'react';
import { useUIStore } from '@/store/useUIStore';
import { useCreateDriver } from '@/hooks/useCreateDrivers';
import { X, UserPlus, AlertCircle } from 'lucide-react';

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]/80 backdrop-blur-md p-4 animate-in fade-in duration-300 selection:bg-[#FFC229] selection:text-[#4A2B5E]">
            <div className="w-full max-w-md rounded-3xl bg-[#18181B] border border-white/10 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
                
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#FFC229]/10 rounded-full blur-[60px] pointer-events-none -z-10"></div>

                <div className="p-8">
                    <button 
                        onClick={closeDriverModal} 
                        className="absolute right-6 top-6 text-gray-500 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all duration-300"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    <h2 className="text-3xl font-black text-white mb-8 tracking-tight flex items-center gap-3">
                        <span className="w-2.5 h-6 bg-[#FFC229] rounded-full inline-block"></span>
                        Onboard New Driver
                    </h2>

                    {error && (
                        <div className="mb-6 flex items-start gap-3 rounded-2xl bg-red-500/10 p-4 text-sm text-red-400 border border-red-500/20 shadow-inner">
                            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                            <span className="font-medium leading-relaxed">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                            <input
                                type="text"
                                required
                                className="w-full rounded-2xl border border-white/10 bg-[#0a0a0a] p-3.5 text-white text-sm font-bold focus:ring-2 focus:ring-[#FFC229]/20 focus:border-[#FFC229] outline-none transition-all placeholder-gray-600 shadow-inner"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">License Number</label>
                            <input
                                type="text"
                                required
                                className="w-full rounded-2xl border border-white/10 bg-[#0a0a0a] p-3.5 text-white text-sm font-bold focus:ring-2 focus:ring-[#FFC229]/20 focus:border-[#FFC229] outline-none transition-all placeholder-gray-600 shadow-inner"
                                value={formData.licenseNumber}
                                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">License Expiry Date</label>
                            <input
                                type="date"
                                required
                                className="w-full rounded-2xl border border-white/10 bg-[#0a0a0a] p-3.5 text-white text-sm font-bold focus:ring-2 focus:ring-[#FFC229]/20 focus:border-[#FFC229] outline-none transition-all text-gray-300 shadow-inner [color-scheme:dark]"
                                value={formData.licenseExpiry}
                                onChange={(e) => setFormData({ ...formData, licenseExpiry: e.target.value })}
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full flex justify-center items-center px-8 py-3.5 text-sm font-bold text-[#1F2937] bg-[#FFC229] rounded-2xl hover:bg-[#E5AC24] hover:-translate-y-0.5 shadow-lg shadow-[#FFC229]/20 transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none group"
                            >
                                <UserPlus className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                                {isPending ? 'Registering...' : 'Add to Registry'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}