'use client';

import { useState } from 'react';
import { useUIStore } from '@/store/useUIStore';
import { useCreateVehicle } from '@/hooks/useVehicles';
import { X, AlertCircle } from 'lucide-react';

export default function AddVehicleModal() {
  const { isVehicleModalOpen, closeVehicleModal } = useUIStore();
  
  const { mutateAsync: createVehicle, isPending } = useCreateVehicle();
  
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    licensePlate: '',
    maxCapacityKg: '',
    acquisitionCost: ''
  });

  if (!isVehicleModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await createVehicle({
        ...formData,
        maxCapacityKg: Number(formData.maxCapacityKg),
        acquisitionCost: Number(formData.acquisitionCost),
      });
      
      setFormData({ name: '', licensePlate: '', maxCapacityKg: '', acquisitionCost: '' });
      closeVehicleModal();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to add vehicle');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]/80 backdrop-blur-md p-4 animate-in fade-in duration-300 selection:bg-[#FFC229] selection:text-[#4A2B5E]">
      <div className="w-full max-w-md rounded-3xl bg-[#18181B] border border-white/10 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* --- Decorative Ambient Glow --- */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#FFC229]/10 rounded-full blur-[60px] pointer-events-none -z-10"></div>

        <div className="p-8">
          <button 
            onClick={closeVehicleModal}
            className="absolute right-6 top-6 text-gray-500 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all duration-300"
          >
            <X className="h-5 w-5" />
          </button>

          <h2 className="text-3xl font-black text-white mb-8 tracking-tight flex items-center gap-3">
            <span className="w-2.5 h-6 bg-[#FFC229] rounded-full inline-block"></span>
            Register Vehicle
          </h2>

          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-2xl bg-red-500/10 p-4 text-sm text-red-400 border border-red-500/20 shadow-inner">
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <span className="font-medium leading-relaxed">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Vehicle Name</label>
              <input
                type="text"
                required
                placeholder="e.g., Van-05"
                className="w-full rounded-2xl border border-white/10 bg-[#0a0a0a] p-3.5 text-white text-sm font-bold focus:ring-2 focus:ring-[#FFC229]/20 focus:border-[#FFC229] outline-none transition-all placeholder-gray-600 shadow-inner"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">License Plate</label>
              <input
                type="text"
                required
                placeholder="Unique ID"
                className="w-full rounded-2xl border border-white/10 bg-[#0a0a0a] p-3.5 text-white text-sm font-bold focus:ring-2 focus:ring-[#FFC229]/20 focus:border-[#FFC229] outline-none uppercase transition-all placeholder-gray-600 shadow-inner"
                value={formData.licensePlate}
                onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value.toUpperCase() })}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Max Capacity (kg)</label>
                <input
                  type="number"
                  required
                  min="1"
                  className="w-full rounded-2xl border border-white/10 bg-[#0a0a0a] p-3.5 text-white text-sm font-bold focus:ring-2 focus:ring-[#FFC229]/20 focus:border-[#FFC229] outline-none transition-all shadow-inner"
                  value={formData.maxCapacityKg}
                  onChange={(e) => setFormData({ ...formData, maxCapacityKg: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Acquisition Cost</label>
                <input
                  type="number"
                  required
                  min="0"
                  className="w-full rounded-2xl border border-white/10 bg-[#0a0a0a] p-3.5 text-white text-sm font-bold focus:ring-2 focus:ring-[#FFC229]/20 focus:border-[#FFC229] outline-none transition-all shadow-inner"
                  value={formData.acquisitionCost}
                  onChange={(e) => setFormData({ ...formData, acquisitionCost: e.target.value })}
                />
              </div>
            </div>

            <div className="pt-6 flex justify-end gap-4 border-t border-white/5 mt-8">
              <button
                type="button"
                onClick={closeVehicleModal}
                className="px-6 py-3.5 text-sm font-bold text-gray-400 bg-white/5 rounded-2xl hover:bg-white/10 hover:text-white transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="px-8 py-3.5 text-sm font-bold text-[#1F2937] bg-[#FFC229] rounded-2xl hover:bg-[#E5AC24] hover:-translate-y-0.5 shadow-lg shadow-[#FFC229]/20 transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none"
              >
                {isPending ? 'Saving...' : 'Save Asset'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}