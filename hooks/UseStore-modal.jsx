import { create } from 'zustand';

export const UseStoreModel = create(set => {
    return {
        isOpen: false,
        onOpen: () => set({ isOpen: true }),
        onClose: () => set({ isOpen: false }),
    };
});
