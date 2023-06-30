import { create } from "zustand";

interface ConfirmationStore {
  isOpen: boolean;
  id: String;
  setId: (value: String) => void;
  onOpen: () => void;
  onClose: () => void;
}

const useConfirmationModal = create<ConfirmationStore>((set) => ({
  isOpen: false,
  id: "",
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setId: (value) => set({ id: value }),
}));

export default useConfirmationModal;
