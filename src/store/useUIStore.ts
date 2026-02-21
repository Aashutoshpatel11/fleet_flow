import { create } from 'zustand';

interface UIState {
    isVehicleModalOpen: boolean;
    isTripModalOpen: boolean;
    isExpenseModalOpen: boolean;
    isDriverModalOpen: boolean
    
    openVehicleModal: () => void;
    closeVehicleModal: () => void;
    openTripModal: () => void;
    closeTripModal: () => void;
    openExpenseModal: () => void;
    closeExpenseModal: () => void;
    openDriverModal: () => void;
    closeDriverModal: () => void;
}

export const useUIStore = create<UIState>((set:any) => ({
    isVehicleModalOpen: false,
    isTripModalOpen: false,
    isExpenseModalOpen: false,
    isDriverModalOpen: false,


    openVehicleModal: () => set({ isVehicleModalOpen: true }),
    closeVehicleModal: () => set({ isVehicleModalOpen: false }),
    
    openTripModal: () => set({ isTripModalOpen: true }),
    closeTripModal: () => set({ isTripModalOpen: false }),
    
    openExpenseModal: () => set({ isExpenseModalOpen: true }),
    closeExpenseModal: () => set({ isExpenseModalOpen: false }),

    openDriverModal: () => set({isDriverModalOpen: true}),
    closeDriverModal: () => set({isDriverModalOpen: false})
}));