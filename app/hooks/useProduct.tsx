import { create } from "zustand";

interface ProductStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useProduct = create<ProductStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useProduct;
