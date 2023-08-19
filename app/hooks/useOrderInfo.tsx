import { create } from "zustand";

interface OrderStore {
  isOpen: boolean;
  orderDetails: any;
  setOrderDetails: (value: any) => void;
  onOpen: () => void;
  onClose: () => void;
}

const useOrderInfo = create<OrderStore>((set) => ({
  isOpen: false,
  orderDetails: [],
  setOrderDetails: (value) => set({ orderDetails: value }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useOrderInfo;
