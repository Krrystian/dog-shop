import { create } from "zustand";

interface ConfirmationStore {
  isOpen: boolean;
  id: String;
  path: String;
  setPath: (value: String) => void;
  setId: (value: String) => void;
  onOpen: () => void;
  onClose: () => void;
}

const useConfirmationModal = create<ConfirmationStore>((set) => ({
  isOpen: false,
  id: "",
  path: "",
  setPath: (value) => set({ path: value }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setId: (value) => set({ id: value }),
}));

export default useConfirmationModal;
