import { create } from "zustand";

interface OrderStore {
  isOpen: boolean;
  orderDetails: any;
  totalPrice: string;
  setTotalPrice: (value: string) => void;
  setOrderDetails: (value: any) => void;
  onOpen: () => void;
  onClose: () => void;
}

const useOrderInfo = create<OrderStore>((set) => ({
  isOpen: false,
  orderDetails: [],
  totalPrice: "",
  setTotalPrice: (value) => set({ totalPrice: value }),
  setOrderDetails: (value) => set({ orderDetails: value }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useOrderInfo;
