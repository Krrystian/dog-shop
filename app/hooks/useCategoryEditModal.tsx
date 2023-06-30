import { create } from "zustand";

interface EditStore {
  isOpen: boolean;
  id: string;
  setId: (value: string) => void;
  onOpen: () => void;
  onClose: () => void;
}

const useCategoryEditModal = create<EditStore>((set) => ({
  isOpen: false,
  id: "",
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setId: (value: string) => set({ id: value }),
}));

export default useCategoryEditModal;
