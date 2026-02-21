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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]/80 backdrop-blur-md p-4 animate-in fade-in duration-300 selection:bg-[#FFC229] selection:text-[#4A2B5E]">
            <div className="w-full max-w-md rounded-3xl bg-[#18181B] border border-white/10 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
                
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#FFC229]/10 rounded-full blur-[60px] pointer-events-none -z-10"></div>

                <div className="p-8">
                    <button 
                        onClick={closeExpenseModal} 
                        className="absolute right-6 top-6 text-gray-500 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all duration-300"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    <h2 className="text-3xl font-black text-white mb-8 tracking-tight flex items-center gap-3">
                        <span className="w-2.5 h-6 bg-[#FFC229] rounded-full inline-block"></span>
                        Log New Expense
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Vehicle</label>
                            <select
                                required
                                className="w-full rounded-2xl border border-white/10 bg-[#0a0a0a] p-3.5 text-white text-sm font-bold focus:ring-2 focus:ring-[#FFC229]/20 focus:border-[#FFC229] outline-none transition-all shadow-inner appearance-none cursor-pointer"
                                value={formData.vehicleId}
                                onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                            >
                                <option value="" className="text-gray-500">Select Vehicle...</option>
                                {vehicles?.map((v: any) => (
                                    <option key={v._id} value={v._id}>{v.name} - {v.licensePlate}</option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Type</label>
                                <select
                                    className="w-full rounded-2xl border border-white/10 bg-[#0a0a0a] p-3.5 text-white text-sm font-bold focus:ring-2 focus:ring-[#FFC229]/20 focus:border-[#FFC229] outline-none transition-all shadow-inner appearance-none cursor-pointer"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                >
                                    <option value="Fuel">Fuel</option>
                                    <option value="Maintenance">Maintenance</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Date</label>
                                <input
                                    type="date"
                                    required
                                    className="w-full rounded-2xl border border-white/10 bg-[#0a0a0a] p-3.5 text-white text-sm font-bold focus:ring-2 focus:ring-[#FFC229]/20 focus:border-[#FFC229] outline-none transition-all shadow-inner [color-scheme:dark]"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Amount ($)</label>
                                <input
                                    type="number"
                                    required
                                    className="w-full rounded-2xl border border-white/10 bg-[#0a0a0a] p-3.5 text-white text-sm font-bold focus:ring-2 focus:ring-[#FFC229]/20 focus:border-[#FFC229] outline-none transition-all shadow-inner placeholder-gray-600"
                                    value={formData.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                />
                            </div>
                            {formData.type === 'Fuel' && (
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Liters</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full rounded-2xl border border-white/10 bg-[#0a0a0a] p-3.5 text-white text-sm font-bold focus:ring-2 focus:ring-[#FFC229]/20 focus:border-[#FFC229] outline-none transition-all shadow-inner placeholder-gray-600"
                                        value={formData.litersLogged}
                                        onChange={(e) => setFormData({ ...formData, litersLogged: e.target.value })}
                                    />
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Description</label>
                            <textarea
                                required
                                rows={2}
                                className="w-full rounded-2xl border border-white/10 bg-[#0a0a0a] p-3.5 text-white text-sm font-bold focus:ring-2 focus:ring-[#FFC229]/20 focus:border-[#FFC229] outline-none transition-all shadow-inner placeholder-gray-600 resize-none"
                                placeholder={formData.type === 'Fuel' ? "e.g. Full tank at Shell" : "e.g. Oil change and brake check"}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full flex justify-center items-center px-8 py-3.5 text-sm font-bold text-[#1F2937] bg-[#FFC229] rounded-2xl hover:bg-[#E5AC24] hover:-translate-y-0.5 shadow-lg shadow-[#FFC229]/20 transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none group"
                            >
                                <DollarSign className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                                {isPending ? 'Saving...' : 'Log Expense'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}