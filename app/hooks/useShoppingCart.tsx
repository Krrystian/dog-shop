import { create } from "zustand";

interface ShoppingCartStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useShoppingCart = create<ShoppingCartStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useShoppingCart;
