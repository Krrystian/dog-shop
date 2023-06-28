import { create } from "zustand";

interface NewProductStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useNewProduct = create<NewProductStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useNewProduct;
