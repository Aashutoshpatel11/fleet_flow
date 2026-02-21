
'use client';

import { useState } from 'react';
import { useUIStore } from '@/store/useUIStore';
import { useCreateVehicle } from '@/hooks/useVehicles';
import { X } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl relative">
        
        <button 
          onClick={closeVehicleModal}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-4">Register New Vehicle</h2>

        {error && (
          <div className="mb-4 rounded bg-red-50 p-3 text-sm text-red-600 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Vehicle Name (e.g., Van-05)</label>
            <input
              type="text"
              required
              className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">License Plate (Unique ID)</label>
            <input
              type="text"
              required
              className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none uppercase focus:ring-1 focus:ring-blue-500"
              value={formData.licensePlate}
              onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value.toUpperCase() })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Max Capacity (kg)</label>
              <input
                type="number"
                required
                min="1"
                className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.maxCapacityKg}
                onChange={(e) => setFormData({ ...formData, maxCapacityKg: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Acquisition Cost</label>
              <input
                type="number"
                required
                min="0"
                className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formData.acquisitionCost}
                onChange={(e) => setFormData({ ...formData, acquisitionCost: e.target.value })}
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={closeVehicleModal}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {isPending ? 'Saving...' : 'Save Asset'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}