import { create } from 'zustand';

interface UIState {
    isVehicleModalOpen: boolean;
    isTripModalOpen: boolean;
    isExpenseModalOpen: boolean;
    
    openVehicleModal: () => void;
    closeVehicleModal: () => void;
    openTripModal: () => void;
    closeTripModal: () => void;
    openExpenseModal: () => void;
    closeExpenseModal: () => void;
}

export const useUIStore = create<UIState>((set:any) => ({
    isVehicleModalOpen: false,
    isTripModalOpen: false,
    isExpenseModalOpen: false,

    openVehicleModal: () => set({ isVehicleModalOpen: true }),
    closeVehicleModal: () => set({ isVehicleModalOpen: false }),
    
    openTripModal: () => set({ isTripModalOpen: true }),
    closeTripModal: () => set({ isTripModalOpen: false }),
    
    openExpenseModal: () => set({ isExpenseModalOpen: true }),
    closeExpenseModal: () => set({ isExpenseModalOpen: false }),
}));