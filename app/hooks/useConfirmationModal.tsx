import { create } from "zustand";

interface ConfirmationModal {
  isOpen: boolean;
  id: String;
  setId: (value: String) => void;
  onOpen: () => void;
  onClose: () => void;
}

const useConfirmation = create<ConfirmationModal>((set) => ({
  isOpen: false,
  id: "",
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setId: (value) => set({ id: value }),
}));

export default useConfirmation;
